'use server';

import { createClient } from '@/lib/supabase/server';

export async function checkMatchStatus(myUnderlineId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { status: 'error', message: 'Unauthorized' };

    // 1. 내 밑줄 정보 가져오기
    const { data: myUnderline } = await supabase
        .from('underlines')
        .select('*')
        .eq('id', myUnderlineId) // ID로 조회하거나 (인자가 ID일 경우)
        // 또는 가장 최근 밑줄
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!myUnderline) {
        // 인자가 없거나 조회가 안되면 가장 최근 것 조회
        const { data: recent } = await supabase
            .from('underlines')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (!recent) return { status: 'waiting' }; // 아직 밑줄 없음

        // 재귀 호출 방지 위해 변수 사용
        // 여기선 로직 흐름상 recent를 myUnderline으로 씀
        // (변수 const myUnderline 재할당 불가하므로 아래 로직에 recent 사용)
        return processMatch(supabase, user, recent);
    }

    return processMatch(supabase, user, myUnderline);
}

// 헬퍼 함수
async function processMatch(supabase: any, user: any, myUnderline: any) {
    // 2. 이미 매칭된 채팅방이 있는지 확인
    const { data: existingRooms } = await supabase
        .from('chat_rooms')
        .select('*')
        .contains('users', [user.id])
        .eq('book_id', myUnderline.book_id)
        .eq('is_active', true);

    if (existingRooms && existingRooms.length > 0) {
        // 상대방 이름 찾기
        const room = existingRooms[0];
        const partnerId = room.users.find((u: string) => u !== user.id);

        const { data: partnerUser } = await supabase
            .from('users')
            .select('nickname')
            .eq('id', partnerId)
            .single();

        return {
            status: 'matched',
            roomId: room.id,
            partnerName: partnerUser?.nickname || '알 수 없음',
            bookId: room.book_id
        };
    }

    // 3. 매칭 대기 중인 다른 유저 찾기
    const { data: potentialMatches } = await supabase
        .from('underlines')
        .select('*, users!inner(*)')
        .eq('book_id', myUnderline.book_id)
        .neq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

    if (potentialMatches && potentialMatches.length > 0) {
        const partner = potentialMatches[0];
        const roomId = [user.id, partner.user_id].sort().join('-');

        // 채팅방 생성
        const { error } = await supabase
            .from('chat_rooms')
            .upsert({
                id: roomId,
                users: [user.id, partner.user_id].sort(),
                book_id: myUnderline.book_id,
                is_active: true
            }, { onConflict: 'id' });

        if (!error) {
            return {
                status: 'matched',
                roomId,
                partnerName: partner.users.nickname || '익명의 독서가',
                bookId: myUnderline.book_id
            };
        }
    } else {
        // 4. 매칭 대상이 없을 경우 -> 자동 매칭 (RPC 호출)
        // 봇과 매칭을 시도합니다.
        const { data: autoMatchResult, error: rpcError } = await supabase.rpc('request_auto_match', {
            target_book_id: myUnderline.book_id,
            user_id: user.id
        });

        if (!rpcError && autoMatchResult) {
            return autoMatchResult;
        } else if (rpcError) {
            console.error("Auto-match RPC Error:", rpcError);
        }
    }

    return { status: 'waiting' };
}
