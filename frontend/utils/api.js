// API Service Layer for Backend Communication

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('authToken');
    }
    return null;
};

// API helper function
const apiCall = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const api = {
    // Authentication
    register: async (name, email, password, role) => {
        return apiCall('/users/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role }),
        });
    },

    login: async (email, password) => {
        return apiCall('/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    },

    // User Profile
    getUserProfile: async (userId) => {
        return apiCall(`/users/${userId}`);
    },

    updateUserProfile: async (userId, data) => {
        return apiCall(`/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    changePassword: async (userId, currentPassword, newPassword) => {
        return apiCall(`/users/${userId}/change-password`, {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword }),
        });
    },

    // Mentors
    getAllMentors: async (page = 1, limit = 10) => {
        return apiCall(`/users/mentors/approved?page=${page}&limit=${limit}`);
    },

    // Doubts
    getDoubts: async (page = 1, limit = 10) => {
        return apiCall(`/doubts?page=${page}&limit=${limit}`);
    },

    getDoubtById: async (doubtId) => {
        return apiCall(`/doubts/${doubtId}`);
    },

    createDoubt: async (title, description, tags) => {
        return apiCall('/doubts', {
            method: 'POST',
            body: JSON.stringify({ title, description, tags }),
        });
    },

    updateDoubt: async (doubtId, data) => {
        return apiCall(`/doubts/${doubtId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    },

    deleteDoubt: async (doubtId) => {
        return apiCall(`/doubts/${doubtId}`, {
            method: 'DELETE',
        });
    },

    // Answers
    getAnswersByDoubt: async (doubtId) => {
        return apiCall(`/answers/doubt/${doubtId}`);
    },

    createAnswer: async (doubtId, content) => {
        return apiCall(`/answers/${doubtId}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
        });
    },

    updateAnswer: async (answerId, content) => {
        return apiCall(`/answers/${answerId}`, {
            method: 'PATCH',
            body: JSON.stringify({ content }),
        });
    },

    deleteAnswer: async (answerId) => {
        return apiCall(`/answers/${answerId}`, {
            method: 'DELETE',
        });
    },

    // Comments
    getCommentsByDoubt: async (doubtId) => {
        return apiCall(`/comments/doubt/${doubtId}`);
    },

    createComment: async (doubtId, content) => {
        return apiCall('/comments', {
            method: 'POST',
            body: JSON.stringify({ doubtId, content }),
        });
    },

    updateComment: async (commentId, content) => {
        return apiCall(`/comments/${commentId}`, {
            method: 'PATCH',
            body: JSON.stringify({ content }),
        });
    },

    deleteComment: async (commentId) => {
        return apiCall(`/comments/${commentId}`, {
            method: 'DELETE',
        });
    },

    // Upvotes
    upvoteAnswer: async (answerId) => {
        return apiCall('/upvotes', {
            method: 'POST',
            body: JSON.stringify({ answerId }),
        });
    },

    removeUpvote: async (upvoteId) => {
        return apiCall(`/upvotes/${upvoteId}`, {
            method: 'DELETE',
        });
    },

    // Junior Space Posts
    getJuniorSpacePosts: async (page = 1, limit = 10) => {
        return apiCall(`/junior-space-posts?page=${page}&limit=${limit}`);
    },

    createJuniorSpacePost: async (content) => {
        return apiCall('/junior-space-posts', {
            method: 'POST',
            body: JSON.stringify({ content }),
        });
    },
};

export default api;
