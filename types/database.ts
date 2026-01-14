export type BookCategory = 'emotion' | 'growth' | 'romance' | 'philosophy' | 'fantasy';

export interface User {
    id: string;
    email: string;
    nickname?: string;
    avatar_url?: string;
    created_at: string;
    // V2 추가 필드
    age_range?: string; // '20s_early', '20s_late', '30s_early', ...
    region?: string;    // 'seoul', 'gyeonggi', ...
    reading_frequency?: string; // 'weekly', 'monthly', ...
    underlines_balance?: number;
}

export interface ReadingProfile {
    id: string;
    user_id: string;
    favorite_books: {
        title: string;
        author: string;
        reason?: string;
    }[];
    preferred_genres: string[];
    created_at: string;
}

export interface Underline {
    id: string;
    user_id: string;
    book_id: string;
    content: string;
    month_year: string;
    created_at: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    cover_url: string;
    category: BookCategory;
    is_active: boolean; // 이달의 책 여부
}

export interface Message {
    id: string;
    room_id: string;
    sender_id: string;
    content: string;
    created_at: string;
    is_read: boolean;
}

export interface ChatRoom {
    id: string;
    users: string[]; // [user_id_1, user_id_2]
    last_message?: string;
    updated_at: string;
    book_id?: string; // 어떤 책으로 매칭되었는지
}
