import { API_CONFIG, ENDPOINTS, ApiResponse, HttpMethod } from './config';

// Base API Client
class ApiClient {
    private baseUrl: string;
    private useMock: boolean;

    constructor(baseUrl: string, useMock: boolean = API_CONFIG.USE_MOCK) {
        this.baseUrl = baseUrl;
        this.useMock = useMock;
    }

    private async request<T>(
        method: HttpMethod,
        endpoint: string,
        data?: any,
        options?: RequestInit
    ): Promise<ApiResponse<T>> {
        // Mock mode - return mock data
        if (this.useMock) {
            return this.mockRequest<T>(method, endpoint, data);
        }

        try {
            const url = `${this.baseUrl}${endpoint}`;
            const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;

            const isFormData = data instanceof FormData;
            const headers: HeadersInit = {
                ...(!isFormData && { 'Content-Type': 'application/json' }),
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options?.headers,
            };

            const response = await fetch(url, {
                method,
                headers,
                body: isFormData ? data : (data ? JSON.stringify(data) : undefined),
                ...options,
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    success: false,
                    error: {
                        code: result.code || 'SERVER_ERROR',
                        message: result.message || 'An error occurred',
                        details: result.details,
                    },
                };
            }

            return {
                success: true,
                data: result.data || result,
                meta: result.meta,
            };
        } catch (error: any) {
            return {
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    message: error.message || 'Network error occurred',
                },
            };
        }
    }

    private async mockRequest<T>(
        method: HttpMethod,
        endpoint: string,
        data?: any
    ): Promise<ApiResponse<T>> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock successful response
        return {
            success: true,
            data: { message: 'Mock response', endpoint, method, data } as any,
        };
    }

    async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>('GET', endpoint, undefined, options);
    }

    async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>('POST', endpoint, data, options);
    }

    async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>('PUT', endpoint, data, options);
    }

    async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>('PATCH', endpoint, data, options);
    }

    async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
        return this.request<T>('DELETE', endpoint, undefined, options);
    }
}

// Django API Client (Social/Content)
export const djangoApi = new ApiClient(API_CONFIG.DJANGO_BASE_URL);

// Spring Boot API Client (Finance/Payment)
export const springApi = new ApiClient(API_CONFIG.SPRING_BASE_URL);

export default ApiClient;
