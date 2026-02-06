"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/context";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const { locale } = useLanguage();
    const { showToast } = useToast();
    const { login, isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            const redirectPath = user.role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/learner';
            router.push(redirectPath);
        }
    }, [isAuthenticated, user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await login(email, password);
            showToast(locale === "mm" ? "အောင်မြင်စွာ အကောင့်ဝင်ပြီးပါပြီ!" : "Successfully logged in!", "success");
            // Redirect will happen via useEffect
        } catch (error) {
            showToast(locale === "mm" ? "အကောင့်ဝင်ရန် မအောင်မြင်ပါ" : "Login failed", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4 transition-colors relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gold-200/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-coral-200/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="w-full max-w-md relative">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <svg className="w-10 h-10 text-gold-500 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 32 32" fill="currentColor">
                            <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 4a4 4 0 110 8 4 4 0 010-8zm0 20c-3.866 0-7.282-1.953-9.318-4.926C8.63 18.594 13.144 17 16 17s7.37 1.594 9.318 4.074C23.282 24.047 19.866 26 16 26z" />
                        </svg>
                        <span className="text-2xl font-black text-gray-900 font-outfit uppercase tracking-tighter">
                            MYC<span className="text-gold-500">.mm</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 font-outfit mb-2">
                        {locale === "mm" ? "ပြန်လည်ကြိုဆိုပါတယ်" : "Welcome Back"}
                    </h1>
                    <p className="text-gray-600 font-medium">
                        {locale === "mm" ? "သင့်အကောင့်ထဲသို့ ပြန်လည်ဝင်ရောက်ပါ" : "Login to access your personalized feed"}
                    </p>
                </div>

                <Card className="p-8 sm:p-10 border-gray-200 shadow-2xl shadow-gray-300/50 bg-white backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="email"
                            label={locale === "mm" ? "အီးမေးလ်" : "Email Address"}
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                                    {locale === "mm" ? "လျှို့ဝှက်နံပါတ်" : "Password"}
                                </label>
                                <Link href="#" className="text-xs font-bold text-gold-600 hover:text-gold-700 dark:text-gold-500">
                                    {locale === "mm" ? "မေ့သွားပါသလား?" : "Forgot?"}
                                </Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full py-4 text-base font-bold shadow-xl shadow-gold-100/50"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (locale === "mm" ? "ဝင်ရောက်နေပါသည်..." : "Logging in...") : (locale === "mm" ? "အကောင့်ဝင်မည်" : "Sign In")}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600 font-medium font-outfit">
                            {locale === "mm" ? "အကောင့်မရှိသေးဘူးလား?" : "Don't have an account?"}{" "}
                            <Link href="/signup" className="text-gold-600 dark:text-gold-500 font-bold hover:underline underline-offset-4">
                                {locale === "mm" ? "အသစ်ပြုလုပ်ရန်" : "Create one now"}
                            </Link>
                        </p>
                    </div>
                </Card>

                {/* Social Login Section */}
                <div className="mt-8">
                    <div className="relative flex items-center justify-center mb-8">
                        <div className="absolute inset-0 border-t border-gray-200 dark:border-gray-800" />
                        <span className="relative px-4 bg-gray-50 dark:bg-gray-950 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {locale === "mm" ? "ဒါမှမဟုတ်" : "Or continue with"}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94L5.84 14.1z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" /></svg>
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700">
                            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                            Facebook
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
