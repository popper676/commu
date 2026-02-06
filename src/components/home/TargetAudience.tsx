"use client";

import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";

export default function TargetAudience() {
    const { t, tArray } = useLanguage();
    const roles = tArray("audience.roles");

    // Define some gentle rotation/scale variations for the badges
    const badgeVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
                ease: "easeOut" as any,
            },
        }),
    };

    return (
        <section className="relative py-32 transition-colors overflow-hidden bg-cream-50/50">
            {/* Decorative Orbs - Soft and subtle */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-200/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-coral-200/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="label-uppercase text-gold-600 mb-4 tracking-[0.3em]"
                    >
                        {t("audience.title")}
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl sm:text-7xl font-black text-gray-900 font-outfit tracking-tighter"
                    >
                        {t("audience.highlight")}
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="w-24 h-1.5 bg-gold-400 mx-auto mt-8 rounded-full"
                    />
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 max-w-5xl mx-auto">
                    {roles.map((role, i) => {
                        const isLast = i === roles.length - 1;

                        return (
                            <motion.div
                                key={role}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={badgeVariants}
                                whileHover={{ scale: 1.05, y: -5, rotate: isLast ? 0 : (i % 2 === 0 ? 2 : -2) }}
                                className={`
                  px-8 py-5 rounded-3xl backdrop-blur-md border border-white/60 shadow-xl transition-all duration-300
                  ${isLast
                                        ? "bg-gold-500 text-white border-gold-400 shadow-gold-200/40 text-3xl sm:text-5xl font-black mt-8"
                                        : "bg-white/60 text-gray-800 text-xl sm:text-2xl font-bold hover:bg-white hover:text-gold-600 shadow-gray-200/20"
                                    }
                `}
                            >
                                {role}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
