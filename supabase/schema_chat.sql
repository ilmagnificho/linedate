-- ==============================================================================
-- Linedate V2 Schema Update (Part 2: Chat & Realtime)
-- 
-- 이 SQL을 Supabase SQL Editor에서 실행해주세요.
-- ==============================================================================

-- 5. Chat Rooms 테이블 (매칭된 방)
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id TEXT PRIMARY KEY, -- roomId "user1-user2" 형식 (알파벳순 정렬)
  users TEXT[] NOT NULL, -- ["uuid1", "uuid2"]
  book_id TEXT, -- 어떤 책으로 매칭되었는지
  last_message TEXT,
  last_message_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- 6. Messages 테이블 (대화 내용)
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id TEXT REFERENCES public.chat_rooms(id) NOT NULL,
  sender_id UUID REFERENCES public.users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);

-- RLS 정책 설정 (채팅 보안)

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

-- Realtime 설정 (messages 테이블 변경사항 구독 허용)
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime FOR TABLE messages;
COMMIT;
