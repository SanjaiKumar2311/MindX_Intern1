import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { settingsData } from "../data/settings-data";
import { Link } from "react-router-dom";

const SettingsHome1 = () => {
  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences and integrations all in one place.
        </p>
      </div>
      <div className="space-y-8 mt-8 ">
        {settingsData.map((section, idx) => (
          <div key={idx}>
            <h2 className="text-lg font-semibold">{section.section}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {section.items.map((item, i) => {
                return (
                  <Link to={item.url} key={i}>
                    <Card key={i} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex gap-4 items-start px-4">
                        <div className="bg-gray-100 p-2 rounded-xl">
                          {/* <Icon className="text-purple-600 w-5 h-5" /> */}
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            {idx < settingsData.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsHome1;
