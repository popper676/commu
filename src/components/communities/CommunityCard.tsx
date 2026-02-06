"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Community } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/contexts/ToastContext";

interface CommunityCardProps {
  community: Community;
}

export default function CommunityCard({ community }: CommunityCardProps) {
  const { locale, t } = useLanguage();
  const { showToast } = useToast();

  const name = locale === "mm" ? community.nameMm || community.name : community.name;
  const description = locale === "mm" ? community.descriptionMm || community.description : community.description;
  const categoryLabel = locale === "mm" ? community.categoryMm || community.category : community.category;
  const imageUrl = community.image || community.avatar;

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showToast(locale === "mm" ? `${name} ထဲသို့ ဝင်ရောက်ပြီးပါပြီ!` : `Joined ${name} successfully!`, "success");
  };

  return (
    <Link href={`/communities/${community.id}`} className="group">
      <Card className="h-full border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-gold-300 dark:hover:border-gold-700 flex flex-col p-0 overflow-hidden rounded-[2.5rem]">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-gold-400/20 to-coral-500/20 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-gold-500/30 group-hover:scale-125 transition-transform duration-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
            </>
          )}
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-full text-[10px] font-black text-gold-600 dark:text-gold-400 uppercase tracking-widest shadow-sm">
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2 font-outfit leading-tight group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 flex-1 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col">
              <span className="text-lg font-black text-gray-900 dark:text-white font-outfit leading-none">
                {Array.isArray(community.members) ? community.members.length.toLocaleString() : (community.members || 0).toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                {t("communities.members")}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleJoin}
              className="px-6 py-2.5 rounded-2xl font-bold shadow-lg shadow-gold-200/50 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
            >
              {t("communities.join")}
            </Button>
          </div>
        </div>
      </Card>
    </Link >
  );
}
