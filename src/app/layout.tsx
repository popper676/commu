import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYC.mm - Myanmar Youth Community",
  description:
    "Join Myanmar's largest youth community. Learn new skills, attend events, find opportunities, and build meaningful connections.",
};

import { ToastProvider } from "@/contexts/ToastContext";
import { AuthProvider } from "@/contexts/AuthContext";
import PageTransition from "@/components/layout/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <Navbar />
              <PageTransition>{children}</PageTransition>
              <Footer />
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
