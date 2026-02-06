"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { resources } from "@/lib/data/resources";
import ResourceCard from "@/components/resources/ResourceCard";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { useEffect } from "react";

const RESOURCE_CATEGORIES = [
  "All",
  "Development",
  "Design",
  "Business",
  "Language",
  "Marketing",
  "Tools",
];

export default function ResourcesPage() {
  const { locale, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const title = locale === "mm" ? resource.titleMm : resource.title;
      const description = locale === "mm" ? resource.descriptionMm : resource.description;
      const author = resource.author;
      const category = resource.category;

      const matchesSearch =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, locale]);

  return (
    <div className="bg-cream-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-outfit">
            {t("resources.title")}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t("resources.subtitle")}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder={locale === "mm" ? "အရင်းအမြစ်များ ရှာဖွေရန်..." : "Search resources..."}
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {RESOURCE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                  ? "bg-coral-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-coral-300 dark:hover:border-coral-700"
                  }`}
              >
                {cat === "All" ? (locale === "mm" ? "အားလုံး" : "All") : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4 transition-colors">
              <svg
                className="w-8 h-8 text-gray-400 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white font-outfit">
              {locale === "mm" ? "ရှာမတွေ့ပါ" : "No resources found"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {locale === "mm"
                ? "အခြားစကားလုံးများဖြင့် ထပ်မံရှာဖွေကြည့်ပါ။"
                : "Try adjusting your search or filter to find what you're looking for."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

