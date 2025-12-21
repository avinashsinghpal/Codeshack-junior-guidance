'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import Tag from '@/components/Tag';
import PageLoadingAnimation from '@/components/PageLoadingAnimation';
import { availableTags } from '@/data/mockData';

export default function AskPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would save to backend
        console.log({ title, description, tags: selectedTags });
        router.push('/doubts');
    };

    const isFormValid = title.trim() && description.trim() && selectedTags.length > 0;

    return (
        <div className="flex bg-x-black min-h-screen justify-center">
            <Sidebar />

            <main className="flex-1 border-r border-x-border max-w-2xl relative">
                <PageLoadingAnimation />
                <div className="sticky top-0 z-10 bg-x-black/80 backdrop-blur-md border-b border-x-border px-4 py-4">
                    <h1 className="text-xl font-bold text-x-text">Ask a Doubt</h1>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="What's your doubt?"
                                className="w-full px-4 py-3 text-xl bg-transparent border-b border-x-border text-x-text placeholder-x-text-secondary focus:outline-none focus:border-x-blue transition-colors"
                            />
                        </div>

                        <div>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your doubt in detail..."
                                rows={8}
                                className="w-full px-4 py-3 bg-transparent border border-x-border rounded-xl text-x-text placeholder-x-text-secondary focus:outline-none focus:border-x-blue transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-x-text mb-3">
                                Select Tags (click to add/remove)
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {availableTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => toggleTag(tag)}
                                        className={`px-3 py-1.5 rounded-full text-sm transition-colors ${selectedTags.includes(tag)
                                            ? 'bg-x-blue text-white'
                                            : 'bg-x-card border border-x-border text-x-text-secondary hover:border-x-blue'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-x-border">
                            <p className="text-sm text-x-text-secondary">
                                {selectedTags.length} tag{selectedTags.length !== 1 ? 's' : ''} selected
                            </p>
                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`px-8 py-3 rounded-full font-semibold transition-colors ${isFormValid
                                    ? 'bg-x-blue text-white hover:bg-x-blue/90'
                                    : 'bg-x-card text-x-text-secondary cursor-not-allowed'
                                    }`}
                            >
                                Post Doubt
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <RightSidebar />
        </div>
    );
}
