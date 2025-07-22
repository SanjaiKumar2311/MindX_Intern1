import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface ToneAndStyleTabProps {
    form: { tone: string; messageLength: string; allowEmoji: boolean };
    initialForm?: { tone: string; messageLength: string; allowEmoji: boolean };
    onChange: (field: string, value: string | boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isSubmitting: boolean;
}

const ToneAndStyleTab = ({form, initialForm, onChange, handleSubmit,isSubmitting}: ToneAndStyleTabProps) => {

    const [isValueChanged, setIsValueChanged] = useState(false);

    useEffect(() => {
        setIsValueChanged(JSON.stringify(form) !== JSON.stringify(initialForm));
    }, [form, initialForm]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                <div className="space-y-2">
                    <Label htmlFor="name">Tone of voice</Label>

                    <Select
                        value={form.tone}
                        onValueChange={(val) => onChange("tone", val)}
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue
                            placeholder="Select a tone"
                            defaultValue={"Friendly"}
                        />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="Plainspoken">Plainspoken</SelectItem>
                        <SelectItem value="Playful">Playful</SelectItem>
                        <SelectItem value="Sophisticated">Sophisticated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Message Length</Label>
                    
                    <Select
                        value={form.messageLength}
                        onValueChange={(val) => onChange("messageLength", val)}
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue
                            placeholder="Select a message length"
                            defaultValue={"Normal"}
                        />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Normal">Normal</SelectItem>
                        <SelectItem value="Concise">Concise</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Switch
                    id="airplane-mode"
                    checked={form.allowEmoji}
                    onCheckedChange={(checked) => onChange("allowEmoji", checked)}
                    />
                    <Label htmlFor="airplane-mode">Allow emoji usage</Label>
                </div>
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

export default ToneAndStyleTab;
