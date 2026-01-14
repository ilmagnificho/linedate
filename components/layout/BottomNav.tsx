'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    // 로그인, 온보딩 페이지, 랜딩 페이지에서는 숨김 (랜딩은 선택적이지만 앱 느낌을 위해 숨길 수 있음)
    // 여기서는 앱 내부 진입 후(책 선택, 채팅 등)에만 보이도록 설정
    if (pathname === '/login' || pathname.startsWith('/onboarding') || pathname === '/') return null;

    const navItems = [
        { href: '/select', label: '서재', icon: '📚' },
        { href: '/waiting', label: '매칭', icon: '💕' }, // 대기/매칭 상태 확인용
        { href: '/store', label: '스토어', icon: '⚡' },
        { href: '/profile', label: '프로필', icon: '👤' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-secondary-200 pb-safe pt-2 px-6 shadow-[0_-5px_20px_rgba(0,0,0,0.03)] md:hidden">
            <div className="flex items-center justify-between max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 transition-all duration-300 ${isActive ? 'text-primary-600 scale-105' : 'text-foreground/40 hover:text-primary-400'}`}
                        >
                            <span className={`text-2xl transition-transform ${isActive ? 'animate-bounce-soft' : ''}`}>{item.icon}</span>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
