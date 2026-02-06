"use client";

import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export default function Skeleton({ className, ...props }: SkeletonProps) {
    return (
        <div
            className={`animate-pulse bg-gray-200 rounded-md ${className}`}
            {...props}
        />
    );
}

export function CardSkeleton() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="w-12 h-6 rounded-lg" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
            </div>
            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
        </div>
    );
}

export function DetailedSkeleton() {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-12 w-3/4" />
            </div>
            <Skeleton className="w-full h-64 sm:h-96 rounded-3xl" />
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
}
