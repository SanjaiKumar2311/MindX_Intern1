
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Accordion,AccordionItem,AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import AddContent from "./add-content";
import AskAssistAgent from "./ask-assist-agent";
import Channels from "./channels";

import SetAiAgent from "./set-ai-agent";
import InviteTeammates from "./invite-teammates";

const Task = () => {
  const tabs = [
    { label: "Set up live Chat with Messenger", value: "general", content: <Channels /> },
    { label: "Add and Configure your Team", value: "chat-window", content: <InviteTeammates /> },
    { label: "Build your knowledge base", value: "chat-button", content: <AddContent/> },
    { label: "Set Up AI Agent", value: "fallback-message", content: <SetAiAgent/> },
    { label: "Ask Assist Agent", value: "fallback-message", content: <AskAssistAgent/> },
  ];
  return (
        <>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-start">
            <div>
              <CardTitle>Get started with Fin</CardTitle>
              <CardDescription>
                Set up and deploy Fin in less than an hour. Fin will automatically adapt to zendesk, follow your assignment rules, and hand off to your team.
              </CardDescription>
            </div>
            {/* <div className="flex gap-2"> */}
              {/* <Button size="sm" onClick={handleSubmit}>Save draft</Button> */}
              {/* <Button size="sm">Set live</Button> */}
            {/* </div> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <Accordion type="single" collapsible className="w-full">
        {tabs.map((tab, index) => (
          <AccordionItem value={tab.value} key={index}>
            <AccordionTrigger>{tab.label}</AccordionTrigger>
            <AccordionContent>{tab.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex justify-center items-center">
        <img
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Persona preview"
          className="max-w-full h-[300px] rounded-xl shadow-md"
        />
      </div>
    </div>
        </CardContent>
        
        <CardFooter>
          {/* <Button onClick={handleNextStep}>Next Step</Button> */}
        </CardFooter>
      </Card>
    </>
  )
}

export default Task