import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-secondary-100 via-secondary-200 to-background" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating books decoration */}
                <div className="absolute top-20 left-10 text-6xl opacity-10 animate-pulse">📚</div>
                <div className="absolute top-40 right-20 text-5xl opacity-10 animate-pulse delay-100">📖</div>
                <div className="absolute bottom-40 left-20 text-4xl opacity-10 animate-pulse delay-200">📕</div>
                <div className="absolute bottom-20 right-10 text-5xl opacity-10 animate-pulse delay-300">📗</div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-card mb-8">
                    <span className="text-lg">📚</span>
                    <span className="text-sm font-medium text-primary-700">책으로 시작하는 인연</span>
                </div>

                {/* Main Headline */}
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 leading-tight mb-6">
                    <span className="block">같은 문장에 밑줄 긋는 사람,</span>
                    <span className="block mt-2 gradient-text">그게 운명 아닐까요?</span>
                </h1>

                {/* Sub Copy */}
                <p className="text-lg md:text-xl text-primary-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                    스와이프는 3초, 책 한 권의 감동은 평생.<br />
                    <span className="text-primary-800 font-medium">얼굴보다 취향이 먼저</span>인 블라인드 데이팅.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/select"
                        className="
              inline-flex items-center gap-2 px-8 py-4
              bg-primary-900 text-white rounded-full
              font-medium text-lg
              shadow-lg hover:shadow-xl
              hover:bg-primary-800 
              transition-all duration-300
              hover:-translate-y-0.5
            "
                    >
                        <span>내 취향의 사람 만나기</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    <Link
                        href="#how-it-works"
                        className="
              inline-flex items-center gap-2 px-6 py-3
              text-primary-700 
              font-medium
              hover:text-primary-900
              transition-colors duration-300
            "
                    >
                        <span>어떻게 작동하나요?</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </Link>
                </div>

                {/* Trust Indicator */}
                <div className="mt-16 pt-8 border-t border-secondary-300">
                    <p className="text-sm text-primary-500 mb-3">같은 책을 읽은 사람과의 대화는 다릅니다</p>
                    <div className="flex justify-center items-center gap-8 text-primary-400">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-700">20+</div>
                            <div className="text-xs">엄선된 도서</div>
                        </div>
                        <div className="w-px h-8 bg-secondary-400" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-700">5</div>
                            <div className="text-xs">취향 카테고리</div>
                        </div>
                        <div className="w-px h-8 bg-secondary-400" />
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary-700">1:1</div>
                            <div className="text-xs">블라인드 매칭</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
