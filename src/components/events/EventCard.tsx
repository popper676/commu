"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Event } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/contexts/ToastContext";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const { locale, t } = useLanguage();
  const { showToast } = useToast();

  const title = locale === "mm" ? event.titleMm : event.title;
  const description = locale === "mm" ? event.descriptionMm : event.description;
  const location = locale === "mm" ? event.locationMm : event.location;

  const typeColors = {
    online: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800",
    offline: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
    hybrid: "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800",
  };

  const typeLabel = t(`events.${event.type}`);

  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleString("en", { month: "short" });
  const day = dateObj.getDate();

  const handleRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showToast(locale === "mm" ? `${title} အတွက် စာရင်းသွင်းပြီးပါပြီ!` : `Registered for ${title} successfully!`, "success");
  };

  return (
    <Link href={`/events/${event.id}`} className="group">
      <Card className="h-full border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 dark:hover:border-gold-700 flex flex-col p-8 rounded-[2.5rem]">
        <div className="flex items-start gap-6 mb-8">
          {/* Date block */}
          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 group-hover:bg-gold-50 dark:group-hover:bg-gold-900/30 transition-colors rounded-2xl p-4 min-w-[70px] border border-gray-100 dark:border-gray-700 group-hover:border-gold-200 dark:group-hover:border-gold-800">
            <span className="text-[10px] font-black text-gray-400 group-hover:text-gold-500 uppercase tracking-widest">{month}</span>
            <span className="text-3xl font-black text-gray-900 dark:text-white font-outfit">{day}</span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${typeColors[event.type]}`}>
                {typeLabel}
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors line-clamp-1 font-outfit">
              {title}
            </h3>
            <p className="text-sm font-bold text-gray-400 mt-1 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {event.time}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-1 line-clamp-2">
          {description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-8 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 truncate">{location}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-black text-gray-900 dark:text-white font-outfit leading-none">
              {event.attendees}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              {t("events.attendees")}
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRegister}
            className="px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-gold-200/50 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
          >
            {t("events.register")}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
