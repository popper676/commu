"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { Input, Textarea, Select } from "@/components/ui/Input";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CreateEventPage() {
    const { locale } = useLanguage();
    const { showToast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventType, setEventType] = useState("offline");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            showToast(locale === "mm" ? "ပွဲအသစ်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ!" : "Event created successfully!", "success");
            router.push("/events");
        }, 1500);
    };

    const eventTypes = [
        { label: "Online", value: "online" },
        { label: "Offline (In-Person)", value: "offline" },
        { label: "Hybrid", value: "hybrid" },
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
                    x: [0, -50, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-[600px] h-[600px] bg-coral-200/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
            >
                <div className="mb-12 text-center lg:text-left">
                    <motion.button
                        variants={itemVariants}
                        onClick={() => router.back()}
                        className="group inline-flex items-center gap-3 text-sm font-black text-gray-400 hover:text-coral-500 transition-all mb-8 uppercase tracking-[0.2em]"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {locale === "mm" ? "ရှေ့သို့ ပြန်သွားရန်" : "Back"}
                    </motion.button>
                    <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-black text-gray-900 mb-6 font-outfit tracking-tighter">
                        {locale === "mm" ? "ပွဲအသစ် ကျင်းပပါ" : "Organize Event"}
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
                        {locale === "mm" ? "ပွဲကျင်းပမည့် အချိန်နှင့် နေရာ အချက်အလက်များကို ဖြည့်သွင်းပါ" : "Create memorable experiences. Share knowledge or celebrate with the community."}
                    </motion.p>
                </div>

                <motion.div variants={itemVariants}>
                    <Card className="p-8 sm:p-14 shadow-2xl shadow-coral-100/50 border-white/50 bg-white/60 backdrop-blur-2xl rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute inset-0 border-t-4 border-coral-500/20 pointer-events-none" />

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Cover Image Upload */}
                            <motion.div variants={itemVariants}>
                                <ImageUpload
                                    label={locale === "mm" ? "ပွဲ မျက်နှာဖုံးပုံ" : "Event Cover Image"}
                                    description={locale === "mm" ? "အရည်အသွေးမြင့် ဓာတ်ပုံ (16:9 ratio recommended)" : "High quality image (16:9 ratio recommended)"}
                                    className="w-full"
                                />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "ပွဲအမည် (EN)" : "Event Title (EN)"}
                                        placeholder="e.g. Myanmar React Meetup"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        label={locale === "mm" ? "ပွဲအမည် (MM)" : "Event Title (MM)"}
                                        placeholder="မြန်မာ React ဆုံဆည်းပွဲ"
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                <motion.div variants={itemVariants}>
                                    <Input
                                        type="date"
                                        label={locale === "mm" ? "နေ့ရက်" : "Date"}
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Input
                                        type="time"
                                        label={locale === "mm" ? "အချိန်" : "Time"}
                                        required
                                        className="text-lg font-bold bg-white/80"
                                    />
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <Select
                                        label={locale === "mm" ? "ကျင်းပမည့် ပုံစံ" : "Event Type"}
                                        options={eventTypes}
                                        required
                                        className="text-lg font-bold bg-white/80"
                                        value={eventType}
                                        onChange={(e) => setEventType(e.target.value)}
                                    />
                                </motion.div>
                            </div>

                            <AnimatePresence mode="wait">
                                {(eventType === "offline" || eventType === "hybrid") && (
                                    <motion.div
                                        key="location"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <Input
                                            label={locale === "mm" ? "တည်နေရာ" : "Location / Venue"}
                                            placeholder={locale === "mm" ? "ရန်ကုန်၊ Town Hall..." : "e.g. Yangon, Town Hall..."}
                                            required
                                            className="text-lg font-bold bg-white/80"
                                        />
                                    </motion.div>
                                )}
                                {(eventType === "online" || eventType === "hybrid") && (
                                    <motion.div
                                        key="link"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <Input
                                            label={locale === "mm" ? "အွန်လိုင်း Link (Zoom/Meet)" : "Event Link (Zoom/Meet)"}
                                            placeholder="https://..."
                                            required
                                            className="text-lg font-bold bg-white/80 mt-8"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div variants={itemVariants}>
                                <Textarea
                                    label={locale === "mm" ? "ပွဲအကြောင်း ဖော်ပြချက်" : "Event Description"}
                                    placeholder="Tell us what's happening at this event..."
                                    required
                                    className="text-lg font-medium min-h-[200px] bg-white/80"
                                />
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 pt-6">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-[2] py-6 text-xl font-bold rounded-2xl shadow-xl shadow-coral-200/50 bg-coral-500 hover:bg-coral-600 border-none hover:scale-[1.02] active:scale-95 transition-all"
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
                                    ) : (locale === "mm" ? "ပွဲဖန်တီးမည်" : "Create Event")}
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
