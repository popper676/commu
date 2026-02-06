"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) return;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        // Redirect based on role
        if (user?.role === 'CREATOR') {
            router.push('/dashboard/creator');
        } else {
            router.push('/dashboard/learner');
        }
    }, [isAuthenticated, user, loading, router]);

    // Show loading state
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream-100">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-500 font-medium">Redirecting...</p>
            </div>
        </div>
    );
}
