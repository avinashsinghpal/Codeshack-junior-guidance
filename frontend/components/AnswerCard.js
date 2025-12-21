'use client';

import { useState } from 'react';
import MentorBadge from './MentorBadge';

export default function AnswerCard({ answer }) {
    const [upvoted, setUpvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(answer.upvotes);

    const handleUpvote = () => {
        if (upvoted) {
            setUpvoteCount(upvoteCount - 1);
            setUpvoted(false);
        } else {
            setUpvoteCount(upvoteCount + 1);
            setUpvoted(true);
        }
    };

    return (
        <div className="p-4 border-b border-x-border">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                    {answer.authorName.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-x-text">{answer.authorName}</span>
                        {answer.authorRole === 'mentor' && <MentorBadge />}
                        <span className="text-x-text-secondary text-sm">
                            · {new Date(answer.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <p className="text-x-text whitespace-pre-wrap mb-3">{answer.content}</p>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleUpvote}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors ${upvoted
                                    ? 'bg-x-success/10 text-x-success'
                                    : 'text-x-text-secondary hover:bg-x-success/10 hover:text-x-success'
                                }`}
                        >
                            <span className="text-lg">↑</span>
                            <span className="text-sm font-medium">{upvoteCount}</span>
                        </button>

                        <button className="text-x-text-secondary hover:text-x-blue text-sm">
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
