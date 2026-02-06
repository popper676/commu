"use client";

import { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { events } from "@/lib/data/events";
import EventCard from "@/components/events/EventCard";
import { CardSkeleton } from "@/components/ui/Skeleton";

const TYPES = ["All", "Online", "Offline", "Hybrid"];

export default function EventsPage() {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const title = locale === "mm" ? event.titleMm : event.title;
      const description = locale === "mm" ? event.descriptionMm : event.description;
      const location = locale === "mm" ? event.locationMm : event.location;
      const type = event.type.toLowerCase();

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === "All" || type === selectedType.toLowerCase();

      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType, locale]);

  return (
    <div className="min-h-screen bg-cream-100 transition-colors duration-500 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-coral-200/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold-200/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 text-center z-10">
        <div className="inline-block px-4 py-2 bg-white/40 border border-white/50 backdrop-blur-md rounded-2xl text-[10px] font-black tracking-[0.3em] uppercase mb-8 text-coral-600 shadow-sm">
          Upcoming Sessions
        </div>
        <h1 className="text-5xl sm:text-8xl font-black mb-8 font-outfit tracking-tighter leading-none text-gray-900">
          {t("events.title")}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-medium">
          {t("events.subtitle")}
        </p>
      </section>

      {/* Main Content */}
      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20 pb-32">
        {/* Controls Bar */}
        <div className="bg-white/60 backdrop-blur-2xl p-4 rounded-[2.5rem] shadow-2xl shadow-coral-100/50 border border-white/50 mb-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-coral-50/50 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="flex flex-col lg:flex-row gap-6 relative z-10">
            {/* Search Input */}
            <div className="relative flex-1 group/search">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within/search:text-coral-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder={locale === "mm" ? "ပွဲအမည် သို့မဟုတ် မြို့အမည်..." : "Search events or location..."}
                className="block w-full pl-16 pr-6 py-5 bg-white/50 border-2 border-transparent focus:border-coral-200/50 rounded-3xl text-gray-900 placeholder-gray-400 focus:ring-0 focus:bg-white transition-all font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide px-2">
              {TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-5 rounded-3xl text-sm font-black whitespace-nowrap transition-all uppercase tracking-widest ${selectedType === type
                    ? "bg-coral-500 text-white shadow-xl shadow-coral-200/50 scale-105"
                    : "bg-white/50 text-gray-500 hover:text-gray-900 hover:bg-white"
                    }`}
                >
                  {type === "All" ? (locale === "mm" ? "အားလုံး" : "All") : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-white dark:border-gray-900 shadow-xl">
              <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4 font-outfit">
              {locale === "mm" ? "ပွဲများကို ရှာမတွေ့ပါ" : "No events found"}
            </h3>
            <p className="text-lg text-gray-400 max-w-md mx-auto font-medium">
              {locale === "mm"
                ? "အခြားစကားလုံးများဖြင့် ထပ်မံရှာဖွေကြည့်ပါ။"
                : "We couldn't find any events matching your search criteria."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
