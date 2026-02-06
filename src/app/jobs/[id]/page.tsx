"use client";

import { use, useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { jobs } from "@/lib/data/jobs";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function JobDetailPage({ params }: PageProps) {
    const { id } = use(params);
    const { locale, t } = useLanguage();
    const { showToast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const job = jobs.find((j) => j.id === id);

    if (!job) {
        notFound();
    }

    const title = locale === "mm" ? job.titleMm : job.title;
    const description = locale === "mm" ? job.descriptionMm : job.description;
    const location = locale === "mm" ? job.locationMm : job.location;
    const jobType = locale === "mm" ? job.typeMm : t(`jobs.${job.type === "full-time" ? "fullTime" : job.type === "part-time" ? "partTime" : job.type}`);

    const handleApply = () => {
        showToast(locale === "mm" ? `${title} အလုပ်အတွက် လျှောက်ထားပြီးပါပြီ!` : `Applied for ${title} successfully!`, "success");
    };

    if (!isMounted) return null;

    return (
        <div className="bg-cream-100 transition-colors duration-500 min-h-screen relative overflow-x-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gold-200/30 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-coral-200/30 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            {/* Job Discovery Area */}
            <section className="relative pt-32 pb-24 sm:pt-48 sm:pb-40 overflow-hidden bg-gradient-to-br from-gold-500 to-coral-500">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-gold-600/20 via-transparent to-transparent z-10" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                    <Link
                        href="/jobs"
                        className="group inline-flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-[0.3em] mb-12 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {locale === 'mm' ? 'အလုပ်အားလုံးကြည့်ရန်' : 'Back to Opportunities'}
                    </Link>

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-4 mb-8">
                                <div className="w-20 h-20 rounded-[32px] bg-white/90 backdrop-blur-2xl border border-white/50 flex items-center justify-center text-3xl font-black bg-gradient-to-br from-gold-400 to-coral-500 text-white font-outfit shadow-2xl">
                                    {job.company[0]}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{job.company}</span>
                                    <h1 className="text-4xl sm:text-7xl font-black text-white font-outfit tracking-tighter leading-none text-balance">
                                        {title}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                                <span className="px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-white/20 text-white border border-white/30 backdrop-blur-md">
                                    {jobType}
                                </span>
                                <div className="h-0.5 w-12 bg-white/20 rounded-full" />
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-white font-black font-outfit uppercase tracking-tighter">{location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Job Details Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 sm:gap-24">

                    {/* Content Column */}
                    <div className="lg:col-span-2 space-y-24">

                        {/* Skills Section */}
                        <div className="space-y-10">
                            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Required Stack</h4>
                            <div className="flex flex-wrap gap-4">
                                {job.tags?.map((tag) => (
                                    <span key={tag} className="px-6 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-2xl text-sm font-black transition-all hover:scale-110 active:scale-95 cursor-default group">
                                        <span className="opacity-40 group-hover:opacity-100 transition-opacity">#</span>{tag.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="group">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-1.5 h-12 bg-blue-500 rounded-full" />
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900 font-outfit tracking-tight">
                                    {locale === "mm" ? "အလုပ်အကိုင် အကြောင်းအရာ" : "The Role"}
                                </h2>
                            </div>
                            <div className="prose prose-xl max-w-none">
                                <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed font-medium whitespace-pre-line mb-16">
                                    {description}
                                </p>

                                <div className="p-10 sm:p-20 rounded-[3.5rem] bg-white border border-gray-200 relative overflow-hidden group shadow-lg">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100/50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                    <h4 className="text-3xl font-black text-gray-900 mb-10 font-outfit">
                                        {locale === "mm" ? "လိုအပ်ချက်များ" : "What you'll need"}
                                    </h4>
                                    <ul className="grid grid-cols-1 gap-10">
                                        {[
                                            locale === "mm" ? "သက်ဆိုင်ရာ နယ်ပယ်တွင် အတွေ့အကြုံရှိရမည်" : "Deep expertise in the relevant technology stack.",
                                            locale === "mm" ? "အသင်းအဖွဲ့နှင့် ပူးပေါင်းဆောင်ရွက်နိုင်သူဖြစ်ရမည်" : "Ability to scale systems and lead technical discussions.",
                                            locale === "mm" ? "သင်ယူလိုစိတ် အစဉ်ရှိရမည်" : "Passionate about building world-class user experiences.",
                                            locale === "mm" ? "ဆက်သွယ်ပြောဆိုမှု ကောင်းမွန်ရမည်" : "Clear communication with cross-functional teams."
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-6">
                                                <div className="w-10 h-10 rounded-2xl bg-green-50 shadow-sm flex items-center justify-center shrink-0 border border-green-200">
                                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors pt-1">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-8">
                            <Card className="p-10 border-gray-200 shadow-2xl shadow-gray-300/50 bg-white backdrop-blur-2xl rounded-[3rem]">

                                <div className="space-y-10 mb-12">
                                    {job.salary && (
                                        <div className="text-center pb-8 border-b border-gray-200">
                                            <span className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">{locale === "mm" ? "လစာ" : "Salary Package"}</span>
                                            <span className="text-4xl sm:text-5xl font-black text-green-600 font-outfit tracking-tighter block">{job.salary}</span>
                                        </div>
                                    )}

                                    <div className="space-y-8 pt-4">
                                        <div className="flex items-center gap-6 group">
                                            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-orange-200">
                                                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{t("jobs.postedOn")}</span>
                                                <span className="text-sm font-black text-gray-900 font-outfit uppercase tracking-tighter">
                                                    {new Date(job.postedDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 group">
                                            <div className="w-14 h-14 rounded-2xl bg-gold-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-gold-200">
                                                <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Applications</span>
                                                <span className="text-sm font-black text-gray-900 font-outfit uppercase tracking-tighter">15+ Applied</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="w-full py-6 text-xl font-black rounded-3xl shadow-2xl shadow-blue-200/50 border-none bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all mb-10"
                                    onClick={handleApply}
                                >
                                    {t("jobs.apply")}
                                </Button>

                                <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-gray-50 border border-gray-200">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs font-black text-white font-outfit shadow-lg">ZP</div>
                                    <div className="flex-1 min-w-0">
                                        <span className="block text-xs font-black text-gray-900 truncate">Zayar Phyo</span>
                                        <span className="block text-[8px] text-gray-600 uppercase font-black tracking-tighter">Direct Recruiter</span>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                                </div>
                            </Card>

                            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-gold-500 to-coral-500 text-white relative overflow-hidden group shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                                <h4 className="text-xl font-black font-outfit mb-3 relative z-10">Premium Job Tip</h4>
                                <p className="text-xs font-bold text-white/90 leading-relaxed relative z-10">Candidates who include a portfolio link are 3x more likely to be interviewed in this community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
