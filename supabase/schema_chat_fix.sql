-- ==============================================================================
-- Linedate V2 Schema Fix (Chat & Realtime)
-- 기존 테이블 충돌 해결 및 스키마 재설정
-- ==============================================================================

-- 1. 기존 충돌 테이블 정리 (주의: 메시지 데이터가 초기화됩니다)
-- 기존 messages 테이블이 room_id가 아닌 match_id를 가지고 있어서 에러가 발생했습니다.
-- 깔끔하게 재생성합니다.
DROP TABLE IF EXISTS public.messages CASCADE;
DROP TABLE IF EXISTS public.chat_rooms CASCADE;
-- 기존 버전의 matches 테이블도 이제 안 쓰므로 삭제 (선택사항)
DROP TABLE IF EXISTS public.matches CASCADE;

-- 2. Chat Rooms 테이블 (매칭된 방)
CREATE TABLE public.chat_rooms (
  id TEXT PRIMARY KEY, -- roomId "user1-user2" 형식
  users TEXT[] NOT NULL, -- ["uuid1", "uuid2"]
  book_id TEXT, -- 어떤 책으로 매칭되었는지 (lib/books.ts ID 참조)
  last_message TEXT,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 3. Messages 테이블 (대화 내용)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT REFERENCES public.chat_rooms(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);

-- 4. RLS 정책 설정 (채팅 보안)

-- Chat Rooms
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view chat rooms they belong to" ON public.chat_rooms
  FOR SELECT USING (auth.uid()::text = ANY(users));

CREATE POLICY "Users can insert chat rooms" ON public.chat_rooms
  FOR INSERT WITH CHECK (auth.uid()::text = ANY(users));
  
CREATE POLICY "Users can update chat rooms they belong to" ON public.chat_rooms
  FOR UPDATE USING (auth.uid()::text = ANY(users));

-- Messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their rooms" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.chat_rooms
      WHERE id = messages.room_id
      AND auth.uid()::text = ANY(users)
    )
  );

CREATE POLICY "Users can insert messages in their rooms" ON public.messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.chat_rooms
      WHERE id = messages.room_id
      AND auth.uid()::text = ANY(users)
    )
  );

-- 5. Realtime 설정
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE messages;
COMMIT;
