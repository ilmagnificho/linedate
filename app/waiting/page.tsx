'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const loadingMessages = [
    '같은 책을 선택한 분을 찾고 있어요...',
    '취향이 통하는 인연을 찾는 중이에요...',
    '설레는 만남을 준비하고 있어요...',
    '거의 다 됐어요! 조금만 기다려주세요 💕',
];

export default function WaitingPage() {
    const router = useRouter();
    const [messageIndex, setMessageIndex] = useState(0);
    const [dots, setDots] = useState('');

    // 메시지 변경
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 점 애니메이션
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // 매칭 완료 시뮬레이션
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/chat/demo-room');
        }, 6000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-[#fefcfa] to-secondary-100 flex items-center justify-center">
            <div className="text-center px-6">
                {/* 아이콘 */}
                <div className="relative mb-8">
                    <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-book flex items-center justify-center">
                        <span className="text-4xl animate-pulse-soft">📖</span>
                    </div>
                    {/* 회전 링 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                    </div>
                </div>

                {/* 메시지 */}
                <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4">
                    매칭 중{dots}
                </h1>
                <p className="text-foreground/60 mb-8 min-h-[3rem] transition-opacity duration-300">
                    {loadingMessages[messageIndex]}
                </p>

                {/* 팁 */}
                <div className="max-w-sm mx-auto p-4 bg-white/80 rounded-2xl border border-secondary-200">
                    <p className="text-sm text-foreground/50">
                        💡 <span className="font-medium text-foreground/70">Tip</span>
                        <br />
                        매칭되면 상대방의 프로필은 블러 처리되어 있어요.
                        <br />
                        20개의 메시지를 주고받으면 공개됩니다!
                    </p>
                </div>
            </div>
        </main>
    );
}
