"use client";

import { useLanguage } from "@/lib/i18n/context";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t("howItWorks.step1Title"),
      description: t("howItWorks.step1Desc"),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
    },
    {
      number: "02",
      title: t("howItWorks.step2Title"),
      description: t("howItWorks.step2Desc"),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      ),
    },
    {
      number: "03",
      title: t("howItWorks.step3Title"),
      description: t("howItWorks.step3Desc"),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
    {
      number: "04",
      title: t("howItWorks.step4Title"),
      description: t("howItWorks.step4Desc"),
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-28 transition-colors relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Groq-style uppercase label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="label-uppercase text-gold-600 text-center mb-4"
        >
          How It Works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-black text-center text-gray-900 mb-16 font-outfit"
        >
          {t("howItWorks.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              className="bg-white/60 backdrop-blur-xl p-8 rounded-[2rem] border border-white/50 shadow-xl shadow-gold-100/20 group hover:bg-white hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl font-black text-gold-500/30 group-hover:text-gold-500 transition-colors font-outfit">
                    {step.number}
                  </span>
                  <div className="p-3 bg-white rounded-2xl shadow-sm text-gold-500 group-hover:bg-gold-500 group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 font-outfit">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed font-medium text-sm flex-grow">
                  {step.description}
                </p>

                {/* Decorative line */}
                <div className="w-12 h-1 bg-gold-200 mt-6 rounded-full group-hover:w-full group-hover:bg-gold-400 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
