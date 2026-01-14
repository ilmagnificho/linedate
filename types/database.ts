// Database Types for DeckDrop

export interface User {
    id: string;
    email: string;
    nickname: string;
    gender: 'male' | 'female';
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    cover_url: string | null;
    description: string | null;
    genre: string | null;
    category: BookCategory;
    is_active: boolean;
    month_year: string;
    created_at: string;
}

export type BookCategory =
    | 'emotion'      // 감정/공감
    | 'growth'       // 성장/자아
    | 'romance'      // 사랑/관계
    | 'philosophy'   // 철학/인문
    | 'fantasy';     // 판타지/상상

export interface UserSelection {
    id: string;
    user_id: string;
    book_id: string;
    month_year: string;
    created_at: string;
}

export interface Match {
    id: string;
    user1_id: string;
    user2_id: string;
    book_id: string;
    status: 'active' | 'ended';
    message_count: number;
    created_at: string;
}

export interface Message {
    id: string;
    match_id: string;
    sender_id: string;
    content: string;
    created_at: string;
}

// Extended types for UI
export interface BookWithSelection extends Book {
    isSelected?: boolean;
}

export interface MatchWithDetails extends Match {
    partner: User;
    book: Book;
}

export interface MessageWithSender extends Message {
    sender: User;
    isOwn: boolean;
}

// 도서 카테고리 정보
export const BOOK_CATEGORIES: Record<BookCategory, { label: string; emoji: string; description: string }> = {
    emotion: {
        label: '감정/공감',
        emoji: '💭',
        description: '마음을 어루만지는 책'
    },
    growth: {
        label: '성장/자아',
        emoji: '🌱',
        description: '나를 발견하는 책'
    },
    romance: {
        label: '사랑/관계',
        emoji: '💕',
        description: '관계를 생각하는 책'
    },
    philosophy: {
        label: '철학/인문',
        emoji: '📜',
        description: '깊이 생각하는 책'
    },
    fantasy: {
        label: '판타지/상상',
        emoji: '✨',
        description: '상상력을 자극하는 책'
    }
};
