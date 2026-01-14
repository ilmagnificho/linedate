'use client';

import { useState } from 'react';
import Link from 'next/link';
import { THIS_MONTH_BOOKS, getCategoryLabel, getCategoryEmoji } from '@/lib/books';
import { BookCategory } from '@/types/database';

const CATEGORIES: BookCategory[] = ['emotion', 'growth', 'romance', 'fantasy'];

export default function SelectPage() {
    const [activeTab, setActiveTab] = useState<BookCategory | 'all'>('all');

    const filteredBooks = activeTab === 'all'
        ? THIS_MONTH_BOOKS
        : THIS_MONTH_BOOKS.filter(book => book.category === activeTab);

    const getCurrentMonth = () => {
        const now = new Date();
        return `${now.getMonth() + 1}월의 서재`;
    };

    return (
        <main className="min-h-screen bg-[#fefcfa] pb-20">
            {/* 헤더 */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-secondary-200">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl">📖</span>
                        <span className="font-serif font-semibold text-foreground">Linedate</span>
                    </Link>
                    <span className="text-sm font-medium text-foreground/50 bg-secondary-100 px-3 py-1 rounded-full">{getCurrentMonth()}</span>
                </div>

                {/* 카테고리 탭 (모바일 스크롤) */}
                <div className="max-w-4xl mx-auto px-4 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-2 py-3 min-w-max">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'all'
                                    ? 'bg-foreground text-white shadow-md'
                                    : 'bg-white text-foreground/60 border border-secondary-200 hover:bg-secondary-50'
                                }`}
                        >
                            전체
                        </button>
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveTab(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === cat
                                        ? 'bg-primary-500 text-white shadow-md'
                                        : 'bg-white text-foreground/60 border border-secondary-200 hover:bg-primary-50 hover:text-primary-600'
                                    }`}
                            >
                                <span>{getCategoryEmoji(cat)}</span>
                                <span>{getCategoryLabel(cat)}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
                        이달의 책을 소개합니다
                    </h1>
                    <p className="text-foreground/60 text-sm md:text-base">
                        마음에 드는 책을 선택하고 밑줄을 남겨보세요.<br />
                        같은 책을 고른 분과 대화가 시작됩니다.
                    </p>
                </div>

                {/* 책 그리드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredBooks.map((book) => (
                        <Link
                            key={book.id}
                            href={`/books/${book.id}`}
                            className="group bg-white rounded-2xl p-5 border border-secondary-200 hover:border-primary-300 hover:shadow-book transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary-100 group-hover:bg-primary-400 transition-colors" />

                            <div className="w-28 h-40 mb-4 bg-secondary-100 rounded shadow-md group-hover:-translate-y-1 transition-transform duration-300">
                                {/* 이미지 */}
                                {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover rounded" />}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <div className="text-xs text-primary-600 font-medium mb-1">
                                    {getCategoryLabel(book.category)}
                                </div>
                                <h3 className="font-serif text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary-700 transition-colors">
                                    {book.title}
                                </h3>
                                <p className="text-sm text-foreground/50">
                                    {book.author}
                                </p>
                                <p className="text-xs text-foreground/60 mt-3 line-clamp-2 leading-relaxed">
                                    {book.description}
                                </p>
                            </div>

                            <div className="mt-4 w-full py-2 rounded-lg bg-secondary-50 text-sm font-medium text-foreground/70 group-hover:bg-primary-50 group-hover:text-primary-700 transition-colors">
                                밑줄 긋기 ✐
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
