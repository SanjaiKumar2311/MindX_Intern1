import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useUserService } from "@/features/users/service/usersService";
import { assignConversation, getConversation } from "../services/conversation-service";
import { Conversation } from "../types/conversation";
import { useParams } from "react-router-dom";
import Copilot from "./copilot";

const CustomerDetails = () => {
    
    const { conversationId } = useParams<string>();
    const [users, setUsers] = useState<{ id: string; firstName: string; lastName: string }[]>([]);
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [assigneeId, setAssigneeId] = useState<string | null>(null);
    const { getAllUser } = useUserService();
    const [activeTab, setActiveTab] = useState("details");

    const handleAssign = async (userId: string, conversationId: string) => {
        try {
        if (conversationId !== null) {
            const { data } = await assignConversation(conversationId, userId);
            console.log("Data:", data);
            fetchConversation(conversationId);
        }
        } catch (err) {
        console.error("Error fetching users", err);
        }
    };

    const fetchUsers = async (params: Record<string, string | number | boolean>) => {
        try {
            const { content } = await getAllUser(params);
            console.log("Data:", content);
            setUsers(content ?? []);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    useEffect(() => {
        const params = {
            pageSize: 100, // or whatever max number of users you want
            pageNo: 0,
            sortColumn: "id",
            sortOrder: "asc",
        };
        fetchUsers(params);
    }, []);

    const fetchConversation = async (id: string) => {
                   
        try {
            const res = await getConversation(id);
            console.log("Message Data", res);
            console.log("User Data", res.data.user?.id);
            setConversation(res.data);
            console.log(conversation);
            
            setAssigneeId(res.data.user?.id);
            console.log("Message ", res);
        } catch (error) {
            console.error("Failed to load conversation:", error);
        } 
        
    };

    useEffect(() => {
          if (!conversationId) {
    setConversation(null); // clear previous conversation
    return;
  }
        fetchConversation(conversationId);
    }, [conversationId]);

  return (
        <div className="flex h-full flex-col">
            <Tabs className="" value={activeTab} onValueChange={setActiveTab}>

                <div className="flex items-center p-1">

                <TabsList className="flex justify-normal w-full overflow-x-auto no-scrollbar bg-white">
                    <div className="flex items-start space-x-2">
                    <TabsTrigger
                        value="details"
                        className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground  text-sm font-medium"
                    >
                        Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="copilot"
                        className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground  text-sm font-medium"
                    >
                        Copilot
                    </TabsTrigger>
                    </div>
                </TabsList>

                </div>

                <Separator />

                <ScrollArea className="h-screen">
                    <TabsContent value="details" className="overflow-auto p-4 space-y-4">
                        <div className="flex justify-between space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">
                            Assignee
                        </p>
                        <Select
                            onValueChange={(value) => {
                                if (conversationId) {
                                    handleAssign(value, conversationId);
                                } else {
                                    console.error("No conversationId found for assigning");
                                }
                            }}
                            value={assigneeId ?? ""}
                        >
                            <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="unassigned" />
                            </SelectTrigger>
                            <SelectContent>
                            {users.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                👤 {user.firstName}
                                {user.lastName}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                        </div>

                        <Accordion type="multiple" className="w-full">
                        <AccordionItem value="lead_data">
                            <AccordionTrigger>Lead data</AccordionTrigger>
                            <AccordionContent className="space-y-2 text-sm">
                            {[
                                "Name",
                                "Company",
                                "Type",
                                "Location",
                                "Owner",
                                "Email",
                                "User id",
                            ].map((label) => (
                                <div
                                key={label}
                                className="flex justify-between items-center"
                                >
                                <span>{label}</span>
                                <Plus className="w-4 h-4 cursor-pointer text-muted-foreground" />
                                {/* Nandha */}
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                        </Accordion>
                    </TabsContent>
                    
                    <TabsContent value="copilot" className="p-4">
                        <p className="text-sm text-muted-foreground">
                            Copilot tab content here
                        </p>
                        <Copilot/>
                    </TabsContent>

                </ScrollArea>


            </Tabs>
        </div>
  );
};

export default CustomerDetails;
