'use client';

import { useState } from 'react';
import { signIn, signUp } from '@/app/actions/auth';

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError('');
        setMessage('');

        if (isSignUp) {
            const result = await signUp(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.message) {
                setMessage(result.message);
            }
        } else {
            const result = await signIn(formData);
            if (result?.error) {
                setError(result.error);
            }
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#fefcfa] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* 로고 영역 */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-3xl">📖</span>
                        <span className="font-serif text-2xl font-bold text-foreground">Linedate</span>
                    </div>
                    <h1 className="font-serif text-3xl font-semibold mb-2 text-foreground">
                        {isSignUp ? '첫 인연을 시작해볼까요?' : '다시 만나서 반가워요'}
                    </h1>
                    <p className="text-foreground/60">
                        {isSignUp
                            ? '책 취향으로 만나는 특별한 인연'
                            : '오늘도 밑줄 긋는 하루 되세요'}
                    </p>
                </div>

                {/* 폼 카드 */}
                <div className="bg-white p-8 rounded-3xl shadow-book border border-secondary-200">
                    <form action={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2">
                                이메일
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="input-primary w-full"
                                placeholder="example@linedate.kr"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground/70 mb-2">
                                비밀번호
                            </label>
                            <input
                                name="password"
                                type="password"
                                required
                                className="input-primary w-full"
                                placeholder="******"
                                minLength={6}
                            />
                        </div>

                        {/* 메시지 표시 */}
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
                                {error}
                            </div>
                        )}
                        {message && (
                            <div className="p-3 bg-green-50 text-green-600 text-sm rounded-xl text-center">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        >
                            {loading ? '처리 중...' : (isSignUp ? '가입하기' : '로그인')}
                        </button>
                    </form>

                    {/* 전환 버튼 */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError('');
                                setMessage('');
                            }}
                            className="text-sm text-foreground/50 hover:text-primary-600 transition-colors underline decoration-primary-200 underline-offset-4"
                        >
                            {isSignUp
                                ? '이미 계정이 있으신가요? 로그인'
                                : '아직 계정이 없으신가요? 회원가입'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
