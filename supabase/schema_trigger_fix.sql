-- ==============================================================================
-- Linedate User Sync Fix
-- 회원가입 시 public.users 테이블에 자동으로 유저가 생성되게 하고,
-- 이미 가입된 유저도 동기화합니다.
-- ==============================================================================

-- 1. 신규 유저 자동 생성 함수
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, nickname, gender)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'nickname', split_part(new.email, '@', 1)), -- 닉네임 없으면 이메일 앞부분 사용
    COALESCE(new.raw_user_meta_data->>'gender', 'male') -- 기본값 설정 (추후 수정 가능)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. 트리거 생성 (이미 있으면 삭제 후 재생성)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. 기존 유저 동기화 (이미 가입했지만 public.users에 없는 유저 복구)
INSERT INTO public.users (id, email, nickname, gender)
SELECT 
  id, 
  email, 
  COALESCE(raw_user_meta_data->>'nickname', split_part(email, '@', 1)),
  COALESCE(raw_user_meta_data->>'gender', 'male')
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.users)
ON CONFLICT (id) DO NOTHING;

-- 확인 메시지
SELECT count(*) as "synced_users_count" FROM public.users;
