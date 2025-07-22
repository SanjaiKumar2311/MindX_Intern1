import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface InputField {
    id: string
  name: string;
  description: string;
  type: string;
  required: boolean;
  defaultValue: string;
}
interface HeaderField {
  name: string;
  value: string;
}

interface Props {
  form: {
    inputs: InputField[];
    headers: HeaderField[];
    httpMethod: string;
    url: string;
  };
  onChange: (form: any) => void;  
}

const ApiConnectionTab = ({ form, onChange }: Props) => {

  const updateInput = (index: number,field: keyof InputField,value: string) => {
    console.log(index, field, value);
    
    const updatedInputs = [...form.inputs];
    updatedInputs[index] = { ...updatedInputs[index], [field]: value };
    onChange({ ...form, inputs: updatedInputs });
  };

  const updateHeader = (index: number,field: keyof HeaderField,value: string) => {
    console.log(index, field, value);
    
    const updatedHeaders = [...form.headers];
    updatedHeaders[index] = { ...updatedHeaders[index], [field]: value };
    onChange({ ...form, headers: updatedHeaders });
  };

  const addInputRow = () => {
    const newInputs = [...form.inputs,{ name: "", description: "", type: "Text" },];
    onChange({ ...form, inputs: newInputs });
  };

  const addHeader = () => {
    const newHeaders = [...form.headers, { id:"",name: "", value: "" }];
    onChange({ ...form, headers: newHeaders });
  };
  
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
  
    const [caretPosition, setCaretPosition] = useState(0);
  
    // Handle input change
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const cursor = e.target.selectionStart ?? 0;
  
      // Update form state
      onChange({ ...form, url: value });
  
      // Track cursor position
      setCaretPosition(cursor);
  
      // Show suggestions only if @ symbol is typed and before cursor
      setShowSuggestions(value.lastIndexOf("@") < cursor && value.includes("@"));
      setSearchTerm(value);
    };
  

    // Insert suggestion at cursor position
    const insertMention = (mention: string) => {
      const input = inputRef.current;
      if (!input) return;
  
      const value = form.url;
      const atIndex = value.lastIndexOf("@", caretPosition);
      if (atIndex === -1) return;
  
      const before = value.substring(0, atIndex);
      const after = value.substring(caretPosition);
      const newValue = `${before}{{${mention}}}${after}`;
  
      // Update the URL value in the form state
      onChange({ ...form, url: newValue });
      setShowSuggestions(false);
  
      // Set the cursor position after the inserted mention
      setTimeout(() => {
        input.focus();
        const newPos = before.length + mention.length;
        input.setSelectionRange(newPos, newPos);
      }, 0);
    };
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Get inputs from chat(optional)
          </Label>
          <p className="text-sm text-muted-foreground">
            List any info your AI Agent needs to find in the conversation for
            this Action’s API call.
          </p>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Input</TableHead>
                <TableHead className="w-[620px]">Description</TableHead>
                <TableHead className="w-[180px]">Format</TableHead>
                <TableHead className="w-[180px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(form.inputs.length > 0? form.inputs: [{ name: "", description: "", type: "Text" }]).map((input, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-center font-medium">
                    <Input
                      placeholder="order_number"
                      value={input.name}
                      onChange={(e) => updateInput(idx, "name", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium ">
                    <Input
                      placeholder="8-digit order number that ends with 0"
                      value={input.description}
                      onChange={(e) =>updateInput(idx, "description", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    <Select
                      value={input.type}
                      onValueChange={(val) => updateInput(idx, "type", val)}
                    >
                      <SelectTrigger className=""><SelectValue placeholder="Select a format" defaultValue={"Text"}/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Text">Text</SelectItem>
                        <SelectItem value="Number">Number</SelectItem>
                        <SelectItem value="Boolean">Boolean</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-center font-medium ">
                  
                  <Button variant="ghost" size="icon" className="text-black rounded-2xl "
                    disabled={form.url.includes(`{{${input.name}}}`)}
                    onClick={() => {
                      const updatedInputs = [...form.inputs];
                      updatedInputs.splice(idx, 1);
                      onChange({ ...form, inputs: updatedInputs });
                    }}>
                  <Trash2 />
    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" type="button" onClick={addInputRow}>+ Add</Button>
      </div>
      <div className="space-y-2">
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Connect to API
          </Label>
          <p className="text-sm text-muted-foreground">
            Build the API call for this Action, including inputs from chat,
            variables, metadata, or tokens.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-end">
          {/* Method Dropdown */}
          <div className="md:col-span-1">
            <div className="space-y-2">
              <Label htmlFor="method">Method</Label>
              <Select defaultValue="GET" value={form.httpMethod} onValueChange={(val) => onChange({...form, httpMethod: val})}>
                <SelectTrigger id="method" className="w-full"><SelectValue placeholder="Method" /></SelectTrigger>
                <SelectContent>
                    {["GET", "POST", "PUT", "DELETE"].map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                    ))}               
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* URL Input - spans more columns */}
          <div className="md:col-span-4">
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://api.example.com/orders/"
                className="w-full"
                value={form.url}
                ref={inputRef}
                onChange={handleUrlChange}
                // onChange={(e) => {onChange({ ...form, url: e.target.value }); setShowPopover(true);}}
              />
            {showSuggestions && (
            <div className="absolute z-10 w-3xs  mt-2 bg-white border rounded shadow-md">
              <ul className="max-h-48 overflow-y-auto">
                {form.inputs
                .map(input => `${input.name}`)
                  .filter(item => item.includes(searchTerm.substring(searchTerm.lastIndexOf("@") + 1))) // Filter suggestions based on searchTerm after '@'
                  .map((item,idx) => (
                    <li
                      key={idx}
                      className="cursor-pointer hover:bg-muted px-2 py-1 rounded"
                      onClick={() => insertMention(item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            HTTP Headers
          </Label>
        </div>

        <div className="rounded-md border w-10/12">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Paramater</TableHead>
                <TableHead className="w-[700px]">Value</TableHead>
                <TableHead className=""></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(form.headers.length > 0? form.headers: [{ name: "", value: "" }]).map((header, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-center font-medium">
                    <Input
                      placeholder="Authorization"
                      value={header.name}
                      onChange={(e) => updateHeader(idx, "name", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium ">
                    <Input
                      placeholder="token"
                      value={header.value}
                      onChange={(e) =>updateHeader(idx, "value", e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-medium ">
                  <Button variant="ghost" size="icon" className="text-black rounded-2xl ">
                  <Trash2 />
    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" type="button" onClick={addHeader}>+ Add</Button>
      </div>
    </div>
  );
};

export default ApiConnectionTab;
