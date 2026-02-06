"use client";

import { use, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { events } from "@/lib/data/events";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const { locale, t } = useLanguage();
    const { showToast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const event = events.find((e) => e.id === id);

    if (!event) {
        notFound();
    }

    const title = locale === "mm" ? event.titleMm : event.title;
    const description = locale === "mm" ? event.descriptionMm : event.description;
    const location = locale === "mm" ? event.locationMm : event.location;
    const typeLabel = t(`events.${event.type}`);

    const handleRegister = () => {
        showToast(locale === "mm" ? `${title} အတွက် စာရင်းသွင်းပြီးပါပြီ!` : `Registered for ${title} successfully!`, "success");
    };

    if (!isMounted) return null;

    return (
        <div className="bg-white dark:bg-gray-950 transition-colors duration-500 min-h-screen relative overflow-x-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-coral-500/5 dark:bg-coral-500/5 blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gold-500/5 dark:bg-gold-500/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Event Hero Area */}
            <section className="relative pt-32 pb-24 sm:pt-48 sm:pb-40 overflow-hidden bg-gray-950">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-coral-900/40 via-transparent to-gold-900/40 opacity-50 z-0" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                    <Link
                        href="/events"
                        className="group inline-flex items-center gap-2 text-coral-400 text-xs font-black uppercase tracking-[0.3em] mb-12 hover:text-coral-300 transition-colors"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {locale === 'mm' ? 'အားလုံးကြည့်ရန်' : 'Explore All Events'}
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-8">
                                <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl ${event.type === 'online' ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                                    event.type === 'offline' ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                                        "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                                    }`}>
                                    {typeLabel}
                                </span>
                                <div className="h-0.5 w-12 bg-white/10 rounded-full" />
                                <span className="text-white/60 text-xs font-black uppercase tracking-widest">
                                    {event.attendees} {t("events.attendees")}
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-8xl font-black text-white font-outfit tracking-tighter leading-none mb-12 sm:mb-16">
                                {title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{t("events.date")}</span>
                                        <span className="text-xl font-black text-white font-outfit uppercase">
                                            {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                                        <svg className="w-7 h-7 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{t("events.time")}</span>
                                        <span className="text-xl font-black text-white font-outfit">{event.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 sm:gap-24">

                    {/* Event Content Column */}
                    <div className="lg:col-span-2 space-y-24">

                        {/* Description Section */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-1.5 h-12 bg-coral-500 rounded-full" />
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white font-outfit tracking-tight">
                                    {locale === "mm" ? "အစီအစဉ်အကြောင်း" : "Event Vision"}
                                </h2>
                            </div>
                            <div className="prose prose-xl dark:prose-invert max-w-none">
                                <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed font-medium whitespace-pre-line mb-16">
                                    {description}
                                </p>

                                <div className="p-10 sm:p-20 rounded-[3.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-coral-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                    <h4 className="text-3xl font-black text-gray-900 dark:text-white mb-10 font-outfit">
                                        {locale === "mm" ? "အစီအစဉ်တွင် ပါဝင်မည့်အချက်များ" : "What to expect"}
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                        {[
                                            { t: locale === "mm" ? "အတွေ့အကြုံသစ်များ ဖလှယ်ခြင်း" : "Interactive knowledge sharing", icon: "💎" },
                                            { t: locale === "mm" ? "နယ်ပယ်အလိုက် ကျွမ်းကျင်သူများ" : "Expert guest speakers", icon: "🚀" },
                                            { t: locale === "mm" ? "Networking အခွင့်အလမ်းများ" : "Networking opportunities", icon: "🤝" },
                                            { t: locale === "mm" ? "Q&A ကဏ္ဍများ" : "Live Q&A sessions", icon: "🎙️" }
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center shrink-0 text-xl">
                                                    {item.icon}
                                                </div>
                                                <span className="text-lg font-bold text-gray-600 dark:text-gray-400 group-hover:text-coral-500 transition-colors">
                                                    {item.t}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Speaker/Host Card (Mock) */}
                        <div className="pt-24 border-t border-gray-100 dark:border-gray-800">
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-12">Event Hosting Team</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <Card className="p-8 border-none bg-gray-50/50 dark:bg-gray-900/50 rounded-[2.5rem] flex items-center gap-6 group">
                                    <div className="w-20 h-20 rounded-[28px] bg-gradient-to-br from-gold-400 to-coral-500 group-hover:rotate-6 transition-transform duration-500 shadow-xl" />
                                    <div>
                                        <h5 className="text-xl font-black text-gray-900 dark:text-white font-outfit">Myanmar Tech Lab</h5>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Official Host</p>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Event Sidebar Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <Card className="p-10 border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl rounded-[3rem]">

                                <div className="space-y-10 mb-12">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-coral-50 dark:bg-coral-900/30 flex items-center justify-center shrink-0">
                                            <svg className="w-6 h-6 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t("events.location")}</span>
                                            <span className="text-lg font-black text-gray-900 dark:text-white font-outfit leading-tight truncate block">{location}</span>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-3xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                                        <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Registration Status</h5>
                                        <div className="flex items-end justify-between">
                                            <div className="text-4xl font-black text-gray-900 dark:text-white font-outfit tracking-tighter">
                                                {Math.min(100, Math.round(event.attendees / 1.5))}%
                                            </div>
                                            <span className="text-[10px] font-bold text-coral-500 uppercase tracking-widest pb-1">Almost Full!</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white dark:bg-gray-950 rounded-full mt-4 overflow-hidden">
                                            <div className="h-full bg-coral-500 rounded-full" style={{ width: '70%' }} />
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full py-6 text-xl font-black rounded-3xl shadow-2xl shadow-coral-200/50 border-none bg-coral-500 hover:bg-coral-600 hover:scale-[1.02] active:scale-95 transition-all mb-10"
                                    onClick={handleRegister}
                                >
                                    {t("events.register")}
                                </Button>

                                <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">
                                        {locale === "mm" ? "အရေးကြီး အချက်အလက်" : "Important Notes"}
                                    </h4>
                                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 leading-relaxed">
                                        {locale === "mm"
                                            ? "စာရင်းသွင်းပြီးပါက အီးမေးလ်မှတစ်ဆင့် အတည်ပြုချက် လက်ခံရရှိပါမည်။ ပွဲမစတင်မီ ၁၅ မိနစ်အလိုတွင် ရောက်ရှိပေးပါရန်။"
                                            : "You will receive a confirmation email after registration. Please arrive early to network."}
                                    </p>
                                </div>
                            </Card>

                            {/* Share Card */}
                            <div className="p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-center">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Invite Friends</h4>
                                <div className="flex justify-center gap-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all">
                                            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
