// API Configuration
export const API_CONFIG = {
    // Django Backend - Social/Content Features
    DJANGO_BASE_URL: process.env.NEXT_PUBLIC_DJANGO_API_URL || 'http://localhost:8000/api',

    // Spring Boot Backend - Finance/Payment Features
    SPRING_BASE_URL: process.env.NEXT_PUBLIC_SPRING_API_URL || 'http://localhost:8080/api',

    // API Timeouts
    TIMEOUT: 30000,

    // Mock Mode (set to false when backends are ready)
    USE_MOCK: false,
};

// API Endpoints
export const ENDPOINTS = {
    // Feed (Django)
    FEED: {
        LIST: '/feed',
        CREATE: '/feed',
        LIKE: (id: string) => `/feed/${id}/like`,
        COMMENT: (id: string) => `/feed/${id}/comments`,
        SHARE: (id: string) => `/feed/${id}/share`,
    },

    // Authentication (Django)
    AUTH: {
        LOGIN: '/auth/login',
        SIGNUP: '/auth/signup',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
        ME: '/auth/me',
    },

    // Communities (Django)
    COMMUNITIES: {
        LIST: '/communities',
        DETAIL: (id: string) => `/communities/${id}`,
        CREATE: '/communities',
        UPDATE: (id: string) => `/communities/${id}`,
        DELETE: (id: string) => `/communities/${id}`,
        JOIN: (id: string) => `/communities/${id}/join`,
        LEAVE: (id: string) => `/communities/${id}/leave`,
        MEMBERS: (id: string) => `/communities/${id}/members`,
        CHANNELS: (id: string) => `/communities/${id}/channels`,
    },

    // Courses (Django)
    COURSES: {
        LIST: '/courses',
        DETAIL: (id: string) => `/courses/${id}`,
        CREATE: '/courses',
        UPDATE: (id: string) => `/courses/${id}`,
        DELETE: (id: string) => `/courses/${id}`,
        ENROLL: (id: string) => `/courses/${id}/enroll`,
        PROGRESS: (id: string) => `/courses/${id}/progress`,
        MODULES: (id: string) => `/courses/${id}/modules`,
        LESSONS: (courseId: string, moduleId: string) => `/courses/${courseId}/modules/${moduleId}/lessons`,
    },

    // Challenges (Django)
    CHALLENGES: {
        LIST: '/challenges',
        DETAIL: (id: string) => `/challenges/${id}`,
        CREATE: '/challenges',
        UPDATE: (id: string) => `/challenges/${id}`,
        DELETE: (id: string) => `/challenges/${id}`,
        SUBMIT: (id: string) => `/challenges/${id}/submit`,
        SUBMISSIONS: (id: string) => `/challenges/${id}/submissions`,
        SCORE: (id: string, submissionId: string) => `/challenges/${id}/submissions/${submissionId}/score`,
    },

    // Payments (Spring Boot)
    PAYMENTS: {
        SUBSCRIPTIONS: '/payments/subscriptions',
        SUBSCRIBE: '/payments/subscribe',
        CANCEL_SUBSCRIPTION: '/payments/subscriptions/cancel',
        PURCHASE_COURSE: '/payments/courses/purchase',
        PAYMENT_METHODS: '/payments/methods',
        TRANSACTIONS: '/payments/transactions',
        INVOICES: '/payments/invoices',
    },

    // Chat (Django - WebSocket)
    CHAT: {
        MESSAGES: (communityId: string, channelId: string) => `/communities/${communityId}/channels/${channelId}/messages`,
        SEND: (communityId: string, channelId: string) => `/communities/${communityId}/channels/${channelId}/messages`,
    },

    // File Upload (Django)
    UPLOAD: {
        IMAGE: '/api/files/upload', // Updated to match backend
        VIDEO: '/api/files/upload',
        DOCUMENT: '/api/files/upload',
    },
};

// HTTP Methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API Response Types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
    };
}

// Error Codes
export const ERROR_CODES = {
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    SERVER_ERROR: 'SERVER_ERROR',
    NETWORK_ERROR: 'NETWORK_ERROR',
    TIMEOUT: 'TIMEOUT',
};
