import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChat } from "../context/chat-context";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ConversationSummary } from "../types/conversation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { getConversations } from "../services/conversation-service";
import { useNavigate } from "react-router-dom";

const ConversationList = () => {

    const { conversationId,setConversationId } = useChat();
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [statusFilter, setStatusFilter] = useState<"assigned" | "unassigned" | "all">("all");
    const [loading, setLoading] = useState(true);
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const navigate = useNavigate();

    const fetchConversations = async (params: Record<string, any>) => {
        setLoading(true);
        try {
            const res = await getConversations(params);
            console.log(res);
            setConversations(res);
            if (res.length > 0) {      
                const selectedConversationId = res[0].id;  
                setConversationId(selectedConversationId);
                  navigate(`/inbox/${selectedConversationId}`);
            }
        } catch (error) {
            console.log("Failed to load conversation", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const queryParams: Record<string, any> = {
            pageNo: 0,
            pageSize: 20,
            sortColumn: "id",
            sortOrder,
        };

        // Only include isAssigned if it's assigned or unassigned
        if (statusFilter === "assigned") {
            queryParams.assigned = true;
        } else if (statusFilter === "unassigned") {
            queryParams.assigned = false;
        }
        // if "all" → skip isAssigned
        console.log("Param",queryParams);
        
        fetchConversations(queryParams);
    }, [sortOrder, statusFilter]);

    return (
        <div className="flex flex-col h-full">

            <div className="flex items-center p-2">
                {/* Heading */}
                <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">Inbox</h1>
                </div>

                <div className="ml-auto flex items-center gap-2">
                {/* More */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">More</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem>Mark as unread</DropdownMenuItem>
                    <DropdownMenuItem>Star thread</DropdownMenuItem>
                    <DropdownMenuItem>Add label</DropdownMenuItem>
                    <DropdownMenuItem>Mute thread</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>

            <Separator />

            <div className="bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">

                <div className="flex justify-between items-center">
                    {/* Left: Status Filter */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className="rounded-full text-sm px-3 py-1 h-8"
                        >
                            <span className="font-medium capitalize">{statusFilter}</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                            All
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("assigned")}>
                            Assigned
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("unassigned")}>
                            UnAssigned
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Right: Sort Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                    >
                        {sortOrder === "asc" ? (
                        <ArrowUp className="w-4 h-4" />
                        ) : (
                        <ArrowDown className="w-4 h-4" />
                        )}
                    </Button>
                </div>

            </div>

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-4 space-y-2">
                        {loading ? (
                            <div className="text-sm text-muted-foreground text-center mt-10">
                                Loading conversations...
                            </div>
                        ): conversations.length > 0 ? (
                                conversations.map((conv, index) => (
                                    <div
                                        key={index}
                                        onClick={() => { setConversationId(conv.id);navigate(`/inbox/${conv.id}`);}}
                                        className={`p-3 rounded-md cursor-pointer border hover:bg-muted ${
                                            conversationId === conv.id ? "bg-muted font-semibold" : ""
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {/* Avatar */}
                                            <Avatar className="h-8 w-8">
                                            <AvatarFallback>{conv.customer?.firstName?.charAt(0).toLocaleUpperCase() || "?"}</AvatarFallback>                                            
                                            </Avatar>

                                            {/* Name + Message + Bottom Right Time */}
                                            <div className="flex flex-1 flex-col min-w-0">
                                                {/* Name */}
                                                <span className="truncate font-medium text-sm text-foreground">
                                                    {conv.customer?.firstName}                                                
                                                </span>

                                                {/* Message preview + time row */}
                                                <div className="flex justify-between items-center mt-0.5">
                                                    <span className="truncate text-sm text-muted-foreground max-w-[180px] block">{conv.lastMessageContent}</span>
                                                    <span className="text-xs text-muted-foreground ml-3 shrink-0">
                                                        {formatDistanceToNow(parseISO(conv.lastMessageAt),{addSuffix: true})}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            ))
                        ) : (
                            <div className="text-sm text-muted-foreground text-center mt-10">
                                No Conversation found.
                            </div>
                        )}
                    
                    </div>
                </ScrollArea>
            </div>
        </div>
  );
};

export default ConversationList;
