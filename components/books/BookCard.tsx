'use client';

import { useState } from 'react';
import { Book, BOOK_CATEGORIES } from '@/types/database';

interface BookCardProps {
    book: Book;
    isSelected: boolean;
    onSelect: (bookId: string) => void;
}

export default function BookCard({ book, isSelected, onSelect }: BookCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const category = BOOK_CATEGORIES[book.category];

    return (
        <button
            onClick={() => onSelect(book.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-selected={isSelected}
            className={`
        book-card group relative w-full text-left
        bg-white rounded-2xl p-5 
        border-2 transition-all duration-300
        ${isSelected
                    ? 'border-primary-900 bg-primary-50 shadow-book-hover'
                    : 'border-transparent hover:border-accent-warm shadow-book hover:shadow-book-hover'
                }
      `}
        >
            {/* 책 커버 */}
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-secondary-200">
                {book.cover_url ? (
                    <img
                        src={book.cover_url}
                        alt={book.title}
                        className={`
              w-full h-full object-cover transition-transform duration-300
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200">
                        <span className="text-4xl">{category?.emoji || '📖'}</span>
                    </div>
                )}

                {/* 카테고리 뱃지 */}
                <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-primary-800">
                        <span>{category?.emoji}</span>
                        <span>{category?.label}</span>
                    </span>
                </div>
            </div>

            {/* 책 정보 */}
            <div className="space-y-1.5">
                <h3 className="font-serif text-lg font-semibold text-primary-900 line-clamp-1">
                    {book.title}
                </h3>
                <p className="text-sm text-primary-600">{book.author}</p>
                {book.description && (
                    <p className="text-xs text-primary-500 line-clamp-2 mt-2">
                        {book.description}
                    </p>
                )}
            </div>

            {/* 선택 체크마크 */}
            <div className={`
        absolute top-4 right-4 w-7 h-7 rounded-full 
        flex items-center justify-center
        transition-all duration-300
        ${isSelected
                    ? 'bg-primary-900 scale-100 opacity-100'
                    : 'bg-primary-200 scale-75 opacity-0'
                }
      `}>
                <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            {/* 하단 선택 힌트 */}
            <div className={`
        mt-4 pt-3 border-t border-secondary-300
        text-center text-xs transition-colors duration-300
        ${isSelected ? 'text-primary-900 font-medium' : 'text-primary-400'}
      `}>
                {isSelected ? '✓ 이 책으로 선택했어요' : '클릭하여 선택하기'}
            </div>
        </button>
    );
}
