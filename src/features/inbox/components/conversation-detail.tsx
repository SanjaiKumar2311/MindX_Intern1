import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import { Archive, ArchiveX, MoreVertical, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Conversation, Message, MessageInput } from "../types/conversation";
import { useEffect, useRef, useState } from "react";
import { getConversation, sendUserMessage} from "../services/conversation-service";
import { useChat } from "../context/chat-context";
import { format, parseISO } from "date-fns";

const ConversationDetial = () => {

    const { conversationId } = useChat();    
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const isSubscribedRef = useRef(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const connectWebSocket = (convId: string) => {
        console.log("conversation id",convId);
        
        console.log("Connect WebSocket method called");
        if (isSubscribedRef.current) {
        console.log("Already subscribed — skipping");
        return;
        }
        // const sock = new SockJS("http://localhost:8080/ws-chat");
        const client = new Client({
        webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),
        reconnectDelay: 5000,
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        onConnect: () => {
            console.log("WebSocket connected");
            console.log(convId);
            
            client.subscribe(`/topic/room/${convId}`, (message) => {
            console.log("Received via WebSocket :", message);
            console.log("Received via WebSocket Message:", message.body);
            // console.log("Message",message.body);
            
            const msg: Message = JSON.parse(message.body);
            setMessages((prev) => [...prev, msg]);
            });

            isSubscribedRef.current = true; // mark as subscribed
            setStompClient(client);
        },
        onDisconnect: () => {
            console.warn("websocker disconnected");            
        },
        onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers['message']);
            console.error("Additional details: " + frame.body);
        },
        connectHeaders: {
            "X-Tenant-Id": localStorage.getItem("tenantId") || "",
        },
        });

        client.activate();
    };

    const initializeConversation = async () => {
        if (conversationId) {
        setLoading(true);
        try {
            const res = await getConversation(conversationId);
            setConversation(res.data)
            console.log("Message", res);
            console.log("Message 1", res.data.messages);

            setMessages(res.data.messages);
            connectWebSocket(conversationId);
        } catch (error) {
            console.error("Failed to load conversation:", error);
        } finally {
            setLoading(false);
        }
        }
    };

    const sendMessage = async () => {
        if (!inputValue.trim()) return;

        const storedUserId = localStorage.getItem("userId"); // or "agentId", based on what you store
        // const senderId = user?.id || storedUserId;
        if (!storedUserId) {
            console.error("Cannot send message: senderId is missing (user ID not found)");
            return; // Prevent message from being sent
        }
        
        const userMessage: MessageInput = {
        content: inputValue,
        senderId: storedUserId,
        senderType: "AGENT",
        conversationId: conversationId,
        };
        try {
        const response = await sendUserMessage(userMessage);
        console.log("res", response);
        if (!conversationId && response.conversationId) {
            connectWebSocket(response.conversationId);
        }
        setInputValue("");
        } catch (error) {
        setMessages((prev) => [
            ...prev,
            {
            content: "Error reaching server. Please try again later.",
            role: "agent",
            senderId: "",
            senderType: "AI_AGENT",
            conversationId: "",
            sendAt: new Date().toISOString(),
            },
        ]);
        console.error("Failed to send message:", error);
        }
    };

    useEffect(() => {
        initializeConversation();
        return () => {
        stompClient?.deactivate();
        isSubscribedRef.current = false;
        };
    }, [conversationId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

  return (
        <div className="flex flex-col h-full">

            <div className="flex items-center p-2">

                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold">{conversation?.customer.firstName}</h1>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    {/* Archive */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!conversation}>
                            <Archive className="h-4 w-4" />
                            <span className="sr-only">Archive</span>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>Archive</TooltipContent>
                    </Tooltip>
                    {/* junk */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!conversation}>
                            <ArchiveX className="h-4 w-4" />
                            <span className="sr-only">Move to junk</span>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to junk</TooltipContent>
                    </Tooltip>
                    {/* delete */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!conversation}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Move to trash</span>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>Move to trash</TooltipContent>
                    </Tooltip>
                    {/* More */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" disabled={!conversation}>
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

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full p-4 space-y-3">
                <div className="flex-1 space-y-4  overflow-y-auto text-sm">
                    {loading ? (
                    <div className="text-sm text-muted-foreground text-center mt-10">
                        chat loading...
                    </div>
                    ) : messages && messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div
                        key={index}
                        className={`flex ${
                            msg.customer ? "justify-end" : "justify-start"
                        }`}
                        >
                        <div
                            className={`rounded-lg px-4 py-2 max-w-[75%] ${
                            msg.customer
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                        >
                            <div>{msg.content}</div>
                            <div className={`mt-1 text-[10px] text-right ${
                            msg.customer ? "text-white":"text-gray-400"} `}>
                            {format(parseISO(msg.sendAt), "hh:mm a")}
                            </div>
                        </div>
                        </div>
                    ))
                    ) : (
                    <div className="text-sm text-muted-foreground text-center mt-10">
                        No chat found.
                    </div>
                    )}
                       <div ref={bottomRef} />
                </div>
                </ScrollArea>
            </div>

            <Separator className="mt-auto" />

            <div className="p-4">
                
                <div className="grid gap-4">

                    <Textarea
                        className="p-4"
                        placeholder={`Reply ${conversation?.customer.firstName}...`}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />

                    <div className="flex items-center">
                        <Button onClick={sendMessage} size="sm" className="ml-auto">
                        Send
                        </Button>
                    </div>

                </div>

            </div>
        </div>
  );
};

export default ConversationDetial;
