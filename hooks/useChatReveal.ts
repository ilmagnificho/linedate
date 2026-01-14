'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

interface UseChatRevealOptions {
    matchId: string;
    threshold?: number;
}

interface UseChatRevealReturn {
    messageCount: number;
    isRevealed: boolean;
    remainingMessages: number;
    progress: number;
    refreshCount: () => Promise<void>;
}

export function useChatReveal({
    matchId,
    threshold = 20
}: UseChatRevealOptions): UseChatRevealReturn {
    const [messageCount, setMessageCount] = useState(0);
    const supabase = createClient();

    const fetchMessageCount = useCallback(async () => {
        if (!matchId) return;

        try {
            const { count, error } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true })
                .eq('match_id', matchId);

            if (error) {
                console.error('Error fetching message count:', error);
                return;
            }

            setMessageCount(count || 0);
        } catch (err) {
            console.error('Failed to fetch message count:', err);
        }
    }, [matchId, supabase]);

    // 초기 로드
    useEffect(() => {
        fetchMessageCount();
    }, [fetchMessageCount]);

    // Realtime 구독으로 메시지 개수 실시간 업데이트
    useEffect(() => {
        if (!matchId) return;

        const channel = supabase
            .channel(`messages:${matchId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `match_id=eq.${matchId}`,
                },
                () => {
                    // 새 메시지가 들어오면 카운트 증가
                    setMessageCount((prev) => prev + 1);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [matchId, supabase]);

    const isRevealed = messageCount >= threshold;
    const remainingMessages = Math.max(0, threshold - messageCount);
    const progress = Math.min(100, (messageCount / threshold) * 100);

    return {
        messageCount,
        isRevealed,
        remainingMessages,
        progress,
        refreshCount: fetchMessageCount,
    };
}
