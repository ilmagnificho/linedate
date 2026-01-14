'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkMatchStatus } from '@/app/actions/match';

interface WaitingAnimationProps {
    bookTitle: string;
    categoryEmoji: string;
}

const loadingMessages = [
    '같은 책을 선택한 분을 찾고 있어요...',
    '소중한 밑줄을 읽어보고 있어요...',
    '설레는 만남을 준비하고 있어요...',
    '거의 다 됐어요! 조금만 기다려주세요 💕',
];

export default function WaitingAnimation({ bookTitle, categoryEmoji }: WaitingAnimationProps) {
    const router = useRouter();
    const [messageIndex, setMessageIndex] = useState(0);

    // 메시지 롤링
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 매칭 폴링 (3초마다 확인)
    useEffect(() => {
        const pollMatch = async () => {
            try {
                const result = await checkMatchStatus();
                if (result.status === 'matched' && result.roomId) {
                    router.push(`/chat/${result.roomId}`);
                }
            } catch (error) {
                console.error('Matching polling error:', error);
            }
        };

        const interval = setInterval(pollMatch, 3000);
        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className="text-center px-6">
            {/* 아이콘 */}
            <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-book flex items-center justify-center z-10 relative">
                    <span className="text-4xl animate-pulse-soft">{categoryEmoji}</span>
                </div>
                {/* 회전 링 */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                </div>
            </div>

            {/* 메시지 */}
            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-2">
                매칭 중...
            </h1>
            <p className="text-lg font-medium text-primary-600 mb-4">
                &quot;{bookTitle}&quot;
            </p>
            <p className="text-foreground/60 mb-8 min-h-[3rem] transition-opacity duration-300">
                {loadingMessages[messageIndex]}
            </p>

            {/* 팁 */}
            <div className="max-w-sm mx-auto p-4 bg-white/80 rounded-2xl border border-secondary-200">
                <p className="text-sm text-foreground/50">
                    💡 <span className="font-medium text-foreground/70">Linedate Tip</span>
                    <br />
                    매칭되면 상대방의 프로필은 블러 처리되어 있습니다.
                    <br />
                    대화가 깊어질수록 서로의 모습이 선명해집니다.
                </p>
            </div>
        </div>
    );
}
