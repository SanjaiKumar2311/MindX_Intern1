import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useArticleService } from "../service/articleService";

interface ArticleWebsiteModalProps {
    open: boolean;
    onClose: () => void;
  }

const ArticleWebsiteModal = ({open,onClose}:ArticleWebsiteModalProps) => {

    const {createArticleFromWebsite} = useArticleService();
    const [form, setForm] = useState({url: "",additionalUrls: "",});
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    };
    
    const validate = () => {
        const errors: Record<string, string> = {};
        if (!form.url) errors.url = "URL is required";
        return errors;
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const errors = validate();
        if (Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          return;
        }
        console.log(form);
    
        const payload = {
            url: form.url.trim(),
            additionalUrls: form.additionalUrls
              .split(",")
              .map((url) => url.trim())
              .filter(Boolean),
          };
        try {
        await createArticleFromWebsite(payload);
          setForm({url:"",additionalUrls:"",})
          onClose();
        } catch (err) {
          console.log(err);
          toast("article  failed", {description: `${err}`,});
        }
    };

  return (
    <div>
    <Dialog open={open} onOpenChange={onClose}>  
    <DialogContent className="sm:max-w-[800px]">
    <DialogHeader>
      <DialogTitle>Sync Content from any website</DialogTitle>
      <DialogDescription>
      Make sure to use a public URL. We will search for all pages nested under that URL and add them into Knowledge Hub.
      </DialogDescription>
    </DialogHeader>
   
   <div className="grid gap-4 w-1/2 ">
          {/* Form Section */}
          
            <div className="space-y-2">              
              <div className="grid gap-1.5 leading-none">
                <Label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Website link
                </Label>
                <p className="text-sm text-muted-foreground">
                Top-level domains like https://myhelpcenter.com will give better results than https://myhelpcenter.com/home.
                </p>
          </div>
              <Input
                id="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https//app.com/help"
              />
              {fieldErrors.url && (
                <p className="text-sm text-red-500">{fieldErrors.url}</p>
              )}
            </div>

          
            <div className="space-y-2">
            <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms1"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Additional URLs
          </Label>
          <p className="text-sm text-muted-foreground">
          Add comma-separated URLs of the additional pages you want to sync.
          </p>
        </div>
              
              <Textarea
                id="additionalUrls"
                name="additionalUrls"
                placeholder="https://myhelpcenter.com/articles,htttps://myhelpcenter/support, etc."
                value={form.additionalUrls}
                onChange={handleChange}
                className="resize-none"
              />
            </div>



        </div>
       
        <DialogFooter>
        <div className="flex justify-end gap-4 w-full">
              <Button variant="outline">Discard</Button>
              <Button onClick={handleSubmit}>Sync</Button>
            </div>          
        </DialogFooter>

  </DialogContent>
</Dialog>



</div>
  )
}

export default ArticleWebsiteModal