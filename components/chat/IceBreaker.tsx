'use client';

interface IceBreakerProps {
    bookTitle: string;
    bookAuthor: string;
}

const ICE_BREAKER_QUESTIONS = [
    "이 책에서 가장 기억에 남는 장면이 뭐예요?",
    "어떤 계기로 이 책을 읽게 되셨어요?",
    "이 책을 읽으면서 나도 모르게 밑줄 그은 문장이 있나요?",
    "이 책의 주인공이 된다면 어떤 선택을 했을 것 같아요?",
    "이 책을 한 문장으로 표현하면?",
];

export default function IceBreaker({ bookTitle, bookAuthor }: IceBreakerProps) {
    // 랜덤 질문 선택 (실제로는 서버에서 결정하는 게 좋음)
    const randomQuestion = ICE_BREAKER_QUESTIONS[0];

    return (
        <div className="mx-4 my-6">
            {/* 책 정보 카드 */}
            <div className="p-5 bg-secondary-200 rounded-2xl border border-secondary-400">
                <div className="flex items-start gap-3">
                    <span className="text-3xl">📖</span>
                    <div className="flex-1">
                        <p className="text-sm text-primary-500 mb-1">이 책으로 만났어요</p>
                        <h4 className="font-serif text-lg text-primary-900 font-semibold">
                            {bookTitle}
                        </h4>
                        <p className="text-sm text-primary-600 mt-0.5">{bookAuthor}</p>
                    </div>
                </div>

                {/* 구분선 */}
                <div className="my-4 h-px bg-secondary-400" />

                {/* 아이스브레이킹 질문 */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">💡</span>
                        <span className="text-sm font-medium text-primary-700">대화를 시작해 보세요</span>
                    </div>

                    <p className="text-primary-800 italic leading-relaxed pl-7">
                        "{randomQuestion}"
                    </p>

                    <p className="text-xs text-primary-500 pl-7">
                        같은 책을 읽은 사람과의 대화는 특별해요
                    </p>
                </div>
            </div>

            {/* 안내 메시지 */}
            <div className="mt-4 text-center">
                <p className="text-sm text-primary-400">
                    <span className="inline-block w-2 h-2 bg-accent-warm rounded-full mr-2 animate-pulse" />
                    20개의 메시지를 주고받으면 프로필이 공개됩니다
                </p>
            </div>
        </div>
    );
}
