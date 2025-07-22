import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import ChatHeader from "./chat-header";
import { motion } from "framer-motion";
import ChatInput from "./chat-input";
import ChatMessage from "./chat-message";
import { Message } from "../types/chat";
import { useState } from "react";
import { sendTestMessage } from "../service/chatService";

interface ChatWindowsProps {
  onClose: () => void;
  botName: string;
  messages: Message[];
  primaryColor: string;
}

const ChatWindow = ({
  onClose,
  botName,
  messages: initialMessages,
  primaryColor,
}: ChatWindowsProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      session_id: "null",
      message: inputValue,
      model: "gpt-4o",
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const data = await sendTestMessage(userMessage);
      console.log("Data", data);

      const botMessage: Message = {
        role: "bot",
        message: data.data.message || "Sorry, I didn't understand that.",
        session_id: "null",
        model: "gpt-4o",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const botMessage: Message = {
        role: "bot",
        message: "Error reaching server. Please try again later.",
        session_id: "null",
        model: "gpt-4o",
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <Card className="rounded-4xl py-0 gap-1 w-80">
        <CardHeader className="p-4 flex justify-between items-center border-b [.border-b]:pb-2">
          <ChatHeader onClose={onClose} botName={botName} />
        </CardHeader>

        <CardContent className=" px-3 h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg}
              primaryColor={primaryColor}
            />
          ))}
        </CardContent>

        <CardFooter className="p-2 border-t flex flex-col items-center [.border-t]:pt-2">
          <ChatInput
            primaryColor={primaryColor}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSend={sendMessage}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ChatWindow;
