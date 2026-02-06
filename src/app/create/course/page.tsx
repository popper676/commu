"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
    return (
        <ProtectedRoute requireCreator>
            <CreateCourseForm />
        </ProtectedRoute>
    );
}

function CreateCourseForm() {
    const { locale } = useLanguage();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [courseData, setCourseData] = useState({
        title: "",
        titleMm: "",
        description: "",
        descriptionMm: "",
        category: "",
        level: "BEGINNER",
        price: 0,
        duration: 0,
    });

    // Lesson Type Enum
    type LessonType = 'VIDEO' | 'TEXT' | 'DOCUMENT' | 'ASSIGNMENT';

    // Enhanced Module/Lesson State
    const [modules, setModules] = useState<Array<{
        id: string;
        title: string;
        titleMm: string;
        lessons: Array<{
            id: string;
            title: string;
            titleMm: string;
            type: LessonType;
            duration: number; // in minutes
            content?: string; // Video URL or Text content
            fileUrl?: string; // For Document
            assignmentDetails?: {
                instructions: string;
                maxScore: number;
                dueDate?: string;
            };
        }>;
    }>>([]);

    const categories = [
        { label: "Technology", value: "Technology" },
        { label: "Design & Art", value: "Design & Art" },
        { label: "Business", value: "Business" },
        { label: "Marketing", value: "Marketing" },
        { label: "Education", value: "Education" },
    ];

    const levels = [
        { label: "Beginner", value: "BEGINNER" },
        { label: "Intermediate", value: "INTERMEDIATE" },
        { label: "Advanced", value: "ADVANCED" },
    ];

    // CRUD Operations
    const addModule = () => {
        setModules([...modules, {
            id: Date.now().toString(),
            title: "",
            titleMm: "",
            lessons: []
        }]);
    };

    const deleteModule = (index: number) => {
        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
    };

    const addLesson = (moduleIndex: number) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons.push({
            id: Date.now().toString(),
            title: "",
            titleMm: "",
            type: "VIDEO",
            duration: 0,
            content: ""
        });
        setModules(newModules);
    };

    const deleteLesson = (moduleIndex: number, lessonIndex: number) => {
        const newModules = [...modules];
        newModules[moduleIndex].lessons.splice(lessonIndex, 1);
        setModules(newModules);
    };

    const updateLesson = (moduleIndex: number, lessonIndex: number, field: string, value: any) => {
        const newModules = [...modules];
        // @ts-ignore
        newModules[moduleIndex].lessons[lessonIndex][field] = value;
        setModules(newModules);
    }

    const updateAssignmentDetails = (moduleIndex: number, lessonIndex: number, field: string, value: any) => {
        const newModules = [...modules];
        const lesson = newModules[moduleIndex].lessons[lessonIndex];
        if (!lesson.assignmentDetails) {
            lesson.assignmentDetails = { instructions: "", maxScore: 100 };
        }
        // @ts-ignore
        lesson.assignmentDetails[field] = value;
        setModules(newModules);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Here you would upload files if any, then send JSON to API
        console.log("Submitting Course:", { ...courseData, modules });

        // Mock API call
        setTimeout(() => {
            alert('Course created successfully! (Mock)');
            router.push('/dashboard/creator');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-cream-100">
            <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-black font-outfit tracking-tighter mb-4">
                        {locale === "mm" ? "သင်တန်း ဖန်တီးမည်" : "Create Course"}
                    </h1>
                    <p className="text-xl text-white/90">
                        {locale === "mm"
                            ? "သင့်အသိပညာကို မျှဝေပြီး ဝင်ငွေရယူပါ"
                            : "Share your knowledge and earn revenue"}
                    </p>

                    {/* Progress Steps */}
                    <div className="flex items-center gap-4 mt-8">
                        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-white' : 'text-white/50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${step >= 1 ? 'bg-white text-blue-600' : 'bg-white/20'}`}>
                                1
                            </div>
                            <span className="font-bold text-sm">Basic Info</span>
                        </div>
                        <div className="flex-1 h-1 bg-white/20">
                            <div className={`h-full bg-white transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
                        </div>
                        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-white' : 'text-white/50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black ${step >= 2 ? 'bg-white text-blue-600' : 'bg-white/20'}`}>
                                2
                            </div>
                            <span className="font-bold text-sm">Curriculum</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Card className="p-8">
                    <form onSubmit={handleSubmit}>
                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 font-outfit mb-6">
                                    {locale === "mm" ? "အခြေခံ အချက်အလက်" : "Basic Information"}
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Course Title (English) *
                                        </label>
                                        <input
                                            type="text"
                                            value={courseData.title}
                                            onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="e.g. Web Development Fundamentals"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Course Title (Myanmar) *
                                        </label>
                                        <input
                                            type="text"
                                            value={courseData.titleMm}
                                            onChange={(e) => setCourseData({ ...courseData, titleMm: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="e.g. ဝဘ်ဒီဇိုင်း အခြေခံများ"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            value={courseData.category}
                                            onChange={(e) => setCourseData({ ...courseData, category: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map(cat => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Level *
                                        </label>
                                        <select
                                            value={courseData.level}
                                            onChange={(e) => setCourseData({ ...courseData, level: e.target.value })}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        >
                                            {levels.map(level => (
                                                <option key={level.value} value={level.value}>{level.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Price (MMK) *
                                        </label>
                                        <input
                                            type="number"
                                            value={courseData.price}
                                            onChange={(e) => setCourseData({ ...courseData, price: parseInt(e.target.value) || 0 })}
                                            required
                                            min="0"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                            placeholder="50000"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Description (English) *
                                    </label>
                                    <textarea
                                        value={courseData.description}
                                        onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="Describe what students will learn..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Description (Myanmar) *
                                    </label>
                                    <textarea
                                        value={courseData.descriptionMm}
                                        onChange={(e) => setCourseData({ ...courseData, descriptionMm: e.target.value })}
                                        rows={4}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        placeholder="ကျောင်းသားများ သင်ယူရမည့်အရာများကို ဖော်ပြပါ..."
                                    />
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.back()}
                                        className="flex-1"
                                    >
                                        {locale === "mm" ? "မလုပ်တော့ပါ" : "Cancel"}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex-1 font-black"
                                    >
                                        {locale === "mm" ? "ရှေ့ဆက်မည်" : "Next: Curriculum"}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-black text-gray-900 font-outfit">
                                        {locale === "mm" ? "သင်ရိုးညွှန်းတမ်း" : "Course Curriculum"}
                                    </h2>
                                    <Button type="button" onClick={addModule} size="sm">
                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Add Module
                                    </Button>
                                </div>

                                {modules.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <p className="text-gray-500 font-medium">
                                            {locale === "mm" ? "Module များ ထည့်ပါ" : "Add modules to build your course"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {modules.map((module, moduleIndex) => (
                                            <Card key={module.id} className="p-6 bg-gray-50 border border-gray-200">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-black flex-shrink-0">
                                                        {moduleIndex + 1}
                                                    </div>
                                                    <div className="flex-1 space-y-4">
                                                        <div className="flex gap-4">
                                                            <input
                                                                type="text"
                                                                value={module.title}
                                                                onChange={(e) => {
                                                                    const newModules = [...modules];
                                                                    newModules[moduleIndex].title = e.target.value;
                                                                    setModules(newModules);
                                                                }}
                                                                placeholder="Module Title (English)"
                                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={module.titleMm}
                                                                onChange={(e) => {
                                                                    const newModules = [...modules];
                                                                    newModules[moduleIndex].titleMm = e.target.value;
                                                                    setModules(newModules);
                                                                }}
                                                                placeholder="Module Title (Myanmar)"
                                                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteModule(moduleIndex)}
                                                                className="text-red-500 hover:text-red-600 p-2"
                                                                title="Delete Module"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        </div>

                                                        {/* Lessons List */}
                                                        <div className="pl-0 md:pl-8 space-y-4">
                                                            {module.lessons.map((lesson, lessonIndex) => (
                                                                <div key={lesson.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                                                    <div className="flex items-center gap-3 mb-3">
                                                                        <span className="text-gray-400 font-bold text-sm bg-gray-100 px-2 py-1 rounded">
                                                                            {moduleIndex + 1}.{lessonIndex + 1}
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            value={lesson.title}
                                                                            onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'title', e.target.value)}
                                                                            placeholder="Lesson title (English)"
                                                                            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm font-bold"
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={lesson.titleMm}
                                                                            onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'titleMm', e.target.value)}
                                                                            placeholder="Lesson title (Myanmar)"
                                                                            className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                                                        />
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => deleteLesson(moduleIndex, lessonIndex)}
                                                                            className="text-gray-400 hover:text-red-500"
                                                                        >
                                                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                            </svg>
                                                                        </button>
                                                                    </div>

                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        <div>
                                                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Type</label>
                                                                            <select
                                                                                value={lesson.type}
                                                                                onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'type', e.target.value)}
                                                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm bg-white"
                                                                            >
                                                                                <option value="VIDEO">Video</option>
                                                                                <option value="TEXT">Text Article</option>
                                                                                <option value="DOCUMENT">Document (PDF)</option>
                                                                                <option value="ASSIGNMENT">Assignment</option>
                                                                            </select>
                                                                        </div>
                                                                        <div>
                                                                            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Duration (min)</label>
                                                                            <input
                                                                                type="number"
                                                                                value={lesson.duration}
                                                                                onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'duration', parseInt(e.target.value) || 0)}
                                                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                                                                min="0"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    {/* Content Fields based on Type */}
                                                                    <div className="mt-4 pt-4 border-t border-gray-50">
                                                                        {lesson.type === 'VIDEO' && (
                                                                            <div>
                                                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Video URL / Upload</label>
                                                                                <input
                                                                                    type="text"
                                                                                    value={lesson.content}
                                                                                    onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'content', e.target.value)}
                                                                                    placeholder="https://vimeo.com/..."
                                                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {lesson.type === 'TEXT' && (
                                                                            <div>
                                                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Content</label>
                                                                                <textarea
                                                                                    value={lesson.content}
                                                                                    onChange={(e) => updateLesson(moduleIndex, lessonIndex, 'content', e.target.value)}
                                                                                    placeholder="Write your article content..."
                                                                                    rows={4}
                                                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                                                                />
                                                                            </div>
                                                                        )}
                                                                        {lesson.type === 'DOCUMENT' && (
                                                                            <div>
                                                                                <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Upload Document (PDF)</label>
                                                                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                                                                    <span className="text-sm text-gray-500">Click to upload PDF</span>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        {lesson.type === 'ASSIGNMENT' && (
                                                                            <div className="space-y-3">
                                                                                <div>
                                                                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Instructions</label>
                                                                                    <textarea
                                                                                        value={lesson.assignmentDetails?.instructions || ""}
                                                                                        onChange={(e) => updateAssignmentDetails(moduleIndex, lessonIndex, 'instructions', e.target.value)}
                                                                                        placeholder="Instructions for the students..."
                                                                                        rows={3}
                                                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                                                                    />
                                                                                </div>
                                                                                <div>
                                                                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Max Score</label>
                                                                                    <input
                                                                                        type="number"
                                                                                        value={lesson.assignmentDetails?.maxScore || 100}
                                                                                        onChange={(e) => updateAssignmentDetails(moduleIndex, lessonIndex, 'maxScore', parseInt(e.target.value))}
                                                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-500 outline-none text-sm"
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <button
                                                                type="button"
                                                                onClick={() => addLesson(moduleIndex)}
                                                                className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 font-bold text-sm hover:border-blue-300 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                                                            >
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                                </svg>
                                                                Add Lesson
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setStep(1)}
                                        className="flex-1"
                                    >
                                        {locale === "mm" ? "နောက်သို့" : "Back"}
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 font-black"
                                        disabled={isSubmitting || modules.length === 0}
                                    >
                                        {isSubmitting
                                            ? (locale === "mm" ? "ဖန်တီးနေသည်..." : "Creating...")
                                            : (locale === "mm" ? "သင်တန်း ဖန်တီးမည်" : "Create Course")}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </Card>
            </section>
        </div>
    );
}

