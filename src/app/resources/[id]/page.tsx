"use client";

import { use } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { resources } from "@/lib/data/resources";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ResourceDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const { locale, t } = useLanguage();
    const { showToast } = useToast();

    const resource = resources.find((r) => r.id === id);

    if (!resource) {
        notFound();
    }

    const title = locale === "mm" ? resource.titleMm : resource.title;
    const description = locale === "mm" ? resource.descriptionMm : resource.description;
    const category = locale === "mm" ? resource.categoryMm : resource.category;
    const typeLabel = t(`resources.${resource.type}`);

    const handleAction = () => {
        showToast(locale === "mm" ? `${title} ကို စတင်လေ့လာနိုင်ပါပြီ!` : `Accessing ${title}...`, "info");
        if (resource.url) {
            window.open(resource.url, "_blank");
        }
    };

    return (
        <div className="bg-cream-100 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${resource.type === 'video' ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                resource.type === 'article' ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                                    resource.type === 'course' ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                        "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                }`}>
                                {typeLabel}
                            </span>
                            <span className="text-gray-400 dark:text-gray-500">•</span>
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">
                                {category}
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-8 font-outfit leading-tight">
                            {title}
                        </h1>

                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto flex items-center justify-center gap-2">
                            {locale === "mm" ? "မျှဝေသူ -" : "Shared by"} <span className="text-gray-900 dark:text-white font-bold">{resource.author}</span>
                        </p>
                    </div>

                    {/* Preview Area */}
                    <div className="aspect-video w-full rounded-[40px] bg-gradient-to-br from-coral-50 via-white to-gold-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 mb-16 flex flex-col items-center justify-center border border-gray-100 dark:border-gray-800 shadow-2xl shadow-coral-100/20 dark:shadow-none group overflow-hidden relative">
                        <div className="absolute inset-0 bg-white/40 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <svg className="w-24 h-24 text-coral-400 dark:text-coral-800 transition-transform group-hover:scale-110 duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <p className="mt-6 text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase text-xs">Resource Preview Not Available</p>
                    </div>

                    {/* Content Section */}
                    <div className="bg-white dark:bg-gray-800/20 p-8 sm:p-12 rounded-[40px] border border-gray-100 dark:border-gray-800 mb-16">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-outfit">
                            {locale === "mm" ? "အကျဉ်းချုပ်" : "Short Summery"}
                        </h3>
                        <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line mb-10">
                            {description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{locale === "mm" ? "အမျိုးအစား" : "Format"}</span>
                                    <span className="font-bold text-gray-900 dark:text-white capitalize">{resource.type}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-4.44-2.03c1.166-1.61 1.886-3.587 1.886-5.72 0-2.455-.776-4.73-2.097-6.577m15.564 12.146c-1.166-1.61-1.886-3.587-1.886-5.72 0-2.455.776-4.73 2.097-6.577m-11.536 1c1.321 1.847 2.097 4.122 2.097 6.577 0 2.133-.72 4.11-1.886 5.72m11.536-12.146C18.679 8.153 17.903 10.428 17.903 12.883c0 2.133.72 4.11 1.886 5.72m-11.536-12.146A14.92 14.92 0 0112 3.5c1.45 0 2.825.206 4.122.586m-11.536 0A14.921 14.921 0 003 11c0 2.133.72 4.11 1.886 5.72m15.564-12.146A14.92 14.92 0 0121 11c0 2.133-.72 4.11-1.886 5.72" /></svg>
                                </div>
                                <div>
                                    <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{locale === "mm" ? "အခြေအနေ" : "Access"}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">Free Access</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="flex flex-col items-center gap-8">
                        <Button variant="primary" size="lg" className="px-12 py-5 text-lg font-bold shadow-2xl shadow-coral-100/50 hover:scale-105 transition-transform" onClick={handleAction}>
                            {resource.type === 'video' ? t("resources.watch") : resource.type === 'course' ? t("resources.enroll") : t("resources.readMore")}
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Button>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                            {locale === "mm" ? "အရင်းအမြစ်ကို မျှဝေရန်" : "Share this resource"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
