import type { Metadata } from "next";
import { Noto_Serif_KR } from "next/font/google";
import "./globals.css";

// Noto Serif KR (Google Fonts)
const notoSerif = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DeckDrop - 책으로 만나는 블라인드 데이팅",
  description: "같은 문장에 밑줄 긋는 사람, 그게 운명 아닐까요? 얼굴보다 취향이 먼저인 블라인드 데이팅.",
  keywords: ["블라인드 데이팅", "도서", "책", "취향 매칭", "데이팅 앱"],
  openGraph: {
    title: "DeckDrop - 책으로 만나는 블라인드 데이팅",
    description: "같은 문장에 밑줄 긋는 사람을 찾아요. 얼굴보다 취향이 먼저 🔖",
    type: "website",
    locale: "ko_KR",
    siteName: "DeckDrop",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeckDrop - 책으로 만나는 블라인드 데이팅",
    description: "같은 문장에 밑줄 긋는 사람을 찾아요",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard CDN */}
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body
        className={`${notoSerif.variable} antialiased bg-background text-primary-900`}
        style={{ fontFamily: "'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
