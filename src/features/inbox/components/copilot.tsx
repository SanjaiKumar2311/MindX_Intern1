import { Button } from "@/components/ui/button";
import { sendTestMessage } from "@/features/chatbot/service/chatService";
import { Message } from "@/features/chatbot/types/chat";
import { useState } from "react";

const Copilot = () => {
  const [input, setInput] = useState("");
  const [copilotMessages, setCopilotMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);


    const sendMessage = async () => {
      if (!input.trim()) return;
  
      setLoading(true);
      const userMessage: Message = {
        session_id: "null",
        message: input,
        model: "gpt-4o",
        role: "user",
      };
      setCopilotMessages((prev) => [...prev, userMessage]);
      setInput("");
  
      try {
        const data = await sendTestMessage(userMessage);
        console.log("Data", data);
  
        const botMessage: Message = {
          role: "bot",
          message: data.data.message || "Sorry, I didn't understand that.",
          session_id: "null",
          model: "gpt-4o",
        };
  
        setCopilotMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        const botMessage: Message = {
          role: "bot",
          message: "Error reaching server. Please try again later.",
          session_id: "null",
          model: "gpt-4o",
        };
        setCopilotMessages((prev) => [...prev, botMessage]);
      } finally{
        setLoading(false);
      }
    };
  

  return (
    <div>
      <div className="p-4 flex flex-col h-[80vh]">
        <div className="flex-1 overflow-y-auto space-y-4">
          {copilotMessages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                msg.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "mr-auto bg-muted text-muted-foreground"
              }`}
            >
              {msg.message}
            </div>
          ))}
          {loading && (
            <div className="mr-auto text-sm text-muted-foreground">
              Thinking...
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-lg p-2 text-sm"
            placeholder="Ask your copilot..."
            disabled={loading}
          />
          <Button
            // onClick={() => askCopilot(input)}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Copilot;
