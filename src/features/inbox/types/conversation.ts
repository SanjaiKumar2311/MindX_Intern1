export interface Conversation {
  id: string;
  title: string;
  status: string;
  handlerType: string;
  customer: Customer;
  user: User;  
  messages: Message[];  
  aiAgent: AiAgent;
  assigned: boolean;
  muteAIAgent: boolean;
  customerId: string;
  assignedAgentId: string;
}

export interface AiAgent {
	name: string;
	img_url: string;
}

export interface ConversationSummary {
  id: string;  
  status: string;
  handlerType: string;
  customer: Customer;
  user: User;
  lastMessageContent: string;
  lastMessageAt: string;  
}

export interface Message {
 id?: string;
 conversationId: string | null;
 content: string;
 senderType: string;
 seen?: boolean;
 sendAt: string;
 user?: User;
 customer?: Customer;
 senderId: string | null |undefined;
}

export interface MessageInput {
 
 conversationId: string | null;
 content: string;
 senderType: string;
 senderId: string | null |undefined;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

export interface GetConversationsParams {
  	 isAssigned?: boolean;
	sortOrder?: "asc" | "desc";
	sortColumn?: string;
	pageNo?: number;
	pageSize?: number;
	[key: string]: any; // allow future dynamic filters (like `status`, `search`, etc.)
}