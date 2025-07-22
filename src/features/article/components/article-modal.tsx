
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import ArticleFrom from "./article-from";
import { useState } from "react";
import ArticleDocumentModal from "./article-document-modal";
import ArticleWebsiteModal from "./article-website-modal";

export const articleType = [
  {
        title: "Article",
        description: "Share public articles in your AI Agent and Copilot",    
        type: "article",      
        
      },
      {
        title: "Webpage",
        description: "Share public articles in your AI Agent and Copilo",
        type: "webpage",
      },
      {
        title: "Document",
        description:"Share public articles in your AI Agent and Copilo",
        type: "document",
      },
      {
        title: "From Zendesk",
        description:"Share public articles in your AI Agent and Copilo",          
        type: "zendesk",
      },

];

interface ArticleModalProps {
    open: boolean;
    onClose: () => void;
  }
  
const ArticleModal = ({open, onClose}:ArticleModalProps) => {
    const [articleFormModalOpen, setArticleFormModalOpen] = useState(false);
    const [documentModalOpen, setDocumentModalOpen] = useState(false);
    const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
    

    const handleCardClick = (type: string) => {
        switch (type) {
          case "article":
            setArticleFormModalOpen(true);
            onClose();
            break;
          case "document":
            setDocumentModalOpen(true);
            onClose();
            break;
          case "webpage":
            setWebsiteModalOpen(true);
            onClose();
            break;
          case "zendesk":
            // setZendeskModalOpen(true);
            onClose();
            break;
        }
      };

  return (
    <div>
        <Dialog open={open} onOpenChange={onClose}>  
        <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
          <DialogDescription>
          Equip your AI agent with your company’s knowledge to automatically provide accurate and relevant customer answers.
          </DialogDescription>
        </DialogHeader>
              
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {articleType.map((item, i) => {
                return (                  
                    <Card key={i} className="hover:shadow-md transition-shadow" onClick={()=> handleCardClick(item.type)}>
                      <CardContent className="flex gap-4 items-start px-4">                      
                        <div>                        
                          <h3 className="font-medium">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>                  
                );
              })}
            </div>                
      </DialogContent>
</Dialog>

<ArticleFrom
mode="create"
open={articleFormModalOpen}
onClose={() => setArticleFormModalOpen(false)}
/>

<ArticleDocumentModal 
open={documentModalOpen} 
onClose={() => setDocumentModalOpen(false)}/>
<ArticleWebsiteModal 
open={websiteModalOpen} 
onClose={() => setWebsiteModalOpen(false)}/>

    </div>
  )
}

export default ArticleModal