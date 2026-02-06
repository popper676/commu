"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Resource } from "@/types";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { locale, t } = useLanguage();
  const { showToast } = useToast();

  const title = locale === "mm" ? resource.titleMm : resource.title;
  const description = locale === "mm" ? resource.descriptionMm : resource.description;
  const category = locale === "mm" ? resource.categoryMm : resource.category;

  const typeLabel = t(`resources.${resource.type}`);

  const typeColors: Record<string, string> = {
    article: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    video: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    course: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    tool: "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  };

  const ctaLabel: Record<string, string> = {
    article: t("resources.readMore"),
    video: t("resources.watch"),
    course: t("resources.enroll"),
    tool: t("resources.explore"),
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showToast(locale === "mm" ? `${title} ကို စတင်လေ့လာနိုင်ပါပြီ!` : `Starting ${title} now!`, "success");
  };

  return (
    <Link href={`/resources/${resource.id}`}>
      <Card className="p-6 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-gray-100/50 group">
        {/* Image placeholder */}
        <div className="w-full h-36 rounded-xl bg-gradient-to-br from-coral-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 mb-4 flex items-center justify-center group-hover:from-coral-100 group-hover:to-orange-100 dark:group-hover:from-gray-700 dark:group-hover:to-gray-800 transition-colors">
          <svg className="w-10 h-10 text-coral-300 dark:text-coral-800 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeColors[resource.type]}`}>
            {typeLabel}
          </span>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tight">{category}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 flex-1 line-clamp-3">{description}</p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500">{resource.author}</span>
          <button
            onClick={handleAction}
            className="text-sm font-bold text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300 transition-colors flex items-center gap-1"
          >
            {ctaLabel[resource.type]}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </Card>
    </Link>
  );
}

