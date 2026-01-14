'use client';

import { useState } from 'react';
import { updateReadingProfile } from '@/app/actions/onboarding';

const GENRES = [
    '소설', '에세이', '인문/철학', '경제/경영',
    '자기계발', '시', '역사', '예술', '과학'
];

export default function ReadingSetupPage() {
    const [loading, setLoading] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    const toggleGenre = (genre: string) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(prev => prev.filter(g => g !== genre));
        } else {
            if (selectedGenres.length >= 3) return; // 최대 3개
            setSelectedGenres(prev => [...prev, genre]);
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        // 선택된 장르들을 formData에 추가할 필요 없이 hidden input으로 처리하거나
        // server action에서 getAll로 받을 수 있게 함.
        // 여기서는 input hidden을 사용해 폼 데이터로 전송
        await updateReadingProfile(formData);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#fefcfa] px-4 py-12 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                {/* 진행 상태 */}
                <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
                    <div className="h-1 flex-1 bg-primary-200 rounded-full" />
                    <div className="h-1 flex-1 bg-primary-500 rounded-full" />
                </div>

                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl font-semibold mb-2 text-foreground">
                        당신의 독서 취향은?
                    </h1>
                    <p className="text-foreground/60">
                        비슷한 취향을 가진 분과 연결해드릴게요.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-book border border-secondary-200">
                    <form action={handleSubmit} className="space-y-10">

                        {/* 1. 독서 빈도 */}
                        <div>
                            <h3 className="font-serif text-lg font-medium mb-4">평소에 책을 얼마나 읽으시나요?</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {['monthly_less', 'monthly_1', 'monthly_2_3', 'weekly_1_plus'].map((freq) => (
                                    <label key={freq} className="cursor-pointer">
                                        <input type="radio" name="reading_frequency" value={freq} className="peer hidden" required />
                                        <div className="p-3 rounded-xl border-2 border-secondary-200 text-center text-sm peer-checked:border-primary-500 peer-checked:bg-primary-50 peer-checked:text-primary-700 hover:border-primary-200 transition-all h-full flex items-center justify-center">
                                            {freq === 'monthly_less' && '한 달에 1권 미만'}
                                            {freq === 'monthly_1' && '한 달에 1권'}
                                            {freq === 'monthly_2_3' && '한 달에 2~3권'}
                                            {freq === 'weekly_1_plus' && '일주일에 1권 이상'}
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 2. 선호 장르 */}
                        <div>
                            <h3 className="font-serif text-lg font-medium mb-2">어떤 장르를 좋아하세요? <span className="text-sm font-normal text-foreground/50">(최대 3개)</span></h3>
                            <div className="flex flex-wrap gap-2">
                                {GENRES.map((genre) => (
                                    <button
                                        key={genre}
                                        type="button"
                                        onClick={() => toggleGenre(genre)}
                                        className={`px-4 py-2 rounded-full border-2 text-sm font-medium transition-all ${selectedGenres.includes(genre)
                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                : 'border-secondary-200 text-foreground/70 hover:border-secondary-300'
                                            }`}
                                    >
                                        {genre}
                                    </button>
                                ))}
                            </div>
                            {/* 서버 전송용 히든 인풋 */}
                            {selectedGenres.map(genre => (
                                <input key={genre} type="hidden" name="preferred_genres" value={genre} />
                            ))}
                        </div>

                        {/* 3. 인생 책 */}
                        <div>
                            <h3 className="font-serif text-lg font-medium mb-4">인생 책 BEST 3를 알려주세요</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((num) => (
                                    <div key={num} className="flex gap-3">
                                        <div className="w-8 h-10 bg-secondary-100 rounded-lg flex items-center justify-center font-serif font-bold text-secondary-400 shrink-0 mt-1">
                                            {num}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <input
                                                name={`book${num}_title`}
                                                placeholder="책 제목"
                                                className="input-primary w-full py-2"
                                                required={num === 1} // 1권은 필수
                                            />
                                            <input
                                                name={`book${num}_author`}
                                                placeholder="저자 (선택)"
                                                className="input-primary w-full py-2 text-sm bg-secondary-50/50"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 text-base shadow-lg"
                        >
                            {loading ? '완료하는 중...' : 'Linedate 시작하기 ✨'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
