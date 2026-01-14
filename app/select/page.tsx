'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { THIS_MONTH_BOOKS, getCategoryLabel, getCategoryEmoji } from '@/lib/books';

export default function SelectPage() {
    const router = useRouter();
    const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 로딩 시뮬레이션
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleConfirm = () => {
        if (selectedBookId) {
            router.push('/waiting');
        }
    };

    const getCurrentMonth = () => {
        const now = new Date();
        return `${now.getFullYear()}년 ${now.getMonth() + 1}월의 책`;
    };

    return (
        <main className="min-h-screen bg-[#fefcfa]">
            {/* 헤더 */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-secondary-200">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl">📖</span>
                        <span className="font-serif font-semibold text-foreground">Linedate</span>
                    </Link>
                    <span className="text-sm text-foreground/50">{getCurrentMonth()}</span>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* 타이틀 */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                        어떤 책으로 인연을 시작할까요?
                    </h1>
                    <p className="text-foreground/60 max-w-lg mx-auto">
                        이번 달 4권의 책 중 하나를 선택하세요.
                        <br />
                        같은 책을 선택한 분과 1:1로 매칭됩니다.
                    </p>
                </div>

                {/* 책 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                    {isLoading
                        ? Array(4)
                            .fill(null)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="h-48 bg-secondary-100 rounded-2xl animate-pulse"
                                />
                            ))
                        : THIS_MONTH_BOOKS.map((book) => {
                            const isSelected = selectedBookId === book.id;
                            return (
                                <button
                                    key={book.id}
                                    onClick={() => setSelectedBookId(book.id)}
                                    className={`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover-lift ${isSelected
                                            ? 'border-primary-500 bg-primary-50 shadow-book'
                                            : 'border-secondary-200 bg-white hover:border-primary-200'
                                        }`}
                                >
                                    {/* 선택 체크 */}
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* 카테고리 배지 */}
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-100 rounded-full text-xs font-medium text-foreground/70 mb-4">
                                        <span>{getCategoryEmoji(book.category)}</span>
                                        <span>{getCategoryLabel(book.category)}</span>
                                    </div>

                                    {/* 책 정보 */}
                                    <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-foreground/50 mb-3">
                                        {book.author}
                                    </p>
                                    <p className="text-sm text-foreground/60 leading-relaxed line-clamp-2">
                                        {book.description}
                                    </p>

                                    {/* 호버 안내 */}
                                    <div className={`mt-4 text-xs font-medium ${isSelected ? 'text-primary-600' : 'text-foreground/40'}`}>
                                        {isSelected ? '✓ 선택됨' : '클릭하여 선택하기'}
                                    </div>
                                </button>
                            );
                        })}
                </div>
            </div>

            {/* 하단 고정 푸터 */}
            {selectedBookId && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-secondary-200 p-4 animate-slide-up">
                    <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground/50 truncate">
                                선택: {THIS_MONTH_BOOKS.find((b) => b.id === selectedBookId)?.title}
                            </p>
                        </div>
                        <button
                            onClick={handleConfirm}
                            className="btn-primary whitespace-nowrap"
                        >
                            이 책으로 시작하기 →
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
