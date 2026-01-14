-- ==============================================================================
-- Linedate Final Schema Check V2
-- 이미 존재하는 정책 에러를 방지하고, 모든 테이블이 생성되도록 보장합니다.
-- ==============================================================================

-- 1. Reading Profiles (독서 취향)
CREATE TABLE IF NOT EXISTS public.reading_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  preferred_genres TEXT[],
  favorite_books JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reading_profiles ENABLE ROW LEVEL SECURITY;
-- 기존 정책 삭제 후 재생성 (에러 방지)
DROP POLICY IF EXISTS "Users can view own reading profile" ON public.reading_profiles;
CREATE POLICY "Users can view own reading profile" ON public.reading_profiles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reading profile" ON public.reading_profiles;
CREATE POLICY "Users can update own reading profile" ON public.reading_profiles FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reading profile" ON public.reading_profiles;
CREATE POLICY "Users can insert own reading profile" ON public.reading_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 2. Underlines (밑줄/코멘트)
CREATE TABLE IF NOT EXISTS public.underlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  book_id TEXT NOT NULL,
  content TEXT NOT NULL,
  month_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.underlines ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own underlines" ON public.underlines;
CREATE POLICY "Users can view own underlines" ON public.underlines FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view all underlines" ON public.underlines;
CREATE POLICY "Users can view all underlines" ON public.underlines FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert own underlines" ON public.underlines;
CREATE POLICY "Users can insert own underlines" ON public.underlines FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 3. Underline Transactions (거래 내역)
CREATE TABLE IF NOT EXISTS public.underline_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, 
  type TEXT NOT NULL, 
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.underline_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own transactions" ON public.underline_transactions;
CREATE POLICY "Users can view own transactions" ON public.underline_transactions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own transactions" ON public.underline_transactions;
CREATE POLICY "Users can insert own transactions" ON public.underline_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Users 테이블 컬럼 추가
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'underlines_balance') THEN
        ALTER TABLE public.users ADD COLUMN underlines_balance INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'age_range') THEN
        ALTER TABLE public.users ADD COLUMN age_range TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'region') THEN
        ALTER TABLE public.users ADD COLUMN region TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'reading_frequency') THEN
        ALTER TABLE public.users ADD COLUMN reading_frequency TEXT;
    END IF;
END $$;
