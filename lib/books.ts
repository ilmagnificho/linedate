// 이달의 책 목록 (12권 - 카테고리별 3권)

import { BookCategory } from '@/types/database';

export interface SeedBook {
    id: string;
    title: string;
    author: string;
    description: string;
    genre: string;
    category: BookCategory;
    cover_url: string;
    question: string; // 밑줄 남기기 질문 (e.g. "이 책의 어떤 부분이 기대되나요?")
}

// 카테고리 데이터 상수
export const BOOK_CATEGORIES: Record<BookCategory, { label: string; emoji: string }> = {
    emotion: { label: '감정/공감', emoji: '💬' },
    growth: { label: '성장/자아', emoji: '🌱' },
    romance: { label: '사랑/관계', emoji: '💕' },
    philosophy: { label: '인문/철학', emoji: '🤔' },
    fantasy: { label: '상상/판타지', emoji: '🦄' },
};

// 카테고리 라벨 반환
export function getCategoryLabel(category: BookCategory): string {
    return BOOK_CATEGORIES[category]?.label || category;
}

// 카테고리 이모지 반환
export function getCategoryEmoji(category: BookCategory): string {
    return BOOK_CATEGORIES[category]?.emoji || '📖';
}

export const THIS_MONTH_BOOKS: SeedBook[] = [
    // ========== 감정/공감 (emotion) ==========
    {
        id: 'book-emotion-1',
        title: '아몬드',
        author: '손원평',
        description: '감정을 느끼지 못하는 소년이 세상과 소통하는 법을 배우는 이야기',
        genre: '소설',
        category: 'emotion',
        cover_url: '/books/almond.jpg',
        question: '감정을 느낀다는 건 당신에게 어떤 의미인가요?',
    },
    {
        id: 'book-emotion-2',
        title: '불편한 편의점',
        author: '김호연',
        description: '평범한 편의점에서 펼쳐지는 따뜻한 사람들의 이야기',
        genre: '소설',
        category: 'emotion',
        cover_url: '/books/convenience.jpg',
        question: '당신에게 위로가 되었던 장소나 사람이 있나요?',
    },
    {
        id: 'book-emotion-3',
        title: '언어의 온도',
        author: '이기주',
        description: '말과 글이 가진 온기에 대한 섬세한 에세이',
        genre: '에세이',
        category: 'emotion',
        cover_url: '/books/temperature.jpg',
        question: '당신의 언어 온도는 몇 도 쯤 되나요?',
    },

    // ========== 성장/자아 (growth) ==========
    {
        id: 'book-growth-1',
        title: '데미안',
        author: '헤르만 헤세',
        description: '자아를 찾아가는 청춘의 내면 여행',
        genre: '고전',
        category: 'growth',
        cover_url: '/books/demian.jpg',
        question: '알을 깨고 나오기 위해 어떤 노력을 해보셨나요?',
    },
    {
        id: 'book-growth-2',
        title: '미움받을 용기',
        author: '기시미 이치로',
        description: '자유롭고 행복한 삶을 위한 아들러 심리학',
        genre: '인문',
        category: 'growth',
        cover_url: '/books/courage.jpg',
        question: '남들의 시선에서 자유로워졌던 순간이 있나요?',
    },
    {
        id: 'book-growth-3',
        title: '물고기는 존재하지 않는다',
        author: '룰루 밀러',
        description: '상실과 혼돈 속에서 찾아낸 삶의 질서',
        genre: '에세이',
        category: 'growth',
        cover_url: '/books/fish.jpg',
        question: '믿었던 진실이 무너졌을 때 어떻게 극복하셨나요?',
    },

    // ========== 사랑/관계 (romance) ==========
    {
        id: 'book-romance-1',
        title: '어린 왕자',
        author: '생텍쥐페리',
        description: '사랑과 관계의 본질을 담은 영원한 동화',
        genre: '고전',
        category: 'romance',
        cover_url: '/books/littleprince.jpg',
        question: '당신의 장미꽃(소중한 존재)은 무엇인가요?',
    },
    {
        id: 'book-romance-2',
        title: '사랑의 기술',
        author: '에리히 프롬',
        description: '사랑은 감정이 아닌 의지와 기술이라는 통찰',
        genre: '인문',
        category: 'romance',
        cover_url: '/books/artoflove.jpg',
        question: '사랑에도 기술이 필요하다는 말에 동의하시나요?',
    },
    {
        id: 'book-romance-3',
        title: '참을 수 없는 존재의 가벼움',
        author: '밀란 쿤데라',
        description: '사랑과 삶의 무게에 대한 철학적 질문',
        genre: '소설',
        category: 'romance',
        cover_url: '/books/unbearable.jpg',
        question: '가벼운 삶과 무거운 삶 중 어떤 것을 선호하시나요?',
    },

    // ========== 상상/판타지 (fantasy) ==========
    {
        id: 'book-fantasy-1',
        title: '미드나잇 라이브러리',
        author: '매트 헤이그',
        description: '선택하지 않은 삶들을 경험하는 마법의 도서관',
        genre: '소설',
        category: 'fantasy',
        cover_url: '/books/midnight.jpg',
        question: '가보고 싶은 "가지 않은 길"이 있다면 어디인가요?',
    },
    {
        id: 'book-fantasy-2',
        title: '달러구트 꿈 백화점',
        author: '이미예',
        description: '잠들면 찾아오는 신비로운 꿈 가게 이야기',
        genre: '판타지',
        category: 'fantasy',
        cover_url: '/books/dallogut.jpg',
        question: '사고 싶은 꿈이 있다면 어떤 꿈인가요?',
    },
    {
        id: 'book-fantasy-3',
        title: '지구 끝의 온실',
        author: '김초엽',
        description: '멸망한 세상에서 피어난 식물과 사람 이야기',
        genre: 'SF',
        category: 'fantasy',
        cover_url: '/books/greenhouse.jpg',
        question: '폐허 속에서도 지키고 싶은 가치는 무엇인가요?',
    },
];

export const CURATED_BOOKS = THIS_MONTH_BOOKS;
