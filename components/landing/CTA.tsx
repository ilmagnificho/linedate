'use client';

import Link from 'next/link';

export default function CTA() {
    return (
        <section className="py-24 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 relative overflow-hidden">
            {/* 장식 요소 */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                {/* 인용문 */}
                <div className="mb-10">
                    <span className="text-5xl opacity-50">💕</span>
                </div>

                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white/95 leading-relaxed mb-8">
                    &ldquo;마지막으로 읽은 책,
                    <br />
                    누군가와 나눠본 적 있나요?&rdquo;
                </blockquote>

                <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
                    같은 책에 마음이 머문 사람이라면,
                    <br />
                    대화도 더 깊어질 수 있지 않을까요?
                </p>

                {/* CTA 버튼 */}
                <Link
                    href="/select"
                    className="inline-flex items-center gap-3 bg-white text-primary-600 font-semibold text-lg px-10 py-4 rounded-full hover:bg-primary-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <span>📖</span>
                    <span>책으로 인연 시작하기</span>
                </Link>

                {/* 추가 정보 */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>월 1회 매칭</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>안심 블라인드</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>취향 기반 매칭</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
