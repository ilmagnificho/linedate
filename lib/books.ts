// 이달의 책 목록 (15-20권, 카테고리별 분류)
// 운영진이 매달 이 중에서 4권을 선택하여 is_active = true로 설정

import { BookCategory } from '@/types/database';

export interface SeedBook {
    id: string;
    title: string;
    author: string;
    description: string;
    genre: string;
    category: BookCategory;
    cover_url: string;
}

// 카테고리 라벨 반환
export function getCategoryLabel(category: BookCategory): string {
    const labels: Record<BookCategory, string> = {
        emotion: '감정/공감',
        growth: '성장/자아',
        romance: '사랑/관계',
        philosophy: '철학/인문',
        fantasy: '판타지/상상',
    };
    return labels[category] || category;
}

// 카테고리 이모지 반환
export function getCategoryEmoji(category: BookCategory): string {
    const emojis: Record<BookCategory, string> = {
        emotion: '💭',
        growth: '🌱',
        romance: '💕',
        philosophy: '📜',
        fantasy: '✨',
    };
    return emojis[category] || '📖';
}

export const CURATED_BOOKS: SeedBook[] = [
    // ========== 감정/공감 (emotion) ==========
    {
        id: 'book-1',
        title: '아몬드',
        author: '손원평',
        description: '감정을 느끼지 못하는 소년이 세상과 소통하는 법을 배우는 이야기',
        genre: '소설',
        category: 'emotion',
        cover_url: '/books/almond.jpg',
    },
    {
        id: 'book-2',
        title: '죽고 싶지만 떡볶이는 먹고 싶어',
        author: '백세희',
        description: '가벼운 우울감과 함께 살아가는 솔직한 일상 에세이',
        genre: '에세이',
        category: 'emotion',
        cover_url: '/books/tteokbokki.jpg',
    },
    {
        id: 'book-3',
        title: '불편한 편의점',
        author: '김호연',
        description: '평범한 편의점에서 펼쳐지는 따뜻한 사람들의 이야기',
        genre: '소설',
        category: 'emotion',
        cover_url: '/books/convenience.jpg',
    },
    {
        id: 'book-4',
        title: '언어의 온도',
        author: '이기주',
        description: '말과 글이 가진 온기에 대한 섬세한 에세이',
        genre: '에세이',
        category: 'emotion',
        cover_url: '/books/temperature.jpg',
    },

    // ========== 성장/자아 (growth) ==========
    {
        id: 'book-5',
        title: '나는 나로 살기로 했다',
        author: '김수현',
        description: '타인의 시선에서 벗어나 나답게 사는 법',
        genre: '에세이',
        category: 'growth',
        cover_url: '/books/myself.jpg',
    },
    {
        id: 'book-6',
        title: '데미안',
        author: '헤르만 헤세',
        description: '자아를 찾아가는 청춘의 내면 여행',
        genre: '고전',
        category: 'growth',
        cover_url: '/books/demian.jpg',
    },
    {
        id: 'book-7',
        title: '숨결이 바람 될 때',
        author: '폴 칼라니티',
        description: '삶과 죽음 사이에서 의미를 찾는 의사의 기록',
        genre: '논픽션',
        category: 'growth',
        cover_url: '/books/breath.jpg',
    },
    {
        id: 'book-8',
        title: '어른의 어휘력',
        author: '유선경',
        description: '말의 힘으로 성장하는 어른이 되는 법',
        genre: '자기계발',
        category: 'growth',
        cover_url: '/books/vocabulary.jpg',
    },

    // ========== 사랑/관계 (romance) ==========
    {
        id: 'book-9',
        title: '어린 왕자',
        author: '생텍쥐페리',
        description: '사랑과 관계의 본질을 담은 영원한 동화',
        genre: '고전',
        category: 'romance',
        cover_url: '/books/littleprince.jpg',
    },
    {
        id: 'book-10',
        title: '당신이 옳다',
        author: '정혜신',
        description: '상처받은 마음을 치유하는 관계의 대화법',
        genre: '심리',
        category: 'romance',
        cover_url: '/books/youareright.jpg',
    },
    {
        id: 'book-11',
        title: '사랑의 기술',
        author: '에리히 프롬',
        description: '사랑은 감정이 아닌 의지와 기술이라는 통찰',
        genre: '인문',
        category: 'romance',
        cover_url: '/books/artoflove.jpg',
    },
    {
        id: 'book-12',
        title: '연을 쫓는 아이',
        author: '칼레드 호세이니',
        description: '우정과 속죄, 그리고 사랑에 대한 감동적인 이야기',
        genre: '소설',
        category: 'romance',
        cover_url: '/books/kiterunner.jpg',
    },

    // ========== 철학/인문 (philosophy) ==========
    {
        id: 'book-13',
        title: '사피엔스',
        author: '유발 하라리',
        description: '인류의 과거와 미래를 조망하는 빅히스토리',
        genre: '인문',
        category: 'philosophy',
        cover_url: '/books/sapiens.jpg',
    },
    {
        id: 'book-14',
        title: '멋진 신세계',
        author: '올더스 헉슬리',
        description: '행복이 통제되는 디스토피아를 그린 고전',
        genre: '소설',
        category: 'philosophy',
        cover_url: '/books/bravenewworld.jpg',
    },
    {
        id: 'book-15',
        title: '1984',
        author: '조지 오웰',
        description: '감시와 통제 사회에 대한 예언적 소설',
        genre: '소설',
        category: 'philosophy',
        cover_url: '/books/1984.jpg',
    },
    {
        id: 'book-16',
        title: '생각에 관한 생각',
        author: '대니얼 카너먼',
        description: '인간의 사고방식을 파헤친 심리학 고전',
        genre: '심리',
        category: 'philosophy',
        cover_url: '/books/thinking.jpg',
    },

    // ========== 판타지/상상 (fantasy) ==========
    {
        id: 'book-17',
        title: '달러구트 꿈 백화점',
        author: '이미예',
        description: '잠들면 찾아오는 신비로운 꿈 가게 이야기',
        genre: '판타지',
        category: 'fantasy',
        cover_url: '/books/dallogut.jpg',
    },
    {
        id: 'book-18',
        title: '미드나잇 라이브러리',
        author: '매트 헤이그',
        description: '선택하지 않은 삶들을 경험하는 마법의 도서관',
        genre: '소설',
        category: 'fantasy',
        cover_url: '/books/midnight.jpg',
    },
    {
        id: 'book-19',
        title: '해리포터와 마법사의 돌',
        author: 'J.K. 롤링',
        description: '마법 세계로 떠나는 세대를 초월한 모험',
        genre: '판타지',
        category: 'fantasy',
        cover_url: '/books/harrypotter.jpg',
    },
    {
        id: 'book-20',
        title: '모모',
        author: '미하엘 엔데',
        description: '시간 도둑과 맞서 싸우는 소녀의 이야기',
        genre: '판타지',
        category: 'fantasy',
        cover_url: '/books/momo.jpg',
    },
];

// 이달의 책 4권 (MVP용 기본 선택 - 실제 SeedBook 객체)
export const THIS_MONTH_BOOKS: SeedBook[] = [
    CURATED_BOOKS[0],   // 아몬드 (emotion)
    CURATED_BOOKS[5],   // 데미안 (growth)
    CURATED_BOOKS[8],   // 어린 왕자 (romance)
    CURATED_BOOKS[17],  // 미드나잇 라이브러리 (fantasy)
];
