'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageBubble from '@/components/chat/MessageBubble';
import IceBreaker from '@/components/chat/IceBreaker';
import { useChatReveal } from '@/hooks/useChatReveal';
import { Message, User, Book } from '@/types/database';

// Mock data
const MOCK_PARTNER: User = {
    id: 'partner-1',
    email: 'partner@example.com',
    nickname: '책읽는고양이',
    gender: 'female',
    avatar_url: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

const MOCK_BOOK = {
    title: '미드나잇 라이브러리',
    author: '매트 헤이그',
};

const MOCK_MY_ID = 'my-user-id';

export default function ChatRoomPage() {
    const params = useParams();
    const roomId = params.roomId as string;

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 블러 로직 훅 - 실제로는 Supabase 연동
    const messageCount = messages.length;
    const isRevealed = messageCount >= 20;

    // 스크롤 자동 이동
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isSending) return;

        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            match_id: roomId,
            sender_id: MOCK_MY_ID,
            content: inputValue.trim(),
            created_at: new Date().toISOString(),
        };

        setIsSending(true);
        setInputValue('');

        // 메시지 추가
        setMessages(prev => [...prev, newMessage]);

        // Mock: 상대방 자동 응답 (데모용)
        setTimeout(() => {
            const responses = [
                "저도 그 장면이 정말 인상깊었어요!",
                "오, 저랑 비슷한 생각이시네요 😊",
                "그 부분을 그렇게 해석하셨군요. 흥미로워요.",
                "맞아요, 저도 그 문장에 밑줄 그었어요!",
                "와, 저도 비슷한 경험이 있어요.",
                "그 책 읽으면서 많이 생각하게 됐어요.",
            ];

            const autoReply: Message = {
                id: `msg-${Date.now()}-reply`,
                match_id: roomId,
                sender_id: MOCK_PARTNER.id,
                content: responses[Math.floor(Math.random() * responses.length)],
                created_at: new Date().toISOString(),
            };

            setMessages(prev => [...prev, autoReply]);
            setIsSending(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <main className="h-screen flex flex-col bg-background">
            {/* 헤더 */}
            <ChatHeader
                partner={MOCK_PARTNER}
                bookTitle={MOCK_BOOK.title}
                messageCount={messageCount}
                isRevealed={isRevealed}
            />

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto">
                {/* 아이스브레이커 (첫 메시지 전) */}
                {messages.length === 0 && (
                    <IceBreaker
                        bookTitle={MOCK_BOOK.title}
                        bookAuthor={MOCK_BOOK.author}
                    />
                )}

                {/* 메시지 목록 */}
                <div className="px-4 py-4">
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            message={message}
                            isOwn={message.sender_id === MOCK_MY_ID}
                        />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* 프로필 공개 알림 */}
                {isRevealed && messages.length === 20 && (
                    <div className="mx-4 mb-4 p-4 bg-accent-coral/10 border border-accent-coral/30 rounded-xl text-center">
                        <span className="text-2xl mb-2 block">✨</span>
                        <p className="text-accent-coral font-medium">
                            프로필이 공개되었어요!
                        </p>
                        <p className="text-sm text-primary-600 mt-1">
                            이제 서로의 프로필을 확인할 수 있어요
                        </p>
                    </div>
                )}
            </div>

            {/* 입력 영역 */}
            <div className="border-t border-secondary-300 bg-white p-4">
                <div className="flex items-end gap-3 max-w-4xl mx-auto">
                    <div className="flex-1 relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="메시지를 입력하세요..."
                            rows={1}
                            className="
                w-full px-4 py-3 pr-12
                bg-secondary-100 border border-secondary-300 
                rounded-2xl resize-none
                text-primary-900 placeholder:text-primary-400
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-200
              "
                            style={{ maxHeight: '120px' }}
                        />
                    </div>

                    <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isSending}
                        className={`
              p-3 rounded-full transition-all duration-200
              ${inputValue.trim() && !isSending
                                ? 'bg-primary-900 text-white hover:bg-primary-800 shadow-md'
                                : 'bg-secondary-200 text-primary-400 cursor-not-allowed'
                            }
            `}
                    >
                        {isSending ? (
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* 진행 상황 안내 */}
                {!isRevealed && (
                    <div className="mt-3 text-center">
                        <div className="inline-flex items-center gap-2 text-xs text-primary-500">
                            <div className="w-24 h-1.5 bg-secondary-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary-600 transition-all duration-300"
                                    style={{ width: `${(messageCount / 20) * 100}%` }}
                                />
                            </div>
                            <span>{messageCount}/20 프로필 공개까지</span>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
