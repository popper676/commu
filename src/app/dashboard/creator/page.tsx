"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { communities } from "@/lib/data/communities";
import { courses } from "@/lib/data/courses";
import { challenges } from "@/lib/data/challenges";

export default function CreatorDashboard() {
    return (
        <ProtectedRoute requireCreator>
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const { locale } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();

    // State management
    const [activeTab, setActiveTab] = useState<'communities' | 'courses' | 'jobs'>('communities');
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; type: string; id: string; name: string }>({
        isOpen: false,
        type: '',
        id: '',
        name: ''
    });

    // Mock data - in real app, filter by creatorId
    const myCommunities = communities.filter(c => c.creatorId === user?.id);
    const myCourses = courses.filter(c => c.creatorId === user?.id);
    const myChallenges = challenges.filter(c => c.creatorId === user?.id);

    // Delete handler
    const handleDelete = (type: string, id: string, name: string) => {
        setDeleteModal({ isOpen: true, type, id, name });
    };

    const confirmDelete = () => {
        // In real app, call API to delete
        console.log(`Deleting ${deleteModal.type} with id: ${deleteModal.id}`);
        // TODO: Implement actual delete logic
        setDeleteModal({ isOpen: false, type: '', id: '', name: '' });
    };

    const stats = [
        { label: locale === "mm" ? "အသိုင်းအဝိုင်းများ" : "Communities", value: myCommunities.length, color: "gold", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
        { label: locale === "mm" ? "သင်တန်းများ" : "Courses", value: myCourses.length, color: "blue", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
        { label: locale === "mm" ? "စိန်ခေါ်မှုများ" : "Challenges", value: myChallenges.length, color: "purple", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
        { label: locale === "mm" ? "စုစုပေါင်း ဝင်ငွေ" : "Total Revenue", value: "$2,450", color: "green", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gold-500 to-coral-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-black uppercase tracking-widest mb-2 text-white/80">
                                {locale === "mm" ? "ဖန်တီးသူ ဒက်ရှ်ဘုတ်" : "Creator Dashboard"}
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter">
                                {locale === "mm" ? "မင်္ဂလာပါ" : "Welcome back"}, {user?.name}!
                            </h1>
                        </div>
                        <Link href="/create">
                            <Button className="bg-white text-gold-600 hover:bg-white/90 font-black">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                {locale === "mm" ? "အသစ်ဖန်တီးမည်" : "Create New"}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <Card key={i} className="p-6 bg-white/80 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-100 flex items-center justify-center`}>
                                    <svg className={`w-6 h-6 text-${stat.color}-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                                    </svg>
                                </div>
                            </div>
                            <div className="text-3xl font-black text-gray-900 font-outfit mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Quick Actions */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-black text-gray-900 font-outfit mb-6">
                    {locale === "mm" ? "အမြန်လုပ်ဆောင်ချက်များ" : "Quick Actions"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/create/community">
                        <Card className="p-8 hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-14 h-14 rounded-2xl bg-gold-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 font-outfit mb-2">
                                {locale === "mm" ? "အသိုင်းအဝိုင်း ဖန်တီးမည်" : "Create Community"}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {locale === "mm" ? "Discord-style channels ပါသော အသိုင်းအဝိုင်းအသစ် စတင်ပါ" : "Start a new community with Discord-style channels"}
                            </p>
                        </Card>
                    </Link>

                    <Link href="/create/course">
                        <Card className="p-8 hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 font-outfit mb-2">
                                {locale === "mm" ? "သင်တန်း ဖန်တီးမည်" : "Create Course"}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {locale === "mm" ? "သင့်အသိပညာကို မျှဝေပြီး ဝင်ငွေရယူပါ" : "Share your knowledge and earn revenue"}
                            </p>
                        </Card>
                    </Link>

                    <Link href="/create/challenge">
                        <Card className="p-8 hover:shadow-xl transition-all cursor-pointer group">
                            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-gray-900 font-outfit mb-2">
                                {locale === "mm" ? "စိန်ခေါ်မှု ဖန်တီးမည်" : "Create Challenge"}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {locale === "mm" ? "အသိုင်းအဝိုင်းကို စိန်ခေါ်ပြီး အရည်အချင်းရှိသူများကို ရှာပါ" : "Challenge the community and discover talent"}
                            </p>
                        </Card>
                    </Link>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <h2 className="text-2xl font-black text-gray-900 font-outfit mb-6">
                    {locale === "mm" ? "မကြာသေးမီ လှုပ်ရှားမှုများ" : "Recent Activity"}
                </h2>
                <Card className="p-8 bg-white/80 backdrop-blur-xl">
                    <div className="space-y-6">
                        {[
                            { action: locale === "mm" ? "Tech Pioneers အသိုင်းအဝိုင်းတွင် အဖွဲ့ဝင်အသစ် 12 ဦး" : "12 new members joined Tech Pioneers", time: "2h ago", icon: "👥" },
                            { action: locale === "mm" ? "Web Development သင်တန်းတွင် ကျောင်းသားအသစ် 5 ဦး စာရင်းသွင်းခဲ့သည်" : "5 new enrollments in Web Development course", time: "5h ago", icon: "📚" },
                            { action: locale === "mm" ? "Design Challenge တွင် submission အသစ် 3 ခု" : "3 new submissions in Design Challenge", time: "1d ago", icon: "🎨" },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="text-3xl">{activity.icon}</div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-900">{activity.action}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </section>

            {/* Content Management Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-black text-gray-900 font-outfit mb-6">
                    {locale === "mm" ? "သင့်အကြောင်းအရာများကို စီမံခန့်ခွဲမည်" : "Manage Your Content"}
                </h2>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setActiveTab('communities')}
                        className={`px-6 py-3 font-black text-sm transition-all ${activeTab === 'communities'
                            ? 'text-gold-600 border-b-2 border-gold-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {locale === "mm" ? "အသိုင်းအဝိုင်းများ" : "Communities"} ({myCommunities.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('courses')}
                        className={`px-6 py-3 font-black text-sm transition-all ${activeTab === 'courses'
                            ? 'text-gold-600 border-b-2 border-gold-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {locale === "mm" ? "သင်တန်းများ" : "Courses"} ({myCourses.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`px-6 py-3 font-black text-sm transition-all ${activeTab === 'jobs'
                            ? 'text-gold-600 border-b-2 border-gold-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {locale === "mm" ? "အလုပ်များ" : "Jobs"} ({myChallenges.length})
                    </button>
                </div>

                {/* Communities Tab */}
                {activeTab === 'communities' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myCommunities.length === 0 ? (
                            <Card className="col-span-full p-12 text-center">
                                <div className="text-6xl mb-4">🏘️</div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">
                                    {locale === "mm" ? "အသိုင်းအဝိုင်းမရှိသေးပါ" : "No Communities Yet"}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {locale === "mm" ? "သင့်ပထမဆုံး အသိုင်းအဝိုင်းကို ဖန်တီးပါ" : "Create your first community to get started"}
                                </p>
                                <Link href="/create/community">
                                    <Button>{locale === "mm" ? "အသိုင်းအဝိုင်း ဖန်တီးမည်" : "Create Community"}</Button>
                                </Link>
                            </Card>
                        ) : (
                            myCommunities.map((community) => (
                                <Card key={community.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="aspect-video bg-gradient-to-br from-gold-400 to-coral-400 rounded-xl mb-4 flex items-center justify-center text-white text-4xl font-black">
                                        {community.name[0]}
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 mb-2">{community.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{community.description}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <span>👥 {community.members} {locale === "mm" ? "အဖွဲ့ဝင်" : "members"}</span>
                                        <span className={`px-2 py-1 rounded-full ${community.isPaid ? 'bg-gold-100 text-gold-700' : 'bg-green-100 text-green-700'}`}>
                                            {community.isPaid ? 'PAID' : 'FREE'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => router.push(`/communities/${community.id}`)}
                                            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs py-2"
                                        >
                                            {locale === "mm" ? "ကြည့်ရှုမည်" : "View"}
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/create/community?edit=${community.id}`)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-xs py-2"
                                        >
                                            {locale === "mm" ? "တည်းဖြတ်မည်" : "Edit"}
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete('community', community.id, community.name)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-xs py-2"
                                        >
                                            {locale === "mm" ? "ဖျက်မည်" : "Delete"}
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {/* Courses Tab */}
                {activeTab === 'courses' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myCourses.length === 0 ? (
                            <Card className="col-span-full p-12 text-center">
                                <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">
                                    {locale === "mm" ? "သင်တန်းမရှိသေးပါ" : "No Courses Yet"}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {locale === "mm" ? "သင့်ပထမဆုံး သင်တန်းကို ဖန်တီးပါ" : "Create your first course to get started"}
                                </p>
                                <Link href="/create/course">
                                    <Button>{locale === "mm" ? "သင်တန်း ဖန်တီးမည်" : "Create Course"}</Button>
                                </Link>
                            </Card>
                        ) : (
                            myCourses.map((course) => (
                                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl mb-4 flex items-center justify-center text-white text-4xl font-black">
                                        📖
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 mb-2">{course.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <span>👨‍🎓 {course.enrolledCount} {locale === "mm" ? "ကျောင်းသား" : "students"}</span>
                                        <span className="font-bold text-blue-600">${course.price}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => router.push(`/courses/${course.id}`)}
                                            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs py-2"
                                        >
                                            {locale === "mm" ? "ကြည့်ရှုမည်" : "View"}
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/create/course?edit=${course.id}`)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-xs py-2"
                                        >
                                            {locale === "mm" ? "တည်းဖြတ်မည်" : "Edit"}
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete('course', course.id, course.title)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-xs py-2"
                                        >
                                            {locale === "mm" ? "ဖျက်မည်" : "Delete"}
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {/* Jobs Tab */}
                {activeTab === 'jobs' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myChallenges.length === 0 ? (
                            <Card className="col-span-full p-12 text-center">
                                <div className="text-6xl mb-4">💼</div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">
                                    {locale === "mm" ? "စိန်ခေါ်မှုမရှိသေးပါ" : "No Challenges Yet"}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {locale === "mm" ? "သင့်ပထမဆုံး စိန်ခေါ်မှုကို ဖန်တီးပါ" : "Create your first challenge to get started"}
                                </p>
                                <Link href="/create/challenge">
                                    <Button>{locale === "mm" ? "စိန်ခေါ်မှု ဖန်တီးမည်" : "Create Challenge"}</Button>
                                </Link>
                            </Card>
                        ) : (
                            myChallenges.map((challenge) => (
                                <Card key={challenge.id} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mb-4 flex items-center justify-center text-white text-4xl font-black">
                                        🏆
                                    </div>
                                    <h3 className="text-lg font-black text-gray-900 mb-2">{challenge.title}</h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{challenge.description}</p>
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <span>📝 {challenge.submissions.length} {locale === "mm" ? "တင်သွင်းမှု" : "submissions"}</span>
                                        <span className="font-bold text-purple-600">${challenge.prize}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => router.push(`/challenges/${challenge.id}`)}
                                            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs py-2"
                                        >
                                            {locale === "mm" ? "ကြည့်ရှုမည်" : "View"}
                                        </Button>
                                        <Button
                                            onClick={() => router.push(`/create/challenge?edit=${challenge.id}`)}
                                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-xs py-2"
                                        >
                                            {locale === "mm" ? "တည်းဖြတ်မည်" : "Edit"}
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete('challenge', challenge.id, challenge.title)}
                                            className="flex-1 bg-red-500 hover:bg-red-600 text-xs py-2"
                                        >
                                            {locale === "mm" ? "ဖျက်မည်" : "Delete"}
                                        </Button>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>
                )}
            </section>

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-md p-8 bg-white">
                        <div className="text-center">
                            <div className="text-6xl mb-4">⚠️</div>
                            <h2 className="text-2xl font-black text-gray-900 mb-4">
                                {locale === "mm" ? "သေချာပါသလား?" : "Are you sure?"}
                            </h2>
                            <p className="text-gray-600 mb-6">
                                {locale === "mm"
                                    ? `"${deleteModal.name}" ကို ဖျက်လိုသည်မှာ သေချာပါသလား? ဤလုပ်ဆောင်ချက်ကို နောက်ပြန်ပြောင်း၍မရပါ။`
                                    : `Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => setDeleteModal({ isOpen: false, type: '', id: '', name: '' })}
                                    className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                                >
                                    {locale === "mm" ? "မလုပ်တော့ပါ" : "Cancel"}
                                </Button>
                                <Button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-red-500 hover:bg-red-600"
                                >
                                    {locale === "mm" ? "ဖျက်မည်" : "Delete"}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
