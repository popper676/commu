"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import { communities } from "@/lib/data/communities";
import { Channel } from "@/types";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import CommunityChat from "@/components/communities/CommunityChat";

export default function CommunityDetailPage() {
    const params = useParams();
    const { locale } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
    const [isMember, setIsMember] = useState(false);
    const [isAddChannelOpen, setIsAddChannelOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState("");
    const [newChannelType, setNewChannelType] = useState<Channel['type']>('TEXT');

    const community = communities.find(c => c.id === params.id);

    if (!community) {
        return (
            <div className="min-h-screen bg-cream-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-black text-gray-900 mb-4">Community Not Found</h1>
                    <Link href="/communities">
                        <Button>Back to Communities</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const name = locale === "mm" ? community.nameMm : community.name;
    const description = locale === "mm" ? community.descriptionMm : community.description;
    const isOwner = user?.id === community.creatorId;

    // Auto-select first text channel
    if (!selectedChannel && community.channels && community.channels.length > 0) {
        const firstTextChannel = community.channels.find(ch => ch.type === 'TEXT');
        if (firstTextChannel) {
            setSelectedChannel(firstTextChannel);
        }
    }

    const handleJoin = () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }
        if (community.isPaid && community.entryFee) {
            // Mock payment flow
            alert(`Payment required: ${community.entryFee} MMK`);
        }
        setIsMember(true);
    };

    const handleAddChannel = (e: React.FormEvent) => {
        e.preventDefault();
        // In real app, call API
        console.log("Adding channel:", newChannelName, newChannelType);

        // Mock update for demo - in real app this would be a re-fetch or context update
        const newChannel: Channel = {
            id: Date.now().toString(),
            name: newChannelName,
            nameMm: newChannelName,
            type: newChannelType,
            createdAt: new Date().toISOString()
        };

        if (community.channels) {
            community.channels.push(newChannel);
        }

        setIsAddChannelOpen(false);
        setNewChannelName("");
    };

    const textChannels = community.channels?.filter(ch => ch.type === 'TEXT') || [];
    const voiceChannels = community.channels?.filter(ch => ch.type === 'VOICE') || [];
    const videoChannels = community.channels?.filter(ch => ch.type === 'VIDEO') || [];

    return (
        <div className="h-screen flex flex-col bg-cream-50">
            {/* Top Bar */}
            <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0 shadow-sm">
                <div className="flex items-center gap-4 flex-1">
                    <Link href="/communities" className="text-gray-600 hover:text-gray-900 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-white font-black">
                        {name[0]}
                    </div>
                    <div>
                        <h1 className="text-gray-900 font-black text-lg">{name}</h1>
                        <p className="text-gray-500 text-xs">{community.members.toLocaleString()} members</p>
                    </div>
                </div>

                {selectedChannel && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                        </svg>
                        <span className="font-bold text-gray-900">{selectedChannel.name}</span>
                    </div>
                )}

                {!isMember && !isOwner && (
                    <Button onClick={handleJoin} size="sm" className="ml-4 font-black">
                        {community.isPaid
                            ? `Join for ${community.entryFee} MMK`
                            : (locale === "mm" ? "ပါဝင်မည်" : "Join")}
                    </Button>
                )}
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Channel Sidebar */}
                <div className="w-60 bg-gray-50 flex-shrink-0 overflow-y-auto border-r border-gray-200">
                    <div className="p-4">
                        {/* Community Info */}
                        <div className="mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-gray-600 text-sm mb-2">{description}</p>
                            {community.isPaid && (
                                <div className="flex items-center gap-2 text-xs text-gold-400 mt-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span className="font-bold">Premium Community</span>
                                </div>
                            )}
                        </div>

                        {/* Text Channels */}
                        {textChannels.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 px-2 mb-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <h3 className="text-xs font-black text-gray-600 uppercase tracking-wider">
                                        {locale === "mm" ? "စာသား Channels" : "Text Channels"}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    {textChannels.map(channel => (
                                        <button
                                            key={channel.id}
                                            onClick={() => setSelectedChannel(channel)}
                                            className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${selectedChannel?.id === channel.id
                                                ? 'bg-gradient-to-r from-gold-500 to-coral-500 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                            </svg>
                                            <span className="font-bold text-sm">{channel.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Voice Channels */}
                        {voiceChannels.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 px-2 mb-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                    <h3 className="text-xs font-black text-gray-600 uppercase tracking-wider">
                                        {locale === "mm" ? "အသံ Channels" : "Voice Channels"}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    {voiceChannels.map(channel => (
                                        <button
                                            key={channel.id}
                                            className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            </svg>
                                            <span className="font-bold text-sm">{channel.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Video Channels */}
                        {videoChannels.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 px-2 mb-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <h3 className="text-xs font-black text-gray-600 uppercase tracking-wider">
                                        {locale === "mm" ? "ဗီဒီယို Channels" : "Video Channels"}
                                    </h3>
                                </div>
                                <div className="space-y-1">
                                    {videoChannels.map(channel => (
                                        <button
                                            key={channel.id}
                                            className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-bold text-sm">{channel.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Creator Controls */}
                        {isOwner && (
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <h3 className="text-xs font-black text-gray-600 uppercase tracking-wider mb-3 px-2">
                                    {locale === "mm" ? "စီမံခန့်ခွဲမှု" : "Management"}
                                </h3>
                                <button
                                    onClick={() => {
                                        setNewChannelType('TEXT');
                                        setIsAddChannelOpen(true);
                                    }}
                                    className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span className="font-bold text-sm">Add Channel</span>
                                </button>
                                <button className="w-full px-3 py-2 rounded-lg flex items-center gap-2 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-bold text-sm">Settings</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-white">
                    {selectedChannel ? (
                        selectedChannel.type === 'TEXT' ? (
                            <CommunityChat
                                communityId={community.id}
                                channelId={selectedChannel.id}
                                channelName={selectedChannel.name}
                            />
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <svg className="w-20 h-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        {selectedChannel.type === 'VOICE' ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        )}
                                    </svg>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {selectedChannel.type === 'VOICE' ? 'Voice Channel' : 'Video Channel'}
                                    </h3>
                                    <p className="text-sm">
                                        {locale === "mm"
                                            ? "WebRTC integration လာမည်"
                                            : "WebRTC integration coming soon"}
                                    </p>
                                    <Button className="mt-4" disabled variant="outline">
                                        Join {selectedChannel.type === 'VOICE' ? 'Voice' : 'Video'} (Soon)
                                    </Button>
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {locale === "mm" ? "Channel ရွေးချယ်ပါ" : "Select a channel"}
                                </h3>
                                <p className="text-sm">
                                    {locale === "mm"
                                        ? "စတင်ရန် ဘယ်ဘက်မှ channel တစ်ခု ရွေးချယ်ပါ"
                                        : "Choose a channel from the sidebar to get started"}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Channel Modal */}
            {isAddChannelOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-md p-6 bg-white border-gray-200">
                        <h2 className="text-xl font-black text-gray-900 mb-6">Create New Channel</h2>
                        <form onSubmit={handleAddChannel}>
                            <div className="mb-4">
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Channel Type
                                </label>
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    {(['TEXT', 'VOICE', 'VIDEO'] as const).map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setNewChannelType(type)}
                                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${newChannelType === type
                                                ? 'bg-gold-500 text-gray-900 shadow-md'
                                                : 'text-gray-400 hover:text-white'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-300 mb-2">
                                    Channel Name
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">#</span>
                                    <input
                                        type="text"
                                        value={newChannelName}
                                        onChange={(e) => setNewChannelName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                        className="w-full bg-gray-700 text-white placeholder-gray-500 rounded-lg py-2.5 pl-8 pr-4 border border-gray-600 focus:outline-none focus:border-gold-500"
                                        placeholder="new-channel"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsAddChannelOpen(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white font-bold text-sm"
                                >
                                    Cancel
                                </button>
                                <Button type="submit" disabled={!newChannelName.trim()}>
                                    Create Channel
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
