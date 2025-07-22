import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

interface AboutTabProps {
    form: {
        name: string;
        description: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    fieldErrors: Record<string, string>;
  }
  
const AboutTab = ({form,onChange,fieldErrors}:AboutTabProps) => {
  return (
    <div className="space-y-8">

    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Give this Action a unique name"
      />
      {fieldErrors.name && (<p className="text-sm text-red-500">{fieldErrors.name}</p>)}
    </div>

    
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={form.description}
        onChange={onChange}
        className="resize-none"
        placeholder="Describe what this Action can do, eg. 'Return an order status with an orderId'"
      />
    </div>

    
    <div className="space-y-2">
      <div className="items-top flex space-x-2">
        <Checkbox id="terms1" />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            AI Agent only uses thi Action within Processes
          </Label>
          <p className="text-sm text-muted-foreground">
            When checked, your AI Agent only uses this Action within
            Processes. Clear this box to let your AI Agent use it on
            its own.
          </p>
        </div>
      </div>
    </div>

  </div>
  )
}

export default AboutTab