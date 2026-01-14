'use client';

import { useState, useEffect } from 'react';
import { chargeUnderlines, getBalance } from '@/app/actions/billing';
import Link from 'next/link';

const PRODUCTS = [
    { amount: 10, price: 4900, label: '가벼운 시작' },
    { amount: 30, price: 12900, label: '베스트 셀러', popular: true },
    { amount: 50, price: 19900, label: '헤비 리더' },
    { amount: 100, price: 35000, label: '평생 소장' },
];

export default function StorePage() {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getBalance().then(setBalance);
    }, []);

    const handlePurchase = async (amount: number) => {
        if (!confirm(`${amount} 밑줄을 충전하시겠습니까?\n(현재 시뮬레이션 모드로 실제 결제 없이 무료 충전됩니다.)`)) return;

        setLoading(true);
        // 실제 결제 로직 연결 부분 (PG사 SDK 등)
        // 여기서는 바로 충전 처리
        const res = await chargeUnderlines(amount);

        if (res.success) {
            alert('충전이 완료되었습니다! 💳');
            setBalance(res.newBalance!);
        } else {
            alert('오류가 발생했습니다: ' + (res.error || '알 수 없는 오류'));
        }
        setLoading(false);
    };

    return (
        <main className="min-h-screen bg-[#fefcfa]">
            {/* 헤더 */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-secondary-200 px-6 py-4 flex items-center justify-between">
                <Link href="/select" className="font-serif font-bold text-foreground">
                    Linedate
                </Link>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-secondary-100 rounded-full text-sm font-medium text-foreground/80">
                        <span>✐ 보유 밑줄:</span>
                        <span className="text-primary-600 font-bold">{balance}개</span>
                    </div>
                    <Link href="/profile" className="text-sm font-medium text-primary-600 hover:text-primary-800 transition-colors px-3 py-1.5 rounded-full hover:bg-secondary-50">
                        내 프로필
                    </Link>
                </div>
            </header>

            <div className="max-w-2xl mx-auto px-6 py-10">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
                        밑줄 충전소
                    </h1>
                    <p className="text-foreground/60">
                        밑줄이 부족하신가요?<br />
                        충전한 밑줄로 더 많은 인연을 만나보세요.
                    </p>
                </div>

                {/* 상품 목록 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PRODUCTS.map((prod) => (
                        <button
                            key={prod.amount}
                            onClick={() => handlePurchase(prod.amount)}
                            disabled={loading}
                            className={`relative p-6 rounded-2xl border-2 text-left transition-all ${prod.popular
                                ? 'border-primary-500 bg-primary-50 hover:shadow-lg'
                                : 'border-secondary-200 bg-white hover:border-primary-300 hover:shadow-md'
                                }`}
                        >
                            {prod.popular && (
                                <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                    BEST
                                </span>
                            )}
                            <div className="text-sm font-medium text-foreground/50 mb-1">
                                {prod.label}
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="font-serif text-2xl font-bold text-foreground">
                                    {prod.amount}개
                                </span>
                                <span className="text-lg font-medium text-primary-600">
                                    {prod.price.toLocaleString()}원
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-12 p-6 bg-secondary-50 rounded-2xl border border-secondary-200">
                    <h3 className="font-serif font-semibold text-foreground mb-2">
                        어디에 사용할 수 있나요?
                    </h3>
                    <ul className="text-sm text-foreground/70 space-y-2 list-disc list-inside">
                        <li>매칭된 상대의 <strong>프로필 즉시 공개</strong> (5개)</li>
                        <li>월 1회 무료 매칭 소진 시 <strong>추가 매칭</strong> (2개)</li>
                        <li>상대방에게 <strong>슈퍼 밑줄(강조)</strong> 보내기 (3개) - 준비 중</li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
