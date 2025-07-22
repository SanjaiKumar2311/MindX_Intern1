import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@radix-ui/react-separator"
import { TabsContent } from "@radix-ui/react-tabs"
import MailList from "./mail-list"
import MailDisplay from "./mail-display"
import UserDetails from "./user-details"



const Inbox = () => {

  
  return (
<div className="flex-col md:flex w-full">
    {/* <div className=" w-full overflow-x-auto md:overflow-visible">
         <div className="min-w-[640px] max-w-full"> */}
            <ResizablePanelGroup direction="horizontal" className="h-full  items-stretch"// onLayout={[30,35,35]}
            >        
        <ResizablePanel defaultSize={35} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList/>
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList  />
            </TabsContent>
          </Tabs>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={40} minSize={30}>
          <MailDisplay />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25} minSize={20} maxSize={25}>
          {/* <MailDisplay /> */}
          <UserDetails/>
        </ResizablePanel>

      </ResizablePanelGroup>
      {/* </div>
    </div> */}
    </div>
  )
}

export default Inbox