// ============================================
// User & Authentication Types
// ============================================
export type UserRole = 'CREATOR' | 'LEARNER';
export type SubscriptionPlan = 'CREATOR_MONTHLY' | 'CREATOR_YEARLY' | 'LEARNER_FREE';
export type PaymentMethod = 'KPAY' | 'WAVEPAY' | 'AYAPAY' | 'VISA';

export interface User {
  id: string;
  name: string; // Backend sends fullName as name or fullName
  username?: string; // Added
  email: string;
  role: UserRole;
  subscriptionPlan: SubscriptionPlan;
  subscriptionExpiry?: string;
  avatar?: string;
  verified?: boolean;
  createdAt: string;
}

// ============================================
// Community & Channel Types
// ============================================
export interface Channel {
  id: string;
  name: string;
  nameMm: string;
  type: 'TEXT' | 'VOICE' | 'VIDEO';
  description?: string;
  descriptionMm?: string;
  createdAt: string;
}

export interface CommunityPermission {
  userId: string;
  role: 'OWNER' | 'MODERATOR' | 'MEMBER';
  canManageChannels: boolean;
  canModerate: boolean;
}

export interface Community {
  id: string;
  name: string;
  nameMm: string;
  description: string;
  descriptionMm: string;
  members: number | any[]; // Allow array from API
  category: string;
  categoryMm?: string; // Optional from backend
  image?: string; // Frontend uses image
  avatar?: string; // Backend uses avatar
  tags?: string[];
  location?: string;
  locationMm?: string;
  // New fields for dual-role ecosystem
  creatorId: string;
  creatorName?: string;
  channels?: Channel[];
  entryFee?: number; // in MMK
  permissions?: CommunityPermission[];
  isPaid: boolean;
}

// ============================================
// Course Management Types
// ============================================
export interface Course {
  id: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  creatorId: string;
  creatorName: string;
  thumbnail: string;
  price: number; // in MMK
  modules: Module[];
  enrolledCount: number;
  rating: number;
  category: string;
  categoryMm: string;
  tags: string[];
  duration: number; // in hours
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  titleMm: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  titleMm: string;
  type: 'VIDEO' | 'DOCUMENT' | 'TEXT' | 'ASSIGNMENT';
  content: string; // URL for video/doc, or text content
  duration?: number; // in minutes
  order: number;
  completed?: boolean;
  assignmentDetails?: {
    instructions: string;
    maxScore: number;
    dueDate?: string;
  };
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLessonId: string;
  progress: number; // 0-100
  lastAccessedAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  userName: string;
  courseId: string;
  courseName: string;
  issuedDate: string;
  certificateUrl: string;
}

// ============================================
// Challenge Types
// ============================================
export interface Challenge {
  id: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  creatorId: string;
  creatorName: string;
  thumbnail: string;
  deadline: string;
  prize?: string;
  prizeMm?: string;
  submissions: ChallengeSubmission[];
  status: 'ACTIVE' | 'CLOSED' | 'JUDGING';
  category: string;
  categoryMm: string;
  createdAt: string;
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  attachments: string[];
  submittedAt: string;
  score?: number;
  feedback?: string;
}

// ============================================
// Legacy Types (kept for compatibility)
// ============================================
export interface Event {
  id: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  date: string;
  time: string;
  location: string;
  locationMm: string;
  type: "online" | "offline" | "hybrid";
  image: string;
  attendees: number;
}

export interface Resource {
  id: string;
  title: string;
  titleMm: string;
  description: string;
  descriptionMm: string;
  category: string;
  categoryMm: string;
  author: string;
  url: string;
  image: string;
  type: "article" | "video" | "course" | "tool";
}

export interface Job {
  id: string;
  title: string;
  titleMm: string;
  company: string;
  location: string;
  locationMm: string;
  type: "full-time" | "part-time" | "freelance" | "internship";
  typeMm: string;
  description: string;
  descriptionMm: string;
  salary?: string;
  postedDate: string;
  tags: string[];
}

// ============================================
// Chat Message Types
// ============================================
export interface ChatMessage {
  id: string;
  channelId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  attachments?: MessageAttachment[];
  timestamp: string;
  isMe: boolean;
}

export interface MessageAttachment {
  id: string;
  type: 'IMAGE' | 'VIDEO' | 'FILE';
  url: string;
  name: string;
  size?: number;
}
