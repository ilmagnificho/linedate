'use client';

import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden">
            {/* 상단 헤더 (로그인/시작하기) */}
            <header className="absolute top-0 left-0 right-0 z-50 px-6 py-6 flex items-center justify-between max-w-4xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">📖</span>
                    <span className="font-serif font-bold text-xl text-foreground">Linedate</span>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/login" className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-primary-600 transition-colors">
                        로그인
                    </Link>
                    <Link href="/select" className="px-5 py-2.5 bg-primary-600 text-white text-sm font-bold rounded-full shadow-sm hover:bg-primary-700 transition-colors">
                        시작하기
                    </Link>
                </div>
            </header>

            {/* 배경 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fdfbf9] to-[#f5f0e3] -z-10" />

            <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-20 pb-10 max-w-md mx-auto w-full">
                {/* 배지 */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-primary-100 mb-8 shadow-sm">
                    <span className="text-base">✨</span>
                    <span className="text-xs font-semibold text-primary-600 tracking-wide">책 취향으로 만나는 블라인드 데이팅</span>
                </div>

                {/* 메인 헤드라인 */}
                <h1 className="font-serif text-4xl md:text-5xl font-bold leading-[1.3] mb-6 text-gray-900">
                    같은 문장에<br />
                    <span className="text-primary-600">밑줄 긋는 사람</span>,<br />
                    그게 운명 아닐까요?
                </h1>

                {/* 서브 헤드라인 */}
                <p className="text-base text-gray-600 mb-10 leading-relaxed max-w-xs mx-auto">
                    얼굴보다 취향이 먼저.<br />
                    대화가 깊어질수록 서로의 모습이 선명해집니다.
                </p>

                {/* CTA 버튼 */}
                <div className="w-full flex flex-col gap-3">
                    <Link
                        href="/select"
                        className="w-full bg-primary-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:bg-primary-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        내 취향의 사람 만나기
                    </Link>
                    <div className="text-xs text-center text-gray-400 mt-2">
                        🌟 이미 1,234명의 독서가가 대화 중이에요
                    </div>
                </div>
            </div>
        </section>
    );
}
