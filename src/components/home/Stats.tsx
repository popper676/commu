"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n/context";

export default function Stats() {
    const { t } = useLanguage();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const stats = [
        { label: "Community Members", value: "50,000+", color: "text-gold-500" },
        { label: "Events Organized", value: "1,200+", color: "text-coral-500" },
        { label: "Job Placements", value: "850+", color: "text-blue-500" },
        { label: "Partner Companies", value: "45+", color: "text-green-500" },
    ];

    return (
        <section ref={containerRef} className="py-24 relative overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center group"
                        >
                            <motion.div
                                className={`text-5xl sm:text-7xl font-black mb-4 font-outfit tracking-tighter ${stat.color} transition-transform group-hover:scale-110 duration-500`}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-xs sm:text-sm font-black text-gray-400 uppercase tracking-[0.2em]">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
