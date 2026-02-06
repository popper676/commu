"use client";

import Button from "./Button";
import { useLanguage } from "@/lib/i18n/context";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    actionHref?: string;
    icon?: React.ReactNode;
}

export default function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    icon,
}: EmptyStateProps) {
    const { locale } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6 text-gray-400">
                {icon || (
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 font-outfit">{title}</h3>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                {description}
            </p>
            {actionLabel && actionHref && (
                <Button variant="primary" size="md" href={actionHref}>
                    {actionLabel}
                </Button>
            )}
        </div>
    );
}
