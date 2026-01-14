'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // User Data
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUserId(user.id);

            const { data } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (data) {
                setNickname(data.nickname || '');
                setBalance(data.underlines_balance || 0);
            }
            setLoading(false);
        };
        fetchUser();
    }, [router, supabase]);

    const handleSave = async () => {
        setSaving(true);
        const { error } = await supabase
            .from('users')
            .update({ nickname })
            .eq('id', userId);

        setSaving(false);
        if (error) alert('저장 실패: ' + error.message);
        else alert('프로필이 업데이트되었습니다.');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    if (loading) return <div className="p-8 text-center text-foreground/50">로딩 중...</div>;

    return (
        <main className="min-h-screen bg-[#fefcfa] p-6 pb-24">
            <header className="flex items-center gap-4 mb-8">
                <button onClick={() => router.back()} className="text-2xl">←</button>
                <h1 className="font-serif text-2xl font-bold text-foreground">내 프로필</h1>
            </header>

            <div className="space-y-6">
                {/* 기본 정보 */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-100">
                    <label className="block text-sm font-medium text-foreground/60 mb-2">닉네임</label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-full p-4 bg-secondary-50 rounded-xl border border-transparent focus:border-primary-300 outline-none"
                    />
                </div>

                {/* 내 지갑 */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 p-6 rounded-3xl shadow-lg text-white">
                    <p className="text-primary-100 text-sm mb-1">보유 밑줄</p>
                    <div className="flex items-end justify-between">
                        <h2 className="text-4xl font-serif font-bold">{balance}개</h2>
                        <button
                            onClick={() => router.push('/store')}
                            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                        >
                            충전하기
                        </button>
                    </div>
                </div>

                {/* 계정 관리 */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-secondary-100">
                    <h3 className="font-bold text-lg mb-4">계정 관리</h3>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left py-3 text-red-500 hover:bg-red-50 rounded-lg px-2 transition-colors"
                    >
                        로그아웃
                    </button>
                </div>

                {/* 저장 버튼 */}
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full btn-primary py-4 text-lg shadow-lg"
                >
                    {saving ? '저장 중...' : '변경사항 저장'}
                </button>
            </div>
        </main>
    );
}
