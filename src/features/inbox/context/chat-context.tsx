import { createContext, ReactNode, useContext, useState } from "react";
import { Conversation } from "../types/conversation";

interface ChatContextType {
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
  conversation?: Conversation;
  
}


const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({children} : {children: ReactNode}) => {
    const [conversationId, setConversationId] = useState<string | null>(null);

    return (
        <ChatContext.Provider
        value={{conversationId, setConversationId}}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};