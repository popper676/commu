"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import { courses } from "@/lib/data/courses";
import { Course, Module, Lesson } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CourseDetailPage() {
    const params = useParams();
    const { locale } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
    const [expandedModules, setExpandedModules] = useState<string[]>([]);
    const [isEnrolled, setIsEnrolled] = useState(false);

    const course = courses.find(c => c.id === params.id);

    if (!course) {
        return (
            <div className="min-h-screen bg-cream-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-gray-900 mb-4">Course Not Found</h1>
                    <Link href="/courses">
                        <Button>Back to Courses</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const title = locale === "mm" ? course.titleMm : course.title;
    const description = locale === "mm" ? course.descriptionMm : course.description;

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    const handleEnroll = () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }
        // Mock enrollment
        setIsEnrolled(true);
        if (course.modules[0]?.lessons[0]) {
            setSelectedLesson(course.modules[0].lessons[0]);
            setExpandedModules([course.modules[0].id]);
        }
    };

    const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);
    const totalDuration = course.modules.reduce(
        (acc, mod) => acc + mod.lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0),
        0
    );

    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const progress = Math.round((completedLessons.length / totalLessons) * 100);
    const isCompleted = progress === 100;

    const handleLessonComplete = (lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    const CertificateCard = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full text-center relative overflow-hidden">
                {/* Decorative border */}
                <div className="absolute inset-4 border-4 border-double border-gold-200 pointer-events-none rounded-xl"></div>

                <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gold-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-black text-gray-900 font-outfit mb-2 uppercase tracking-widest">
                        Certificate of Completion
                    </h2>
                    <p className="text-gray-500 mb-8 italic">This is to certify that</p>

                    <div className="text-4xl font-black text-gold-600 font-serif mb-8 border-b-2 border-gold-100 inline-block px-12 pb-2">
                        {user?.name || "Student Name"}
                    </div>

                    <p className="text-gray-600 mb-2">has successfully completed the course</p>
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                        {locale === "mm" ? course.titleMm : course.title}
                    </h3>

                    <div className="flex items-center justify-between text-sm text-gray-500 max-w-sm mx-auto mb-8">
                        <div>
                            <span className="block font-bold text-gray-900">Date</span>
                            {new Date().toLocaleDateString()}
                        </div>
                        <div>
                            <span className="block font-bold text-gray-900">Instructor</span>
                            {course.creatorName}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={() => window.print()} variant="outline">
                            Download PDF
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-cream-100">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gold-500 to-coral-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-black uppercase tracking-widest mb-4">
                                {locale === "mm" ? course.categoryMm : course.category}
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter mb-4">
                                {title}
                            </h1>
                            <p className="text-xl text-white/90 mb-6">
                                {description}
                            </p>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-bold">
                                        {course.creatorName[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold">{course.creatorName}</div>
                                        <div className="text-white/70 text-xs">Instructor</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5 text-gold-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="font-bold">{course.rating}</span>
                                    <span className="text-white/70">({course.enrolledCount} students)</span>
                                </div>
                            </div>
                        </div>

                        {/* Enrollment Card */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 bg-white">
                                <div className="text-4xl font-black text-gray-900 font-outfit mb-2">
                                    {course.price.toLocaleString()} <span className="text-lg">MMK</span>
                                </div>
                                <div className="text-sm text-gray-500 mb-6">
                                    {locale === "mm" ? "တစ်ကြိမ် ပေးချေမှု" : "One-time payment"}
                                </div>

                                {!isEnrolled ? (
                                    <Button
                                        onClick={handleEnroll}
                                        size="lg"
                                        className="w-full mb-4 font-black"
                                    >
                                        {locale === "mm" ? "စာရင်းသွင်းမည်" : "Enroll Now"}
                                    </Button>
                                ) : (
                                    <div className="mb-4 p-3 bg-green-50 rounded-xl text-center">
                                        <div className="text-green-700 font-bold flex items-center justify-center gap-2">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {locale === "mm" ? "စာရင်းသွင်းပြီးပါပြီ" : "Enrolled"}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span className="font-medium">{totalLessons} lessons</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m total</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                        <span className="font-medium">Certificate of completion</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Content */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {selectedLesson ? (
                            <Card className="p-0 overflow-hidden mb-8">
                                {/* Video Player Placeholder */}
                                <div className="aspect-video bg-gray-900 relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <svg className="w-20 h-20 mx-auto mb-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-lg font-bold">Video Player</p>
                                            <p className="text-sm text-white/70">{selectedLesson.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-black text-gray-900 font-outfit mb-2">
                                        {locale === "mm" ? selectedLesson.titleMm : selectedLesson.title}
                                    </h2>
                                    {selectedLesson.type === 'ASSIGNMENT' && (
                                        <div className="mt-6 space-y-4">
                                            <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-blue-900 text-lg mb-1">Assignment Instructions</h3>
                                                        <p className="text-blue-800 text-sm leading-relaxed whitespace-pre-wrap">
                                                            {selectedLesson.assignmentDetails?.instructions || selectedLesson.content}
                                                        </p>
                                                        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                                                            Max Score: {selectedLesson.assignmentDetails?.maxScore || 100} points
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border border-gray-200 rounded-xl p-6">
                                                <h4 className="font-bold text-gray-900 mb-4">Your Submission</h4>
                                                <textarea
                                                    className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none mb-4 font-normal"
                                                    placeholder="Write your answer here or paste a Google Drive link..."
                                                ></textarea>
                                                <div className="flex items-center justify-between">
                                                    <label className="cursor-pointer inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors">
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                                        </svg>
                                                        <span className="text-sm font-medium">Attach File</span>
                                                        <input type="file" className="hidden" />
                                                    </label>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            alert('Assignment submitted successfully!');
                                                            // Logic to mark as complete would go here
                                                        }}
                                                    >
                                                        Submit Assignment
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ) : (
                            <Card className="p-12 text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {locale === "mm" ? "သင်ခန်းစာ ရွေးချယ်ပါ" : "Select a lesson to start"}
                                </h3>
                                <p className="text-gray-500">
                                    {locale === "mm" ? "ဘယ်ဘက်မှ သင်ခန်းစာတစ်ခု ရွေးချယ်ပါ" : "Choose a lesson from the sidebar to begin learning"}
                                </p>
                            </Card>
                        )}
                    </div>

                    {/* Curriculum Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="p-6">
                            <h3 className="text-xl font-black text-gray-900 font-outfit mb-6">
                                {locale === "mm" ? "သင်ရိုးညွှန်းတမ်း" : "Course Curriculum"}
                            </h3>
                            <div className="space-y-2">
                                {course.modules.map((module, moduleIndex) => (
                                    <div key={module.id} className="border border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleModule(module.id)}
                                            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center text-sm font-black">
                                                    {moduleIndex + 1}
                                                </div>
                                                <div className="text-left">
                                                    <div className="font-bold text-gray-900">
                                                        {locale === "mm" ? module.titleMm : module.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {module.lessons.length} lessons
                                                    </div>
                                                </div>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-gray-400 transition-transform ${expandedModules.includes(module.id) ? 'rotate-180' : ''
                                                    }`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        {expandedModules.includes(module.id) && (
                                            <div className="border-t border-gray-200">
                                                {module.lessons.map((lesson, lessonIndex) => (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => isEnrolled && setSelectedLesson(lesson)}
                                                        disabled={!isEnrolled}
                                                        className={`w-full p-3 pl-16 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${selectedLesson?.id === lesson.id ? 'bg-gold-50' : ''
                                                            } ${!isEnrolled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="text-xs font-bold text-gray-400">
                                                                {moduleIndex + 1}.{lessonIndex + 1}
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                                    {locale === "mm" ? lesson.titleMm : lesson.title}
                                                                    {completedLessons.includes(lesson.id) && (
                                                                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                        </svg>
                                                                    )}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {lesson.type} • {lesson.duration} min
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {!isEnrolled && (
                                                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {isCompleted && <CertificateCard />}
        </div>
    );
}
