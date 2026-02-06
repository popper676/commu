"use client";

import { motion } from "framer-motion";

export default function TrustedBy() {
    const logos = [
        "TechMM", "YouthHub", "SkillSet", "MyanmarDev", "FutureYouth",
        "EduConnect", "CareerPath", "NextGen", "BrightMind", "NovaTech"
    ];

    return (
        <div className="py-12 bg-white/30 backdrop-blur-sm border-y border-cream-200/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-6">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
                    Empowering Myanmar's Next Generation with
                </p>
            </div>
            <div className="relative flex overflow-hidden group">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="flex whitespace-nowrap gap-16 items-center pr-16"
                >
                    {[...logos, ...logos].map((logo, i) => (
                        <span
                            key={i}
                            className="text-2xl sm:text-3xl font-black text-gray-300 hover:text-gold-500 transition-colors cursor-default select-none font-outfit"
                        >
                            {logo}
                        </span>
                    ))}
                </motion.div>

                {/* Gradient overlays to fade edges */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream-100 to-transparent z-10" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream-100 to-transparent z-10" />
            </div>
        </div>
    );
}
