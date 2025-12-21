'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signup } from '@/utils/auth';

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('junior');

    useEffect(() => {
        // Get role from URL params if present
        const roleParam = searchParams.get('role');
        if (roleParam === 'mentor' || roleParam === 'junior') {
            setRole(roleParam);
        }
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = signup(name, email, password, role);

        if (result.success) {
            router.push('/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-x-black px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-x-blue mb-2">CodeShack</h1>
                    <p className="text-x-text-secondary">Create your account</p>
                </div>

                <div className="bg-x-card rounded-xl p-8 border border-x-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-x-text mb-2">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-x-black border border-x-border text-x-text focus:outline-none focus:border-x-blue transition-colors"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-x-text mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-x-black border border-x-border text-x-text focus:outline-none focus:border-x-blue transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-x-text mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-x-black border border-x-border text-x-text focus:outline-none focus:border-x-blue transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-x-text mb-3">
                                I am a...
                            </label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('junior')}
                                    className={`flex-1 py-3 px-4 rounded-full font-medium transition-colors ${role === 'junior'
                                        ? 'bg-x-blue text-white'
                                        : 'bg-x-black border border-x-border text-x-text-secondary hover:border-x-blue'
                                        }`}
                                >
                                    Junior
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('mentor')}
                                    className={`flex-1 py-3 px-4 rounded-full font-medium transition-colors ${role === 'mentor'
                                        ? 'bg-x-blue text-white'
                                        : 'bg-x-black border border-x-border text-x-text-secondary hover:border-x-blue'
                                        }`}
                                >
                                    Mentor
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 rounded-full bg-x-blue text-white font-semibold hover:bg-x-blue/90 transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-x-text-secondary text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-x-blue hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
