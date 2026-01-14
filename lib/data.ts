import { createClient } from '@/lib/supabase/client';

export async function getLatestUnderline(userId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from('underlines')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (error) return null;
    return data;
}

// 이달의 책 ID로 책 정보 찾기 (lib/books.ts 의 데이터를 사용)
// DB에는 book_id 만 저장되므로, 이를 이용해 로컬 상수 데이터 매핑
import { THIS_MONTH_BOOKS } from './books';

export function getBookById(bookId: string) {
    return THIS_MONTH_BOOKS.find(b => b.id === bookId) || null;
}
