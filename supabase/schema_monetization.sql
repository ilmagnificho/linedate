-- ==============================================================================
-- Linedate V2 Schema Update (Part 3: Monetization)
-- 채팅방 프로필 해금 기능 지원
-- ==============================================================================

-- 1. chat_rooms 테이블에 '누가 해금했는지' 저장하는 컬럼 추가
ALTER TABLE public.chat_rooms 
ADD COLUMN IF NOT EXISTS unlocked_by TEXT[] DEFAULT '{}';

-- 2. 이미 존재하는 테이블과 컬럼 확인 후 실행되므로 안전합니다.
