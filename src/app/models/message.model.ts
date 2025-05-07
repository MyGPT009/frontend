export interface MessageI {
  id?: number;
  content: string;
  aiResponse?: string;
  createdAt?: string;
  updatedAt?: string;
  conversationId?: number;
  userId?: number;
}
