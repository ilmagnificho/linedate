'use client';

import { User } from '@/types/database';

interface ChatHeaderProps {
    partner: User;
    bookTitle: string;
    messageCount: number;
    isRevealed: boolean;
}

export default function ChatHeader({
    partner,
    bookTitle,
    messageCount,
    isRevealed
}: ChatHeaderProps) {
    const threshold = 20;
    const progress = Math.min(100, (messageCount / threshold) * 100);
    const remaining = Math.max(0, threshold - messageCount);

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-secondary-300 shadow-sm">
            <div className="flex items-center gap-4 p-4">
                {/* 프로필 이미지 (블러 조건부) */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary-200 flex-shrink-0">
                    {partner.avatar_url ? (
                        <img
                            src={partner.avatar_url}
                            alt={partner.nickname}
                            className={`
                w-full h-full object-cover transition-all duration-700 ease-out
                ${isRevealed ? 'blur-0' : 'blur-[10px] scale-110'}
              `}
                        />
                    ) : (
                        <div className={`
              w-full h-full flex items-center justify-center text-2xl
              transition-all duration-700 ease-out
              ${isRevealed ? '' : 'blur-[10px]'}
            `}>
                            {partner.gender === 'male' ? '👨' : '👩'}
                        </div>
                    )}

                    {/* 잠금 아이콘 */}
                    {!isRevealed && (
                        <div className="absolute inset-0 flex items-center justify-center bg-primary-900/20 backdrop-blur-[2px]">
                            <svg
                                className="w-4 h-4 text-white drop-shadow-md"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-primary-900 truncate">
                        {partner.nickname}
                    </h2>
                    <p className="text-sm text-primary-500 truncate">
                        {isRevealed
                            ? '프로필이 공개되었어요 ✨'
                            : `${remaining}개 더 대화하면 프로필이 공개돼요`
                        }
                    </p>
                </div>

                {/* 진행도 원형 */}
                <div className="flex-shrink-0 w-14 h-14 relative">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        {/* 배경 원 */}
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className="stroke-secondary-300"
                            strokeWidth="3"
                        />
                        {/* 진행도 원 */}
                        <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            className={`transition-all duration-500 ${isRevealed ? 'stroke-accent-coral' : 'stroke-primary-600'}`}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeDasharray={`${progress}, 100`}
                        />
                    </svg>
                    {/* 중앙 텍스트 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xs font-bold ${isRevealed ? 'text-accent-coral' : 'text-primary-700'}`}>
                            {isRevealed ? '✓' : `${messageCount}`}
                        </span>
                    </div>
                </div>
            </div>

            {/* 책 정보 배너 */}
            <div className="px-4 pb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-200 rounded-full text-sm">
                    <span>📖</span>
                    <span className="text-primary-700">{bookTitle}(으)로 만났어요</span>
                </div>
            </div>
        </header>
    );
}
