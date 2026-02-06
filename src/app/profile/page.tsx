"use client";

import { useLanguage } from "@/lib/i18n/context";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ProfilePage() {
    const { locale } = useLanguage();

    const user = {
        name: "Zayar Phyo",
        email: "zayar.phyo@example.com",
        bio: "Passionate developer and community builder in Yangon. Always looking for new ways to leverage technology for social good.",
        joined: "January 2024",
        location: "Yangon, Myanmar",
        role: "Premium Member",
        avatar: "ZP"
    };

    return (
        <div className="bg-cream-100 transition-colors min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

                {/* Profile Card */}
                <Card className="p-10 sm:p-16 border-gray-100 dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none bg-white dark:bg-gray-900 relative overflow-hidden group">
                    {/* Accents */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />

                    <div className="flex flex-col items-center text-center">
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-gold-400 to-coral-500 flex items-center justify-center text-white text-4xl font-black font-outfit shadow-2xl shadow-gold-200/50 dark:shadow-none mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                            {user.avatar}
                        </div>

                        <h1 className="text-4xl font-black text-gray-900 dark:text-white font-outfit mb-3">{user.name}</h1>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-6 flex items-center gap-2">
                            <span className="px-3 py-1 bg-gold-50 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 rounded-full text-xs uppercase tracking-widest">{user.role}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-xs uppercase tracking-widest">{user.joined}</span>
                        </p>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
                            &quot;{user.bio}&quot;
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mb-12">
                            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{locale === "mm" ? "အီးမေးလ်" : "Email Address"}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{user.email}</span>
                            </div>
                            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-left">
                                <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{locale === "mm" ? "နေရပ်" : "Location"}</span>
                                <span className="font-bold text-gray-900 dark:text-white">{user.location}</span>
                            </div>
                        </div>

                        {/* Member Stats */}
                        <div className="grid grid-cols-3 gap-8 w-full max-w-lg mb-12 py-8 border-y border-gray-100 dark:border-gray-800">
                            <div className="text-center">
                                <span className="block text-2xl font-black text-gray-900 dark:text-white font-outfit">12</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{locale === "mm" ? "အသိုင်းအဝိုင်း" : "Communities"}</span>
                            </div>
                            <div className="text-center border-x border-gray-100 dark:border-gray-800">
                                <span className="block text-2xl font-black text-gray-900 dark:text-white font-outfit">48</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{locale === "mm" ? "ပွဲများ" : "Events"}</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-2xl font-black text-gray-900 dark:text-white font-outfit">156</span>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{locale === "mm" ? "အမှတ်များ" : "Points"}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href="/profile/edit">
                                <Button variant="primary" size="lg" className="px-10 py-4 font-bold rounded-2xl shadow-xl shadow-gold-100/50">
                                    {locale === "mm" ? "ပရိုဖိုင်ပြင်မည်" : "Edit Profile"}
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="outline" size="lg" className="px-10 py-4 font-bold rounded-2xl">
                                    {locale === "mm" ? "ဒက်ရှ်ဘုတ်သို့" : "Go to Dashboard"}
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>

                {/* Account Settings Placeholder */}
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <Link href="#" className="p-8 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center gap-6 hover:border-gold-300 dark:hover:border-gold-700 transition-colors group">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gold-50 dark:group-hover:bg-gold-900/30 transition-colors">
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-gold-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{locale === "mm" ? "လုံခြုံရေး" : "Security Settings"}</h3>
                            <p className="text-sm text-gray-400">{locale === "mm" ? "လျှို့ဝှက်နံပါတ် ပြောင်းရန်" : "Update password and auth"}</p>
                        </div>
                    </Link>
                    <Link href="#" className="p-8 rounded-[32px] border-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center gap-6 hover:border-coral-300 dark:hover:border-coral-700 transition-colors group">
                        <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-coral-50 dark:group-hover:bg-coral-900/30 transition-colors">
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-coral-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">{locale === "mm" ? "အကြောင်းကြားချက်များ" : "Notifications"}</h3>
                            <p className="text-sm text-gray-400">{locale === "mm" ? "အသစ်များကို သိရှိရန်" : "Manage email alerts"}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
