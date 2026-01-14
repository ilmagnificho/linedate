export default function Features() {
    const steps = [
        {
            number: '01',
            emoji: '📚',
            title: '책으로 말해요',
            description: '매달 엄선된 4권의 책 중 하나를 선택하세요. 당신의 선택이 곧 당신을 표현합니다.',
            highlight: '이달의 책 선택',
        },
        {
            number: '02',
            emoji: '💝',
            title: '취향으로 만나요',
            description: '같은 책을 선택한 이성과 1:1 매칭됩니다. 프로필은 블러 처리되어 얼굴보다 마음이 먼저 닿아요.',
            highlight: '블라인드 매칭',
        },
        {
            number: '03',
            emoji: '💬',
            title: '대화로 깊어져요',
            description: '책 이야기로 자연스럽게 대화를 시작하고, 20개의 메시지를 주고받으면 프로필이 공개됩니다.',
            highlight: '단계적 공개',
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-secondary-200 text-primary-700 rounded-full text-sm font-medium mb-4">
                        How it works
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-900 mb-4">
                        책 한 권으로 시작하는 인연
                    </h2>
                    <p className="text-primary-600 max-w-xl mx-auto">
                        복잡한 프로필 작성은 필요 없어요.<br />
                        좋아하는 책 하나면 충분합니다.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className="relative group"
                        >
                            {/* Connector Line (desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-secondary-300" />
                            )}

                            {/* Card */}
                            <div className="relative bg-secondary-100 rounded-2xl p-8 hover:bg-secondary-200 transition-colors duration-300">
                                {/* Number Badge */}
                                <div className="absolute -top-4 left-6 px-3 py-1 bg-primary-900 text-white text-sm font-medium rounded-full">
                                    {step.number}
                                </div>

                                {/* Emoji */}
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {step.emoji}
                                </div>

                                {/* Content */}
                                <h3 className="font-serif text-xl font-bold text-primary-900 mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-primary-600 text-sm leading-relaxed mb-4">
                                    {step.description}
                                </p>

                                {/* Highlight Tag */}
                                <span className="inline-block px-3 py-1 bg-accent-warm/20 text-accent-warm text-xs font-medium rounded-full">
                                    {step.highlight}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <p className="text-primary-500 mb-4">
                        외모로 시작하는 만남은 쉽게 식어요.<br />
                        같은 책을 사랑하는 사람과는, 대화가 끊이지 않아요.
                    </p>
                </div>
            </div>
        </section>
    );
}
