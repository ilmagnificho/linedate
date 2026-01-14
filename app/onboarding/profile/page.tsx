'use client';

import { useState } from 'react';
import { updateProfile } from '@/app/actions/onboarding';

export default function ProfileSetupPage() {
    const [loading, setLoading] = useState(false);

    // 성별 선택 상태 (UI용)
    const [gender, setGender] = useState<string>('');

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        await updateProfile(formData);
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#fefcfa] px-4 py-12 flex flex-col items-center">
            <div className="w-full max-w-md">
                {/* 진행 상태 */}
                <div className="flex items-center gap-2 mb-8">
                    <div className="h-1 flex-1 bg-primary-500 rounded-full" />
                    <div className="h-1 flex-1 bg-secondary-200 rounded-full" />
                </div>

                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl font-semibold mb-2 text-foreground">
                        프로필을 완성해주세요
                    </h1>
                    <p className="text-foreground/60">
                        매칭된 상대방에게 단계적으로 공개됩니다.
                    </p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-book border border-secondary-200">
                    <form action={handleSubmit} className="space-y-6">
                        {/* 닉네임 */}
                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2">
                                닉네임
                            </label>
                            <input
                                name="nickname"
                                required
                                placeholder="상대방에게 보여질 이름"
                                className="input-primary w-full"
                                maxLength={10}
                            />
                        </div>

                        {/* 성별 */}
                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2">
                                성별
                            </label>
                            <div className="flex gap-4">
                                <label className={`flex-1 cursor-pointer p-4 rounded-xl border-2 transition-all ${gender === 'male' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-secondary-200 hover:border-primary-200'}`}>
                                    <input type="radio" name="gender" value="male" className="hidden" onChange={() => setGender('male')} required />
                                    <div className="text-center font-medium">남성</div>
                                </label>
                                <label className={`flex-1 cursor-pointer p-4 rounded-xl border-2 transition-all ${gender === 'female' ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-secondary-200 hover:border-primary-200'}`}>
                                    <input type="radio" name="gender" value="female" className="hidden" onChange={() => setGender('female')} required />
                                    <div className="text-center font-medium">여성</div>
                                </label>
                            </div>
                        </div>

                        {/* 나이대 */}
                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2">
                                나이대
                            </label>
                            <select name="age_range" required className="input-primary w-full appearance-none">
                                <option value="">선택해주세요</option>
                                <option value="20s_early">20대 초반 (20-23)</option>
                                <option value="20s_mid">20대 중반 (24-26)</option>
                                <option value="20s_late">20대 후반 (27-29)</option>
                                <option value="30s_early">30대 초반 (30-33)</option>
                                <option value="30s_mid">30대 중반 (34-36)</option>
                                <option value="30s_late">30대 후반 (37-39)</option>
                            </select>
                        </div>

                        {/* 지역 */}
                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2">
                                거주 지역
                            </label>
                            <select name="region" required className="input-primary w-full appearance-none">
                                <option value="">선택해주세요</option>
                                <option value="seoul">서울</option>
                                <option value="gyeonggi">경기/인천</option>
                                <option value="busan">부산/울산/경남</option>
                                <option value="daegu">대구/경북</option>
                                <option value="gwangju">광주/전라</option>
                                <option value="daejeon">대전/충청</option>
                                <option value="jeju">제주/강원</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 text-base mt-4"
                        >
                            {loading ? '저장 중...' : '다음 단계로 →'}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
