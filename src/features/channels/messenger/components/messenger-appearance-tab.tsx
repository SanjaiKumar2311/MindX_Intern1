import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const General: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="agentName">Agent Name</Label>
        <Input
          id="agentName"
          name="agentName"
          // value={form.agentName}
          // onChange={onChange}
          defaultValue={"MindXAI"}
          placeholder="Agent name"
        />
        {/* {fieldErrors.agentName && (<p className="text-sm text-red-500">{fieldErrors.agentName}</p>)} */}
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            // checked={form.allowEmoji}
            // onCheckedChange={(checked) => onChange("allowEmoji", checked)}
          />
          <Label htmlFor="airplane-mode">Description</Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            // checked={form.allowEmoji}
            // onCheckedChange={(checked) => onChange("allowEmoji", checked)}
          />
          <Label htmlFor="airplane-mode">Enable sound by default</Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            // checked={form.allowEmoji}
            // onCheckedChange={(checked) => onChange("allowEmoji", checked)}
          />
          <Label htmlFor="airplane-mode">
            Allow customers to email transcript
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            // checked={form.allowEmoji}
            // onCheckedChange={(checked) => onChange("allowEmoji", checked)}
          />
          <Label htmlFor="airplane-mode">
            Allow customers to download transcript
          </Label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          // value={form.companyName}
          // onChange={onChange}
          placeholder="Company name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyDescription">Company Description</Label>
        <Textarea
          id="companyDescription"
          name="companyDescription"
          // value={form.companyDescription}
          // onChange={onChange}
          className="resize-none"
          placeholder="Describe your company's products and services"
        />
      </div>
    </div>
  );
};

const ChatWindow: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="agentName">Action color</Label>
        <div className="flex items-center gap-3">
          <Input
            id="accentColor"
            name="accentColor"
            type="color"
            // value={color}
            // onChange={(e) => setColor(e.target.value)}
            className="w-7 h-7 p-0 border border-input rounded"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm ">{"#QOf2ff"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="agentName">Background color</Label>
        <div className="flex items-center gap-3">
          <Input
            id="accentColor"
            name="accentColor"
            type="color"
            // value={color}
            // onChange={(e) => setColor(e.target.value)}
            className="w-7 h-7 p-0 border border-input rounded"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm font-">{"color"}</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Theme</Label>
        <Select
        // value={form.messageLength} onValueChange={(val) => onChange("messageLength", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a message length"
              defaultValue={"Normal"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Light</SelectItem>
            <SelectItem value="Concise">Dark</SelectItem>
            <SelectItem value="Concise">Default</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Text Size</Label>
        <Select
        // value={form.messageLength} onValueChange={(val) => onChange("messageLength", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a message length"
              defaultValue={"Normal"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Small</SelectItem>
            <SelectItem value="Concise">Medium</SelectItem>
            <SelectItem value="Concise">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const ChatButton: React.FC = () => {
  return (
    <div className="space-y-8">

            <div className="space-y-2">
        <Label htmlFor="name">Button Type</Label>
        <Select
        // value={form.messageLength} onValueChange={(val) => onChange("messageLength", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a message length"
              defaultValue={"Normal"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Rounded</SelectItem>
            <SelectItem value="Concise">Text</SelectItem>            
          </SelectContent>
        </Select>
      </div>

                  <div className="space-y-2">
        <Label htmlFor="name">Icon Type</Label>
        <Select
        // value={form.messageLength} onValueChange={(val) => onChange("messageLength", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a message length"
              defaultValue={"Normal"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Default</SelectItem>
            <SelectItem value="Concise">Custom icon</SelectItem>            
          </SelectContent>
        </Select>
      </div>

            <div className="space-y-2">
        <Label htmlFor="agentName">Icon Link</Label>
        <Input
          id="agentName"
          name="agentName"
          // value={form.agentName}
          // onChange={onChange}
          defaultValue={"MindXAI"}
          placeholder="Agent name"
        />
        {/* {fieldErrors.agentName && (<p className="text-sm text-red-500">{fieldErrors.agentName}</p>)} */}
      </div>

      <div className="space-y-2">
        <Label htmlFor="agentName">Background color</Label>
        <div className="flex items-center gap-3">
          <Input
            id="accentColor"
            name="accentColor"
            type="color"
            // value={color}
            // onChange={(e) => setColor(e.target.value)}
            className="w-7 h-7 p-0 border border-input rounded"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm ">{"#QOf2ff"}</span>
          </div>
        </div>
      </div>

                     <div className="space-y-2">
        <Label htmlFor="name">Button Size</Label>
        <Select
        // value={form.messageLength} onValueChange={(val) => onChange("messageLength", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Select a message length"
              defaultValue={"Normal"}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Normal">Small</SelectItem>
            <SelectItem value="Concise">Medium</SelectItem>       
            <SelectItem value="Concise">Large</SelectItem>            
          </SelectContent>
        </Select>
      </div>



    </div>
  );
};

const FallbackMessage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="agentName">Icon URL</Label>
        <Input
          id="agentName"
          name="agentName"
          // value={form.agentName}
          // onChange={onChange}
          defaultValue={"MindXAI"}
          placeholder="Agent name"
        />
        {/* {fieldErrors.agentName && (<p className="text-sm text-red-500">{fieldErrors.agentName}</p>)} */}
      </div>

            <div className="space-y-2">
        <Label htmlFor="companyDescription">Message</Label>
        <Textarea
          id="companyDescription"
          name="companyDescription"
          // value={form.companyDescription}
          // onChange={onChange}
          className="resize-none"
          placeholder="Describe your company's products and services"
        />
      </div>


      <div className="space-y-2">
        <Label htmlFor="companyName">Button Label</Label>
        <Input
          id="companyName"
          name="companyName"
          // value={form.companyName}
          // onChange={onChange}
          placeholder="Company name"
        />
      </div>

        <div className="space-y-2">
        <Label htmlFor="companyName">Button URL</Label>
        <Input
          id="companyName"
          name="companyName"
          // value={form.companyName}
          // onChange={onChange}
          placeholder="Company name"
        />
      </div>


    </div>
  );
};

const MessengerAppearanceTab = () => {
  const tabs = [
    { label: "General", value: "general", content: <General /> },
    { label: "Chat Window", value: "chat-window", content: <ChatWindow /> },
    { label: "Chat Button", value: "chat-button", content: <ChatButton/> },
    { label: "Fallback Message", value: "fallback-message", content: <FallbackMessage/> },
  ];
  return (
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
  );
};

export default MessengerAppearanceTab;
