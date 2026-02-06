"use client";

import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { communities } from "@/lib/data/communities";
import { courses } from "@/lib/data/courses";
import { challenges } from "@/lib/data/challenges";

export default function LearnerDashboard() {
    return (
        <ProtectedRoute requireAuth>
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const { locale } = useLanguage();
    const { user } = useAuth();

    // Mock enrolled data
    const enrolledCourses = courses.slice(0, 3);
    const joinedCommunities = communities.slice(0, 3);
    const activeChallenges = challenges.filter(c => c.status === 'ACTIVE').slice(0, 2);

    const stats = [
        { label: locale === "mm" ? "ပါဝင်သော အသိုင်းအဝိုင်းများ" : "Joined Communities", value: joinedCommunities.length, color: "gold", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
        { label: locale === "mm" ? "စာရင်းသွင်းထားသော သင်တန်းများ" : "Enrolled Courses", value: enrolledCourses.length, color: "blue", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
        { label: locale === "mm" ? "ပြီးမြောက်ခဲ့သော သင်တန်းများ" : "Completed Courses", value: 2, color: "green", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
        { label: locale === "mm" ? "ရရှိထားသော လက်မှတ်များ" : "Certificates Earned", value: 2, color: "purple", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
    ];

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-black uppercase tracking-widest mb-2 text-white/80">
                                {locale === "mm" ? "သင်ယူသူ ဒက်ရှ်ဘုတ်" : "Learner Dashboard"}
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter">
                                {locale === "mm" ? "မင်္ဂလာပါ" : "Welcome back"}, {user?.name}!
                            </h1>
                        </div>
                        <Link href="/courses">
                            <Button className="bg-white text-blue-600 hover:bg-white/90 font-black">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {locale === "mm" ? "သင်တန်းများ ရှာဖွေမည်" : "Explore Courses"}
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

            {/* Continue Learning */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                        {locale === "mm" ? "ဆက်လက်သင်ယူမည်" : "Continue Learning"}
                    </h2>
                    <Link href="/courses" className="text-sm font-bold text-blue-600 hover:underline">
                        {locale === "mm" ? "အားလုံးကြည့်ရန်" : "View All"}
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {enrolledCourses.map(course => (
                        <Link key={course.id} href={`/courses/${course.id}`}>
                            <Card className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-gold-400 to-coral-500 relative">
                                    <div className="absolute inset-0 bg-black/20" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                                            <div className="bg-blue-500 h-full" style={{ width: '45%' }} />
                                        </div>
                                        <p className="text-xs font-bold text-white mt-2">45% Complete</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-black text-gray-900 font-outfit mb-1 group-hover:text-blue-600 transition-colors">
                                        {locale === "mm" ? course.titleMm : course.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">{course.creatorName}</p>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Active Challenges */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                        {locale === "mm" ? "လက်ရှိ စိန်ခေါ်မှုများ" : "Active Challenges"}
                    </h2>
                    <Link href="/challenges" className="text-sm font-bold text-purple-600 hover:underline">
                        {locale === "mm" ? "အားလုံးကြည့်ရန်" : "View All"}
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeChallenges.map(challenge => {
                        const deadline = new Date(challenge.deadline);
                        const daysLeft = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

                        return (
                            <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
                                <Card className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden">
                                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 relative">
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black text-gray-900">
                                            {daysLeft} days left
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-black text-gray-900 font-outfit mb-2 group-hover:text-purple-600 transition-colors">
                                            {locale === "mm" ? challenge.titleMm : challenge.title}
                                        </h3>
                                        <div className="p-3 bg-gold-50 rounded-xl">
                                            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
                                                {locale === "mm" ? "ဆု" : "Prize"}
                                            </div>
                                            <div className="text-sm font-bold text-gold-700">
                                                {locale === "mm" ? challenge.prizeMm : challenge.prize}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Joined Communities */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                        {locale === "mm" ? "ပါဝင်ထားသော အသိုင်းအဝိုင်းများ" : "My Communities"}
                    </h2>
                    <Link href="/communities" className="text-sm font-bold text-gold-600 hover:underline">
                        {locale === "mm" ? "အားလုံးကြည့်ရန်" : "View All"}
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {joinedCommunities.map(community => (
                        <Link key={community.id} href={`/communities/${community.id}`}>
                            <Card className="group hover:shadow-xl transition-all cursor-pointer overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-gold-400 to-coral-500 relative">
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black text-gray-900 font-outfit mb-2 group-hover:text-gold-600 transition-colors">
                                        {locale === "mm" ? community.nameMm : community.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        {locale === "mm" ? community.descriptionMm : community.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        {community.members.toLocaleString()} members
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
