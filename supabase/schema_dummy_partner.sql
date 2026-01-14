-- ==============================================================================
-- Linedate Dummy Partner Generator
-- 매칭 테스트를 위해 가상의 상대방 데이터를 생성합니다.
-- ==============================================================================

-- 1. 더미 유저 생성 (public.users에 직접 삽입)
-- Auth 테이블에는 없으므로 로그인은 불가능하지만, 매칭 상대로는 동작합니다.
INSERT INTO public.users (id, email, nickname, gender, age_range, region, reading_frequency)
VALUES (
  '00000000-0000-0000-0000-000000000001', -- Dummy UUID
  'partner@test.com',
  '책읽는고양이',
  'female',
  '20s',
  'Seoul',
  'daily'
)
ON CONFLICT (id) DO NOTHING;

-- 2. 더미 유저의 프로필 생성 (선택 사항)
INSERT INTO public.reading_profiles (user_id, preferred_genres, favorite_books)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  ARRAY['소설', '에세이'],
  '[{"title": "불편한 편의점", "author": "김호연"}]'::jsonb
)
ON CONFLICT (user_id) DO NOTHING;

-- 3. 더미 유저의 밑줄 생성 (불편한 편의점)
-- 사용자와 같은 책을 선택해야 매칭됩니다.
INSERT INTO public.underlines (user_id, book_id, content, month_year)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'book-emotion-2', -- 불편한 편의점 ID
  '참참참이라는 단어가 주는 따뜻함이 너무 좋았어요. 우리 주변에도 이런 편의점이 있었으면 좋겠네요.',
  TO_CHAR(NOW(), 'YYYY-MM')
);

-- 완료 메시지
SELECT 'Dummy partner created!' as result;
