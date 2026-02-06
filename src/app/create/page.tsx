"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import Card from "@/components/ui/Card";

export default function CreatePage() {
    const { locale } = useLanguage();

    const options = [
        {
            href: "/create/community",
            title: locale === "mm" ? "အသိုင်းအဝိုင်းအသစ် ဖန်တီးပါ" : "Create Community",
            description: locale === "mm" ? "သင့်စိတ်ဝင်စားမှုတူသူတွေနဲ့ ချိတ်ဆက်နိုင်မယ့် အသိုင်းအဝိုင်းတစ်ခု စတင်ပါ" : "Start a community to connect with people who share your interests",
            icon: (
                <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354l1.102 3.393h3.567l-2.885 2.097 1.102 3.393-2.885-2.097-2.885 2.097 1.102-3.393-2.885-2.097h3.567L12 4.354zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "bg-gold-50",
        },
        {
            href: "/create/event",
            title: locale === "mm" ? "ပွဲအသစ် ကျင်းပပါ" : "Organize Event",
            description: locale === "mm" ? "အွန်လိုင်း သို့မဟုတ် အပြင်မှာ ကျင်းပမယ့် ပွဲတွေကို စီစဉ်ပါ" : "Plan events to be held online or in-person",
            icon: (
                <svg className="w-8 h-8 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-coral-50",
        },
        {
            href: "/create/job",
            title: locale === "mm" ? "အလုပ်ခေါ်ယူပါ" : "Post a Job",
            description: locale === "mm" ? "သင့်လုပ်ငန်းအတွက် သင့်တော်တဲ့ ကျွမ်းကျင်သူတွေကို ရှာဖွေပါ" : "Find the right professionals for your business",
            icon: (
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: "bg-green-50",
        },
    ];

    return (
        <div className="bg-white transition-colors min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-6 font-outfit">
                        {locale === "mm" ? "ဘာတွေ ဖန်တီးမလဲ?" : "What are you creating?"}
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        {locale === "mm" ? "သင့်တော်ရာ ကဏ္ဍကို ရွေးချယ်ပြီး ယနေ့ပဲ စတင်လိုက်ပါ" : "Choose a category and start building your presence today"}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {options.map((option) => (
                        <Link key={option.href} href={option.href}>
                            <Card className="p-10 h-full flex flex-col items-center text-center hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-gold-200 group group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                                <div className={`w-20 h-20 rounded-3xl ${option.color} flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform duration-500`}>
                                    {option.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-outfit">{option.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-medium">
                                    {option.description}
                                </p>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
