import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useArticleService } from "../service/articleService";

interface ArticleDocumentModalProps {
    open: boolean;
    onClose: () => void;
  }

const ArticleDocumentModal = ({open, onClose}:ArticleDocumentModalProps) => {
    const {createArticleFromUpload} = useArticleService();
    const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    try {
        console.log(file);
        
      const result = await createArticleFromUpload(file);
      toast.success("Article uploaded successfully!");
      console.log(result); // or update state/UI
      onClose();
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    }
  };

  return (
    <div>
    <Dialog open={open} onOpenChange={onClose}>  
    <DialogContent className="sm:max-w-[800px]">
    
        <DialogHeader>
          <DialogTitle>Upload document</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload area */}
          <div
            className="border-2 border-dotted border-gray-300 rounded-md p-16 text-center cursor-pointer"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <Button className="rounded-4xl"><UploadCloud/> Select a file</Button>
            <p className="text-sm text-muted-foreground">or drag and drop it here</p>
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx"
            />
            {file && (
              <p className="mt-2 text-sm text-green-600">Selected: {file.name}</p>
            )}
          </div>

          {/* Instructions */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Provide a file and we'll fetch all the text data inside.</p>
            <p>• Supported formats: text-based PDF and DOCX, up to 45 MB.</p>
            <p>• Images and multi-column documents are not supported.</p>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!file} onClick={handleUpload}>Upload</Button>
        </DialogFooter>
      </DialogContent>
    
          
               
  
</Dialog>

</div>
  )
}

export default ArticleDocumentModal
