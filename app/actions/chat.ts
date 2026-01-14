'use server';

import { createClient } from '@/lib/supabase/server';
import { useUnderlines } from './billing';
import { revalidatePath } from 'next/cache';

export async function sendMessage(roomId: string, content: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    // 1. 메시지 저장
    const { error } = await supabase
        .from('messages')
        .insert({
            room_id: roomId,
            sender_id: user.id,
            content,
        });

    if (error) return { error: error.message };

    // 2. 채팅방 최신 메시지 업데이트
    await supabase
        .from('chat_rooms')
        .update({
            last_message: content,
            last_message_at: new Date().toISOString()
        })
        .eq('id', roomId);

    // 3. 봇 자동 응답 로직 (Bot ID: 0000...0001)
    if (user.id !== '00000000-0000-0000-0000-000000000001' && roomId.includes('00000000-0000-0000-0000-000000000001')) {
        const botId = '00000000-0000-0000-0000-000000000001';
        const botReplies = [
            "그렇군요! 정말 흥미로운 생각이에요. 🤔",
            "책의 그 부분이 저도 참 좋았어요.",
            "저랑 취향이 비슷하시네요! 찌찌뽕! 👉👈",
            "더 자세히 이야기해주실 수 있나요?",
            "오늘 날씨랑 잘 어울리는 이야기네요.",
            "혹시 다른 책도 좋아하시나요?",
            "밑줄 그은 문장이 정말 인상적이었어요.",
            "맞아요, 저도 그렇게 생각합니다."
        ];
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];

        // Vercel Server Function에서 타이머는 불안정하므로 짧은 지연 후 실행
        // 실제로는 Edge Function + CRON이나 Queue를 써야 함
        await new Promise(resolve => setTimeout(resolve, 500));

        await supabase.from('messages').insert({
            room_id: roomId,
            sender_id: botId,
            content: randomReply
        });

        await supabase.from('chat_rooms').update({
            last_message: randomReply,
            updated_at: new Date().toISOString()
        }).eq('id', roomId);
    }

    return { success: true };
}

export async function unlockProfile(roomId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    // 1. 재화 사용 (5개)
    const billingResult = await useUnderlines(5, '프로필 즉시 공개');
    if (billingResult.error) {
        return { error: billingResult.error }; // 'insufficient_balance' etc
    }

    // 2. Chat Room 업데이트 (unlocked_by 배열에 내 ID 추가)
    // 기존 배열 가져오기
    const { data: room } = await supabase
        .from('chat_rooms')
        .select('unlocked_by')
        .eq('id', roomId)
        .single();

    const currentUnlocked = (room?.unlocked_by as string[]) || [];

    if (!currentUnlocked.includes(user.id)) {
        const { error } = await supabase
            .from('chat_rooms')
            .update({
                unlocked_by: [...currentUnlocked, user.id]
            })
            .eq('id', roomId);

        if (error) return { error: error.message };
    }

    revalidatePath(`/chat/${roomId}`);
    return { success: true };
}
