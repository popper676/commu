"use client";

import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-gold-400 transition-all text-gray-900 placeholder-gray-400 font-medium ${error ? "border-red-400" : ""
                        } ${className}`}
                    {...props}
                />
                {error && <p className="text-xs font-bold text-red-500 ml-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    rows={5}
                    className={`w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-gold-400 transition-all text-gray-900 placeholder-gray-400 font-medium resize-none ${error ? "border-red-400" : ""
                        } ${className}`}
                    {...props}
                />
                {error && <p className="text-xs font-bold text-red-500 ml-1">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string }[];
    className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className, ...props }, ref) => {
        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                        {label}
                    </label>
                )}
                <select
                    ref={ref}
                    className={`w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-gold-400 transition-all text-gray-900 appearance-none cursor-pointer font-medium ${error ? "border-red-400" : ""
                        } ${className}`}
                    {...props}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <p className="text-xs font-bold text-red-500 ml-1">{error}</p>}
            </div>
        );
    }
);

Select.displayName = "Select";
