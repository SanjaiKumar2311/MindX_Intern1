import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendHorizontal } from "lucide-react"

interface ChatInputProps {
    primaryColor: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
}

const ChatInput = ({primaryColor, value, onChange, onSend}:ChatInputProps) => {

      const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
                  <>
        <div className="flex items-center gap-2 mb-2 w-full">
          <Input 
            type="text" 
            placeholder="Ask me anything..." 
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border border-gray-300 rounded-lg" 
        />
          <Button className="bg-green-600 text-white"
          style={{backgroundColor:primaryColor || '#16a34a'}}
          onClick={onSend}
          >
            <SendHorizontal />
            </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2">Powered by <span className="font-bold text-gray-500">MindX</span></p>
      </>
  )
}

export default ChatInput