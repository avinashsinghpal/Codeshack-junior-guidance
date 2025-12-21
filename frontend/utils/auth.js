// Mock authentication utilities using localStorage

import { users } from '@/data/mockData';

export const login = (email, password) => {
    // Find user in mock data
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = btoa(JSON.stringify({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        }));
        localStorage.setItem('authToken', token);
        return { success: true, user: { id: user.id, email: user.email, role: user.role, name: user.name } };
    }

    return { success: false, error: "Invalid credentials" };
};

export const signup = (name, email, password, role) => {
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return { success: false, error: "User already exists" };
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role,
        doubtsAsked: 0,
        answersGiven: 0,
        commentsGiven: 0,
        upvotesReceived: 0,
    };

    // Add to users array (in real app, this would be saved to database)
    users.push(newUser);

    const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name }));
    localStorage.setItem('authToken', token);

    return { success: true, user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name } };
};

export const logout = () => {
    localStorage.removeItem('authToken');
};

export const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;

    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
        return JSON.parse(atob(token));
    } catch (e) {
        return null;
    }
};

export const isAuthenticated = () => {
    return getCurrentUser() !== null;
};

export const isMentor = () => {
    const user = getCurrentUser();
    return user?.role === 'mentor';
};

export const isJunior = () => {
    const user = getCurrentUser();
    return user?.role === 'junior';
};
