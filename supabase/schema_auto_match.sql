-- ==============================================================================
-- Linedate Auto-Match Logic (RPC) V2
-- FK 제약조건을 해제하여 봇 계정이 public.users에 존재할 수 있게 합니다.
-- ==============================================================================

-- 1. Foreign Key 제약조건 삭제 (봇 계정 생성을 위해)
-- auth.users에 없는 ID도 public.users에 넣을 수 있게 허용합니다.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'users_id_fkey' AND table_name = 'users'
  ) THEN
    ALTER TABLE public.users DROP CONSTRAINT users_id_fkey;
  END IF;
END $$;

-- 2. 매칭 봇 생성 및 밑줄 생성 함수
CREATE OR REPLACE FUNCTION public.request_auto_match(
  target_book_id TEXT,
  user_id UUID
) 
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  bot_id UUID := '00000000-0000-0000-0000-000000000001';
  bot_name TEXT := 'Linedate AI';
  new_room_id TEXT;
BEGIN
  -- 봇 계정 생성 (FK가 없으므로 auth.users에 없어도 됨)
  INSERT INTO public.users (id, email, nickname, gender, age_range, region)
  VALUES (bot_id, 'ai@linedate.kr', bot_name, 'female', '20s', 'Metaverse')
  ON CONFLICT (id) DO NOTHING;

  -- 봇의 밑줄 생성
  INSERT INTO public.underlines (user_id, book_id, content, month_year)
  VALUES (
    bot_id, 
    target_book_id, 
    '안녕하세요! 이 책을 선택하셨군요. 저와 함께 이야기 나눠요. (자동 매칭됨)',
    TO_CHAR(NOW(), 'YYYY-MM')
  )
  ON CONFLICT DO NOTHING; 

  -- 채팅방 ID 생성 (알파벳순)
  IF user_id < bot_id THEN
    new_room_id := user_id || '-' || bot_id;
  ELSE
    new_room_id := bot_id || '-' || user_id;
  END IF;

  -- 채팅방 생성
  INSERT INTO public.chat_rooms (id, users, book_id, is_active)
  VALUES (
    new_room_id,
    ARRAY[user_id::text, bot_id::text],
    target_book_id,
    true
  )
  ON CONFLICT (id) DO UPDATE
  SET is_active = true, book_id = target_book_id;

  RETURN jsonb_build_object(
    'status', 'matched',
    'roomId', new_room_id,
    'partnerName', bot_name,
    'bookId', target_book_id
  );
END;
$$;
