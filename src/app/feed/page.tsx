"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth } from "@/contexts/AuthContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { feedService, challengeService } from "@/lib/api/services";
import { useRouter } from "next/navigation";

export default function FeedPage() {
    const { locale } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<"all" | "challenges" | "posts">("all");
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);

    // Data states
    const [posts, setPosts] = useState<any[]>([]);
    const [challenges, setChallenges] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Submission states
    const [selectedChallenge, setSelectedChallenge] = useState<any>(null);
    const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
    const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);
    const [submissionContent, setSubmissionContent] = useState("");

    // Post creation states
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostFiles, setNewPostFiles] = useState<File[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [feedRes, challengesRes] = await Promise.all([
                feedService.getFeed(),
                challengeService.getChallenges({ status: 'ACTIVE' })
            ]);

            if (feedRes.success) {
                setPosts(feedRes.data || []);
            }
            if (challengesRes.success) {
                setChallenges(challengesRes.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch feed data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = async () => {
        if (!newPostContent && newPostFiles.length === 0) return;

        try {
            const formData = new FormData();
            formData.append('content', newPostContent);
            newPostFiles.forEach((file) => {
                formData.append('files', file);
            });

            const res: any = await feedService.createPost(formData);
            if (res.success) {
                setPosts([res.data, ...posts]);
                setNewPostContent("");
                setNewPostFiles([]);
                setIsPostModalOpen(false);
            }
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFiles: (files: File[]) => void) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFiles(files); // Simplified: replace files instead of append for now
        }
    };

    const handleSubmitChallenge = async () => {
        if (!selectedChallenge) return;

        try {
            const formData = new FormData();
            formData.append('content', submissionContent);
            submissionFiles.forEach((file) => {
                formData.append('files', file);
            });

            await challengeService.submitChallenge(selectedChallenge.id, formData);

            setSubmissionContent("");
            setSubmissionFiles([]);
            setIsSubmissionModalOpen(false);
            setSelectedChallenge(null);
            alert("Submission successful! ✅");
        } catch (error) {
            console.error("Failed to submit challenge:", error);
            alert("Failed to submit challenge");
        }
    };

    const handleLike = async (postId: string) => {
        if (!isAuthenticated) return;

        // Optimistic update
        setPosts(posts.map(p => {
            if (p.id === postId) {
                return {
                    ...p,
                    liked: !p.liked,
                    _count: {
                        ...p._count,
                        likes: p.liked ? p._count.likes - 1 : p._count.likes + 1
                    }
                };
            }
            return p;
        }));

        try {
            await feedService.toggleLike(postId);
        } catch (error) {
            console.error("Failed to like post:", error);
            fetchData(); // Revert on error
        }
    };

    return (
        <div className="min-h-screen bg-cream-100 pb-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gold-500 to-coral-500 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-6xl font-black font-outfit tracking-tighter mb-4">
                        {locale === "mm" ? "သတင်းများ" : "Your Feed"}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl">
                        {locale === "mm"
                            ? "အသိုင်းအဝိုင်းတစ်ခုလုံးမှ နောက်ဆုံးပေါ် အကြောင်းအရာများနှင့် စိန်ခေါ်မှုများကို ကြည့်ရှုပါ"
                            : "Stay updated with the latest posts and challenges from the community"}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Feed Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Create Post Card */}
                        {isAuthenticated && (
                            <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setIsPostModalOpen(true)}>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-coral-500 flex items-center justify-center text-white font-black text-lg">
                                        {user?.name?.[0] || user?.username?.[0] || "U"}
                                    </div>
                                    <div className="flex-1 px-6 py-3 bg-gray-100 rounded-full text-gray-500">
                                        {locale === "mm" ? "သင့်အကြောင်း ဝေမျှပါ..." : "What's on your mind?"}
                                    </div>
                                </div>
                            </Card>
                        )}

                        {/* Tab Filters */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            <button onClick={() => setSelectedTab("all")} className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap ${selectedTab === "all" ? "bg-gradient-to-br from-gold-500 to-coral-500 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>{locale === "mm" ? "အားလုံး" : "All"}</button>
                            <button onClick={() => setSelectedTab("challenges")} className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap ${selectedTab === "challenges" ? "bg-gradient-to-br from-gold-500 to-coral-500 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>{locale === "mm" ? "စိန်ခေါ်မှုများ" : "Challenges"}</button>
                            <button onClick={() => setSelectedTab("posts")} className={`px-6 py-3 rounded-2xl text-sm font-black uppercase tracking-wider transition-all whitespace-nowrap ${selectedTab === "posts" ? "bg-gradient-to-br from-gold-500 to-coral-500 text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-50"}`}>{locale === "mm" ? "ပို့စ်များ" : "Posts"}</button>
                        </div>

                        {/* Feed Content */}
                        {isLoading ? (
                            <div className="text-center py-12">Loading feed...</div>
                        ) : (
                            <div className="space-y-6">
                                {/* Challenges Section */}
                                {(selectedTab === "all" || selectedTab === "challenges") && challenges.length > 0 && (
                                    <>
                                        <h2 className="text-xl font-bold text-gray-800 px-2">{locale === "mm" ? "လက်ရှိ စိန်ခေါ်မှုများ" : "Active Challenges"}</h2>
                                        {challenges.map((challenge) => (
                                            <Card key={challenge.id} className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-gold-100">
                                                <div className="p-6 space-y-4">
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                                {challenge.creator?.fullName?.[0] || "C"}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-gray-900">{challenge.creator?.fullName}</h3>
                                                                <p className="text-xs text-gray-500">{new Date(challenge.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-bold uppercase">
                                                            {challenge.category || "Challenge"}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-2xl font-black text-gray-900 mb-2">{locale === "mm" ? challenge.titleMm || challenge.title : challenge.title}</h3>
                                                        <p className="text-gray-700">{locale === "mm" ? challenge.descriptionMm || challenge.description : challenge.description}</p>
                                                    </div>

                                                    <div className="flex gap-4 text-sm text-gray-600">
                                                        <span className="font-medium text-gold-600">🏆 {locale === "mm" ? challenge.prizeMm || challenge.prize : challenge.prize}</span>
                                                        <span>📅 Due: {new Date(challenge.deadline).toLocaleDateString()}</span>
                                                        <span>👥 {challenge._count?.submissions || 0} participants</span>
                                                    </div>

                                                    <div className="pt-4 flex gap-3">
                                                        <Button
                                                            onClick={() => {
                                                                setSelectedChallenge(challenge);
                                                                setIsSubmissionModalOpen(true);
                                                            }}
                                                            disabled={!isAuthenticated}
                                                            className="flex-1"
                                                        >
                                                            {locale === "mm" ? "ယှဉ်ပြိုင်မည်" : "Submit Entry"}
                                                        </Button>
                                                        <Button variant="outline" className="flex-1" onClick={() => router.push(`/challenges/${challenge.id}`)}>
                                                            More Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </>
                                )}

                                {/* Posts Section */}
                                {(selectedTab === "all" || selectedTab === "posts") && posts.map((post) => (
                                    <Card key={post.id} className={`p-6 ${post.type === 'PROMOTION' ? 'border-2 border-purple-100 bg-purple-50/30' : ''}`}>
                                        <div className="flex justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                                    {post.user?.avatar ? (
                                                        <img src={post.user.avatar} alt="avatar" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="font-bold text-gray-500">{post.user?.username?.[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                                        {post.user?.fullName}
                                                        {post.user?.verified && <span className="text-blue-500">✓</span>}
                                                    </h3>
                                                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            {post.type === 'PROMOTION' && (
                                                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded font-bold uppercase tracking-wider">
                                                    Promoted
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-800 mb-4 whitespace-pre-wrap">{locale === 'mm' ? post.contentMm || post.content : post.content}</p>

                                        {/* Post Media rendering could go here */}

                                        {/* Promo Link */}
                                        {post.promotedCommunityId && (
                                            <div className="mb-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                                <p className="text-sm text-gray-500 mb-1">Promoting Community:</p>
                                                <Link href={`/communities/${post.promotedCommunityId}`} className="font-bold text-blue-600 hover:underline">
                                                    View Community →
                                                </Link>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-gray-500">
                                            <button
                                                onClick={() => handleLike(post.id)}
                                                className={`flex items-center gap-2 hover:text-red-500 transition-colors ${post.liked ? 'text-red-500 font-bold' : ''}`}
                                            >
                                                <span>{post.liked ? '❤️' : '🤍'}</span>
                                                <span>{post._count?.likes || 0}</span>
                                            </button>
                                            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                                                <span>💬</span>
                                                <span>{post._count?.comments || 0}</span>
                                            </button>
                                        </div>
                                    </Card>
                                ))}

                                {posts.length === 0 && challenges.length === 0 && (
                                    <div className="text-center py-12 text-gray-500">
                                        No updates yet. Be the first to post!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Keep static trending for now */}
                    <div className="hidden lg:block lg:col-span-1 space-y-6">
                        <Card className="p-6">
                            <h3 className="text-lg font-black text-gray-900 font-outfit mb-4">
                                {locale === "mm" ? "လူကြိုက်များသော အကြောင်းအရာများ" : "Trending Topics"}
                            </h3>
                            <div className="space-y-3">
                                {["#WebDevelopment", "#MyanmarTech", "#DesignChallenge", "#CodeNewbie", "#CareerTips"].map((tag) => (
                                    <button
                                        key={tag}
                                        className="block w-full text-left px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <div className="text-sm font-black text-blue-600 group-hover:text-blue-700">{tag}</div>
                                        <div className="text-xs text-gray-500">{Math.floor(Math.random() * 500) + 100} posts</div>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Create Post Modal */}
            {isPostModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-lg p-6">
                        <h2 className="text-2xl font-black mb-4">{locale === "mm" ? "ပို့စ်တင်ရန်" : "Create Post"}</h2>
                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            className="w-full h-32 p-4 border rounded-xl mb-4 focus:ring-2 ring-gold-500 outline-none"
                            placeholder={locale === "mm" ? "ဘာတွေ တွေးနေလဲ..." : "What's on your mind?"}
                        />
                        {/* Simple file input */}
                        <input type="file" multiple onChange={(e) => handleFileChange(e, setNewPostFiles)} className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsPostModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreatePost} disabled={!newPostContent && newPostFiles.length === 0}>Post</Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* Submission Modal */}
            {isSubmissionModalOpen && selectedChallenge && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <Card className="w-full max-w-lg p-6">
                        <h2 className="text-2xl font-black mb-1">{locale === "mm" ? "တင်သွင်းရန်" : "Submit Entry"}</h2>
                        <p className="text-gray-500 text-sm mb-4">for {selectedChallenge.title}</p>

                        <textarea
                            value={submissionContent}
                            onChange={(e) => setSubmissionContent(e.target.value)}
                            className="w-full h-32 p-4 border rounded-xl mb-4 focus:ring-2 ring-gold-500 outline-none"
                            placeholder="Describe your submission..."
                        />

                        <input type="file" multiple onChange={(e) => handleFileChange(e, setSubmissionFiles)} className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" onClick={() => setIsSubmissionModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmitChallenge} disabled={!submissionContent && submissionFiles.length === 0}>Submit</Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
