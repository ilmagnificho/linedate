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
        <section className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* 섹션 헤더 */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
                        How it works
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                        취향이 먼저, 얼굴은 나중에
                    </h2>
                    <p className="text-foreground/60 max-w-xl mx-auto">
                        Linedate는 진정성 있는 만남을 추구해요.
                        <br />
                        책 한 권이 여는 새로운 인연을 경험하세요.
                    </p>
                </div>

                {/* 피처 카드 */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={feature.step}
                            className="group relative bg-white rounded-2xl p-8 border border-secondary-200 hover:border-primary-200 hover:shadow-book transition-all duration-300"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* 스텝 번호 */}
                            <div className="absolute -top-4 left-8">
                                <span className={`inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r ${feature.color} text-white text-xs font-bold rounded-full`}>
                                    {feature.step}
                                </span>
                            </div>

                            {/* 아이콘 */}
                            <div className="text-4xl mb-6 mt-2">
                                {feature.icon}
                            </div>

                            {/* 콘텐츠 */}
                            <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-foreground/60 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
