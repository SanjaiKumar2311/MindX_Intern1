import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useState } from 'react'

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


interface MockResponse {
  id: string
  body: string
}

interface ResponseField {
  id: string
  responsePath: string
  description: string
  example: string
  value: string
}

interface Props {
    form: {
      inputs: InputField[];
      mockResponse: MockResponse; 
      url: string;
      httpMethod: string;
      headers: HeaderField[];
      responseFields: ResponseField[];
    };
    onChange: (form: any) => void;
  }

const TestResponseTab = ({ form, onChange }: Props) => {
  const [testValues, setTestValues] = useState<Record<string, string>>({});

  const handleValueChange = (name: string, value: string) => {
    setTestValues((prev) => ({ ...prev, [name]: value }));
  };

  const generateFinalUrl = (): string => {
    let finalUrl = form.url;
    Object.entries(testValues).forEach(([key, value]) => {
      const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      finalUrl = finalUrl.replace(pattern, encodeURIComponent(value));
    });
    return finalUrl;
  };
  const updateMockResponseBody = (body: string) => {
    console.log(body);
    
    const updatedMockResponse = {...form.mockResponse,body,};  
    console.log(updatedMockResponse);
    
    onChange({...form,mockResponse: updatedMockResponse,});
  };

  const handleTestClick = async () => {
    const finalUrl = generateFinalUrl();
    console.log("URL",finalUrl);
    
    const headers: Record<string, string> = {};
    form.headers.forEach((header) => {
      if (header.name) headers[header.name] = header.value;
    });

    function extractResponseFields(data: Record<string, any>): ResponseField[] {
      return Object.entries(data).map(([key, value]) => ({
        id:"",
        description: "",
        example: "",
        responsePath: key,        
        value: String(value),
      }));
    }

    try {
      const res = await axios({
        method: form.httpMethod.toLowerCase(),
        url: finalUrl,
        headers,
      });
      console.log(res); 
      console.log(res.data); 
      const body = res.data;
      updateMockResponseBody(JSON.stringify(body, null, 2));   
      const responseFields = extractResponseFields(body);
      onChange({ ...form, responseFields });   
    } catch(err: any){      
      console.log("err",err);      
    }
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
          List any info your AI Agent needs to find in the
          conversation for this Action’s API call.
        </p>
      </div>
      <Button className="me-2" type="button" onClick={handleTestClick}>Test</Button>
      <Popover>
      <PopoverTrigger asChild><Button variant="outline" type="submit">Set test value</Button></PopoverTrigger>
      <PopoverContent className="w-80">
      <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Set test values</h4>
            <p className="text-sm text-muted-foreground">
            Enter values for attributes configured in the request.
            </p>
          </div>
          <div className="grid gap-2">            
            {(form.inputs.length > 0 && form.inputs.map((input, idx) => (
              <div className="grid grid-cols-3 items-center gap-4" key={idx}>
              <Label htmlFor={input.name}>{input.name}</Label>
              <Input
                id="width"                
                className="col-span-2 h-8"
                value={testValues[input.name] || ""}
                onChange={(e) => handleValueChange(input.name, e.target.value)}
              />
            </div>
            )))}
          </div>
        </div>
      </PopoverContent>
      </Popover>
      <Textarea
        id="description"
        name="description"
        value={form.mockResponse.body}
        onChange={onChange}
        className="resize-none"
        placeholder="Describe what this Action can do, eg. 'Return an order status with an orderId'"
      />
    </div>
</div>
  )
}

export default TestResponseTab