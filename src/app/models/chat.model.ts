export interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}
