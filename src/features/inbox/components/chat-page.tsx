import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {  useState } from "react";
import { cn } from "@/lib/utils";
import ConversationList from "./conversation-list";
import CustomerDetails from "./customer-details";
// import { getConversations } from "../services/conversation-service";
// import { useChat } from "../context/chat-context";
import ConversationDetial from "./conversation-detail";

export default function ChatPage() {
  const [activePanel, ] = useState<"users" | "chat" | "details">(
    "users"
  );
  



  return (
    <div className=" h-[calc(100vh-48px)] w-full">
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full  w-[900px] md:w-full"
      >
        {/* User List */}
        <ResizablePanel
          defaultSize={25}
          minSize={25}
          maxSize={30}
          className={cn(
            "flex flex-col border-r",
            "md:block", // always show on desktop
            activePanel !== "users" && "hidden" // hide if not active on mobile
          )}
        >
          <div className="flex flex-col h-full">
            <ConversationList  />
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Chat Window */}
        <ResizablePanel
          defaultSize={50}
          minSize={40}
          className={cn(
            "flex flex-col",
            "md:block",
            activePanel !== "chat" && "hidden"
          )}
        >
          <ConversationDetial/>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* User Details */}
        <ResizablePanel
          defaultSize={30}
          minSize={20}
          maxSize={35}
          className={cn(
            "flex flex-col border-l",
            "md:block",
            activePanel !== "details" && "hidden"
          )}
        >
          <CustomerDetails  />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
