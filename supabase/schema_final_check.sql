-- ==============================================================================
-- Linedate Final Schema Check
-- 모든 필요한 테이블이 존재하는지 확인하고 없으면 생성합니다.
-- ==============================================================================

-- 1. Reading Profiles (독서 취향)
CREATE TABLE IF NOT EXISTS public.reading_profiles (
  user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  preferred_genres TEXT[],
  favorite_books JSONB, -- [{title, author}, ...]
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.reading_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own reading profile" ON public.reading_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own reading profile" ON public.reading_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reading profile" ON public.reading_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 2. Underlines (밑줄/코멘트)
CREATE TABLE IF NOT EXISTS public.underlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  book_id TEXT NOT NULL,
  content TEXT NOT NULL,
  month_year TEXT NOT NULL, -- '2026-01'
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.underlines ENABLE ROW LEVEL SECURITY;
-- 내 밑줄 보기
CREATE POLICY "Users can view own underlines" ON public.underlines FOR SELECT USING (auth.uid() = user_id);
-- 매칭된 상대의 밑줄 보기 (복잡하므로 일단 chat_rooms 로직으로 커버하거나, 간단히 모두 공개 후 앱단에서 필터링 - 보안상으론 RLS가 좋음)
-- MVP: 일단 누구나 볼 수 있게 하거나(Select), 앱 로직에 맡김. 여기선 본인 것만 허용하고 챗룸은 별도.
-- 하지만 Waiting page에서 내것 봐야하고, ChatRoom에서 남의것 봐야함.
-- "Users can view all underlines" 로 풀고 앱에서 거르는게 MVP엔 빠름.
CREATE POLICY "Users can view all underlines" ON public.underlines FOR SELECT USING (true);
CREATE POLICY "Users can insert own underlines" ON public.underlines FOR INSERT WITH CHECK (auth.uid() = user_id);


-- 3. Underline Transactions (거래 내역)
CREATE TABLE IF NOT EXISTS public.underline_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- 양수(충전), 음수(사용)
  type TEXT NOT NULL, -- 'charge', 'use'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.underline_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own transactions" ON public.underline_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON public.underline_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Users 테이블에 컬럼 추가 확인
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
