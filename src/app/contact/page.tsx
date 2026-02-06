"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default function ContactPage() {
    const { locale, t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            (e.target as HTMLFormElement).reset();
        }, 1500);
    };

    return (
        <div className="bg-cream-100 transition-colors duration-500 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 overflow-hidden bg-gradient-to-br from-gold-500 to-coral-500 text-white">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-900/40 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-400/10 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-gold-400">
                        Reach Out to Us
                    </div>
                    <h1 className="text-5xl sm:text-8xl font-black mb-10 font-outfit tracking-tighter leading-none">
                        {t("contact.title")}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-medium">
                        {t("contact.subtitle")}
                    </p>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40 relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 sm:gap-32">
                    {/* Contact Information */}
                    <div className="space-y-16">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-10 font-outfit tracking-tight">
                                {t("contact.getInTouch")}
                            </h2>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed mb-12">
                                {locale === 'mm' ? 'သင့်ရဲ့ မေးခွန်းတွေ၊ အကြံပြုချက်တွေကို ကြိုဆိုလျက်ရှိပါတယ်။' : 'We typically respond within 24 hours. Feel free to contact us anytime.'}
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-center gap-8 group">
                                    <div className="w-16 h-16 rounded-[2rem] bg-gold-50 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{t("contact.address")}</h3>
                                        <p className="text-xl text-gray-900 font-bold">{t("contact.addressText")}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 group">
                                    <div className="w-16 h-16 rounded-[2rem] bg-coral-50 dark:bg-coral-900/30 text-coral-600 dark:text-coral-400 flex items-center justify-center shrink-0 group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{t("contact.email")}</h3>
                                        <p className="text-xl text-gray-900 font-bold">hello@myc.mm</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8 group">
                                    <div className="w-16 h-16 rounded-[2rem] bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{t("contact.phone")}</h3>
                                        <p className="text-xl text-gray-900 font-bold">+95 9 123 456 789</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black text-gray-900 mb-8 font-outfit uppercase tracking-wider">
                                {t("contact.followUs")}
                            </h2>
                            <div className="flex gap-5">
                                {[
                                    { name: 'facebook', color: 'hover:bg-[#1877F2]' },
                                    { name: 'twitter', color: 'hover:bg-[#1DA1F2]' },
                                    { name: 'instagram', color: 'hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]' },
                                    { name: 'linkedin', color: 'hover:bg-[#0A66C2]' }
                                ].map(social => (
                                    <a key={social.name} href="#" className={`w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 ${social.color} hover:-translate-y-2`}>
                                        <span className="sr-only">{social.name}</span>
                                        <div className="w-6 h-6 border-2 border-current rounded-lg" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="p-10 sm:p-16 shadow-2xl shadow-gray-200/50 border-gray-100 bg-white/80 backdrop-blur-xl rounded-[3rem]">
                        <h2 className="text-3xl font-black text-gray-900 mb-10 font-outfit">
                            {t("contact.formTitle")}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid sm:grid-cols-2 gap-8">
                                <Input
                                    label={t("contact.name")}
                                    required
                                    placeholder="Aung Aung"
                                />
                                <Input
                                    label={t("contact.email")}
                                    type="email"
                                    required
                                    placeholder="aung@example.com"
                                />
                            </div>
                            <Textarea
                                label={t("contact.message")}
                                required
                                placeholder={locale === 'mm' ? 'သင့်ရဲ့ မေးမြန်းလိုသည်များကို ရေးပေးပါ...' : 'How can we help you today?'}
                            />
                            <Button
                                variant="primary"
                                size="lg"
                                type="submit"
                                className="w-full py-5 text-lg font-bold shadow-2xl shadow-gold-200/50 hover:scale-[1.02] transition-transform"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-3">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>{locale === 'mm' ? 'ပို့ဆောင်နေပါသည်...' : 'Sending...'}</span>
                                    </div>
                                ) : (
                                    <>
                                        {t("contact.send")}
                                        <span className="ml-2">&rarr;</span>
                                    </>
                                )}
                            </Button>
                        </form>
                    </Card>
                </div>
            </section>

            {/* Premium Map Experience */}
            <section className="h-[500px] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gray-100 overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, #000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 dark:bg-gold-500/5 blur-[120px] rounded-full animate-pulse" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex items-center justify-center mx-auto mb-6 animate-bounce relative z-10 border-4 border-gold-400">
                            <svg className="w-10 h-10 text-coral-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="px-8 py-4 bg-white rounded-3xl shadow-2xl border border-gray-100 text-center relative z-10">
                            <p className="font-outfit font-black text-gray-900 text-2xl tracking-tight leading-none mb-1">MYC Headquarters</p>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Downtown Yangon, Myanmar</p>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-gold-400/30 rounded-full animate-ping" />
                    </div>
                </div>
            </section>
        </div>
    );
}
