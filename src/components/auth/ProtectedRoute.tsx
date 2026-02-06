"use client";

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireCreator?: boolean;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    requireAuth = true,
    requireCreator = false,
    redirectTo = '/login',
}: ProtectedRouteProps) {
    const { isAuthenticated, isCreator, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (requireAuth && !isAuthenticated) {
            router.push(redirectTo);
            return;
        }

        if (requireCreator && !isCreator) {
            router.push('/subscribe?plan=creator');
            return;
        }
    }, [isAuthenticated, isCreator, loading, requireAuth, requireCreator, redirectTo, router]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream-100">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated when required
    if (requireAuth && !isAuthenticated) {
        return null;
    }

    // Don't render if creator required but user is not creator
    if (requireCreator && !isCreator) {
        return null;
    }

    return <>{children}</>;
}
