'use client';

import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import DoubtCard from '@/components/DoubtCard';
import PageLoadingAnimation from '@/components/PageLoadingAnimation';
import { doubts } from '@/data/mockData';

export default function DoubtsPage() {
    return (
        <div className="flex bg-x-black min-h-screen justify-center">
            <Sidebar />

            <main className="flex-1 border-r border-x-border max-w-2xl relative">
                <PageLoadingAnimation />
                <div className="sticky top-0 z-10 bg-x-black/80 backdrop-blur-md border-b border-x-border px-4 py-4">
                    <h1 className="text-xl font-bold text-x-text">Doubts</h1>
                </div>

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
