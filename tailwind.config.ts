import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Linedate 여성 친화적 색상 팔레트
                primary: {
                    50: '#fdf4f5',
                    100: '#fce8eb',
                    200: '#f9d5db',
                    300: '#f4b4bf',
                    400: '#ec899b',
                    500: '#df5f79',  // 메인 로즈 핑크
                    600: '#cb3d5d',
                    700: '#ab2f4c',
                    800: '#8f2a44',
                    900: '#7a273f',
                },
                secondary: {
                    50: '#fefdfb',
                    100: '#fdfcf7',
                    200: '#faf7ef',
                    300: '#f5f0e3',
                    400: '#ede4d3',
                    500: '#e2d4be',  // 크림/아이보리
                    600: '#d4c3a8',
                    700: '#c2ac8a',
                    800: '#a89170',
                    900: '#8a7659',
                },
                accent: {
                    rose: '#e8a4b0',      // 부드러운 로즈
                    lavender: '#c4b5dc',  // 라벤더
                    sage: '#a8c3b5',      // 세이지 그린
                    peach: '#f5c4a1',     // 피치
                    cream: '#faf6f0',     // 크림
                },
                background: '#fefcfa',  // 따뜻한 화이트
                foreground: '#4a3f3a',  // 부드러운 다크 브라운
            },
            fontFamily: {
                sans: ["'Pretendard Variable'", "Pretendard", "-apple-system", "system-ui", "sans-serif"],
                serif: ["var(--font-noto-serif)", "'Noto Serif KR'", "Georgia", "serif"],
            },
            boxShadow: {
                'book': '0 4px 14px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
                'book-hover': '0 8px 30px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06)',
                'soft': '0 2px 8px rgba(0, 0, 0, 0.06)',
                'card': '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
            },
            animation: {
                'blur-reveal': 'blurReveal 0.8s ease-out forwards',
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.4s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
            },
            keyframes: {
                blurReveal: {
                    '0%': { filter: 'blur(12px)', opacity: '0.6' },
                    '100%': { filter: 'blur(0px)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.25rem',
                '3xl': '1.5rem',
            },
        },
    },
    plugins: [],
};

export default config;
