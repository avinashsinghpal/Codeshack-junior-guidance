'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import DoubtCard from '@/components/DoubtCard';
import Tag from '@/components/Tag';
import { doubts, availableTags } from '@/data/mockData';
import { getCurrentUser } from '@/utils/auth';

export default function HomePage() {
    const router = useRouter();
    const [postContent, setPostContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [showTagSelector, setShowTagSelector] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Redirect to landing if not authenticated
        if (!currentUser) {
            router.push('/landing');
        }
    }, [router]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handlePost = (e) => {
        e.preventDefault();
        if (postContent.trim()) {
            console.log('Posting:', { content: postContent, tags: selectedTags });
            setPostContent('');
            setSelectedTags([]);
            setShowTagSelector(false);
        }
    };

    return (
        <div className="flex bg-x-black min-h-screen justify-center">
            <Sidebar />

            <main className="flex-1 border-r border-x-border max-w-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-x-black/80 backdrop-blur-md border-b border-x-border">
                    <div className="flex items-center justify-between px-4 py-3">
                        <h1 className="text-xl font-bold text-x-text">Home</h1>
                    </div>
                </div>

                {/* Post Composer */}
                <div className="border-b border-x-border p-4">
                    <form onSubmit={handlePost}>
                        <div className="flex gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg">
                                {user ? user.name.charAt(0) : 'U'}
                            </div>

                            <div className="flex-1">
                                <textarea
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    placeholder="What's happening? Ask your doubt..."
                                    rows={3}
                                    className="w-full bg-transparent text-x-text text-lg placeholder-x-text-secondary focus:outline-none resize-none"
                                />

                                {showTagSelector && (
                                    <div className="mt-3 p-3 border border-x-border rounded-xl bg-x-card">
                                        <p className="text-sm text-x-text-secondary mb-2">Select tags:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {availableTags.slice(0, 8).map((tag) => (
                                                <button
                                                    key={tag}
                                                    type="button"
                                                    onClick={() => toggleTag(tag)}
                                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag)
                                                        ? 'bg-x-blue text-white'
                                                        : 'bg-x-black border border-x-border text-x-text-secondary hover:border-x-blue'
                                                        }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {selectedTags.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {selectedTags.map((tag) => (
                                            <Tag key={tag}>{tag}</Tag>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between mt-3 pt-3 border-t border-x-border">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowTagSelector(!showTagSelector)}
                                            className="p-2 rounded-full hover:bg-x-blue/10 text-x-blue transition-colors"
                                            title="Add tags"
                                        >
                                            <span className="text-lg">#</span>
                                        </button>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!postContent.trim()}
                                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${postContent.trim()
                                            ? 'bg-x-blue text-white hover:bg-x-blue/90'
                                            : 'bg-x-blue/50 text-white/50 cursor-not-allowed'
                                            }`}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Doubts Feed */}
                <div className="bg-x-card">
                    {doubts.map((doubt) => (
                        <DoubtCard key={doubt.id} doubt={doubt} />
                    ))}
                </div>

                {doubts.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-x-text-secondary">No doubts posted yet. Be the first to ask!</p>
                    </div>
                )}
            </main>

            <RightSidebar />
        </div>
    );
}
