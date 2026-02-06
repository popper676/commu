import { djangoApi } from './client';
import { ENDPOINTS } from './config';
import { User, UserRole, SubscriptionPlan } from '@/types';

// Authentication Service
export const authService = {
    // Login
    async login(email: string, password: string) {
        return djangoApi.post<{ user: User; token: string }>(ENDPOINTS.AUTH.LOGIN, {
            email,
            password,
        });
    },

    // Signup
    async signup(
        name: string,
        email: string,
        password: string,
        role: UserRole,
        plan: SubscriptionPlan
    ) {
        return djangoApi.post<{ user: User; token: string }>(ENDPOINTS.AUTH.SIGNUP, {
            name,
            email,
            password,
            role,
            plan,
        });
    },

    // Logout
    async logout() {
        return djangoApi.post(ENDPOINTS.AUTH.LOGOUT);
    },

    // Get current user
    async getCurrentUser() {
        return djangoApi.get<User>(ENDPOINTS.AUTH.ME);
    },

    // Refresh token
    async refreshToken() {
        return djangoApi.post<{ token: string }>(ENDPOINTS.AUTH.REFRESH);
    },
};

// Feed Service
export const feedService = {
    // Get feed posts
    async getFeed(filters?: { type?: string; limit?: number }) {
        const params = new URLSearchParams(filters as any);
        return djangoApi.get(ENDPOINTS.FEED.LIST + '?' + params.toString());
    },

    // Create post
    async createPost(data: FormData) {
        return djangoApi.post(ENDPOINTS.FEED.CREATE, data, {
            headers: {} as any // Let browser set Content-Type
        });
    },

    // Like/Unlike post
    async toggleLike(id: string) {
        return djangoApi.post(ENDPOINTS.FEED.LIKE(id));
    },

    // Get comments
    async getComments(id: string) {
        return djangoApi.get(ENDPOINTS.FEED.COMMENT(id));
    },

    // Create comment
    async createComment(id: string, content: string) {
        return djangoApi.post(ENDPOINTS.FEED.COMMENT(id), { content });
    },

    // Share post
    async sharePost(id: string, caption?: string) {
        return djangoApi.post(ENDPOINTS.FEED.SHARE(id), { caption });
    }
};

// Community Service
export const communityService = {
    // Get all communities
    async getCommunities(filters?: { category?: string; search?: string }) {
        const params = new URLSearchParams(filters as any);
        return djangoApi.get(ENDPOINTS.COMMUNITIES.LIST + '?' + params.toString());
    },

    // Get community by ID
    async getCommunity(id: string) {
        return djangoApi.get(ENDPOINTS.COMMUNITIES.DETAIL(id));
    },

    // Create community
    async createCommunity(data: any) {
        return djangoApi.post(ENDPOINTS.COMMUNITIES.CREATE, data);
    },

    // Update community
    async updateCommunity(id: string, data: any) {
        return djangoApi.put(ENDPOINTS.COMMUNITIES.UPDATE(id), data);
    },

    // Delete community
    async deleteCommunity(id: string) {
        return djangoApi.delete(ENDPOINTS.COMMUNITIES.DELETE(id));
    },

    // Join community
    async joinCommunity(id: string) {
        return djangoApi.post(ENDPOINTS.COMMUNITIES.JOIN(id));
    },

    // Leave community
    async leaveCommunity(id: string) {
        return djangoApi.post(ENDPOINTS.COMMUNITIES.LEAVE(id));
    },

    // Get community members
    async getMembers(id: string) {
        return djangoApi.get(ENDPOINTS.COMMUNITIES.MEMBERS(id));
    },

    // Get community channels
    async getChannels(id: string) {
        return djangoApi.get(ENDPOINTS.COMMUNITIES.CHANNELS(id));
    },
};

