"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { challenges } from "@/lib/data/challenges";
import { Challenge } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ChallengesPage() {
    const { locale } = useLanguage();
    const [selectedStatus, setSelectedStatus] = useState<string>("all");

    const statuses = ["all", "ACTIVE", "JUDGING", "CLOSED"];

    const filteredChallenges = challenges.filter(challenge => {
        return selectedStatus === "all" || challenge.status === selectedStatus;
    });

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-7xl font-black font-outfit tracking-tighter mb-6">
                        {locale === "mm" ? "စိန်ခေါ်မှုများ" : "Challenges"}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        {locale === "mm"
                            ? "သင့်ကျွမ်းကျင်မှုကို စမ်းသပ်ပြီး ဆုများ ရယူပါ"
                            : "Test your skills and win amazing prizes"}
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <Card className="p-6 bg-white/80 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            {locale === "mm" ? "အခြေအနေ" : "Status"}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {statuses.map(status => (
                                <button
                                    key={status}
                                    onClick={() => setSelectedStatus(status)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedStatus === status
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {status === "all" ? (locale === "mm" ? "အားလုံး" : "All") : status}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>
            </section>

            {/* Challenges Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                        {filteredChallenges.length} {locale === "mm" ? "စိန်ခေါ်မှုများ" : "Challenges"}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredChallenges.map(challenge => (
                        <ChallengeCard key={challenge.id} challenge={challenge} locale={locale} />
                    ))}
                </div>

                {filteredChallenges.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">
                            {locale === "mm" ? "စိန်ခေါ်မှုများ မတွေ့ပါ" : "No challenges found"}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

function ChallengeCard({ challenge, locale }: { challenge: Challenge; locale: string }) {
    const title = locale === "mm" ? challenge.titleMm : challenge.title;
    const description = locale === "mm" ? challenge.descriptionMm : challenge.description;
    const prize = locale === "mm" ? challenge.prizeMm : challenge.prize;
    const category = locale === "mm" ? challenge.categoryMm : challenge.category;

    const statusColors = {
        ACTIVE: "bg-green-100 text-green-700",
        JUDGING: "bg-yellow-100 text-yellow-700",
        CLOSED: "bg-gray-100 text-gray-700",
    };

    const deadline = new Date(challenge.deadline);
    const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    return (
        <Link href={`/challenges/${challenge.id}`}>
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black text-gray-900">
                        {category}
                    </div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black ${statusColors[challenge.status]}`}>
                        {challenge.status}
                    </div>
                    {challenge.status === 'ACTIVE' && daysLeft > 0 && (
                        <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black text-gray-900">
                            {daysLeft} {locale === "mm" ? "ရက်" : "days"} left
                        </div>
                    )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-gray-900 font-outfit mb-2 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {description}
                    </p>

                    {prize && (
                        <div className="mb-4 p-3 bg-gold-50 rounded-xl">
                            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                                {locale === "mm" ? "ဆု" : "Prize"}
                            </div>
                            <div className="text-sm font-bold text-gold-700">
                                {prize}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                {challenge.creatorName[0]}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900">{challenge.creatorName}</div>
                                <div className="text-xs text-gray-500">{challenge.submissions.length} submissions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
