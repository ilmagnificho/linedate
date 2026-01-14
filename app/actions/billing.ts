'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function chargeUnderlines(amount: number) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return { error: '로그인이 필요합니다.' };

        console.log(`[Billing] Charge request: User ${user.id}, Amount ${amount}`);

        // 1. 트랜잭션 기록
        const { error: txError } = await supabase
            .from('underline_transactions')
            .insert({
                user_id: user.id,
                amount: amount,
                type: 'charge',
                description: '밑줄 충전 (Store Purchase)'
            });

        if (txError) {
            console.error('[Billing] Transaction insert error:', txError);
            return { error: `트랜잭션 기록 실패: ${txError.message}` };
        }

        // 2. 유저 잔액 업데이트
        // 안전하게 현재 잔액 다시 조회
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('underlines_balance')
            .eq('id', user.id)
            .single();

        if (fetchError) {
            console.error('[Billing] User fetch error:', fetchError);
            return { error: '사용자 정보 조회 실패' };
        }

        const currentBalance = userData?.underlines_balance || 0;
        const newBalance = currentBalance + amount;

        const { error: updateError } = await supabase
            .from('users')
            .update({ underlines_balance: newBalance })
            .eq('id', user.id);

        if (updateError) {
            console.error('[Billing] Balance update error:', updateError);
            return { error: `잔액 업데이트 실패: ${updateError.message}` };
        }

        revalidatePath('/store');
        return { success: true, newBalance };

    } catch (e: any) {
        console.error('[Billing] System error:', e);
        return { error: `시스템 오류: ${e.message}` };
    }
}

export async function useUnderlines(amount: number, description: string) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return { error: 'Unauthorized' };

        // 잔액 확인
        const { data: userData } = await supabase
            .from('users')
            .select('underlines_balance')
            .eq('id', user.id)
            .single();

        const currentBalance = userData?.underlines_balance || 0;

        if (currentBalance < amount) {
            return { error: 'insufficient_balance' };
        }

        // 1. 트랜잭션 기록
        const { error: txError } = await supabase
            .from('underline_transactions')
            .insert({
                user_id: user.id,
                amount: -amount, // 음수로 기록
                type: 'use',
                description
            });

        if (txError) return { error: txError.message };

        // 2. 잔액 차감
        const { error: updateError } = await supabase
            .from('users')
            .update({ underlines_balance: currentBalance - amount })
            .eq('id', user.id);

        if (updateError) return { error: updateError.message };

        revalidatePath('/store');
        return { success: true, remainingBalance: currentBalance - amount };
    } catch (e: any) {
        console.error('[Billing] Use error:', e);
        return { error: e.message };
    }
}

export async function getBalance() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { data } = await supabase
        .from('users')
        .select('underlines_balance')
        .eq('id', user.id)
        .single();

    return data?.underlines_balance || 0;
}
