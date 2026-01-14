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
                // Primary: Deep Navy (신뢰감)
                primary: {
                    50: '#f0f4f8',
                    100: '#d9e2ec',
                    200: '#bcccdc',
                    300: '#9fb3c8',
                    400: '#829ab1',
                    500: '#627d98',
                    600: '#486581',
                    700: '#334e68',
                    800: '#243b53',
                    900: '#102a43',
                },
                // Secondary: Ivory/Paper (따스함)
                secondary: {
                    50: '#fffffe',
                    100: '#fdfcfb',
                    200: '#faf8f5',
                    300: '#f5f0e8',
                    400: '#e8dfd3',
                    500: '#d4c8b8',
                },
                // Background & Surface
                background: '#fdfcfb',
                surface: '#ffffff',
                // Accent
                accent: {
                    warm: '#c9a87c',
                    coral: '#e07a5f',
                },
            },
            fontFamily: {
                sans: ['var(--font-pretendard)', 'Pretendard', 'system-ui', 'sans-serif'],
                serif: ['var(--font-noto-serif)', 'Noto Serif KR', 'Georgia', 'serif'],
            },
            boxShadow: {
                'book': '0 4px 6px -1px rgba(16, 42, 67, 0.1), 0 2px 4px -1px rgba(16, 42, 67, 0.06)',
                'book-hover': '0 10px 15px -3px rgba(16, 42, 67, 0.15), 0 4px 6px -2px rgba(16, 42, 67, 0.08)',
                'card': '0 1px 3px rgba(16, 42, 67, 0.08), 0 1px 2px rgba(16, 42, 67, 0.06)',
            },
            animation: {
                'blur-reveal': 'blur-reveal 0.8s ease-out forwards',
                'fade-in': 'fade-in 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.5s ease-out forwards',
            },
            keyframes: {
                'blur-reveal': {
                    '0%': { filter: 'blur(10px)' },
                    '100%': { filter: 'blur(0px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
