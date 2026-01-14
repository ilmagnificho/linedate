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
