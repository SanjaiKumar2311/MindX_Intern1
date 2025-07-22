import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle,} from "@/components/ui/sheet";
import RichTextEditor from "./rich-text-editor";
import { useArticleService } from "../service/articleService";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ArticleFormProps {
  mode: "create" | "edit" | "view";
  articleId?: string | null;
  open: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

const ArticleFrom = ({mode,articleId,open,onClose,onEdit,}: ArticleFormProps) => {
  
  const { getArticleById, updateArticle, createArticle } = useArticleService();
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    status: "PUBLISHED",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sourceType, setSourceType] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.title) errors.name = "Article Name name is required";
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

    try {
      if (articleId) {
        await updateArticle(form, articleId);
      } else {
        await createArticle(form);
      }
      setForm({
        title: "",
        description: "",
        content: "",
        status: "PUBLISHED",
      });
      onClose();
      console.log("Form submitted and closed.");
    } catch (err) {
      console.log(err);
      toast("role  failed", { description: `${err}` });
    }
  };

  const onChange = (content: string) => {
    console.log(content);
    setForm({ ...form, content: content });
  };

  const fetchRole = async (id: string | null) => {
    try {
      const data = await getArticleById(id ?? "");
      console.log(data);
      console.log(data.content, "Content");

      setForm({
        title: data.title || "",
        description: data.description || "",
        content: data.content || "",
        status: data.status || "PUBLISHED",
      });
      setSourceType(data.source.sourceType);
    } catch (err) {
      console.error("Error fetching roles", err);
    }
  };
  useEffect(() => {
    if (articleId != null) {
      fetchRole(articleId);
    }
  }, [articleId]);

  useEffect(() => {
    if (!open) {
      setForm({
        title: "",
        description: "",
        content: "",
        status: "PUBLISHED",
      });
      setFieldErrors({});
    }
  }, [open]);

  return (
    <>
      <Sheet open={open} onOpenChange={(isOpen) => {if(!isOpen) onClose();}}>
        <SheetContent side="right" className="w-full md:max-w-1/2 max-w-none">
          <SheetHeader className="border-b">
            <SheetTitle>
              {mode === "create" ? "Create" : "Edit"}Article
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[500px] ">
            <div className="grid gap-4 mx-4 ">
              <div className="space-y-2">
                <Label htmlFor="title">Article</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  readOnly={mode === "view"}
                />
                {fieldErrors.title && (
                  <p className="text-sm text-red-500">{fieldErrors.title}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Max.500 characters"
                  value={form.description}
                  onChange={handleChange}
                  className="resize-none"
                  readOnly={mode === "view"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Content</Label>
                <RichTextEditor
                  content={form.content}
                  onChange={onChange}
                  readOnly={mode === "view"}
                />
              </div>
            </div>
          </ScrollArea>
          <SheetFooter className="border-t">
            <div className="flex justify-end gap-4 w-full">
              {mode === "view" ? (
                <>
                  <div className="flex justify-start gap-4 w-full">
                    {sourceType === "CREATED_BY_MINDX" ? (
                      <Button onClick={onEdit}>Edit</Button>
                    ) : (
                      <>
                        <Button className="rounded-4xl" onClick={onClose}>
                          <Upload /> Re-Upload
                        </Button>
                      </>
                    )}

                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-end gap-4 w-full">
                    <Button variant="outline" onClick={onClose}>
                      Discard
                    </Button>
                    <Button onClick={handleSubmit}>Save</Button>
                  </div>
                </>
              )}

            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ArticleFrom;
