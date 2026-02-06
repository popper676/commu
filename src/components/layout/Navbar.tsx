"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import GlobalSearch from "./GlobalSearch";
import Button from "@/components/ui/Button";

import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const { t } = useLanguage();
  const { isAuthenticated, user, logout, switchRole } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/communities", label: t("nav.communities") },
    { href: "/courses", label: "Courses" },
    { href: "/challenges", label: "Challenges" },
    { href: "/jobs", label: t("nav.jobs") },
    { href: "/dashboard", label: t("nav.dashboard"), authRequired: true },
    { href: "/about", label: t("nav.about") },
    { href: "/contact", label: t("nav.contact") },
  ].filter(link => !link.authRequired || isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 bg-cream-100/80 backdrop-blur-xl border-b border-cream-200/50 transition-all">
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Logo & Search */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <svg className="w-8 h-8 text-gold-500 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4a4 4 0 110 8 4 4 0 010-8zm0 20c-3.866 0-7.282-1.953-9.318-4.926C8.63 18.594 13.144 17 16 17s7.37 1.594 9.318 4.074C23.282 24.047 19.866 26 16 26z" />
              </svg>
              <span className="text-xl font-black text-black font-outfit uppercase tracking-tighter">
                MYC<span className="text-gold-500">.mm</span>
              </span>
            </Link>
            <GlobalSearch />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 ${isActive
                    ? "text-gold-600"
                    : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            {isAuthenticated && (
              <button
                onClick={switchRole}
                className="group relative w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-105"
                title={user?.role === 'CREATOR' ? 'Switch to Learner Mode' : 'Switch to Creator Mode'}
              >
                {user?.role === 'CREATOR' ? (
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )}
                {/* Tooltip */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {user?.role === 'CREATOR' ? '→ Learner' : '→ Creator'}
                </span>
              </button>
            )}
            {isAuthenticated && user?.role === 'CREATOR' && (
              <div className="relative">
                <button
                  onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
                  className="w-9 h-9 rounded-full bg-gold-500 text-white flex items-center justify-center hover:bg-gold-600 transition-all"
                  title={t("nav.createNew")}
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {createDropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setCreateDropdownOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                      <Link
                        href="/create/community"
                        onClick={() => setCreateDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gold-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold-100 flex items-center justify-center group-hover:bg-gold-200 transition-colors">
                          <svg className="w-5 h-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">Community</div>
                          <div className="text-xs text-gray-500">Discord-style groups</div>
                        </div>
                      </Link>

                      <Link
                        href="/create/course"
                        onClick={() => setCreateDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">Course</div>
                          <div className="text-xs text-gray-500">Share knowledge</div>
                        </div>
                      </Link>

                      <Link
                        href="/create/challenge"
                        onClick={() => setCreateDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">Challenge</div>
                          <div className="text-xs text-gray-500">Find talent</div>
                        </div>
                      </Link>

                      <div className="border-t border-gray-100 my-2" />

                      <Link
                        href="/jobs/post"
                        onClick={() => setCreateDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">Job Posting</div>
                          <div className="text-xs text-gray-500">Hire professionals</div>
                        </div>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
            {isAuthenticated ? (
              <>
                <Link
                  href="/profile"
                  className="w-9 h-9 rounded-full bg-cream-200 flex items-center justify-center text-gray-600 hover:bg-gold-100 hover:text-gold-600 transition-all border border-cream-300"
                  title={user?.name || t("profile.title")}
                >
                  <span className="text-sm font-bold">{user?.name?.[0] || 'U'}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {t("nav.login")}
                </Link>
                <Button variant="primary" size="sm" href="/signup">
                  {t("nav.joinNow")}
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-600 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cream-200 bg-cream-100">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-base font-bold py-2 px-4 rounded-xl transition-all ${isActive
                    ? "bg-gold-50 text-gold-600"
                    : "text-gray-600 hover:bg-cream-200"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-cream-200 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 text-base font-medium text-gray-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-full bg-cream-200 flex items-center justify-center">
                      <span className="text-sm font-bold">{user?.name?.[0] || 'U'}</span>
                    </div>
                    {user?.name || t("profile.title")}
                  </Link>
                  <button
                    onClick={() => {
                      switchRole();
                      setMobileOpen(false);
                    }}
                    className="flex items-center gap-2 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 py-2 px-4 rounded-xl hover:shadow-lg transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      {user?.role === 'CREATOR' ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                    </div>
                    Switch to {user?.role === 'CREATOR' ? 'Learner' : 'Creator'}
                  </button>
                  {user?.role === 'CREATOR' && (
                    <Link
                      href="/create"
                      className="flex items-center gap-2 text-base font-medium text-gray-700"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      {t("nav.createNew")}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-left text-base font-medium text-gray-700 py-2 px-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <LanguageToggle />
                  </div>
                  <Button variant="primary" size="sm" href="/signup">
                    {t("nav.joinNow")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
