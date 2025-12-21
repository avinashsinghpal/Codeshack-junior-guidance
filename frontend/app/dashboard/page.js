'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import DoubtCard from '@/components/DoubtCard';
import { getCurrentUser } from '@/utils/auth';
import { doubts } from '@/data/mockData';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [userDoubts, setUserDoubts] = useState([]);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        if (currentUser) {
            if (currentUser.role === 'junior') {
                // Show user's posted doubts
                const myDoubts = doubts.filter(d => d.authorName === currentUser.name);
                setUserDoubts(myDoubts);
            } else {
                // Show unanswered doubts for mentors
                const unanswered = doubts.filter(d => d.status === 'pending');
                setUserDoubts(unanswered);
            }
        }
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-x-black">
                <div className="text-center">
                    <p className="text-x-text-secondary mb-4">Please log in to view your dashboard</p>
                    <Link href="/login" className="text-x-blue hover:underline">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex bg-x-black min-h-screen justify-center">
            <Sidebar />

            <main className="flex-1 border-r border-x-border max-w-2xl">
                <div className="sticky top-0 z-10 bg-x-black/80 backdrop-blur-md border-b border-x-border px-4 py-4">
                    <h1 className="text-xl font-bold text-x-text">Dashboard</h1>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-x-text mb-2">
                            Welcome back, {user.name}! 👋
                        </h2>
                        <p className="text-x-text-secondary">
                            {user.role === 'junior'
                                ? 'Here are your posted doubts'
                                : 'Here are doubts that need your expertise'}
                        </p>
                    </div>

                    {user.role === 'junior' && (
                        <div className="mb-6">
                            <Link
                                href="/ask"
                                className="inline-block px-6 py-3 rounded-full bg-x-blue text-white font-semibold hover:bg-x-blue/90 transition-colors"
                            >
                                Ask a Doubt
                            </Link>
                        </div>
                    )}

                    <div className="bg-x-card rounded-xl border border-x-border overflow-hidden">
                        {userDoubts.length > 0 ? (
                            userDoubts.map((doubt) => (
                                <DoubtCard key={doubt.id} doubt={doubt} />
                            ))
                        ) : (
                            <div className="p-8 text-center">
                                <p className="text-x-text-secondary">
                                    {user.role === 'junior'
                                        ? 'You haven\'t posted any doubts yet. Ask your first question!'
                                        : 'All doubts have been answered! Great work! 🎉'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <RightSidebar />
        </div>
    );
}
