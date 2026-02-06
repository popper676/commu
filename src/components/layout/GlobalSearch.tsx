"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
    id: string;
    title: string;
    category: string;
    type: 'community' | 'event' | 'job' | 'resource';
    href: string;
}

export default function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { locale, t } = useLanguage();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Mock data for search
    const results: SearchResult[] = ([
        { id: '1', title: 'Myanmar Tech Community', category: 'Tech', type: 'community', href: '/communities/1' },
        { id: '2', title: 'UX Design Workshop', category: 'Design', type: 'event', href: '/events/1' },
        { id: '3', title: 'Senior Frontend Developer', category: 'Tech', type: 'job', href: '/jobs/1' },
        { id: '4', title: 'Starting a Startup in Myanmar', category: 'Business', type: 'resource', href: '/resources/1' },
    ] as SearchResult[]).filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSelect = (href: string) => {
        setIsOpen(false);
        setQuery("");
        router.push(href);
    };

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-600 hover:border-gold-300 transition-all duration-300"
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-widest">{locale === 'mm' ? 'ရှာဖွေရန်' : 'Search'}</span>
            <kbd className="text-[10px] font-black bg-gray-200 px-1.5 py-0.5 rounded-md text-gray-500 uppercase">⌘K</kbd>
        </button>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity animate-in fade-in"
                onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Search Bar */}
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                    <svg className="w-6 h-6 text-gold-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={locale === 'mm' ? 'ရှာလိုသည်ကို ရိုက်ထည့်ပါ...' : 'Search for communities, events, jobs...'}
                        className="w-full bg-transparent text-xl font-bold text-gray-900 placeholder-gray-400 outline-none"
                    />
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-900"
                    >
                        ESC
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                    {query === "" ? (
                        <div className="p-8 text-center">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">{locale === 'mm' ? 'မကြာသေးမီက ရှာဖွေမှုများ' : 'Recent Searches'}</p>
                            <div className="mt-4 flex flex-wrap justify-center gap-2">
                                {['Tech', 'Design', 'Development'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setQuery(tag)}
                                        className="px-4 py-2 bg-gray-50 rounded-xl text-sm font-bold text-gray-600 hover:bg-gold-50 transition-colors"
                                    >
                                        #{tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="space-y-2">
                            {results.map((result) => (
                                <button
                                    key={`${result.type}-${result.id}`}
                                    onClick={() => handleSelect(result.href)}
                                    className="w-full p-6 flex items-center gap-6 rounded-3xl hover:bg-gray-50 transition-all group text-left border border-transparent hover:border-gray-100"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 uppercase text-xs font-black tracking-widest ${result.type === 'community' ? 'bg-blue-50 text-blue-600' :
                                        result.type === 'event' ? 'bg-gold-50 text-gold-600' :
                                            result.type === 'job' ? 'bg-coral-50 text-coral-600' :
                                                'bg-purple-50 text-purple-600'
                                        }`}>
                                        {result.type[0]}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-gray-900 truncate group-hover:text-gold-600 transition-colors">{result.title}</h4>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{result.category} • {result.type}</p>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="p-20 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-outfit">{locale === 'mm' ? 'ရှာမတွေ့ပါ' : 'No results found'}</h3>
                            <p className="text-gray-400">{locale === 'mm' ? 'အခြားစာလုံးများဖြင့် ထပ်မံရှာဖွေကြည့်ပါ' : 'Try searching for something else'}</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-4 px-6 flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-t border-gray-100">
                    <div className="flex gap-4">
                        <span className="flex items-center gap-2"><kbd className="bg-white px-1.5 py-0.5 rounded border border-gray-200 shadow-sm">Enter</kbd> to select</span>
                        <span className="flex items-center gap-2"><kbd className="bg-white px-1.5 py-0.5 rounded border border-gray-200 shadow-sm">ESC</kbd> to close</span>
                    </div>
                    <span className="text-gold-500">Global Search v1.0</span>
                </div>
            </div>
        </div>
    );
}
