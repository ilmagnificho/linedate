'use client';

import { THIS_MONTH_BOOKS, getCategoryLabel, getCategoryEmoji } from '@/lib/books';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { saveUnderline } from '@/app/actions/book';

export default function BookDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const book = THIS_MONTH_BOOKS.find((b) => b.id === id);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    if (!book) return notFound();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('bookId', book.id);
        formData.append('content', content);

        try {
            const result = await saveUnderline(formData);

            if (result?.error) {
                alert(result.error);
                setLoading(false);
            } else if (result?.success) {
                // 저장 성공 시 클라이언트에서 페이지 이동
                router.push('/waiting');
            } else {
                // 결과가 없거나 이상할 경우
                alert('응답이 없습니다.');
                setLoading(false);
            }
        } catch (err) {
            console.error(err);
            alert('요청 중 오류가 발생했습니다.');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#fefcfa]">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-secondary-200 px-6 py-4 flex items-center gap-4">
                <Link href="/select" className="p-2 -ml-2 hover:bg-secondary-100 rounded-full transition-colors">
                    <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>
                <span className="font-serif font-bold text-lg text-foreground">
                    {getCategoryEmoji(book.category)} {getCategoryLabel(book.category)}
                </span>
            </header>

            <div className="max-w-md mx-auto px-6 py-8 pb-32">
                <div className="text-center mb-10">
                    <p className="text-sm font-medium text-foreground/50 mb-2">
                        감정/공감
                    </p>
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
                        {book.title}
                    </h1>
                    <p className="font-medium text-foreground/80 mb-6">
                        {book.author}
                    </p>
                    <p className="text-foreground/70 leading-relaxed text-sm">
                        {book.description}
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-book border border-secondary-100 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-300 to-primary-500" />

                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                            💬
                        </div>
                        <h2 className="font-serif text-xl font-bold text-foreground mb-2">
                            이 책에 밑줄 긋기
                        </h2>
                        <p className="text-sm text-foreground/60">
                            {book.question || '당신에게 위로가 되었던 장소나 사람이 있나요?'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="당신의 생각을 자유롭게 남겨주세요..."
                                className="w-full h-40 p-4 bg-secondary-50 rounded-xl border-2 border-transparent focus:border-primary-300 focus:bg-white transition-all resize-none text-foreground placeholder:text-foreground/30 outline-none text-sm leading-relaxed"
                                maxLength={200}
                            />
                            <div className="absolute bottom-4 right-4 text-xs font-medium text-foreground/40">
                                {content.length}/200
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-5 h-5 mt-0.5 text-primary-500">
                                💡
                            </div>
                            <p className="text-xs text-foreground/60 leading-relaxed">
                                솔직하고 정성스런 밑줄일수록<br />
                                좋은 인연을 만날 확률이 올라가요!
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || content.length < 10}
                            className="w-full btn-primary py-4 text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>저장 중...</span>
                                </>
                            ) : (
                                '이 책으로 매칭 시작하기'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
