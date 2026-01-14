'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { THIS_MONTH_BOOKS } from '@/lib/books';
import { sendMessage, unlockProfile } from '@/app/actions/chat';
import { getBalance } from '@/app/actions/billing';

export default function ChatRoomPage() {
    const params = useParams();
    const roomId = params?.roomId as string;
    const listRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [myId, setMyId] = useState<string>('');
    const [partner, setPartner] = useState<any>(null);
    const [book, setBook] = useState<any>(null);
    const [partnerUnderline, setPartnerUnderline] = useState<string>('');

    // 추가 상태
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [balance, setBalance] = useState(0);

    const supabase = createClient();
    const messageCount = messages.length;
    // 공개 레벨 계산 (0~4단계) - 해금 여부 반영
    const baseRevealLevel = Math.floor(messageCount / 10);
    const revealLevel = isUnlocked ? 4 : baseRevealLevel;
    const progress = isUnlocked ? 100 : Math.min(100, (messageCount / 40) * 100);

    // 스크롤 하단 이동
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const initChat = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            setMyId(user.id);

            // 내 잔액 확인
            getBalance().then(setBalance);

            // 1. 이전 메시지 불러오기
            const { data: existingMessages } = await supabase
                .from('messages')
                .select('*')
                .eq('room_id', roomId)
                .order('created_at', { ascending: true });

            if (existingMessages) {
                setMessages(existingMessages);
            }

            // 2. 상대방 정보 가져오기
            const { data: roomData } = await supabase
                .from('chat_rooms')
                .select('*')
                .eq('id', roomId)
                .single();

            if (roomData) {
                // 해금 여부 확인
                const unlockedBy = (roomData.unlocked_by as string[]) || [];
                if (unlockedBy.includes(user.id)) {
                    setIsUnlocked(true);
                }

                // 상대방 ID 찾기
                const partnerId = (roomData.users as string[]).find((id: string) => id !== user.id);

                if (partnerId) {
                    const { data: partnerData } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', partnerId)
                        .single();
                    setPartner(partnerData);

                    // 상대방의 밑줄
                    const { data: underlineData } = await supabase
                        .from('underlines')
                        .select('*')
                        .eq('user_id', partnerId)
                        .limit(1)
                        .order('created_at', { ascending: false })
                        .single();

                    if (underlineData) setPartnerUnderline(underlineData.content);

                    // 책 정보
                    const bookId = roomData.book_id || underlineData?.book_id;
                    if (bookId) {
                        const b = THIS_MONTH_BOOKS.find(item => item.id === bookId);
                        setBook(b);
                    }
                }
            }
        };

        initChat();

        // 3. 실시간 구독
        const channel = supabase
            .channel(`room:${roomId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `room_id=eq.${roomId}`
            }, (payload) => {
                console.log('Realtime INSERT payload:', payload);
                setMessages((prev) => [...prev, payload.new]);
            })
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'chat_rooms',
                filter: `id=eq.${roomId}`
            }, (payload) => {
                // 채팅방 정보가 업데이트되면(해금 등) 확인
                const newRoom = payload.new;
                if (newRoom.unlocked_by && newRoom.unlocked_by.includes(myId)) {
                    setIsUnlocked(true);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomId, myId]); // myId가 설정된 후 재실행되어야 할 수도 있음

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;
        const content = inputValue;
        setInputValue('');
        await sendMessage(roomId, content);
    };

    const handleUnlock = async () => {
        if (balance < 5) {
            if (confirm('밑줄이 부족합니다 (5개 필요). 충전하러 가시겠습니까?')) {
                window.location.href = '/store';
            }
            return;
        }

        if (confirm('밑줄 5개를 사용하여 상대방의 프로필을 즉시 공개하시겠습니까?')) {
            const res = await unlockProfile(roomId);
            if (res.error) {
                alert('오류가 발생했습니다: ' + res.error);
            } else {
                setIsUnlocked(true); // 낙관적 업데이트
                setBalance(prev => prev - 5);
            }
        }
    };

    return (
        <main className="h-screen flex flex-col bg-[#fefcfa]">
            {/* 헤더 */}
            <header className="sticky top-0 z-10 bg-white border-b border-secondary-200 px-4 py-3">
                <div className="flex items-center gap-4">
                    <Link href="/select" className="p-2 hover:bg-secondary-100 rounded-full transition-colors">
                        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    {/* 프로필 이미지 & 공개도 */}
                    <div className="relative cursor-pointer" onClick={!isUnlocked ? handleUnlock : undefined}>
                        <svg className="w-14 h-14 -rotate-90">
                            <circle cx="28" cy="28" r="24" fill="none" stroke="#f5f0e3" strokeWidth="3" />
                            <circle cx="28" cy="28" r="24" fill="none" stroke="#df5f79" strokeWidth="3"
                                strokeDasharray={`${progress * 1.51} 151`} strokeLinecap="round" className="transition-all duration-500" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm bg-secondary-200 relative">
                                <div className={`w-full h-full bg-primary-200 flex items-center justify-center transition-all duration-700 ${revealLevel >= 3 ? 'blur-0' : 'blur-[8px]'}`}>
                                    <span className="text-xl">👤</span>
                                </div>
                                {!isUnlocked && revealLevel < 3 && (
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <span className="text-xs text-white pb-3">🔒</span>
                                        {/* 자물쇠 아이콘 */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h1 className="font-semibold text-foreground flex items-center gap-2">
                            {revealLevel >= 1 ? (partner?.nickname || '상대방') : '익명의 독서가'}
                            <span className="text-xs font-normal text-primary-500 px-2 py-0.5 bg-primary-50 rounded-full">
                                {isUnlocked ? '🔓 전체 공개' : `${revealLevel * 25}% 공개`}
                            </span>
                        </h1>
                        <p className="text-xs text-foreground/50">
                            📖 {book?.title || '로딩 중...'}
                        </p>
                    </div>

                    {/* 해금 버튼 (미공개 상태일 때만) */}
                    {!isUnlocked && revealLevel < 3 && (
                        <button
                            onClick={handleUnlock}
                            className="px-3 py-1.5 bg-secondary-100 hover:bg-secondary-200 rounded-full text-xs font-medium text-foreground/80 flex items-center gap-1 transition-colors"
                        >
                            <span>🔓 5개로 즉시 공개</span>
                        </button>
                    )}
                </div>
            </header>

            {/* 메시지 영역 */}
            <div className="flex-1 overflow-y-auto px-4 py-6 mb-20" ref={listRef}>
                {messages.length === 0 && partnerUnderline && (
                    <div className="mb-8 p-6 bg-white rounded-2xl border border-secondary-200 text-center shadow-sm">
                        <div className="text-3xl mb-3">💬</div>
                        <h3 className="font-serif font-semibold text-gray-800 mb-2">
                            {partner?.nickname || '상대방'}님의 밑줄
                        </h3>
                        <div className="p-4 bg-primary-50 rounded-xl relative">
                            <span className="absolute top-2 left-2 text-primary-300 text-2xl">❝</span>
                            <p className="text-sm text-primary-900 font-medium relative z-10 px-4 leading-relaxed">
                                {partnerUnderline}
                            </p>
                            <span className="absolute bottom-2 right-2 text-primary-300 text-2xl">❞</span>
                        </div>
                    </div>
                )}

                {messages.map((msg) => {
                    const isOwn = msg.sender_id === myId;
                    return (
                        <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${isOwn
                                    ? 'bg-primary-600 text-white rounded-br-none'
                                    : 'bg-white border border-secondary-200 text-gray-800 rounded-bl-none'
                                }`}>
                                {msg.content}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 입력창 (Bottom Nav 위에 고정) */}
            <div className="absolute bottom-[60px] left-0 w-full bg-white border-t border-secondary-200 p-3 z-20">
                <div className="flex items-center gap-3">
                    <Link href="/store" className="p-2 text-foreground/40 hover:text-primary-500 transition-colors" title="스토어 가기">
                        ⚡
                    </Link>
                    <input
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
                        ➤
                    </button>
                </div>
            </div>
        </main>
    );
}
