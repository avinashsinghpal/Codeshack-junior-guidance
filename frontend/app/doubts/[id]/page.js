'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MentorBadge from '@/components/MentorBadge';
import Tag from '@/components/Tag';
import { doubts, answers, comments } from '@/data/mockData';
import { getCurrentUser, isMentor, isJunior } from '@/utils/auth';

export default function DoubtDetailPage({ params }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [answerContent, setAnswerContent] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const doubtId = parseInt(params.id);
    const doubt = doubts.find(d => d.id === doubtId);
    const doubtAnswers = answers.filter(a => a.doubtId === doubtId);
    const doubtComments = comments.filter(c => c.doubtId === doubtId);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        if (!currentUser) {
            router.push('/landing');
        }
    }, [router]);

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (answerContent.trim() && isMentor()) {
            console.log('Submitting answer:', answerContent);
            setAnswerContent('');
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentContent.trim() && isJunior()) {
            console.log('Submitting comment:', commentContent);
            setCommentContent('');
        }
    };

    if (!doubt) {
        return <div className="text-white">Doubt not found</div>;
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="flex bg-x-black min-h-screen justify-center">
            <Sidebar />

            <main className="flex-1 border-r border-x-border max-w-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-x-black/80 backdrop-blur-md border-b border-x-border px-4 py-4">
                    <h1 className="text-xl font-bold text-x-text">Doubt</h1>
                </div>

                {/* Doubt Question */}
                <div className="border-b-8 border-x-border p-4">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                            {doubt.authorName.charAt(0)}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-x-text">{doubt.authorName}</span>
                                <span className="text-x-text-secondary text-sm">· {new Date(doubt.createdAt).toLocaleDateString()}</span>
                            </div>

                            <h2 className="text-2xl font-bold text-x-text mb-3">{doubt.title}</h2>

                            <p className="text-x-text text-base mb-3 whitespace-pre-wrap">{doubt.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {doubt.tags.map((tag) => (
                                    <Tag key={tag}>{tag}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mentor Answers Section */}
                <div className="border-b-4 border-x-border">
                    <div className="px-4 py-3 bg-x-card border-b border-x-border">
                        <h3 className="text-lg font-bold text-x-text">
                            Answers by Mentors ({doubtAnswers.length})
                        </h3>
                    </div>

                    {doubtAnswers.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-x-text-secondary">No answers yet. Be the first mentor to answer!</p>
                        </div>
                    )}

                    {doubtAnswers.map((answer) => (
                        <div key={answer.id} className="p-4 border-b border-x-border bg-x-card/30">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                    {answer.authorName.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-semibold text-x-text">{answer.authorName}</span>
                                        <MentorBadge />
                                        <span className="text-x-text-secondary text-sm">· {new Date(answer.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <p className="text-x-text text-base mb-3 whitespace-pre-wrap">{answer.content}</p>

                                    <div className="flex items-center gap-4">
                                        <button className="flex items-center gap-1 text-x-text-secondary hover:text-x-success transition-colors">
                                            <span>↑</span>
                                            <span>{answer.upvotes}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Answer Form - Only for Mentors */}
                    {isMentor() && (
                        <div className="p-4 border-b border-x-border">
                            <form onSubmit={handleAnswerSubmit}>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                        {user.name.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <textarea
                                            value={answerContent}
                                            onChange={(e) => setAnswerContent(e.target.value)}
                                            placeholder="Write your answer as a mentor..."
                                            rows={4}
                                            className="w-full bg-transparent text-x-text placeholder-x-text-secondary focus:outline-none resize-none border border-x-border rounded-lg p-3"
                                        />

                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="submit"
                                                disabled={!answerContent.trim()}
                                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${answerContent.trim()
                                                        ? 'bg-x-blue text-white hover:bg-x-blue/90'
                                                        : 'bg-x-blue/50 text-white/50 cursor-not-allowed'
                                                    }`}
                                            >
                                                Answer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Junior Comments Section */}
                <div>
                    <div className="px-4 py-3 bg-x-card border-b border-x-border">
                        <h3 className="text-lg font-bold text-x-text">
                            Comments ({doubtComments.length})
                        </h3>
                    </div>

                    {doubtComments.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-x-text-secondary">No comments yet. Start the discussion!</p>
                        </div>
                    )}

                    {doubtComments.map((comment) => (
                        <div key={comment.id} className="p-4 border-b border-x-border hover:bg-x-hover transition-colors">
                            <div className="flex gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                    {comment.authorName.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-x-text">{comment.authorName}</span>
                                        <span className="text-x-text-secondary text-sm">· {new Date(comment.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <p className="text-x-text text-base">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Comment Form - Only for Juniors */}
                    {isJunior() && (
                        <div className="p-4 border-b border-x-border">
                            <form onSubmit={handleCommentSubmit}>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                        {user.name.charAt(0)}
                                    </div>

                                    <div className="flex-1">
                                        <textarea
                                            value={commentContent}
                                            onChange={(e) => setCommentContent(e.target.value)}
                                            placeholder="Add a comment..."
                                            rows={2}
                                            className="w-full bg-transparent text-x-text placeholder-x-text-secondary focus:outline-none resize-none border border-x-border rounded-lg p-3"
                                        />

                                        <div className="flex justify-end mt-2">
                                            <button
                                                type="submit"
                                                disabled={!commentContent.trim()}
                                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${commentContent.trim()
                                                        ? 'bg-x-blue text-white hover:bg-x-blue/90'
                                                        : 'bg-x-blue/50 text-white/50 cursor-not-allowed'
                                                    }`}
                                            >
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            <RightSidebar />
        </div>
    );
}
