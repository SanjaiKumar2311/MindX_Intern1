import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MessengerAppearanceTab from "./messenger-appearance-tab";
import MessengerInstallationTab from "./messenger-installation-tab";
import { Button } from "@/components/ui/button";

const MessengerForm = () => {
  const tabs = [
    { label: "Appearance", value: "appearance" },
    { label: "Installation", value: "installation" },
  ];
  const [activeTab, setActiveTab] = useState("appearance");
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-start">
            <div>
              <CardTitle>Messenger</CardTitle>
              <CardDescription className="mt-1">
                Install and customize your messenger on web.
              </CardDescription>
            </div>
             <div className="flex gap-2">
              {/* <Button size="sm" onClick={handleSubmit}>Save draft</Button> */}
              <Button size="sm">Set live</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex justify-normal w-full overflow-x-auto no-scrollbar bg-white">
              {tabs.map((tab, index) => (
                <div key={index} className="flex items-start space-x-2">
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

            <TabsContent value="appearance" className="mt-2">
              <MessengerAppearanceTab />
            </TabsContent>
            <TabsContent value="installation" className="mt-2">
              <MessengerInstallationTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default MessengerForm;
