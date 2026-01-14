'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import BookCard from '@/components/books/BookCard';
import { Book, BOOK_CATEGORIES, BookCategory } from '@/types/database';
import { CURATED_BOOKS, THIS_MONTH_BOOKS, SeedBook } from '@/lib/books';

// Mock data - 실제로는 Supabase에서 가져옴
const getMockBooks = (): Book[] => {
    return CURATED_BOOKS
        .filter(book => THIS_MONTH_BOOKS.includes(book.title))
        .map((book, index) => ({
            id: `book-${index + 1}`,
            title: book.title,
            author: book.author,
            cover_url: book.cover_url,
            description: book.description,
            genre: book.genre,
            category: book.category,
            is_active: true,
            month_year: '2026-01',
            created_at: new Date().toISOString(),
        }));
};

export default function SelectPage() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Mock 데이터 로드 (실제로는 Supabase 쿼리)
        const loadBooks = async () => {
            setIsLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setBooks(getMockBooks());
            setIsLoading(false);
        };
        loadBooks();
    }, []);

    const handleSelect = (bookId: string) => {
        setSelectedBookId(bookId);
    };

    const handleSubmit = async () => {
        if (!selectedBookId) return;

        setIsSubmitting(true);

        // TODO: Supabase에 선택 저장
        // const { error } = await supabase.from('user_selections').insert({
        //   user_id: userId,
        //   book_id: selectedBookId,
        //   month_year: '2026-01'
        // });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 매칭 대기 화면으로 이동
        router.push('/waiting');
    };

    const selectedBook = books.find(b => b.id === selectedBookId);

    return (
        <main className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-secondary-300">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        <span className="font-serif text-xl font-bold text-primary-900">DeckDrop</span>
                    </div>
                    <div className="text-sm text-primary-500">
                        2026년 1월의 책
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-accent-warm/20 text-accent-warm rounded-full text-sm font-medium mb-4">
                        이달의 책 선택
                    </span>
                    <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                        어떤 책으로 인연을 시작할까요?
                    </h1>
                    <p className="text-primary-600 max-w-lg mx-auto">
                        4권 중 1권을 선택하면, 같은 책을 선택한 사람과 매칭됩니다.<br />
                        <span className="text-accent-coral font-medium">선택은 한 달에 한 번, 변경할 수 없어요.</span>
                    </p>
                </div>

                {/* Loading State */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-2xl p-5 shadow-book animate-pulse">
                                <div className="aspect-[3/4] rounded-xl bg-secondary-200 mb-4" />
                                <div className="h-5 bg-secondary-200 rounded mb-2" />
                                <div className="h-4 bg-secondary-200 rounded w-2/3" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Books Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            {books.map((book) => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    isSelected={selectedBookId === book.id}
                                    onSelect={handleSelect}
                                />
                            ))}
                        </div>

                        {/* Selection Confirmation */}
                        <div className={`
              fixed bottom-0 left-0 right-0 
              bg-white border-t border-secondary-300 
              shadow-lg
              transition-transform duration-300
              ${selectedBookId ? 'translate-y-0' : 'translate-y-full'}
            `}>
                            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {selectedBook && (
                                        <>
                                            <span className="text-2xl">
                                                {BOOK_CATEGORIES[selectedBook.category as BookCategory]?.emoji}
                                            </span>
                                            <div>
                                                <p className="text-sm text-primary-500">선택한 책</p>
                                                <p className="font-serif font-semibold text-primary-900">
                                                    {selectedBook.title}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedBookId || isSubmitting}
                                    className={`
                    px-8 py-3 rounded-full font-medium
                    transition-all duration-300
                    ${selectedBookId
                                            ? 'bg-primary-900 text-white hover:bg-primary-800 shadow-lg'
                                            : 'bg-secondary-300 text-primary-400 cursor-not-allowed'
                                        }
                  `}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                            </svg>
                                            매칭 중...
                                        </span>
                                    ) : (
                                        '이 책으로 시작하기'
                                    )}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
