"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { courses } from "@/lib/data/courses";
import { Course } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CoursesPage() {
    const { locale } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedLevel, setSelectedLevel] = useState<string>("all");

    const categories = ["all", "Technology", "Design", "Business"];
    const levels = ["all", "BEGINNER", "INTERMEDIATE", "ADVANCED"];

    const filteredCourses = courses.filter(course => {
        const categoryMatch = selectedCategory === "all" || course.category === selectedCategory;
        const levelMatch = selectedLevel === "all" || course.level === selectedLevel;
        return categoryMatch && levelMatch;
    });

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gold-500 to-coral-500 text-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-7xl font-black font-outfit tracking-tighter mb-6">
                        {locale === "mm" ? "သင်တန်းများ" : "Courses"}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        {locale === "mm"
                            ? "ကျွမ်းကျင်သူများထံမှ သင်ယူပြီး သင့်အသက်မွေးဝမ်းကြောင်းကို မြှင့်တင်ပါ"
                            : "Learn from experts and advance your career"}
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <Card className="p-6 bg-white/80 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">
                                {locale === "mm" ? "အမျိုးအစား" : "Category"}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedCategory === cat
                                                ? "bg-gold-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {cat === "all" ? (locale === "mm" ? "အားလုံး" : "All") : cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">
                                {locale === "mm" ? "အဆင့်" : "Level"}
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {levels.map(level => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedLevel === level
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {level === "all" ? (locale === "mm" ? "အားလုံး" : "All") : level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </section>

            {/* Courses Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                        {filteredCourses.length} {locale === "mm" ? "သင်တန်းများ" : "Courses"}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCourses.map(course => (
                        <CourseCard key={course.id} course={course} locale={locale} />
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <p className="text-gray-500 font-medium">
                            {locale === "mm" ? "သင်တန်းများ မတွေ့ပါ" : "No courses found"}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}

function CourseCard({ course, locale }: { course: Course; locale: string }) {
    const title = locale === "mm" ? course.titleMm : course.title;
    const description = locale === "mm" ? course.descriptionMm : course.description;
    const category = locale === "mm" ? course.categoryMm : course.category;

    const levelColors = {
        BEGINNER: "bg-green-100 text-green-700",
        INTERMEDIATE: "bg-blue-100 text-blue-700",
        ADVANCED: "bg-purple-100 text-purple-700",
    };

    return (
        <Link href={`/courses/${course.id}`}>
            <Card className="group hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col">
                <div className="aspect-video bg-gradient-to-br from-gold-400 to-coral-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black text-gray-900">
                        {category}
                    </div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-black ${levelColors[course.level]}`}>
                        {course.level}
                    </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-black text-gray-900 font-outfit mb-2 group-hover:text-gold-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                        {description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                                {course.creatorName[0]}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900">{course.creatorName}</div>
                                <div className="text-xs text-gray-500">{course.enrolledCount} students</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-black text-gold-600 font-outfit">
                                {course.price.toLocaleString()} <span className="text-sm">MMK</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                <svg className="w-3 h-3 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {course.rating}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
