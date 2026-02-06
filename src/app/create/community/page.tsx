"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Input, Textarea, Select } from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CreateCommunityPage() {
    const { locale } = useLanguage();
    const { showToast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            showToast(locale === "mm" ? "အသိုင်းအဝိုင်း အသစ်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ!" : "Community created successfully!", "success");
            router.push("/communities");
        }, 1500);
    };

    const categories = [
        { label: "Technology", value: "Technology" },
        { label: "Design & Art", value: "Design & Art" },
        { label: "Business", value: "Business" },
        { label: "Career", value: "Career" },
        { label: "Social Impact", value: "Social Impact" },
        { label: "Education", value: "Education" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 transition-colors relative overflow-hidden">
            {/* Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-200/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral-200/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
            >
                <div className="mb-12">
                    <motion.button
                        variants={itemVariants}
                        onClick={() => router.back()}
                        className="group flex items-center gap-3 text-sm font-black text-gray-400 hover:text-gold-600 transition-all mb-8 uppercase tracking-[0.2em]"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {locale === "mm" ? "ရှေ့သို့ ပြန်သွားရန်" : "Back"}
                    </motion.button>
                    <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 font-outfit tracking-tighter">
                        {locale === "mm" ? "အသိုင်းအဝိုင်းအသစ်" : "New Community"}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                        {locale === "mm" ? "သင့်ရဲ့ အသိုင်းအဝိုင်းကို လူသိများလာအောင် အချက်အလက်တွေ ဖြည့်သွင်းပါ" : "Bring people together. Start a group that matters to you and the community."}
                    </motion.p>
                </div>

                <motion.div variants={itemVariants}>
                    <Card className="p-8 sm:p-14 shadow-2xl shadow-gold-100/50 border-white/50 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute inset-0 border-t-4 border-gold-500/20 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Community Icon Upload */}
                            <motion.div variants={itemVariants} className="flex justify-center sm:justify-start">
                                <ImageUpload
                                    label={locale === "mm" ? "အသိုင်းအဝိုင်း Logo" : "Community Logo"}
                                    description={locale === "mm" ? "Square image recommended" : "Square image recommended"}
                                    className="w-full sm:w-64" // Smaller upload area for logo
                                />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "အသိုင်းအဝိုင်း အမည် (EN)" : "Community Name (EN)"}
                                        placeholder="e.g. Yangon Tech Hub"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "အသိုင်းအဝိုင်း အမည် (MM)" : "Community Name (MM)"}
                                        placeholder="ရန်ကုန်နည်းပညာဗဟိုချက်"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Select
                                        label={locale === "mm" ? "ကဏ္ဍ" : "Category"}
                                        options={categories}
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "တည်နေရာ (မြို့)" : "Location (City)"}
                                        placeholder="Yangon"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <div className="space-y-8">
                                <motion.div variants={itemVariants}>
                                    <Textarea
                                        label={locale === "mm" ? "အသိုင်းအဝိုင်းအကြောင်း (EN)" : "Description (EN)"}
                                        placeholder="Tell us what this community is about..."
                                        required
                                        className="text-lg font-medium min-h-[150px] bg-white/80"
                                    />
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <Textarea
                                        label={locale === "mm" ? "အသိုင်းအဝိုင်းအကြောင်း (MM)" : "Description (MM)"}
                                        placeholder="ဒီအသိုင်းအဝိုင်းအကြောင်း ရှင်းပြပေးပါ..."
                                        required
                                        className="text-lg font-medium min-h-[150px] bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-6">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-[2] py-6 text-xl font-bold rounded-2xl shadow-xl shadow-gold-200/50 bg-gold-500 hover:bg-gold-600 text-white border-none hover:scale-[1.02] active:scale-95 transition-all"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {locale === "mm" ? "လုပ်ဆောင်နေပါသည်..." : "Creating..."}
                                        </div>
                                    ) : (locale === "mm" ? "အသိုင်းအဝိုင်း ဖန်တီးမည်" : "Create Community")}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 py-6 text-xl font-bold rounded-2xl border-2 bg-transparent hover:bg-red-50 hover:text-red-500 hover:border-red-200"
                                    onClick={() => router.back()}
                                >
                                    {locale === "mm" ? "မလုပ်တော့ပါ" : "Cancel"}
                                </Button>
                            </motion.div>
                        </form>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    );
}
