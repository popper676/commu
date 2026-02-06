"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CallToAction() {
  const { t } = useLanguage();

  return (
    <section className="py-20 sm:py-32 transition-colors relative overflow-hidden">
      {/* Background Gradient Spot */}
      <div className="absolute bottom-0 inset-x-0 h-[500px] pointer-events-none bg-gradient-to-t from-gold-100/50 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[3rem] p-12 sm:p-20 shadow-2xl shadow-gold-100/50"
        >
          {/* Groq-style uppercase label */}
          <p className="label-uppercase text-gold-600 mb-6 tracking-[0.2em]">
            Get Started
          </p>

          <h2 className="text-5xl sm:text-7xl font-black text-gray-900 mb-8 font-outfit tracking-tight">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("cta.subtitle")}
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="primary" size="lg" href="/signup" className="text-xl px-12 py-5 shadow-xl shadow-gold-200/50 rounded-2xl">
              {t("cta.button")} <span className="ml-2">&rarr;</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
