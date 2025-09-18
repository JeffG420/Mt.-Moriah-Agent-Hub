export type UserRole = 'Agent' | 'Manager' | 'Admin' | 'Superadmin';

export interface User {
  agentId: string;
  name: string;
  location: string;
  contact: string;
  email: string;
  role: UserRole;
  team: string;
  joinDate: string; // YYYY-MM-DD
  avatarUrl: string;
  password?: string; // Added for login validation, optional to avoid storing it in localStorage
  stats: {
    lotsSold: number;
    recruits: number;
    sqmSold: number;
    tenureMonths: number;
    commissionEarned: number;
  };
}

// Messaging System Types
export type MessageStatus = 'sent' | 'delivered' | 'read';
export type AttachmentType = 'image' | 'pdf';

export interface Attachment {
    type: AttachmentType;
    url: string; // For images, this could be a base64 data URL for preview
    name: string;
}

export interface Message {
    id: string;
    senderId: string;
    text?: string;
    attachment?: Attachment;
    timestamp: string;
    status: MessageStatus;
}

export interface Conversation {
    id: string;
    participants: string[]; // array of agentIds
    messages: Message[];
}

// AI Assistant Types
export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    content: string;
}