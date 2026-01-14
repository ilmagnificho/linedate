'use client';

import { Message } from '@/types/database';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 message-bubble`}>
            <div className={`max-w-[75%] ${isOwn ? 'order-1' : 'order-2'}`}>
                {/* 메시지 버블 */}
                <div
                    className={`
            px-4 py-2.5 rounded-2xl
            ${isOwn
                            ? 'bg-primary-900 text-white rounded-br-md'
                            : 'bg-secondary-200 text-primary-900 rounded-bl-md'
                        }
          `}
                >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                    </p>
                </div>

                {/* 시간 */}
                <div className={`mt-1 text-xs text-primary-400 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.created_at)}
                </div>
            </div>
        </div>
    );
}
