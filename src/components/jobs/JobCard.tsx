"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Job } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/contexts/ToastContext";

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const { locale, t } = useLanguage();
  const { showToast } = useToast();

  const title = locale === "mm" ? job.titleMm : job.title;
  const description = locale === "mm" ? job.descriptionMm : job.description;
  const location = locale === "mm" ? job.locationMm : job.location;
  const jobType = locale === "mm" ? job.typeMm : t(`jobs.${job.type === "full-time" ? "fullTime" : job.type === "part-time" ? "partTime" : job.type}`);

  const typeColors: Record<string, string> = {
    "full-time": "bg-green-50 text-green-700 border-green-200",
    "part-time": "bg-blue-50 text-blue-700 border-blue-200",
    freelance: "bg-orange-50 text-orange-700 border-orange-200",
    internship: "bg-purple-50 text-purple-700 border-purple-200",
  };

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showToast(locale === "mm" ? `${title} အလုပ်အတွက် လျှောက်ထားပြီးပါပြီ!` : `Applied for ${title} successfully!`, "success");
  };

  return (
    <Link href={`/jobs/${job.id}`} className="group">
      <Card className="h-full border-gray-100 shadow-xl shadow-gray-200/50 bg-white backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-gold-300 flex flex-col p-8 rounded-[2.5rem] relative overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 to-coral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-coral-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-xl font-black text-white font-outfit uppercase">{job.company[0]}</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900 group-hover:bg-gradient-to-r group-hover:from-gold-600 group-hover:to-coral-600 group-hover:bg-clip-text group-hover:text-transparent transition-all line-clamp-1 font-outfit">
                  {title}
                </h3>
                <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mt-0.5">{job.company}</p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shrink-0 ${typeColors[job.type]}`}>
              {jobType}
            </span>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-1 line-clamp-2">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {job.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-bold text-gray-600 group-hover:text-gold-600 transition-colors">
                #{tag}
              </span>
            ))}
            {job.tags.length > 3 && (
              <span className="px-2 py-1 text-[10px] font-bold text-gray-400 flex items-center">
                +{job.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <svg className="w-4 h-4 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-[10px] font-bold text-gray-700 truncate uppercase tracking-tighter">{location}</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] font-bold text-gray-900 truncate uppercase tracking-tighter">{job.salary || 'Negotiable'}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
              {t("jobs.postedOn")} {new Date(job.postedDate).toLocaleDateString()}
            </span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApply}
              className="px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-gold-200/50 hover:scale-105 active:scale-95 transition-all"
            >
              {t("jobs.apply")}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
