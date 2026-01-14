'use client';

import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fdf4f5] via-[#fefcfa] to-[#f5f0e3]" />

            {/* 장식 요소 */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent-lavender/20 rounded-full blur-3xl" />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-accent-peach/30 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                {/* 배지 */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-soft border border-primary-100 mb-8 animate-fade-in-up">
                    <span className="text-lg">📖</span>
                    <span className="text-sm font-medium text-primary-600">책으로 이어지는 인연</span>
                </div>

                {/* 메인 헤드라인 */}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
                    <span className="text-foreground">같은 문장에</span>
                    <br />
                    <span className="text-gradient">밑줄 긋는 사람</span>
                    <span className="text-foreground">,</span>
                    <br />
                    <span className="text-foreground">그게 운명 아닐까요?</span>
                </h1>

                {/* 서브 헤드라인 */}
                <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                    외모가 아닌 책 취향으로 먼저 만나요.
                    <br className="hidden md:block" />
                    대화가 깊어질수록, 서로의 모습이 드러나요.
                </p>

                {/* CTA 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link
                        href="/select"
                        className="btn-primary text-lg px-8 py-4"
                    >
                        내 취향의 사람 만나기
                    </Link>
                    <button className="flex items-center gap-2 text-foreground/60 hover:text-primary-500 transition-colors group">
                        <span>어떻게 작동하나요?</span>
                        <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                {/* 신뢰 지표 */}
                <div className="flex flex-wrap justify-center gap-8 text-sm text-foreground/50">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">📚</span>
                        <span>20+ 엄선된 도서</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">💕</span>
                        <span>5 취향 카테고리</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">✨</span>
                        <span>1:1 블라인드 매칭</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
