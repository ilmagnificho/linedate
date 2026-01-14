'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// 목업 데이터
const MOCK_PARTNER = {
    id: 'partner-1',
    nickname: '책읽는고양이',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
};

const MOCK_BOOK = {
    title: '미드나잇 라이브러리',
    author: '매트 헤이그',
    icebreaker: '살면서 "그때 다른 선택을 했다면..." 하고 후회한 적 있으신가요?',
};

const MOCK_MY_ID = 'my-id';

interface Message {
    id: string;
    sender_id: string;
    content: string;
    created_at: string;
}

// 자동 응답 메시지
const AUTO_REPLIES = [
    '저도 그 부분이 정말 인상 깊었어요 ✨',
    '맞아요, 책을 읽으면서 저도 비슷한 생각을 했어요',
    '그 장면에서 저는 눈물이 났었어요 🥹',
    '혹시 다른 매트 헤이그 책도 읽어보셨어요?',
    '저는 요즘 에세이도 자주 읽는 편이에요',
    '오늘 날씨가 책 읽기 좋은 것 같아요 📚',
    '주말에 주로 어디서 책 읽으세요?',
    '카페에서 책 읽는 거 좋아하시나요? ☕',
];

export default function ChatRoomPage() {
    const params = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const replyIndexRef = useRef(0);

    const messageCount = messages.length;
    const isRevealed = messageCount >= 20;
    const progress = Math.min(100, (messageCount / 20) * 100);

    // 스크롤 자동 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            sender_id: MOCK_MY_ID,
            content: inputValue,
            created_at: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue('');

        // 자동 응답 (데모용)
        setTimeout(() => {
            const replyMessage: Message = {
                id: `msg-${Date.now()}-reply`,
                sender_id: MOCK_PARTNER.id,
                content: AUTO_REPLIES[replyIndexRef.current % AUTO_REPLIES.length],
                created_at: new Date().toISOString(),
            };
            replyIndexRef.current += 1;
            setMessages((prev) => [...prev, replyMessage]);
        }, 1200);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <main className="h-screen flex flex-col bg-[#fefcfa]">
            {/* 헤더 */}
            <header className="sticky top-0 z-10 bg-white border-b border-secondary-200 px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* 뒤로가기 */}
                    <Link href="/select" className="p-2 hover:bg-secondary-100 rounded-full transition-colors">
                        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    {/* 프로필 */}
                    <div className="relative">
                        {/* 프로그레스 링 */}
                        <svg className="w-14 h-14 -rotate-90">
                            <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="#f5f0e3"
                                strokeWidth="3"
                            />
                            <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="#df5f79"
                                strokeWidth="3"
                                strokeDasharray={`${progress * 1.51} 151`}
                                strokeLinecap="round"
                                className="transition-all duration-500"
                            />
                        </svg>
                        {/* 아바타 */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img
                                    src={MOCK_PARTNER.avatar_url}
                                    alt={MOCK_PARTNER.nickname}
                                    className={`w-full h-full object-cover transition-all duration-700 ${isRevealed ? 'blur-0' : 'blur-[8px]'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* 정보 */}
                    <div className="flex-1">
                        <h1 className="font-semibold text-foreground">
                            {isRevealed ? MOCK_PARTNER.nickname : '익명의 독서가'}
                        </h1>
                        <p className="text-xs text-foreground/50">
                            📖 {MOCK_BOOK.title}
                        </p>
                    </div>

                    {/* 프로그레스 텍스트 */}
                    <div className="text-right">
                        {isRevealed ? (
                            <span className="text-xs text-primary-500 font-medium">💕 프로필 공개!</span>
                        ) : (
                            <span className="text-xs text-foreground/50">{messageCount}/20 메시지</span>
                        )}
                    </div>
                </div>
            </header>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                {/* 아이스브레이커 */}
                {messages.length === 0 && (
                    <div className="mb-8 p-6 bg-white rounded-2xl border border-secondary-200 text-center">
                        <div className="text-3xl mb-3">📖</div>
                        <h3 className="font-serif font-semibold text-foreground mb-2">
                            {MOCK_BOOK.title}
                        </h3>
                        <p className="text-sm text-foreground/60 mb-4">
                            같은 책을 선택한 인연이에요
                        </p>
                        <div className="p-4 bg-primary-50 rounded-xl">
                            <p className="text-sm text-primary-700 font-medium">
                                💬 {MOCK_BOOK.icebreaker}
                            </p>
                        </div>
                    </div>
                )}

                {/* 메시지 리스트 */}
                <div className="space-y-4">
                    {messages.map((message) => {
                        const isOwn = message.sender_id === MOCK_MY_ID;
                        return (
                            <div
                                key={message.id}
                                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[75%] ${isOwn ? 'order-2' : ''}`}>
                                    <div
                                        className={`px-4 py-3 ${isOwn
                                                ? 'message-own'
                                                : 'message-other'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.content}</p>
                                    </div>
                                    <p className={`text-xs text-foreground/40 mt-1 ${isOwn ? 'text-right' : ''}`}>
                                        {formatTime(message.created_at)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div ref={messagesEndRef} />
            </div>

            {/* 입력 영역 */}
            <div className="sticky bottom-0 bg-white border-t border-secondary-200 p-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="메시지를 입력하세요..."
                        className="input-primary flex-1"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim()}
                        className="w-11 h-11 bg-primary-500 hover:bg-primary-600 disabled:bg-secondary-300 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </main>
    );
}
