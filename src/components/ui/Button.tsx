"use client";

import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  onClick,
  className = "",
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap";

  const variants = {
    primary: "bg-gold-500 text-gray-900 hover:bg-gold-600 active:scale-[0.98]",
    secondary: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border-2 border-cream-300 text-gray-700 hover:border-gold-400 hover:text-gray-900",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
