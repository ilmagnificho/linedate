'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function WaitingPage() {
    const router = useRouter();

    // 실제로는 Supabase Realtime으로 매칭 상태 구독
    useEffect(() => {
        // Mock: 5초 후 자동으로 채팅방으로 이동 (데모용)
        const timer = setTimeout(() => {
            router.push('/chat/demo-room');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center px-6 max-w-md">
                {/* 애니메이션 아이콘 */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 border-4 border-secondary-300 rounded-full" />
                    <div className="absolute inset-0 border-4 border-primary-900 rounded-full border-t-transparent animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl animate-pulse">📚</span>
                    </div>
                </div>

                {/* 텍스트 */}
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                    같은 취향을 찾고 있어요...
                </h1>

                <p className="text-primary-600 mb-8 leading-relaxed">
                    같은 책을 선택한 사람을 찾으면<br />
                    바로 알려드릴게요.
                </p>

                {/* 안내 */}
                <div className="bg-secondary-200 rounded-2xl p-6 text-left">
                    <h3 className="font-medium text-primary-800 mb-3 flex items-center gap-2">
                        <span>💡</span>
                        기다리는 동안 알아두세요
                    </h3>
                    <ul className="space-y-2 text-sm text-primary-600">
                        <li className="flex items-start gap-2">
                            <span className="text-accent-warm">•</span>
                            매칭되면 푸시 알림을 보내드려요
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-accent-warm">•</span>
                            처음엔 프로필 사진이 블러 처리돼요
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-accent-warm">•</span>
                            20개 메시지 후 프로필이 공개됩니다
                        </li>
                    </ul>
                </div>

                {/* 데모 안내 */}
                <p className="mt-8 text-xs text-primary-400">
                    데모: 5초 후 자동으로 채팅방으로 이동합니다
                </p>

                <Link
                    href="/"
                    className="inline-block mt-4 text-sm text-primary-500 hover:text-primary-700 underline"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </main>
    );
}
