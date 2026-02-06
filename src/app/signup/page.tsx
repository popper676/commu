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
import { UserRole, SubscriptionPlan } from "@/types";

export default function SignupPage() {
    const { locale } = useLanguage();
    const { showToast } = useToast();
    const { signup, isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1); // Multi-step form

    // Form state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState<UserRole>('LEARNER');
    const [plan, setPlan] = useState<SubscriptionPlan>('LEARNER_FREE');

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && user) {
            const redirectPath = user.role === 'CREATOR' ? '/dashboard/creator' : '/dashboard/learner';
            router.push(redirectPath);
        }
    }, [isAuthenticated, user, router]);

    const handleStep1Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            showToast(locale === "mm" ? "လျှို့ဝှက်နံပါတ်များ မတူညီပါ" : "Passwords do not match", "error");
            return;
        }
        setStep(2);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await signup(name, email, password, role, plan);
            showToast(
                locale === "mm"
                    ? "အကောင့်အသစ်ကို အောင်မြင်စွာ ပြုလုပ်ပြီးပါပြီ!"
                    : "Successfully created account!",
                "success"
            );
            // Redirect will happen via useEffect
        } catch (error) {
            showToast(locale === "mm" ? "အကောင့်ပြုလုပ်ရန် မအောင်မြင်ပါ" : "Signup failed", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectRole = (selectedRole: UserRole) => {
        setRole(selectedRole);
        if (selectedRole === 'CREATOR') {
            setPlan('CREATOR_MONTHLY');
        } else {
            setPlan('LEARNER_FREE');
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 flex items-center justify-center p-4 transition-colors relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/30 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-coral-200/30 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="w-full max-w-4xl relative">
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
                        {locale === "mm" ? "အကောင့်အသစ် ပြုလုပ်ပါ" : "Join the Community"}
                    </h1>
                    <p className="text-gray-600 font-medium max-w-md mx-auto">
                        {step === 1
                            ? (locale === "mm" ? "သင့်အချက်အလက်များကို ဖြည့်သွင်းပါ" : "Create your account to get started")
                            : (locale === "mm" ? "သင့်အတွက် သင့်လျော်သော အခန်းကဏ္ဍကို ရွေးချယ်ပါ" : "Choose your role and subscription plan")
                        }
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className={`flex items-center gap-2 ${step >= 1 ? 'text-gold-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-gold-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
                            1
                        </div>
                        <span className="text-sm font-bold hidden sm:inline">{locale === "mm" ? "အချက်အလက်" : "Details"}</span>
                    </div>
                    <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-800"></div>
                    <div className={`flex items-center gap-2 ${step >= 2 ? 'text-gold-600' : 'text-gray-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-gold-500 text-white' : 'bg-gray-200 dark:bg-gray-800'}`}>
                            2
                        </div>
                        <span className="text-sm font-bold hidden sm:inline">{locale === "mm" ? "အခန်းကဏ္ဍ" : "Role"}</span>
                    </div>
                </div>

                <Card className="p-8 sm:p-12 border-gray-200 shadow-2xl shadow-gray-300/50 bg-white backdrop-blur-xl">
                    {step === 1 ? (
                        <form onSubmit={handleStep1Submit} className="space-y-6">
                            <Input
                                label={locale === "mm" ? "အမည် အပြည့်အစုံ" : "Full Name"}
                                placeholder="e.g. Zayar Phyo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                            <Input
                                type="email"
                                label={locale === "mm" ? "အီးမေးလ်" : "Email Address"}
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Input
                                    type="password"
                                    label={locale === "mm" ? "လျှို့ဝှက်နံပါတ်" : "Password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                                <Input
                                    type="password"
                                    label={locale === "mm" ? "နံပါတ် ထပ်မံရိုက်ပါ" : "Confirm Password"}
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    autoComplete="new-password"
                                />
                            </div>

                            <div className="flex items-start gap-3 py-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-gold-500 focus:ring-gold-500 cursor-pointer"
                                    required
                                />
                                <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                    {locale === "mm" ? "ကျွန်ုပ်သည် ဝန်ဆောင်မှုဆိုင်ရာ စည်းကမ်းချက်များကို သဘောတူပါသည်။" : "I agree to the Terms of Service and Privacy Policy."}
                                </label>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full py-5 text-lg font-bold shadow-xl shadow-gold-100/50"
                            >
                                {locale === "mm" ? "ဆက်လက်လုပ်ဆောင်မည်" : "Continue"}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleFinalSubmit} className="space-y-8">
                            {/* Role Selection */}
                            <div>
                                <h3 className="text-xl font-black text-gray-900 font-outfit mb-6">
                                    {locale === "mm" ? "သင့်အခန်းကဏ္ဍကို ရွေးချယ်ပါ" : "Choose Your Role"}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Creator Role */}
                                    <button
                                        type="button"
                                        onClick={() => selectRole('CREATOR')}
                                        className={`p-8 rounded-3xl border-2 transition-all text-left ${role === 'CREATOR'
                                            ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
                                            : 'border-gray-200 dark:border-gray-800 hover:border-gold-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gold-500 text-white flex items-center justify-center">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            {role === 'CREATOR' && (
                                                <div className="w-6 h-6 rounded-full bg-gold-500 text-white flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-2xl font-black text-gray-900 font-outfit mb-2">
                                            {locale === "mm" ? "ဖန်တီးသူ" : "Creator"}
                                        </h4>
                                        <p className="text-sm text-gray-700 font-medium mb-4">
                                            {locale === "mm"
                                                ? "အသိုင်းအဝိုင်းများနှင့် သင်တန်းများ ဖန်တီးပါ"
                                                : "Create communities and courses"}
                                        </p>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
                                                {locale === "mm" ? "အကန့်အသတ်မရှိ အသိုင်းအဝိုင်းများ" : "Unlimited communities"}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
                                                {locale === "mm" ? "သင်တန်းများ တင်ပြခြင်း" : "Course creation"}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div>
                                                {locale === "mm" ? "ဝင်ငွေရရှိနိုင်ခြင်း" : "Monetization options"}
                                            </li>
                                        </ul>
                                    </button>

                                    {/* Learner Role */}
                                    <button
                                        type="button"
                                        onClick={() => selectRole('LEARNER')}
                                        className={`p-8 rounded-3xl border-2 transition-all text-left ${role === 'LEARNER'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-800 hover:border-blue-300'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                            {role === 'LEARNER' && (
                                                <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="text-2xl font-black text-gray-900 font-outfit mb-2">
                                            {locale === "mm" ? "သင်ယူသူ" : "Learner"}
                                        </h4>
                                        <p className="text-sm text-gray-700 font-medium mb-4">
                                            {locale === "mm"
                                                ? "သင်တန်းများတက်ရောက်ပြီး အသိုင်းအဝိုင်းများတွင် ပါဝင်ပါ"
                                                : "Join communities and take courses"}
                                        </p>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                {locale === "mm" ? "အခမဲ့ အသိုင်းအဝိုင်းများ" : "Free communities"}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                {locale === "mm" ? "သင်တန်းများ ဝယ်ယူခြင်း" : "Purchase courses"}
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                {locale === "mm" ? "လက်မှတ်များ ရယူခြင်း" : "Earn certificates"}
                                            </li>
                                        </ul>
                                    </button>
                                </div>
                            </div>

                            {/* Subscription Plan (only for Creator) */}
                            {role === 'CREATOR' && (
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 font-outfit mb-6">
                                        {locale === "mm" ? "စာရင်းသွင်းမှု အစီအစဉ်" : "Subscription Plan"}
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <button
                                            type="button"
                                            onClick={() => setPlan('CREATOR_MONTHLY')}
                                            className={`p-6 rounded-2xl border-2 transition-all ${plan === 'CREATOR_MONTHLY'
                                                ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
                                                : 'border-gray-200 dark:border-gray-800'
                                                }`}
                                        >
                                            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Monthly</div>
                                            <div className="text-4xl font-black text-gray-900 font-outfit mb-1">$15</div>
                                            <div className="text-sm text-gray-500">per month</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPlan('CREATOR_YEARLY')}
                                            className={`p-6 rounded-2xl border-2 transition-all relative ${plan === 'CREATOR_YEARLY'
                                                ? 'border-gold-500 bg-gold-50 dark:bg-gold-900/20'
                                                : 'border-gray-200 dark:border-gray-800'
                                                }`}
                                        >
                                            <div className="absolute -top-3 right-4 px-3 py-1 bg-green-500 text-white text-xs font-black rounded-full">
                                                SAVE 33%
                                            </div>
                                            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Yearly</div>
                                            <div className="text-4xl font-black text-gray-900 font-outfit mb-1">$120</div>
                                            <div className="text-sm text-gray-500">per year</div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="flex-1 py-5"
                                    onClick={() => setStep(1)}
                                >
                                    {locale === "mm" ? "နောက်သို့" : "Back"}
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="flex-1 py-5 text-lg font-bold shadow-xl shadow-gold-100/50"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? (locale === "mm" ? "လုပ်ဆောင်နေပါသည်..." : "Creating Account...")
                                        : (locale === "mm" ? "အကောင့်ပြုလုပ်မည်" : "Create Account")
                                    }
                                </Button>
                            </div>
                        </form>
                    )}

                    <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                        <p className="text-sm text-gray-600 font-medium font-outfit">
                            {locale === "mm" ? "အကောင့်ရှိပြီးသားလား?" : "Already have an account?"}{" "}
                            <Link href="/login" className="text-gold-600 dark:text-gold-500 font-bold hover:underline underline-offset-4">
                                {locale === "mm" ? "အကောင့်ဝင်ရန်" : "Sign in here"}
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
