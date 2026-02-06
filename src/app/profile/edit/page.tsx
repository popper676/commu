"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { mockUser } from "@/lib/data/user";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";

export default function EditProfilePage() {
    const { locale, t } = useLanguage();
    const router = useRouter();
    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        name: mockUser.name,
        email: mockUser.email,
        bio: mockUser.bio,
        location: mockUser.location,
        skills: mockUser.skills.join(", "),
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            showToast(
                locale === "mm" ? "ပရိုဖိုင်ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ!" : "Profile updated successfully!",
                "success"
            );
            router.push("/profile");
        }, 1500);
    };

    const locationOptions = [
        { label: "Yangon, Myanmar", value: "Yangon, Myanmar" },
        { label: "Mandalay, Myanmar", value: "Mandalay, Myanmar" },
        { label: "Naypyidaw, Myanmar", value: "Naypyidaw, Myanmar" },
        { label: "Bago, Myanmar", value: "Bago, Myanmar" },
        { label: "Mawlamyine, Myanmar", value: "Mawlamyine, Myanmar" },
        { label: "Remote / Other", value: "Remote" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-200/10 dark:bg-gold-900/10 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral-200/10 dark:bg-coral-900/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-3 text-sm font-black text-gray-400 hover:text-gold-500 transition-all mb-8 uppercase tracking-[0.2em]"
                    >
                        <svg className="w-5 h-5 group-hover:-translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {locale === "mm" ? "ရှေ့သို့ ပြန်သွားရန်" : "Back"}
                    </button>
                    <h1 className="text-5xl sm:text-7xl font-black text-gray-900 dark:text-white mb-6 font-outfit tracking-tighter">
                        {locale === "mm" ? "ပရိုဖိုင် ပြင်ဆင်ရန်" : "Edit Profile"}
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
                        {locale === "mm" ? "သင့်ကိုယ်ရေးအချက်အလက်များကို ပြင်ဆင်နိုင်ပါသည်" : "Update your personal information and make your profile stand out."}
                    </p>
                </div>

                <Card className="p-10 sm:p-16 shadow-2xl shadow-gray-200/50 dark:shadow-none border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3rem]">
                    <form onSubmit={handleSubmit} className="space-y-12">

                        {/* Avatar Section */}
                        <div className="flex flex-col items-center pb-12 border-b border-gray-100 dark:border-gray-800">
                            <div className="relative group mb-6">
                                <div className="w-32 h-32 rounded-[40px] bg-gradient-to-br from-gold-400 to-coral-500 flex items-center justify-center text-white text-4xl font-black font-outfit shadow-2xl shadow-gold-200/50 dark:shadow-none group-hover:rotate-6 transition-transform duration-500">
                                    {formData.name.charAt(0)}
                                </div>
                                <button
                                    type="button"
                                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-900 rounded-2xl shadow-xl flex items-center justify-center text-gray-500 hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-900/30 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" className="text-sm font-black text-gold-600 dark:text-gold-400 hover:text-gold-700 uppercase tracking-widest">
                                {locale === "mm" ? "ဓာတ်ပုံ တင်ရန်" : "Upload Photo"}
                            </button>
                            <p className="text-xs text-gray-400 mt-2">
                                {locale === "mm" ? "PNG, JPG အရွယ်အစား 2MB ထိ" : "PNG, JPG up to 2MB"}
                            </p>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <Input
                                label={locale === "mm" ? "အမည် အပြည့်အစုံ" : "Full Name"}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. Aung Pyae Hein"
                                required
                                className="text-lg font-bold"
                            />
                            <Input
                                label={locale === "mm" ? "အီးမေးလ်" : "Email Address"}
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                                className="text-lg font-bold"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <Select
                                label={locale === "mm" ? "နေထိုင်ရာ မြို့" : "Location"}
                                name="location"
                                options={locationOptions}
                                value={formData.location}
                                onChange={handleChange}
                                className="text-lg font-bold"
                            />
                            <Input
                                label={locale === "mm" ? "ကျွမ်းကျင်မှုများ" : "Skills (comma separated)"}
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, Next.js, Design..."
                                className="text-lg font-bold"
                            />
                        </div>

                        <Textarea
                            label={locale === "mm" ? "ကိုယ်ရေးအကျဉ်း" : "Bio / About You"}
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            placeholder={locale === "mm" ? "သင့်အကြောင်းကို အနည်းငယ် ရေးပြပါ..." : "Tell us a little about yourself..."}
                            className="text-lg font-medium min-h-[150px]"
                        />

                        {/* Social Links Section */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                                {locale === "mm" ? "Social Links (Optional)" : "Social Links (Optional)"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <Input
                                    label="LinkedIn"
                                    placeholder="https://linkedin.com/in/username"
                                    className="text-lg font-bold"
                                />
                                <Input
                                    label="GitHub"
                                    placeholder="https://github.com/username"
                                    className="text-lg font-bold"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <Input
                                    label="Website"
                                    placeholder="https://yourwebsite.com"
                                    className="text-lg font-bold"
                                />
                                <Input
                                    label="Twitter / X"
                                    placeholder="https://twitter.com/username"
                                    className="text-lg font-bold"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-10 border-t border-gray-100 dark:border-gray-800">
                            <Button
                                type="submit"
                                size="lg"
                                className="flex-[2] py-6 text-xl font-bold rounded-3xl shadow-2xl shadow-gold-200/50 hover:scale-[1.02] active:scale-95 transition-all"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        {locale === "mm" ? "သိမ်းဆည်းနေပါသည်..." : "Saving..."}
                                    </span>
                                ) : (
                                    locale === "mm" ? "ပြောင်းလဲမှုများ သိမ်းမည်" : "Save Changes"
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="flex-1 py-6 text-xl font-bold rounded-3xl border-2"
                                onClick={() => router.push("/profile")}
                            >
                                {locale === "mm" ? "မလုပ်တော့ပါ" : "Cancel"}
                            </Button>
                        </div>

                        {/* Danger Zone */}
                        <div className="mt-16 p-8 rounded-[2rem] bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                            <h3 className="text-lg font-black text-red-600 dark:text-red-400 font-outfit mb-2">
                                {locale === "mm" ? "အန္တရာယ်ရှိသော ဇုန်" : "Danger Zone"}
                            </h3>
                            <p className="text-sm text-red-500/70 dark:text-red-400/70 mb-6">
                                {locale === "mm" ? "အကောင့်ကို ဖျက်ပါက ပြန်လည်ရယူ၍ မရနိုင်ပါ။" : "Once you delete your account, there is no going back. Please be certain."}
                            </p>
                            <button
                                type="button"
                                className="px-6 py-3 bg-white dark:bg-gray-900 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                            >
                                {locale === "mm" ? "အကောင့် ဖျက်ရန်" : "Delete Account"}
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}