// Course Service
export const courseService = {
    // Get all courses
    async getCourses(filters?: { category?: string; level?: string; search?: string }) {
        const params = new URLSearchParams(filters as any);
        return djangoApi.get(ENDPOINTS.COURSES.LIST + '?' + params.toString());
    },

    // Get course by ID
    async getCourse(id: string) {
        return djangoApi.get(ENDPOINTS.COURSES.DETAIL(id));
    },

    // Create course
    async createCourse(data: any) {
        return djangoApi.post(ENDPOINTS.COURSES.CREATE, data);
    },

    // Update course
    async updateCourse(id: string, data: any) {
        return djangoApi.put(ENDPOINTS.COURSES.UPDATE(id), data);
    },

    // Delete course
    async deleteCourse(id: string) {
        return djangoApi.delete(ENDPOINTS.COURSES.DELETE(id));
    },

    // Enroll in course
    async enrollCourse(id: string) {
        return djangoApi.post(ENDPOINTS.COURSES.ENROLL(id));
    },

    // Get course progress
    async getProgress(id: string) {
        return djangoApi.get(ENDPOINTS.COURSES.PROGRESS(id));
    },

    // Update lesson progress
    async updateProgress(courseId: string, lessonId: string, completed: boolean) {
        return djangoApi.post(ENDPOINTS.COURSES.PROGRESS(courseId), {
            lessonId,
            completed,
        });
    },
};

// Challenge Service
export const challengeService = {
    // Get all challenges
    async getChallenges(filters?: { status?: string; category?: string; search?: string }) {
        const params = new URLSearchParams(filters as any);
        return djangoApi.get(ENDPOINTS.CHALLENGES.LIST + '?' + params.toString());
    },

    // Get challenge by ID
    async getChallenge(id: string) {
        return djangoApi.get(ENDPOINTS.CHALLENGES.DETAIL(id));
    },

    // Create challenge
    async createChallenge(data: any) {
        return djangoApi.post(ENDPOINTS.CHALLENGES.CREATE, data);
    },

    // Update challenge
    async updateChallenge(id: string, data: any) {
        return djangoApi.put(ENDPOINTS.CHALLENGES.UPDATE(id), data);
    },

    // Delete challenge
    async deleteChallenge(id: string) {
        return djangoApi.delete(ENDPOINTS.CHALLENGES.DELETE(id));
    },

    // Submit to challenge
    async submitChallenge(id: string, data: any) {
        return djangoApi.post(ENDPOINTS.CHALLENGES.SUBMIT(id), data);
    },

    // Get challenge submissions
    async getSubmissions(id: string) {
        return djangoApi.get(ENDPOINTS.CHALLENGES.SUBMISSIONS(id));
    },

    // Score submission
    async scoreSubmission(challengeId: string, submissionId: string, score: number, feedback: string) {
        return djangoApi.post(ENDPOINTS.CHALLENGES.SCORE(challengeId, submissionId), {
            score,
            feedback,
        });
    },
};

// Chat Service
export const chatService = {
    // Get messages
    async getMessages(communityId: string, channelId: string, limit: number = 50) {
        return djangoApi.get(
            ENDPOINTS.CHAT.MESSAGES(communityId, channelId) + `?limit=${limit}`
        );
    },

    // Send message
    async sendMessage(communityId: string, channelId: string, content: string, attachments?: string[]) {
        return djangoApi.post(ENDPOINTS.CHAT.SEND(communityId, channelId), {
            content,
            attachments,
        });
    },
};

// Upload Service
export const uploadService = {
    // Upload image
    async uploadImage(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return djangoApi.post<{ url: string }>(ENDPOINTS.UPLOAD.IMAGE, formData, {
            headers: {
                // Let browser set Content-Type for FormData
            } as any,
        });
    },

    // Upload video
    async uploadVideo(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return djangoApi.post<{ url: string }>(ENDPOINTS.UPLOAD.VIDEO, formData, {
            headers: {} as any,
        });
    },

    // Upload document
    async uploadDocument(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return djangoApi.post<{ url: string }>(ENDPOINTS.UPLOAD.DOCUMENT, formData, {
            headers: {} as any,
        });
    },
};
