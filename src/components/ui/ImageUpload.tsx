"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
    label?: string;
    onImageSelect?: (file: File) => void;
    className?: string;
    description?: string;
}

export default function ImageUpload({ label, onImageSelect, className, description }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        // Create local preview URL
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        if (onImageSelect) onImageSelect(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            handleFile(file);
        }
    };

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {label && (
                <label className="block text-sm font-bold text-gray-700 uppercase tracking-widest ml-1">
                    {label}
                </label>
            )}

            <motion.div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                animate={{
                    borderColor: isDragging ? "var(--color-gold-400)" : preview ? "transparent" : "var(--color-gray-200)",
                    backgroundColor: isDragging ? "var(--color-gold-50)" : "white",
                }}
                className={`
                    relative w-full h-48 rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden
                    flex flex-col items-center justify-center text-center transition-colors
                    ${preview ? "border-solid" : "hover:border-gold-300 hover:bg-gray-50"}
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />

                <AnimatePresence mode="wait">
                    {preview ? (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                                <button
                                    onClick={removeImage}
                                    className="bg-white/90 text-red-500 px-4 py-2 rounded-full font-bold shadow-lg hover:bg-white transition-all transform hover:scale-105"
                                >
                                    Replace / Remove
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="placeholder"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-6"
                        >
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-900 font-bold text-lg mb-1">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-gray-400 text-sm font-medium">
                                {description || "SVG, PNG, JPG or GIF (max. 800x400px)"}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
