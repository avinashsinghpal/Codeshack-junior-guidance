'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import MentorBadge from '@/components/MentorBadge';
import Tag from '@/components/Tag';
import { getCurrentUser, isMentor, isJunior } from '@/utils/auth';
import { api } from '@/utils/api';

export default function DoubtDetailPage({ params }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [doubt, setDoubt] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [answerContent, setAnswerContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const doubtId = params.id;

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        if (!currentUser) {
            router.push('/landing');
        } else {
            fetchDoubtDetails();
        }
    }, [router, doubtId]);

    const fetchDoubtDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch doubt details
            const doubtResponse = await api.getDoubtById(doubtId);

            if (doubtResponse.success) {
                setDoubt(doubtResponse.data);
                // Answers are included in the doubt response
                if (doubtResponse.data.answers) {
                    setAnswers(doubtResponse.data.answers);
                }
            }
        } catch (err) {
            console.error('Error fetching doubt details:', err);
            setError(err.message || 'Failed to load doubt details');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);

        if (!answerContent.trim()) {
            setSubmitError('Please enter your answer');
            return;
        }

        if (answerContent.trim().length < 20) {
            setSubmitError('Answer must be at least 20 characters');
            return;
        }

        if (!isMentor()) {
            setSubmitError('Only mentors can post answers');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await api.createAnswer(doubtId, answerContent.trim());

            if (response.success) {
                setAnswerContent('');
                // Refresh doubt details to show new answer
                await fetchDoubtDetails();
            }
        } catch (err) {
            console.error('Error posting answer:', err);
            setSubmitError(err.message || 'Failed to post answer. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex bg-x-black min-h-screen justify-center items-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-x-blue"></div>
                    <p className="text-x-text-secondary mt-4">Loading doubt...</p>
                </div>
            </div>
        );
    }

    if (error || !doubt) {
        return (
            <div className="flex bg-x-black min-h-screen justify-center items-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error || 'Doubt not found'}</p>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 bg-x-blue text-white rounded-full hover:bg-x-blue/90 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    const authorName = doubt.juniorId?.name || 'Anonymous';

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
                            {authorName.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-x-text">{authorName}</span>
                                <span className="text-x-text-secondary text-sm">
                                    · {new Date(doubt.createdAt).toLocaleDateString()}
                                </span>
                                {doubt.status && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${doubt.status === 'resolved' ? 'bg-green-500/20 text-green-400' :
                                            doubt.status === 'answered' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-orange-500/20 text-orange-400'
                                        }`}>
                                        {doubt.status}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-x-text mb-3">{doubt.title}</h2>

                            <p className="text-x-text text-base mb-3 whitespace-pre-wrap">{doubt.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {doubt.tags?.map((tag, index) => (
                                    <Tag key={index}>{tag}</Tag>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mentor Answers Section */}
                <div className="border-b-4 border-x-border">
                    <div className="px-4 py-3 bg-x-card border-b border-x-border">
                        <h3 className="text-lg font-bold text-x-text">
                            Answers by Mentors ({answers.length})
                        </h3>
                    </div>

                    {answers.length === 0 && (
                        <div className="p-8 text-center">
                            <p className="text-x-text-secondary">No answers yet. Be the first mentor to answer!</p>
                        </div>
                    )}

                    {answers.map((answer) => {
                        const mentorName = answer.mentorId?.name || 'Anonymous Mentor';
                        return (
                            <div key={answer._id} className="p-4 border-b border-x-border bg-x-card/30">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                        {mentorName.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-semibold text-x-text">{mentorName}</span>
                                            <MentorBadge />
                                            <span className="text-x-text-secondary text-sm">
                                                · {new Date(answer.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <p className="text-x-text text-base mb-3 whitespace-pre-wrap">{answer.content}</p>

                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-1 text-x-text-secondary hover:text-x-success transition-colors">
                                                <span>↑</span>
                                                <span>{answer.upvoteCount || 0}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Answer Form - Only for Mentors */}
                    {isMentor() && (
                        <div className="p-4 border-b border-x-border">
                            <form onSubmit={handleAnswerSubmit}>
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex-1">
                                        <textarea
                                            value={answerContent}
                                            onChange={(e) => setAnswerContent(e.target.value)}
                                            placeholder="Write your answer as a mentor (min 20 characters)..."
                                            rows={4}
                                            maxLength={10000}
                                            className="w-full bg-transparent text-x-text placeholder-x-text-secondary focus:outline-none resize-none border border-x-border rounded-lg p-3"
                                        />

                                        {submitError && (
                                            <div className="mt-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                                                <p className="text-red-500 text-sm">{submitError}</p>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-x-text-secondary">
                                                {answerContent.length}/10000 characters
                                            </span>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !answerContent.trim()}
                                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${isSubmitting || !answerContent.trim()
                                                        ? 'bg-x-blue/50 text-white/50 cursor-not-allowed'
                                                        : 'bg-x-blue text-white hover:bg-x-blue/90'
                                                    }`}
                                            >
                                                {isSubmitting ? 'Posting...' : 'Post Answer'}
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
