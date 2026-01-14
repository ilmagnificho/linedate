-- ==============================================================================
-- Linedate V2 Schema Update
-- 
-- 이 SQL을 Supabase SQL Editor에서 실행해주세요.
-- ==============================================================================

-- 1. Users 테이블 확장 (기존 테이블에 컬럼 추가)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS age_range TEXT,
ADD COLUMN IF NOT EXISTS region TEXT,
ADD COLUMN IF NOT EXISTS reading_frequency TEXT,
ADD COLUMN IF NOT EXISTS underlines_balance INTEGER DEFAULT 5;

-- 2. Reading Profiles 테이블 (독서 취향)
CREATE TABLE IF NOT EXISTS public.reading_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) NOT NULL UNIQUE,
  favorite_books JSONB, -- [{title: "책제목", author: "저자", reason: "이유"}]
  preferred_genres TEXT[], -- ["소설", "에세이"]
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Underlines 테이블 (책 선택 시 남기는 코멘트 - 매칭의 핵심)
CREATE TABLE IF NOT EXISTS public.underlines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  book_id TEXT NOT NULL, -- 책 ID (seed data의 ID)
  content TEXT NOT NULL, -- "이 책을 펴면..." (최대 200자)
  month_year TEXT NOT NULL, -- "2026-01"
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Underline Transactions 테이블 (가상 화폐 거래 내역)
CREATE TABLE IF NOT EXISTS public.underline_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) NOT NULL,
  amount INTEGER NOT NULL, -- 획득(+), 사용(-)
  type TEXT NOT NULL, -- 'purchase', 'spend', 'bonus', 'signup_bonus'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS 정책 설정 (보안)

-- Reading Profiles
ALTER TABLE public.reading_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reading profile" ON public.reading_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading profile" ON public.reading_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reading profile" ON public.reading_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Underlines
ALTER TABLE public.underlines ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own underlines" ON public.underlines
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own underlines" ON public.underlines
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Underline Transactions
ALTER TABLE public.underline_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own transactions" ON public.underline_transactions
  FOR SELECT USING (auth.uid() = user_id);
