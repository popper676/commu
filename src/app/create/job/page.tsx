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

export default function CreateJobPage() {
    const { locale } = useLanguage();
    const { showToast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            showToast(locale === "mm" ? "အလုပ်ခေါ်ယူမှု အသစ်ကို အောင်မြင်စွာ တင်ပြီးပါပြီ!" : "Job posted successfully!", "success");
            router.push("/jobs");
        }, 1500);
    };

    const jobTypes = [
        { label: "Full-time", value: "full-time" },
        { label: "Part-time", value: "part-time" },
        { label: "Freelance", value: "freelance" },
        { label: "Internship", value: "internship" },
        { label: "Contract", value: "contract" },
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
            {/* Background Orbs - Animated */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none"
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
                        className="group flex items-center gap-3 text-sm font-black text-gray-400 hover:text-blue-600 transition-all mb-8 uppercase tracking-[0.2em]"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {locale === "mm" ? "ရှေ့သို့ ပြန်သွားရန်" : "Back"}
                    </motion.button>
                    <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 font-outfit tracking-tighter">
                        {locale === "mm" ? "အလုပ်ခေါ်ယူပါ" : "Post a Job"}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                        {locale === "mm" ? "သင့်တော်တဲ့ ကျွမ်းကျင်သူတွေကို ခေါ်ယူနိုင်ဖို့ အချက်အလက်တွေ ဖြည့်သွင်းပါ" : "Find the right talent. Build your dream team with the Myanmar Tech Community."}
                    </motion.p>
                </div>

                <motion.div variants={itemVariants}>
                    <Card className="p-8 sm:p-14 shadow-2xl shadow-blue-100/50 border-white/50 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] relative overflow-hidden">
                        {/* Decorative gradient border effect */}
                        <div className="absolute inset-0 border-t-4 border-blue-500/20 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Company Logo Section */}
                            <motion.div variants={itemVariants} className="space-y-4">
                                <ImageUpload
                                    label={locale === "mm" ? "ကုမ္ပဏီ Logo" : "Company Logo"}
                                    description={locale === "mm" ? "သင့်ကုမ္ပဏီ၏ အမှတ်တံဆိပ် (PNG, JPG)" : "Upload your company logo to stand out"}
                                    className="max-w-md"
                                />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "အလုပ်အကိုင် အမည်" : "Job Title"}
                                        placeholder="e.g. Senior Frontend Developer"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "ကုမ္ပဏီ အမည်" : "Company Name"}
                                        placeholder="e.g. Myanmar Tech Solutions"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Select
                                        label={locale === "mm" ? "အလုပ်အမျိုးအစား" : "Job Type"}
                                        options={jobTypes}
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "တည်နေရာ" : "Location"}
                                        placeholder="e.g. Yangon, Myanmar or Remote"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "လစာ (ချန်လှပ်ထားနိုင်သည်)" : "Salary (Optional)"}
                                        placeholder="e.g. 10 - 20 Lakhs"
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "Tags (ကော်မာ အသုံးပြု၍ ခွဲပါ)" : "Tags"}
                                        placeholder="React, Tailwind, Node.js"
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants}>
                                <Textarea
                                    label={locale === "mm" ? "အလုပ်အကြောင်း ဖော်ပြချက်" : "Job Description"}
                                    placeholder="Detail the roles, responsibilities and requirements..."
                                    required
                                    className="text-lg font-medium min-h-[200px] bg-white/80"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-6">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-[2] py-6 text-xl font-bold rounded-2xl shadow-xl shadow-blue-200/50 bg-blue-600 hover:bg-blue-700 border-none hover:scale-[1.02] active:scale-95 transition-all"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            {locale === "mm" ? "လုပ်ဆောင်နေပါသည်..." : "Publishing..."}
                                        </div>
                                    ) : (locale === "mm" ? "အလုပ်ခေါ်ယူမှု တင်မည်" : "Post Job")}
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
