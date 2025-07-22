import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";

const MessengerInstallationTab = () => {

    const [appId, setAppId] = useState("app-id"); // default fallback

    useEffect(() => {
        const storedAppId = localStorage.getItem("tenantId");
        if (storedAppId) {
            setAppId(storedAppId);
        }
    }, []);

    const embedCode = `<script>
    window.chatbotSettings = {
        api_base: "https://quickassist-api.example.com",
        app_id: "${appId}",
    };
    </script>
    <script src="chatbot-loader.js"></script>`;

    const handleCopy = async () => {
        try {
        await navigator.clipboard.writeText(embedCode);
        console.log("Copied to clipboard!");
        } catch (err) {
        console.error("Failed to copy:", err);
        }
    };

  return (
    <>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
            <div>
                {/* Heading */}
                <h2 className=" text-sm font-bold tracking-tight">
                    Install the messenger on your site or app 
                </h2>
                {/* Description */}
                <p className=" text-sm  text-muted-foreground">
                    The messenger helps your support your customer and learn more about them.
                </p>
            </div>
        </div>

        <div className="rounded-lg border bg-background ">

            <div className="flex items-center justify-between border-b bg-muted px-4 py-2">

                {/* code block heading */}
                <div>
                    <h2 className=" text-sm font-bold tracking-tight">
                        Configure your code snippet
                    </h2>
                </div>

                {/* Copy button */}
                <Button
                    onClick={handleCopy}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-muted/50 text-muted-foreground"
                >
                    <CopyIcon className="h-4 w-4" />
                    <span className="sr-only">Copy code</span>
                </Button>
            </div>

            {/* Code block */}
            <div className="p-4 font-mono text-sm leading-6 text-foreground">
                <pre className="language-javascript">
                    <code>{embedCode}</code>
                </pre>
            </div>

        </div>
    </>
  );
};

export default MessengerInstallationTab;
