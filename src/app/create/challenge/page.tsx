"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function CreateChallengePage() {
    return (
        <ProtectedRoute requireCreator>
            <CreateChallengeForm />
        </ProtectedRoute>
    );
}

function CreateChallengeForm() {
    const { locale } = useLanguage();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [challengeData, setChallengeData] = useState({
        title: "",
        titleMm: "",
        description: "",
        descriptionMm: "",
        category: "",
        prize: "",
        prizeMm: "",
        deadline: "",
        maxSubmissions: 0,
    });

    const categories = [
        { label: "Design", value: "Design" },
        { label: "Technology", value: "Technology" },
        { label: "Content Creation", value: "Content" },
        { label: "Art", value: "Art" },
        { label: "Photography", value: "Photography" },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock API call
        setTimeout(() => {
            alert('Challenge created successfully! (Mock)');
            router.push('/dashboard/creator');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-cream-100">
            <section className="bg-gradient-to-br from-purple-500 to-pink-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter mb-4">
                        {locale === "mm" ? "စိန်ခေါ်မှု ဖန်တီးမည်" : "Create Challenge"}
                    </h1>
                    <p className="text-xl text-white/90">
                        {locale === "mm"
                            ? "အသိုင်းအဝိုင်းကို စိန်ခေါ်ပြီး အရည်အချင်းရှိသူများကို ရှာပါ"
                            : "Challenge the community and discover talent"}
                    </p>
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div>
                            <h2 className="text-2xl font-black text-gray-900 font-outfit mb-6">
                                {locale === "mm" ? "အခြေခံ အချက်အလက်" : "Basic Information"}
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Challenge Title (English) *
                                        </label>
                                        <input
                                            type="text"
                                            value={challengeData.title}
                                            onChange={(e) => setChallengeData({ ...challengeData, title: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                            placeholder="e.g. Web Design Challenge 2024"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Challenge Title (Myanmar) *
                                        </label>
                                        <input
                                            type="text"
                                            value={challengeData.titleMm}
                                            onChange={(e) => setChallengeData({ ...challengeData, titleMm: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                            placeholder="e.g. ဝဘ်ဒီဇိုင်း စိန်ခေါ်မှု 2024"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={challengeData.category}
                                            onChange={(e) => setChallengeData({ ...challengeData, category: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Deadline *
                                        </label>
                                        <input
                                            type="date"
                                            value={challengeData.deadline}
                                            onChange={(e) => setChallengeData({ ...challengeData, deadline: e.target.value })}
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Description (English) *
                                    </label>
                                    <textarea
                                        value={challengeData.description}
                                        onChange={(e) => setChallengeData({ ...challengeData, description: e.target.value })}
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="Describe the challenge requirements..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Description (Myanmar) *
                                    </label>
                                    <textarea
                                        value={challengeData.descriptionMm}
                                        onChange={(e) => setChallengeData({ ...challengeData, descriptionMm: e.target.value })}
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="စိန်ခေါ်မှု လိုအပ်ချက်များကို ဖော်ပြပါ..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Prize & Settings */}
                        <div className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-black text-gray-900 font-outfit mb-6">
                                {locale === "mm" ? "ဆု နှင့် ဆက်တင်များ" : "Prize & Settings"}
                            </h2>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Prize (English) *
                                        </label>
                                        <input
                                            type="text"
                                            value={challengeData.prize}
                                            onChange={(e) => setChallengeData({ ...challengeData, prize: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                            placeholder="e.g. $500 Cash Prize"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Prize (Myanmar) *
                                        </label>
                                        <input
                                            type="text"
                                            value={challengeData.prizeMm}
                                            onChange={(e) => setChallengeData({ ...challengeData, prizeMm: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                            placeholder="e.g. $500 ငွေသားဆု"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Maximum Submissions (Optional)
                                    </label>
                                    <input
                                        type="number"
                                        value={challengeData.maxSubmissions || ""}
                                        onChange={(e) => setChallengeData({ ...challengeData, maxSubmissions: parseInt(e.target.value) || 0 })}
                                        min="0"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="Leave empty for unlimited"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        {locale === "mm"
                                            ? "ကန့်သတ်မထားလျှင် အကန့်အသတ်မရှိ တင်သွင်းနိုင်ပါသည်"
                                            : "Leave empty to allow unlimited submissions"}
                                    </p>
                                </div>

                                {/* Requirements Preview */}
                                <div className="p-6 bg-purple-50 rounded-xl">
                                    <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {locale === "mm" ? "တင်သွင်းမှု လိုအပ်ချက်များ" : "Submission Requirements"}
                                    </h3>
                                    <ul className="text-sm text-purple-700 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Participants can upload images, videos, or documents</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>You can score and provide feedback on each submission</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Challenge will automatically close after the deadline</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex gap-4 pt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="flex-1"
                            >
                                {locale === "mm" ? "မလုပ်တော့ပါ" : "Cancel"}
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 font-black"
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? (locale === "mm" ? "ဖန်တီးနေသည်..." : "Creating...")
                                    : (locale === "mm" ? "စိန်ခေါ်မှု ဖန်တီးမည်" : "Create Challenge")}
                            </Button>
                        </div>
                    </form>
                </Card>
            </section>
        </div>
    );
}
