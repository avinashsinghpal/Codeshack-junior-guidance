'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { getCurrentUser, logout, isMentor } from '@/utils/auth';
import MentorBadge from './MentorBadge';

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

    // All navigation items with SVG icons
    const allNavItems = [
        {
            name: 'Home',
            path: '/',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    <path d="M12 9l-7 7h4v5h6v-5h4l-7-7z" />
                </svg>
            ),
            roles: ['junior', 'mentor', 'admin']
        },
        {
            name: 'Dashboard',
            path: '/dashboard',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                </svg>
            ),
            roles: ['junior', 'mentor', 'admin']
        },
        {
            name: 'Ask a Doubt',
            path: '/ask',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
            ),
            roles: ['junior']
        },
        {
            name: 'Doubts',
            path: '/doubts',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
            ),
            roles: ['junior', 'mentor', 'admin']
        },
        {
            name: 'Junior Space',
            path: '/space',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            ),
            roles: ['junior']
        },
        {
            name: 'Profile',
            path: '/profile',
            icon: (
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
            ),
            roles: ['junior', 'mentor', 'admin']
        },
    ];

    // Filter navigation items based on user role
    const navItems = user
        ? allNavItems.filter(item => item.roles.includes(user.role))
        : allNavItems;

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
                            <span className="flex-shrink-0">{item.icon}</span>
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
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-x-text truncate">{user.name}</p>
                                {user.role === 'mentor' && <MentorBadge />}
                            </div>
                            <p className="text-xs text-x-text-secondary truncate">@{user.name.replace(' ', '').toLowerCase()}</p>
                        </div>

                        <span className="text-x-text">•••</span>
                    </button>
                </div>
            )}
        </aside>
    );
}
