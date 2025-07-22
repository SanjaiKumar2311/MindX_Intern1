import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader,CardTitle,} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import IdentityAndCompanyTab from "./identity-and-company-tab";
import ToneAndStyleTab from "./tone-and-style-tab";
import { usePersonaService } from "../service/personaService";
import { toast } from "sonner";

const PersonaForm = () => {

    const { getPersona, updatePersona } = usePersonaService();
    const [form, setForm] = useState({
        agentName: "",
        companyName: "",
        companyDescription: "",
        tone: "",
        messageLength: "",
        allowEmoji: true,
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [initialForm, setInitialForm] = useState<typeof form>();  
    const [activeTab, setActiveTab] = useState("identity-company");

    const tabs = [
        { label: "Identity and Company", value: "identity-company" },
        { label: "Tone and style", value: "tone-style" },
    ];
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    };

    const handleSelectChange = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const validate = () => {
        const errors: Record<string, string> = {};
        if (!form.agentName) errors.name = "Agent name is required";
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const errors = validate();

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setIsSubmitting(true);
        console.log(form);

        try {
            await updatePersona(form);
            setInitialForm(form);
        } catch (err) {
            console.log(err);
            toast("Persona failed update", { description: `${err}` });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchPersona = async () => {
        try {
        const data = await getPersona();
        console.log(data);
        console.log(data.content, "Content");
        const filledForm = {
            agentName: data.agentName || "MindX AI",
            companyName: data.companyName || "",
            companyDescription: data.companyDescription || "",
            tone: data.tone || "Friendly",
            messageLength: data.messageLength || "Normal",
            allowEmoji: data.allowEmoji || false,
        };
        setForm(filledForm);
        setInitialForm(filledForm);
        } catch (err) {
        console.error("Error fetching roles", err);
        }
    };

    useEffect(() => {
        fetchPersona();
    }, []);

  return (
          
    <>
        <Card>

            <CardHeader>
                <div className="flex flex-row justify-between items-start">
                    <div>
                        <CardTitle>Persona</CardTitle>
                        <CardDescription className="mt-1">
                            Shape how your AI agent thinks, speaks, and connects — tailored to your brand and audience.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    
                    <TabsList className="flex justify-normal w-full overflow-x-auto no-scrollbar bg-white">
                        {tabs.map((tab, index) => (
                            <div key={index} className="flex items-start space-x-2">
                                <TabsTrigger value={tab.value}
                                className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground  text-sm font-medium"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            </div>
                        ))}
                    </TabsList>

                    <Separator />

                    <TabsContent value="identity-company" className="mt-2">
                        <IdentityAndCompanyTab
                            form={form}
                            initialForm={initialForm}
                            fieldErrors={fieldErrors}
                            onChange={handleChange}
                            handleSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    </TabsContent>
              
                    <TabsContent value="tone-style" className="mt-2">
                        <ToneAndStyleTab
                            form={form}
                            initialForm={initialForm}
                            handleSubmit={handleSubmit}
                            onChange={handleSelectChange}
                            isSubmitting={isSubmitting}
                        />
                    </TabsContent>

                </Tabs>

            </CardContent>
        </Card>
    </>
    
  );
};

export default PersonaForm;
