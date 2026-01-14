import Link from 'next/link';

export default function CTA() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-secondary-200">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Quote */}
                <div className="mb-12">
                    <blockquote className="font-serif text-2xl md:text-3xl text-primary-800 italic leading-relaxed">
                        "마지막으로 읽은 책,<br />
                        누군가와 나눠본 적 있나요?"
                    </blockquote>
                    <div className="mt-4 w-12 h-0.5 bg-accent-warm mx-auto" />
                </div>

                {/* Main CTA */}
                <div className="bg-primary-900 rounded-3xl p-10 md:p-14 text-white">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                        이달의 책을 확인하세요
                    </h2>
                    <p className="text-primary-200 mb-8 max-w-lg mx-auto">
                        지금 가입하면, 이번 달 선정된 4권의 책을 확인하고<br />
                        같은 취향을 가진 사람과 매칭될 수 있어요.
                    </p>

                    <Link
                        href="/select"
                        className="
              inline-flex items-center gap-3 px-10 py-5
              bg-white text-primary-900 rounded-full
              font-bold text-lg
              shadow-lg hover:shadow-xl
              hover:bg-secondary-100
              transition-all duration-300
              hover:-translate-y-1
            "
                    >
                        <span className="text-xl">📖</span>
                        <span>책으로 인연 시작하기</span>
                    </Link>

                    {/* Features */}
                    <div className="mt-10 pt-8 border-t border-primary-700 grid grid-cols-3 gap-4 text-sm">
                        <div className="text-primary-200">
                            <div className="text-2xl mb-1">🔒</div>
                            블라인드 프로필
                        </div>
                        <div className="text-primary-200">
                            <div className="text-2xl mb-1">💬</div>
                            실시간 채팅
                        </div>
                        <div className="text-primary-200">
                            <div className="text-2xl mb-1">✨</div>
                            무료 시작
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-8 text-sm text-primary-500">
                    DeckDrop은 진정성 있는 만남을 추구합니다.
                </p>
            </div>
        </section>
    );
}
