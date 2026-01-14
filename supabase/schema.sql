-- =============================================
-- DeckDrop MVP Database Schema
-- Supabase SQL Editor에서 실행하세요
-- =============================================

-- 1. Users 테이블
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  nickname TEXT UNIQUE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Books 테이블 (이달의 책)
CREATE TABLE books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  cover_url TEXT,
  description TEXT,
  genre TEXT,
  category TEXT CHECK (category IN ('emotion', 'growth', 'romance', 'philosophy', 'fantasy')),
  is_active BOOLEAN DEFAULT FALSE,
  month_year TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Selections 테이블 (유저 책 선택)
CREATE TABLE user_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  month_year TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month_year)
);

-- 4. Matches 테이블 (매칭)
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  book_id UUID REFERENCES books(id),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'ended')),
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CHECK (user1_id < user2_id)
);

-- 5. Messages 테이블 (채팅)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Indexes for Performance
-- =============================================
CREATE INDEX idx_user_selections_user ON user_selections(user_id);
CREATE INDEX idx_user_selections_book ON user_selections(book_id);
CREATE INDEX idx_user_selections_month ON user_selections(month_year);
CREATE INDEX idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX idx_messages_match ON messages(match_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_books_active ON books(is_active);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users Policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view matched users"
  ON users FOR SELECT
  USING (
    id IN (
      SELECT user1_id FROM matches WHERE user2_id = auth.uid()
      UNION
      SELECT user2_id FROM matches WHERE user1_id = auth.uid()
    )
  );

-- Books Policies (공개)
CREATE POLICY "Anyone can view active books"
  ON books FOR SELECT
  USING (is_active = TRUE);

-- User Selections Policies
CREATE POLICY "Users can view own selections"
  ON user_selections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own selection"
  ON user_selections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Matches Policies
CREATE POLICY "Users can view own matches"
  ON matches FOR SELECT
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Messages Policies
CREATE POLICY "Users can view messages in their matches"
  ON messages FOR SELECT
  USING (
    match_id IN (
      SELECT id FROM matches
      WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );

CREATE POLICY "Users can send messages in their matches"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    match_id IN (
      SELECT id FROM matches
      WHERE user1_id = auth.uid() OR user2_id = auth.uid()
    )
  );

-- =============================================
-- 초기 데이터 시드 (이달의 책 4권 + 전체 20권)
-- =============================================

-- 이달의 책 (활성화)
INSERT INTO books (title, author, cover_url, description, genre, category, is_active, month_year) VALUES
('아몬드', '손원평', '/books/almond.jpg', '감정을 느끼지 못하는 소년이 세상과 소통하는 법을 배우는 이야기', '소설', 'emotion', TRUE, '2026-01'),
('데미안', '헤르만 헤세', '/books/demian.jpg', '자아를 찾아가는 청춘의 내면 여행', '고전', 'growth', TRUE, '2026-01'),
('어린 왕자', '생텍쥐페리', '/books/littleprince.jpg', '사랑과 관계의 본질을 담은 영원한 동화', '고전', 'romance', TRUE, '2026-01'),
('미드나잇 라이브러리', '매트 헤이그', '/books/midnight.jpg', '선택하지 않은 삶들을 경험하는 마법의 도서관', '소설', 'fantasy', TRUE, '2026-01');

-- 나머지 책 (비활성화, 다음 달용)
INSERT INTO books (title, author, description, genre, category, is_active, month_year) VALUES
('죽고 싶지만 떡볶이는 먹고 싶어', '백세희', '가벼운 우울감과 함께 살아가는 솔직한 일상 에세이', '에세이', 'emotion', FALSE, NULL),
('불편한 편의점', '김호연', '평범한 편의점에서 펼쳐지는 따뜻한 사람들의 이야기', '소설', 'emotion', FALSE, NULL),
('언어의 온도', '이기주', '말과 글이 가진 온기에 대한 섬세한 에세이', '에세이', 'emotion', FALSE, NULL),
('나는 나로 살기로 했다', '김수현', '타인의 시선에서 벗어나 나답게 사는 법', '에세이', 'growth', FALSE, NULL),
('숨결이 바람 될 때', '폴 칼라니티', '삶과 죽음 사이에서 의미를 찾는 의사의 기록', '논픽션', 'growth', FALSE, NULL),
('어른의 어휘력', '유선경', '말의 힘으로 성장하는 어른이 되는 법', '자기계발', 'growth', FALSE, NULL),
('당신이 옳다', '정혜신', '상처받은 마음을 치유하는 관계의 대화법', '심리', 'romance', FALSE, NULL),
('사랑의 기술', '에리히 프롬', '사랑은 감정이 아닌 의지와 기술이라는 통찰', '인문', 'romance', FALSE, NULL),
('연을 쫓는 아이', '칼레드 호세이니', '우정과 속죄, 그리고 사랑에 대한 감동적인 이야기', '소설', 'romance', FALSE, NULL),
('사피엔스', '유발 하라리', '인류의 과거와 미래를 조망하는 빅히스토리', '인문', 'philosophy', FALSE, NULL),
('멋진 신세계', '올더스 헉슬리', '행복이 통제되는 디스토피아를 그린 고전', '소설', 'philosophy', FALSE, NULL),
('1984', '조지 오웰', '감시와 통제 사회에 대한 예언적 소설', '소설', 'philosophy', FALSE, NULL),
('생각에 관한 생각', '대니얼 카너먼', '인간의 사고방식을 파헤친 심리학 고전', '심리', 'philosophy', FALSE, NULL),
('달러구트 꿈 백화점', '이미예', '잠들면 찾아오는 신비로운 꿈 가게 이야기', '판타지', 'fantasy', FALSE, NULL),
('해리포터와 마법사의 돌', 'J.K. 롤링', '마법 세계로 떠나는 세대를 초월한 모험', '판타지', 'fantasy', FALSE, NULL),
('모모', '미하엘 엔데', '시간 도둑과 맞서 싸우는 소녀의 이야기', '판타지', 'fantasy', FALSE, NULL);

-- =============================================
-- Realtime 활성화
-- Supabase Dashboard → Database → Replication에서 
-- messages 테이블에 대해 Realtime 활성화
-- =============================================
