'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser } from '@/utils/auth';

export default function RightSidebar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    return (
        <aside className="hidden lg:block w-80 p-4 space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full px-4 py-2 pl-10 rounded-full bg-x-card border border-x-border text-x-text placeholder-x-text-secondary focus:outline-none focus:border-x-blue transition-colors"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-x-text-secondary">🔍</span>
            </div>

            {/* Login Prompt - Only show if user is NOT logged in */}
            {!user && (
                <div className="bg-x-card rounded-xl p-4 border border-x-border">
                    <h2 className="text-xl font-bold text-x-text mb-2">Login to post your doubts</h2>
                    <p className="text-sm text-x-text-secondary mb-4">
                        Join CodeShack to ask questions and get answers from experienced mentors.
                    </p>
                    <Link
                        href="/login"
                        className="block w-full text-center px-4 py-2 rounded-full bg-x-blue text-white font-semibold hover:bg-x-blue/90 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            )}

            {/* What's happening */}
            <div className="bg-x-card rounded-xl p-4 border border-x-border">
                <h2 className="text-lg font-bold text-x-text mb-3">What's happening</h2>

                <div className="space-y-4">
                    <div className="hover:bg-x-hover p-2 rounded-lg transition-colors cursor-pointer">
                        <p className="text-xs text-x-text-secondary">Trending in Tech</p>
                        <p className="text-sm font-semibold text-x-text">#ReactJS</p>
                        <p className="text-xs text-x-text-secondary">2,547 posts</p>
                    </div>

                    <div className="hover:bg-x-hover p-2 rounded-lg transition-colors cursor-pointer">
                        <p className="text-xs text-x-text-secondary">Trending in Programming</p>
                        <p className="text-sm font-semibold text-x-text">#DSA</p>
                        <p className="text-xs text-x-text-secondary">1,823 posts</p>
                    </div>

                    <div className="hover:bg-x-hover p-2 rounded-lg transition-colors cursor-pointer">
                        <p className="text-xs text-x-text-secondary">Trending in Development</p>
                        <p className="text-sm font-semibold text-x-text">#NextJS</p>
                        <p className="text-xs text-x-text-secondary">1,456 posts</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
