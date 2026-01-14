'use client';

const features = [
    {
        step: '01',
        title: '책으로 말해요',
        description: '이달의 책 4권 중 마음에 드는 한 권을 선택하세요. 당신의 선택이 곧 당신의 이야기예요.',
        icon: '📖',
        color: 'from-primary-400 to-primary-500',
    },
    {
        step: '02',
        title: '취향으로 만나요',
        description: '같은 책을 선택한 사람과 1:1로 매칭돼요. 얼굴은 아직 비밀, 대화만으로 서로를 알아가요.',
        icon: '💕',
        color: 'from-accent-lavender to-primary-300',
    },
    {
        step: '03',
        title: '대화로 깊어져요',
        description: '20개의 메시지가 오가면 프로필이 공개돼요. 진짜 관심이 쌓인 후에 모습을 확인해요.',
        icon: '✨',
        color: 'from-accent-peach to-primary-400',
    },
];

export default function Features() {
    return (
        <section className="py-12 bg-white">
            <div className="max-w-md mx-auto px-6">
                {/* 섹션 헤더 */}
                <div className="text-center mb-8">
                    <span
                        className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
                        style={{ backgroundColor: '#fdf4f5', color: '#cb3d5d' }}
                    >
                        How it works
                    </span>
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3 break-keep">
                        취향이 먼저,<br />얼굴은 나중에
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Linedate는 진정성 있는 만남을 추구해요.<br />
                        책 한 권이 여는 새로운 인연을 경험하세요.
                    </p>
                </div>

                {/* 피처 카드 */}
                <div className="flex flex-col gap-4">
                    {features.map((feature, index) => (
                        <div
                            key={feature.step}
                            className="bg-white rounded-2xl p-5 border border-secondary-200 shadow-sm flex items-center gap-4"
                        >
                            {/* 아이콘 */}
                            <div
                                className="shrink-0 text-2xl w-12 h-12 flex items-center justify-center rounded-xl"
                                style={{ backgroundColor: '#fdf4f5' }}
                            >
                                {feature.icon}
                            </div>

                            <div className="flex-1 text-left">
                                <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed break-keep">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
