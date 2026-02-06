"use client";

import { useLanguage } from "@/lib/i18n/context";
import Button from "@/components/ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
  const { t } = useLanguage();

  // Mouse movement effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  const rotateX = useTransform(dy, [-300, 300], [10, -10]);
  const rotateY = useTransform(dx, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative overflow-hidden transition-colors perspective-[1000px]">
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative z-10 w-full h-full"
      >
        {/* Subtle warm gradient background */}
        <div className="absolute inset-0 gradient-warm opacity-40 pointer-events-none" />

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold-200/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral-200/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2 pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pt-32 sm:pb-36">
          <div className="text-center max-w-4xl mx-auto">
            {/* Groq-style uppercase label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="label-uppercase text-gold-600 mb-6"
            >
              Myanmar&apos;s Largest Youth Community
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 leading-[0.95] drop-shadow-sm font-outfit"
            >
              {t("hero.titleLine1")}{" "}
              <span className="text-gold-600">
                {t("hero.titleHighlight")}
              </span>
              {t("hero.titleDot")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            {/* CTA input bar - polished glassmorphism */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 max-w-lg mx-auto"
            >
              <div className="flex items-center bg-white/60 backdrop-blur-xl rounded-2xl border border-cream-300 p-2 pl-6 transition-all group focus-within:border-gold-400 focus-within:ring-4 focus-within:ring-gold-500/10 hover:border-gold-300 shadow-xl shadow-gold-100/20">
                <svg className="w-5 h-5 text-gold-500 mr-3 shrink-0 group-focus-within:scale-110 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <input
                  type="email"
                  placeholder={t("hero.ctaPlaceholder")}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 outline-none text-base font-medium"
                />
                <Button variant="primary" size="md" className="rounded-xl shadow-lg shadow-gold-200/50">
                  {t("hero.start")} <span className="ml-1">&rarr;</span>
                </Button>
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center justify-center gap-3"
            >
              <div className="flex -space-x-3">
                {[
                  "bg-gold-500",
                  "bg-gold-600",
                  "bg-gold-400",
                ].map((bg, i) => (
                  <div
                    key={i}
                    className={`w-10 h-10 rounded-full ${bg} border-[3px] border-cream-50 flex items-center justify-center text-xs font-bold text-white shadow-md relative z-10 hover:z-20 hover:scale-110 transition-transform`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 font-bold tracking-wide">{t("hero.membersCount")}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
