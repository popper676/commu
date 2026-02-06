"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useLanguage();

  const sections = [
    {
      title: t("footer.platform"),
      links: [
        { label: t("footer.startFree"), href: "#" },
        { label: t("nav.login"), href: "/login" },
        { label: t("footer.pricing"), href: "#" },
      ],
    },
    {
      title: t("footer.features"),
      links: [
        { label: t("nav.communities"), href: "/communities" },
        { label: t("nav.events"), href: "/events" },
        { label: t("nav.resources"), href: "/resources" },
        { label: t("nav.jobs"), href: "/jobs" },
      ],
    },
    {
      title: t("footer.guides"),
      links: [
        { label: t("footer.getStarted"), href: "#" },
        { label: t("footer.findCommunity"), href: "/communities" },
        { label: t("footer.findEvents"), href: "/events" },
        { label: t("footer.findMentor"), href: "#" },
      ],
    },
    {
      title: t("footer.company"),
      links: [
        { label: t("footer.aboutUs"), href: "/about" },
        { label: t("footer.blog"), href: "#" },
        { label: t("footer.careers"), href: "#" },
        { label: t("footer.contact"), href: "/contact" },
      ],
    },
  ];

  return (
    <footer className="bg-cream-100 border-t border-cream-200 pt-20 pb-10">
      {/* Clean divider banner with Marquee */}
      <div className="w-full py-8 bg-gold-500 overflow-hidden relative border-y border-gold-600/20">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 items-center"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-10">
              <span className="text-4xl sm:text-6xl font-black text-white/40 font-outfit uppercase tracking-tighter">
                GROW TOGETHER
              </span>
              <span className="w-3 h-3 rounded-full bg-white/40" />
              <span className="text-4xl sm:text-6xl font-black text-white/40 font-outfit uppercase tracking-tighter">
                BUILD THE FUTURE
              </span>
              <span className="w-3 h-3 rounded-full bg-white/40" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <svg className="w-7 h-7 text-gold-500" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4a4 4 0 110 8 4 4 0 010-8zm0 20c-3.866 0-7.282-1.953-9.318-4.926C8.63 18.594 13.144 17 16 17s7.37 1.594 9.318 4.074C23.282 24.047 19.866 26 16 26z" />
              </svg>
              <span className="text-xl font-black text-black font-outfit uppercase tracking-tighter">
                MYC<span className="text-gold-500">.mm</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
              {t("footer.tagline")}</p>
            {/* Social icons */}
            <div className="flex gap-3">
              {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-cream-200 flex items-center justify-center text-gray-500 hover:bg-gold-100 hover:text-gold-600 transition-colors border border-cream-300"
                >
                  <span className="text-xs font-bold uppercase">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                {t(section.title)}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm font-semibold text-gray-500 hover:text-gold-600 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-cream-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm font-bold text-gray-400">
            <Link href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-900 transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-gray-900 transition-colors">Cookies</Link>
          </div>
          <p className="text-sm font-bold text-gray-400">
            Copyright &copy; {new Date().getFullYear()} MYC.mm
          </p>
        </div>
      </div>
    </footer>
  );
}
