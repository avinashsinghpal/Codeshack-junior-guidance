'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import PageLoadingAnimation from '@/components/PageLoadingAnimation';
import { spaceDiscussions } from '@/data/mockData';

export default function SpacePage() {
    const [newPost, setNewPost] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('New post:', newPost);
        setNewPost('');
    };

    return (
        <div className="flex bg-x-black min-h-screen justify-center">
            <Sidebar />

            <main className="flex-1 border-r border-x-border max-w-2xl relative">
                <PageLoadingAnimation />
                <div className="sticky top-0 z-10 bg-x-black/80 backdrop-blur-md border-b border-x-border px-4 py-4">
                    <h1 className="text-xl font-bold text-x-text">Junior Space</h1>
                    <p className="text-sm text-x-text-secondary mt-1">A safe space for juniors only 🚀</p>
                </div>

                {/* Post Compose */}
                <div className="p-4 border-b border-x-border bg-x-card">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            placeholder="What's on your mind?"
                            rows={3}
                            className="w-full px-4 py-3 bg-x-black border border-x-border rounded-xl text-x-text placeholder-x-text-secondary focus:outline-none focus:border-x-blue transition-colors resize-none mb-3"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!newPost.trim()}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${newPost.trim()
                                    ? 'bg-x-blue text-white hover:bg-x-blue/90'
                                    : 'bg-x-card text-x-text-secondary cursor-not-allowed border border-x-border'
                                    }`}
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>

                {/* Discussion Feed */}
                <div className="bg-x-card">
                    {spaceDiscussions.map((discussion) => (
                        <div key={discussion.id} className="p-4 border-b border-x-border hover:bg-x-hover transition-colors">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-success/20 flex items-center justify-center text-lg">
                                    {discussion.authorName.charAt(0)}
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-x-text">{discussion.authorName}</span>
                                        <span className="text-x-text-secondary text-sm">
                                            · {new Date(discussion.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-x-text mb-3">{discussion.content}</p>

                                    <div className="flex items-center gap-4 text-x-text-secondary text-sm">
                                        <button className="hover:text-x-blue transition-colors">
                                            💬 {discussion.replies} {discussion.replies === 1 ? 'reply' : 'replies'}
                                        </button>
                                        <button className="hover:text-x-success transition-colors">
                                            ❤️ Like
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {spaceDiscussions.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-x-text-secondary">No discussions yet. Start the conversation!</p>
                    </div>
                )}
            </main>

            <RightSidebar />
        </div>
    );
}
