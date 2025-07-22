import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface IdentityAndCompanyTabProps {
  form: { agentName: string; companyName: string; companyDescription: string };
  initialForm?: {agentName: string;companyName: string;companyDescription: string;};
  fieldErrors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const IdentityAndCompanyTab = ({ form, initialForm, fieldErrors, onChange, handleSubmit,isSubmitting,}: IdentityAndCompanyTabProps) => {
    const [isValueChanged, setIsValueChanged] = useState(false);

    useEffect(() => {
        setIsValueChanged(JSON.stringify(form) !== JSON.stringify(initialForm));
    }, [form, initialForm]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <div className="space-y-2">
                    <Label htmlFor="agentName">Agent Name</Label>
                    <Input
                        id="agentName"
                        name="agentName"
                        value={form.agentName}
                        onChange={onChange}
                        defaultValue={"MindXAI"}
                        placeholder="Agent name"
                    />
                    {fieldErrors.agentName && (<p className="text-sm text-red-500">{fieldErrors.agentName}</p>)}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                        id="companyName"
                        name="companyName"
                        value={form.companyName}
                        onChange={onChange}
                        placeholder="Company name"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="companyDescription">Company Description</Label>
                    <Textarea
                        id="companyDescription"
                        name="companyDescription"
                        value={form.companyDescription}
                        onChange={onChange}
                        className="resize-none"
                        placeholder="Describe your company's products and services"
                    />
                </div>

                {isValueChanged && (
                    <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (<Loader2 className="mr-2 h-4 w-4 animate-spin" />) : ("Save")}
                </Button>
                )}
                
            </div>

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

export default IdentityAndCompanyTab;
