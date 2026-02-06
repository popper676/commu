"use client";

import { useLanguage } from "@/lib/i18n/context";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  const { locale, t } = useLanguage();

  const stats = [
    { label: t("about.stats.communities"), value: "12+" },
    { label: t("about.stats.members"), value: "15,000+" },
    { label: t("about.stats.events"), value: "100+" },
    { label: t("about.stats.cities"), value: "15" },
  ];

  const values = [
    { title: t("about.value1"), description: t("about.value1Desc"), icon: "community" },
    { title: t("about.value2"), description: t("about.value2Desc"), icon: "inclusive" },
    { title: t("about.value3"), description: t("about.value3Desc"), icon: "growth" },
    { title: t("about.value4"), description: t("about.value4Desc"), icon: "impact" },
  ];

  const team = [
    { name: "Aung Pyae Hein", role: "Founder & Lead Developer", initials: "APH" },
    { name: "Su Myat Noe", role: "Community Manager", initials: "SMN" },
    { name: "Min Khant Zaw", role: "UI/UX Designer", initials: "MKZ" },
    { name: "Htet Htet Linn", role: "Content Creator", initials: "HHL" },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    community: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    inclusive: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    growth: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    impact: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
      </svg>
    ),
  };

  return (
    <div className="bg-cream-100 transition-colors duration-500 overflow-x-hidden">
      {/* Premium Hero */}
      <section className="relative pt-24 pb-32 sm:pt-32 sm:pb-48 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/10 dark:bg-gold-500/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-coral-400/10 dark:bg-coral-500/5 blur-[120px] rounded-full delay-1000 animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-50 dark:bg-gold-900/30 text-gold-600 dark:text-gold-400 rounded-2xl text-xs font-black tracking-[0.2em] uppercase mb-10 border border-gold-100/50 dark:border-gold-800/50">
            <span className="w-2 h-2 rounded-full bg-gold-500 animate-ping" />
            Our Mission & Impact
          </div>
          <h1 className="text-5xl sm:text-8xl font-black text-gray-900 dark:text-white mb-10 font-outfit leading-[1.1] tracking-tight">
            Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-coral-500 animate-gradient-x">Communities</span> Across Myanmar
          </h1>
          <p className="text-xl sm:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Modern Stats with Floating Design */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-32 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, idx) => (
            <div key={stat.label} className={`group p-8 sm:p-12 rounded-[2.5rem] text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-gray-100 dark:border-gray-700 shadow-2xl shadow-gray-200/50 dark:shadow-none transition-all duration-500 hover:-translate-y-2 ${idx % 2 === 0 ? '-rotate-1 hover:rotate-0' : 'rotate-1 hover:rotate-0'}`}>
              <p className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-3 font-outfit group-hover:scale-110 transition-transform">{stat.value}</p>
              <p className="text-xs sm:text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Values Section */}
      <section className="py-32 bg-gradient-to-br from-purple-500 via-coral-500 to-gold-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl sm:text-6xl font-black mb-16 font-outfit">{t("about.values")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 group text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold-400/20 text-gold-400 mb-8 group-hover:bg-gold-400 group-hover:text-gray-900 transition-all duration-500 group-hover:rotate-6">
                  {iconMap[value.icon]}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-outfit">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed font-medium group-hover:text-gray-200 transition-colors">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Reveal Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-40">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white mb-6 font-outfit tracking-tight">Built by the Community.</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">Our diverse team is dedicated to fostering growth and connection across Myanmar&apos;s digital landscape.</p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" size="lg" className="rounded-2xl border-2 font-bold">Join our team &rarr;</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {team.map((member) => (
            <div key={member.name} className="group">
              <div className="relative aspect-square rounded-[3.5rem] bg-gray-50 dark:bg-gray-800 mb-8 flex items-center justify-center overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-500 group-hover:border-gold-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-coral-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="text-5xl font-black text-gray-300 dark:text-gray-600 group-hover:text-gold-500 group-hover:scale-110 transition-all duration-500 font-outfit">
                  {member.initials}
                </span>
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-white/20">
                    <p className="text-xs font-black text-gold-600 uppercase tracking-widest">View Bio &rarr;</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-outfit">{member.name}</h3>
              <p className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em]">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Massive CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40">
        <div className="relative rounded-[4rem] bg-gradient-to-br from-gold-500 to-coral-500 p-12 sm:p-24 overflow-hidden border border-white/10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-400/20 blur-[120px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-coral-400/20 blur-[120px] rounded-full" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-7xl font-black text-white mb-10 font-outfit">Join the future of Myanmar&apos;s community.</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <Button variant="primary" size="lg" className="bg-white text-gray-900 hover:bg-gold-50 border-none px-12 py-5 text-lg font-bold shadow-[0_20px_50px_rgba(255,255,255,0.1)]" href="/signup">
                Start Now
              </Button>
              <Link href="/contact" className="text-white/60 hover:text-white font-bold transition-colors">
                Ask a question &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

