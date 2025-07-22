import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useActionService } from "../service/actionService";
import AboutTab from "./about-tab";
import ApiConnectionTab from "./api-connection-tab";
import DataAccessTab from "./data-access-tab";
import TestResponseTab from "./test-response-tab";

interface ActionFormProps {
  mode: "create" | "edit";
  actionId?: string;
}

const ActionForm = ({ mode, actionId }: ActionFormProps) => {
  const navigate = useNavigate();
  
  // const {actionId} = useParams();
  // const isEdit = mode === "edit";
  console.log(mode);
  
  const { getActionById, createAction, updateAction } = useActionService();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "PUBLISHED",
    httpMethod: "GET",
    url: "",
    headers: [],
    mockResponse: { id: "", body: "" },
    inputs: [],
    responseFields: [],
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.name) errors.name = "Role name is required";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("form",form);
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    console.log(form);

    try {
      if (actionId) {
        await updateAction(form, actionId);
      } else {
        await createAction(form);
      }
      navigate(`/actions`);
    } catch (err) {
      console.log(err);

      toast("action  failed", {description: `${err}`,});
    }
  };

  const fetchAction = async (id: string) => {
    try {
      const data = await getActionById(id ?? "");
      console.log(data);

      setForm({
        name: data.name || "",
        description: data.description || "",
        status: data.status || "PUBLISHED",
        httpMethod: data.httpMethod || "GET",
        url: data.url || "",
        headers: data.headers || [],
        mockResponse: { id: data.mockResponse.id || "", body: data.mockResponse.body || "" },
        inputs: data.inputs || [],
        responseFields: data.responseFields || [],
      });
    } catch (err) {
      console.error("Error fetching roles", err);
    }
  };

  useEffect(() => {
    if (actionId) {
      console.log(actionId);
      
      fetchAction(actionId);
    }
  }, [actionId]);

  const tabs = [
    { label: "About", value: "about" },
    { label: "API connection", value: "api_connection" },
    { label: "Test response", value: "test_response" },
    { label: "Data access", value: "data_access" },
  ];
  const [activeTab, setActiveTab] = useState("about");
  const handleNextStep = () => {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);

    // Step-specific validation
    if (activeTab === "about" && !form.name) {
      toast.error("Please fill out the name before continuing.");
      return;
    }

    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].value);
    }
  };

  const handleFormChange = (updatedForm: typeof form) => {
    setForm(updatedForm);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-start">
            <div>
              <CardTitle>Action</CardTitle>
              <CardDescription>
                Tell your AI Agent what this Action is for and when to use it.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSubmit}>Save draft</Button>
              <Button size="sm">Set live</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-normal w-full overflow-x-auto no-scrollbar bg-white">
              {tabs.map((tab, index) => (
                <div key={index} className="flex items-start space-x-2">
                  {index !== 0 && (
                    <ChevronRight
                      size={18}
                      className="text-muted-foreground flex-shrink-0 mt-1.5"
                    />
                  )}
                  <TabsTrigger
                    value={tab.value}
                    className="data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground  text-sm font-medium"
                  >
                    {tab.label}
                  </TabsTrigger>
                </div>
              ))}
            </TabsList>

            <Separator />

            <TabsContent value="about" className="mt-2">
              <AboutTab
                form={form}
                fieldErrors={fieldErrors}
                onChange={handleChange}
              />
            </TabsContent>
            <TabsContent value="api_connection" className="mt-2">
              <ApiConnectionTab form={form} onChange={handleFormChange} />
            </TabsContent>
            <TabsContent value="test_response" className="mt-2">
              <TestResponseTab form={form} onChange={handleFormChange} />
            </TabsContent>
            <TabsContent value="data_access">
              <DataAccessTab form={form}  />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button onClick={handleNextStep}>Next Step</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ActionForm;
