'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, logout } from '@/utils/auth';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]);

    const handleLogout = () => {
        logout();
        router.push('/landing');
    };

    const navItems = [
        { name: 'Home', path: '/', icon: '🏠' },
        { name: 'Dashboard', path: '/dashboard', icon: '📊' },
        { name: 'Ask a Doubt', path: '/ask', icon: '❓' },
        { name: 'Doubts', path: '/doubts', icon: '💬' },
        { name: 'Junior Space', path: '/space', icon: '🌟' },
        { name: 'Profile', path: '/profile', icon: '👤' },
    ];

    return (
        <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-x-border p-4">
            <div className="flex-1">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-x-blue">CodeShack</h1>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-full transition-colors ${pathname === item.path
                                    ? 'bg-x-blue/10 text-x-blue font-semibold'
                                    : 'text-x-text hover:bg-x-hover'
                                }`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="text-lg">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Profile Section at Bottom */}
            {user && (
                <div className="relative" ref={popupRef}>
                    {/* Popup Menu */}
                    {showPopup && (
                        <div className="absolute bottom-full left-0 mb-2 w-full bg-x-black border border-x-border rounded-xl shadow-2xl overflow-hidden">
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-3 text-left text-x-text hover:bg-x-hover transition-colors font-semibold"
                            >
                                Log out @{user.name.replace(' ', '').toLowerCase()}
                            </button>
                        </div>
                    )}

                    {/* Profile Button */}
                    <button
                        onClick={() => setShowPopup(!showPopup)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-full hover:bg-x-hover transition-colors"
                    >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-x-blue/20 flex items-center justify-center text-lg font-semibold text-x-text">
                            {user.name.charAt(0)}
                        </div>

                        <div className="flex-1 text-left overflow-hidden">
                            <p className="text-sm font-semibold text-x-text truncate">{user.name}</p>
                            <p className="text-xs text-x-text-secondary truncate">@{user.name.replace(' ', '').toLowerCase()}</p>
                        </div>

                        <span className="text-x-text">•••</span>
                    </button>
                </div>
            )}
        </aside>
    );
}
