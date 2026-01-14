'use server';

import { createClient } from '@/lib/supabase/server';

export async function saveUnderline(formData: FormData) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { error: '로그인이 필요합니다.' };
        }

        const bookId = formData.get('bookId') as string;
        const content = formData.get('content') as string;
        const monthYear = new Date().toISOString().slice(0, 7); // '2026-01'

        if (!content || content.length < 10) {
            return { error: '밑줄(코멘트)은 10자 이상 작성해주세요.' };
        }

        const { error } = await supabase
            .from('underlines')
            .insert({
                user_id: user.id,
                book_id: bookId,
                content,
                month_year: monthYear
            });

        if (error) {
            console.error('Save Underline DB Error:', error);
            return { error: `저장 실패: ${error.message}` };
        }

        // 성공 시 success true 리턴 (클라이언트에서 redirect 처리)
        return { success: true };

    } catch (e: any) {
        console.error('Save Underline System Error:', e);
        return { error: `시스템 오류: ${e.message}` };
    }
}
