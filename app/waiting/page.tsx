import { createClient } from '@/lib/supabase/server';
import { getBookById } from '@/lib/data';
import { getCategoryEmoji } from '@/lib/books';
import WaitingAnimation from '@/components/waiting/WaitingAnimation';
import { redirect } from 'next/navigation';

export default async function WaitingPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // 사용자의 가장 최근 밑줄(선택한 책) 가져오기
    const { data: underline } = await supabase
        .from('underlines')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!underline) {
        redirect('/select'); // 선택한 책이 없으면 선택 페이지로
    }

    const book = getBookById(underline.book_id);
    const bookTitle = book ? book.title : '선택한 책';
    const categoryEmoji = book ? getCategoryEmoji(book.category) : '📖';

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-[#fefcfa] to-secondary-100 flex items-center justify-center">
            <WaitingAnimation bookTitle={bookTitle} categoryEmoji={categoryEmoji} />
        </main>
    );
}
