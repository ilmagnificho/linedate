'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { User, ReadingProfile } from '@/types/database';

export async function updateProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    const nickname = formData.get('nickname') as string;
    const age_range = formData.get('age_range') as string;
    const region = formData.get('region') as string;
    const gender = formData.get('gender') as string; // 'male' | 'female'

    const { error } = await supabase
        .from('users')
        .update({
            nickname,
            age_range,
            region,
            // gender 컬럼이 스키마에 있다면 추가 필요 (현재 스키마엔 빠져있음, 메타데이터용으로 nicknames에 섞거나 추가)
            // 일단 스키마에 gender가 없으므로 raw_user_meta_data에 저장하거나 스키마 추가 필요.
            // 여기서는 metadata에 저장.
            raw_user_meta_data: {
                ...user.user_metadata,
                gender
            }
        })
        .eq('id', user.id);

    if (error) {
        return { error: error.message };
    }

    // 성별/닉네임 업데이트 후 다음 단계로
    return redirect('/onboarding/reading');
}

export async function updateReadingProfile(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: '로그인이 필요합니다.' };
    }

    const reading_frequency = formData.get('reading_frequency') as string;
    const preferred_genres = formData.getAll('preferred_genres') as string[];

    // 좋아하는 책 3권 (JSON 처리)
    const book1 = { title: formData.get('book1_title'), author: formData.get('book1_author') };
    const book2 = { title: formData.get('book2_title'), author: formData.get('book2_author') };
    const book3 = { title: formData.get('book3_title'), author: formData.get('book3_author') };

    const favorite_books = [book1, book2, book3].filter(b => b.title && b.author);

    // 1. Users 테이블 업데이트 (빈도)
    const { error: userError } = await supabase
        .from('users')
        .update({ reading_frequency })
        .eq('id', user.id);

    if (userError) return { error: userError.message };

    // 2. Reading Profile 생성/업데이트
    const { error: profileError } = await supabase
        .from('reading_profiles')
        .upsert({
            user_id: user.id,
            preferred_genres,
            favorite_books
        });

    if (profileError) return { error: profileError.message };

    return redirect('/');
}
