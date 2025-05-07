export interface MessageI {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface ConversationI {
  id: string;
  title: string;
  createdAt: Date;
  messages: MessageI[];
}
