import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"


const UserDetails = () => {
  return (
    
          <div className="flex h-full flex-col">

    <Tabs defaultValue="details" className="">
    <div className="flex items-center p-1">
    <TabsList className="flex justify-normal w-full overflow-x-auto no-scrollbar bg-white">              
        <div  className="flex items-start space-x-2">
            <TabsTrigger value="details" className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground  text-sm font-medium">
                Details
            </TabsTrigger>
            <TabsTrigger value="copilot" className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground  text-sm font-medium">
                Copilot
            </TabsTrigger>
        </div>
        </TabsList>
        </div>

      <Separator />
      <TabsContent value="details" className="overflow-auto p-4 space-y-4">


        <div className="flex justify-between space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Assignee</p>
          <p className="text-sm font-medium ">👤 Rajesh Dayalan</p>
        </div>

        <div className="space-y-1 flex justify-between ">
          <p className="text-sm font-medium text-muted-foreground">Team Inbox</p>
          <p className="text-sm font-medium ">👥 Unassigned</p>
        </div>

        <Accordion type="multiple" className="w-full">
          <AccordionItem value="ticket-attributes">
            <AccordionTrigger className="text-sm font-medium ">
              🧾 Ticket attributes
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Ticket type</span>
                <span>🎫 Support Request</span>
              </div>
              <div className="flex justify-between">
                <span>Submission date</span>
                <span>Mar 25, 2025</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Platforms</span>
                <span className="cursor-pointer">+ Add</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Root cause</span>
                <span className="cursor-pointer">+ Add</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="links">
            <AccordionTrigger>🔗 Links</AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              {["Tracker ticket", "Back-office tickets", "Side conversations"].map((label) => (
                <div key={label} className="flex justify-between items-center">
                  <span>{label}</span>
                  <Plus className="w-4 h-4 cursor-pointer text-muted-foreground" />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shopify">
            <AccordionTrigger>🛍️ Shopify</AccordionTrigger>
            <AccordionContent>
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="customer" className="p-2 text-sm">Customer Info...</TabsContent>
                <TabsContent value="products" className="p-2 text-sm">Product Info...</TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ticket-attributes">
            <AccordionTrigger className="text-sm font-medium ">
              🧾 Ticket attributes
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Ticket type</span>
                <span>🎫 Support Request</span>
              </div>
              <div className="flex justify-between">
                <span>Submission date</span>
                <span>Mar 25, 2025</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Platforms</span>
                <span className="cursor-pointer">+ Add</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Root cause</span>
                <span className="cursor-pointer">+ Add</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="links">
            <AccordionTrigger>🔗 Links</AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              {["Tracker ticket", "Back-office tickets", "Side conversations"].map((label) => (
                <div key={label} className="flex justify-between items-center">
                  <span>{label}</span>
                  <Plus className="w-4 h-4 cursor-pointer text-muted-foreground" />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shopify">
            <AccordionTrigger>🛍️ Shopify</AccordionTrigger>
            <AccordionContent>
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="customer" className="p-2 text-sm">Customer Info...</TabsContent>
                <TabsContent value="products" className="p-2 text-sm">Product Info...</TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="ticket-attributes">
            <AccordionTrigger className="text-sm font-medium ">
              🧾 Ticket attributes
            </AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Ticket type</span>
                <span>🎫 Support Request</span>
              </div>
              <div className="flex justify-between">
                <span>Submission date</span>
                <span>Mar 25, 2025</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Platforms</span>
                <span className="cursor-pointer">+ Add</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Root cause</span>
                <span className="cursor-pointer">+ Add</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="links">
            <AccordionTrigger>🔗 Links</AccordionTrigger>
            <AccordionContent className="space-y-2 text-sm">
              {["Tracker ticket", "Back-office tickets", "Side conversations"].map((label) => (
                <div key={label} className="flex justify-between items-center">
                  <span>{label}</span>
                  <Plus className="w-4 h-4 cursor-pointer text-muted-foreground" />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="shopify">
            <AccordionTrigger>🛍️ Shopify</AccordionTrigger>
            <AccordionContent>
              <Tabs defaultValue="customer" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="products">Products</TabsTrigger>
                </TabsList>
                <TabsContent value="customer" className="p-2 text-sm">Customer Info...</TabsContent>
                <TabsContent value="products" className="p-2 text-sm">Product Info...</TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>

        </Accordion>


      </TabsContent>

      <TabsContent value="copilot" className="p-4">
        <p className="text-sm text-muted-foreground">Copilot tab content here</p>
      </TabsContent>
    </Tabs>
    </div>
    


  )
}

export default UserDetails