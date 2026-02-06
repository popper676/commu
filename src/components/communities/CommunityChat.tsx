"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";
import { chatService } from "@/lib/api/services";
import Card from "@/components/ui/Card";
import { ChatMessage } from "@/types";

interface Message {
    id: string;
    user: string;
    avatar: string;
    text: string;
    time: string;
    isMe: boolean;
}

interface CommunityChatProps {
    communityId: string;
    channelId: string;
    channelName: string;
}

export default function CommunityChat({ communityId, channelId, channelName }: CommunityChatProps) {
    const { locale } = useLanguage();
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Mock initial messages based on channel
    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 800));

            // In a real app, we would use:
            // const response = await chatService.getMessages(communityId, channelId);

            // Mock data variation based on channelId for demo realism
            const mockMessages: Message[] = [
                {
                    id: "1",
                    user: "Aung Pyae",
                    avatar: "A",
                    text: locale === "mm" ? "မင်္ဂလာပါ ခင်ဗျာ! အားလုံးပဲ အဆင်ပြေကြရဲ့လား?" : "Hello everyone! How are you all doing?",
                    time: "9:15 AM",
                    isMe: false,
                },
                {
                    id: "2",
                    user: "Su Myat",
                    avatar: "S",
                    text: locale === "mm" ? `ဒီ ${channelName} မှာ တွေ့ရတာ ဝမ်းသာပါတယ်။` : `Glad to see you in ${channelName}!`,
                    time: "10:30 AM",
                    isMe: false,
                },
            ];

            setMessages(mockMessages);
            setIsLoading(false);
        };

        fetchMessages();
    }, [communityId, channelId, channelName, locale]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const tempId = Date.now().toString();
        const msg: Message = {
            id: tempId,
            user: user?.name || "You",
            avatar: user?.name?.[0] || "Y",
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true,
        };

        // Optimistic update
        setMessages(prev => [...prev, msg]);
        setNewMessage("");

        try {
            // Simulate API call
            await chatService.sendMessage(communityId, channelId, msg.text);

            // Simulate mock reply for engagement
            setTimeout(() => {
                const reply: Message = {
                    id: (Date.now() + 1).toString(),
                    user: "Community Lead",
                    avatar: "L",
                    text: locale === "mm" ? "ကျေးဇူးတင်ပါတယ်!" : "Thanks for sharing!",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isMe: false,
                };
                setMessages(prev => [...prev, reply]);
            }, 2000);

        } catch (error) {
            console.error("Failed to send message", error);
            // In real app, rollback optimistic update or show error
        }
    };

    return (
        <Card className="flex flex-col h-full border-none shadow-none bg-gray-700/50 rounded-none">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-600 bg-gray-800 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center text-gray-300">
                        <span className="font-bold text-lg">#</span>
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-white leading-none">
                            {channelName}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                            {locale === "mm" ? "မက်ဆေ့ချ်များ စတင်ရေးသားပါ" : "Start messaging in this channel"}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full border border-gray-600">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">Live</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="text-center py-8 opacity-50">
                            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-gray-400">#</div>
                            <h3 className="text-xl font-bold text-white mb-2">Welcome to #{channelName}!</h3>
                            <p className="text-gray-400 text-sm">This is the start of the <span className="text-gold-400 font-bold">#{channelName}</span> channel.</p>
                        </div>

                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-start gap-4 group ${msg.isMe ? "flex-row-reverse" : ""}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm shadow-md transition-transform group-hover:scale-105 ${msg.isMe ? "bg-gold-500 text-gray-900" : "bg-gray-600 text-gray-200"
                                    }`}>
                                    {msg.avatar}
                                </div>
                                <div className={`flex flex-col max-w-[75%] ${msg.isMe ? "items-end" : ""}`}>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-bold text-gray-300">
                                            {msg.user}
                                        </span>
                                        <span className="text-[10px] text-gray-500">{msg.time}</span>
                                    </div>
                                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isMe
                                        ? "bg-gold-500 text-gray-900 rounded-tr-none"
                                        : "bg-gray-600 text-gray-100 rounded-tl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-600">
                <form onSubmit={handleSendMessage} className="relative">
                    <button
                        type="button"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={`Message #${channelName}`}
                        className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-gold-500/50 transition-all font-medium"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="p-2 rounded-lg text-gold-500 hover:bg-gray-600 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </Card>
    );
}
