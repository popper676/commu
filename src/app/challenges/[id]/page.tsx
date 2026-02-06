"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import { challenges } from "@/lib/data/challenges";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ChallengeDetailPage() {
    const params = useParams();
    const { locale } = useLanguage();
    const { isAuthenticated, user, isCreator } = useAuth();
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [submissionText, setSubmissionText] = useState("");

    const challenge = challenges.find(c => c.id === params.id);

    if (!challenge) {
        return (
            <div className="min-h-screen bg-cream-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-gray-900 mb-4">Challenge Not Found</h1>
                    <Link href="/challenges">
                        <Button>Back to Challenges</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const title = locale === "mm" ? challenge.titleMm : challenge.title;
    const description = locale === "mm" ? challenge.descriptionMm : challenge.description;
    const prize = locale === "mm" ? challenge.prizeMm : challenge.prize;
    const category = locale === "mm" ? challenge.categoryMm : challenge.category;

    const deadline = new Date(challenge.deadline);
    const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isOwner = user?.id === challenge.creatorId;

    const statusColors = {
        ACTIVE: "bg-green-100 text-green-700",
        JUDGING: "bg-yellow-100 text-yellow-700",
        CLOSED: "bg-gray-100 text-gray-700",
    };

    const handleSubmit = () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }
        // Mock submission
        alert('Submission successful! (Mock)');
        setShowSubmitModal(false);
        setSubmissionText("");
    };

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-start justify-between mb-6">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-widest">
                            {category}
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-black ${statusColors[challenge.status]}`}>
                            {challenge.status}
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter mb-4">
                        {title}
                    </h1>
                    <p className="text-xl text-white/90 mb-6 max-w-3xl">
                        {description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-bold">
                                {challenge.creatorName[0]}
                            </div>
                            <div>
                                <div className="font-bold">{challenge.creatorName}</div>
                                <div className="text-white/70 text-xs">Challenge Host</div>
                            </div>
                        </div>
                        {challenge.status === 'ACTIVE' && daysLeft > 0 && (
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-bold">{daysLeft} days left</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="font-bold">{challenge.submissions.length} submissions</span>
                        </div>
                    </div>

                    {prize && (
                        <div className="inline-block p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                            <div className="text-xs font-black uppercase tracking-widest mb-2 text-white/70">
                                {locale === "mm" ? "ဆု" : "Prize"}
                            </div>
                            <div className="text-2xl font-black">
                                {prize}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Action Bar */}
            {challenge.status === 'ACTIVE' && !isOwner && (
                <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                                {locale === "mm" ? "သင့်ကျွမ်းကျင်မှုကို ပြသပါ" : "Show your skills and compete"}
                            </div>
                            <Button onClick={() => setShowSubmitModal(true)} className="font-black">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                {locale === "mm" ? "တင်သွင်းမည်" : "Submit Entry"}
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Submissions */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                        {locale === "mm" ? "တင်သွင်းမှုများ" : "Submissions"} ({challenge.submissions.length})
                    </h2>
                    {isOwner && challenge.status === 'ACTIVE' && (
                        <Button variant="outline" size="sm">
                            {locale === "mm" ? "အကဲဖြတ်ခြင်း စတင်မည်" : "Start Judging"}
                        </Button>
                    )}
                </div>

                {challenge.submissions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {challenge.submissions.map((submission) => (
                            <Card key={submission.id} className="overflow-hidden">
                                {submission.attachments && submission.attachments[0] && (
                                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative">
                                        <div className="absolute inset-0 bg-black/20" />
                                        {submission.score && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-gold-500 text-white rounded-full text-sm font-black">
                                                {submission.score}/100
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                                            {submission.userAvatar}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">{submission.userName}</div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(submission.submittedAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {submission.content}
                                    </p>
                                    {submission.feedback && (
                                        <div className="p-3 bg-gold-50 rounded-xl">
                                            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                                                Feedback
                                            </div>
                                            <p className="text-sm text-gold-700">{submission.feedback}</p>
                                        </div>
                                    )}
                                    {isOwner && !submission.score && challenge.status === 'JUDGING' && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <Button size="sm" variant="outline" className="w-full">
                                                Score Submission
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="p-12 text-center">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {locale === "mm" ? "တင်သွင်းမှုများ မရှိသေးပါ" : "No submissions yet"}
                        </h3>
                        <p className="text-gray-500">
                            {locale === "mm" ? "ပထမဆုံး တင်သွင်းသူ ဖြစ်ပါ!" : "Be the first to submit your entry!"}
                        </p>
                    </Card>
                )}
            </section>

            {/* Submit Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="max-w-2xl w-full p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-black text-gray-900 font-outfit">
                                {locale === "mm" ? "သင့်အလုပ်ကို တင်သွင်းပါ" : "Submit Your Entry"}
                            </h3>
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {locale === "mm" ? "ဖော်ပြချက်" : "Description"}
                                </label>
                                <textarea
                                    value={submissionText}
                                    onChange={(e) => setSubmissionText(e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                    placeholder={locale === "mm" ? "သင့်အလုပ်အကြောင်း ပြောပြပါ..." : "Tell us about your submission..."}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    {locale === "mm" ? "ဖိုင်များ တင်ပါ" : "Upload Files"}
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                    <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-sm font-medium text-gray-600">
                                        {locale === "mm" ? "ဖိုင်များကို ဆွဲထည့်ပါ သို့မဟုတ် ရွေးချယ်ရန် နှိပ်ပါ" : "Drag files here or click to browse"}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">Images, videos, or documents</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowSubmitModal(false)}
                                    className="flex-1"
                                >
                                    {locale === "mm" ? "မလုပ်တော့ပါ" : "Cancel"}
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="flex-1 font-black"
                                    disabled={!submissionText.trim()}
                                >
                                    {locale === "mm" ? "တင်သွင်းမည်" : "Submit Entry"}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
