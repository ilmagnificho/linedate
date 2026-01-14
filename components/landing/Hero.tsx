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

            {/* 배경 그라데이션 (핑크 톤 강화) */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-secondary-50 -z-10" />

            {/* 장식 요소: 핑크/피치 블러 */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[30%] bg-primary-200/40 rounded-full blur-[80px]" />
            <div className="absolute bottom-[10%] left-[-10%] w-[60%] h-[40%] bg-accent-peach/30 rounded-full blur-[80px]" />

            <div className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-24 pb-10 max-w-md mx-auto w-full relative z-10">
                {/* 배지 */}
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 mb-8 shadow-sm animate-fade-in">
                    <span className="text-base">🌸</span>
                    <span className="text-xs font-bold text-primary-600 tracking-wide">설레는 책 취향 발견</span>
                </div>

                {/* 메인 헤드라인 */}
                <h1 className="font-serif text-4xl md:text-5xl font-bold leading-[1.2] mb-6 text-gray-900 tracking-tight">
                    <span className="relative inline-block">
                        <span className="relative z-10">같은 문장</span>
                        <span className="absolute bottom-1 left-0 right-0 h-3 bg-primary-200/60 -z-10 rounded-full"></span>
                    </span>에<br />
                    마음이 <span className="text-primary-500">통했나요?</span>
                </h1>

                {/* 서브 헤드라인 */}
                <p className="text-base text-gray-600 mb-12 leading-relaxed max-w-xs mx-auto break-keep">
                    얼굴보다 취향이 먼저.<br />
                    서로의 밑줄이 겹칠 때, 운명은 시작됩니다.
                </p>

                {/* CTA 버튼 */}
                <div className="w-full flex flex-col gap-3 mt-auto mb-8">
                    <Link
                        href="/select"
                        className="w-full bg-primary-500 text-white font-bold text-xl py-5 rounded-2xl shadow-lg shadow-primary-200 hover:bg-primary-600 hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <span>내 인연 찾기</span>
                        <span>💌</span>
                    </Link>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                        <span>지금 42명이 대화하고 있어요</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
