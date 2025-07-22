import { Button } from "@/components/ui/button";
import { MessageSquare, RefreshCw, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
  botName: string;
}
const ChatHeader = ({ botName, onClose }: ChatHeaderProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <MessageSquare size={20} />
        <span className="font-semibold">{botName ? botName :"MindX Bot Assistant"}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" className="">
          <RefreshCw size={18} />
        </Button>
        <Button variant="ghost" className="" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
    </>
  );
};

export default ChatHeader;
