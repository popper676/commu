import { z } from 'zod';

export const registerSchema = z.object({
    username: z
        .string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be less than 30 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

export const refreshSchema = z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
