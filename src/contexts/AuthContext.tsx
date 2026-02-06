"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, SubscriptionPlan } from '@/types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (name: string, email: string, password: string, role: UserRole, plan: SubscriptionPlan) => Promise<void>;
    switchRole: () => void;
    isAuthenticated: boolean;
    hasRole: (role: UserRole) => boolean;
    isCreator: boolean;
    isLearner: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('myc_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('myc_user');
            }
        }
        setLoading(false);
    }, []);

    // Save user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('myc_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('myc_user');
        }
    }, [user]);

    const login = async (email: string, password: string): Promise<void> => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock user data - in real app, this comes from backend
                const mockUser: User = {
                    id: 'user-' + Date.now(),
                    name: 'Zayar Phyo',
                    email,
                    role: 'LEARNER', // Default role
                    subscriptionPlan: 'LEARNER_FREE',
                    avatar: undefined,
                    createdAt: new Date().toISOString(),
                };

                // Check if user exists in localStorage (for demo purposes)
                const existingUsers = localStorage.getItem('myc_all_users');
                if (existingUsers) {
                    try {
                        const users: User[] = JSON.parse(existingUsers);
                        const foundUser = users.find(u => u.email === email);
                        if (foundUser) {
                            setUser(foundUser);
                            resolve();
                            return;
                        }
                    } catch (error) {
                        console.error('Failed to parse users:', error);
                    }
                }

                setUser(mockUser);
                resolve();
            }, 1000);
        });
    };

    const signup = async (
        name: string,
        email: string,
        password: string,
        role: UserRole,
        plan: SubscriptionPlan
    ): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newUser: User = {
                    id: 'user-' + Date.now(),
                    name,
                    email,
                    role,
                    subscriptionPlan: plan,
                    subscriptionExpiry: plan !== 'LEARNER_FREE'
                        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
                        : undefined,
                    avatar: undefined,
                    createdAt: new Date().toISOString(),
                };

                // Store in all users list for demo
                const existingUsers = localStorage.getItem('myc_all_users');
                let users: User[] = [];
                if (existingUsers) {
                    try {
                        users = JSON.parse(existingUsers);
                    } catch (error) {
                        console.error('Failed to parse users:', error);
                    }
                }
                users.push(newUser);
                localStorage.setItem('myc_all_users', JSON.stringify(users));

                setUser(newUser);
                resolve();
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('myc_user');
    };

    const switchRole = () => {
        if (!user) return;

        const newRole: UserRole = user.role === 'CREATOR' ? 'LEARNER' : 'CREATOR';
        const newPlan: SubscriptionPlan = newRole === 'CREATOR'
            ? 'CREATOR_MONTHLY'
            : 'LEARNER_FREE';

        const updatedUser: User = {
            ...user,
            role: newRole,
            subscriptionPlan: newPlan,
            subscriptionExpiry: newRole === 'CREATOR'
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                : undefined,
        };

        setUser(updatedUser);

        // Update in all users list
        const existingUsers = localStorage.getItem('myc_all_users');
        if (existingUsers) {
            try {
                const users: User[] = JSON.parse(existingUsers);
                const updatedUsers = users.map(u =>
                    u.id === user.id ? updatedUser : u
                );
                localStorage.setItem('myc_all_users', JSON.stringify(updatedUsers));
            } catch (error) {
                console.error('Failed to update users:', error);
            }
        }
    };

    const hasRole = (role: UserRole): boolean => {
        return user?.role === role;
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        signup,
        switchRole,
        isAuthenticated: !!user,
        hasRole,
        isCreator: user?.role === 'CREATOR',
        isLearner: user?.role === 'LEARNER',
        loading,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
