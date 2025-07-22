import { Button } from '@/components/ui/button'
import ArticleFrom from '@/features/article/components/article-from';
import ArticleTable from '@/features/article/components/article-table'
import { columns } from '@/features/article/components/columns';
import { PlusIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useArticleService } from '@/features/article/service/articleService';
import ArticleModal from '@/features/article/components/article-modal';
import ChatWindow from '@/features/chatbot/components/chat-bot';

const DEFAULT_PARAMS: Record<string, string> = {
    pageNo: "0",
    pageSize: "10",
    sortColumn: "id",
    sortOrder: "asc",
  };

const Articles = () => {
    
    const { getAllArticle } = useArticleService();
    const [data, setData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState<Record<string, string | number | boolean>>({
      firstName: "",
      lastName: "",
      email: "",
    });
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");
    const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
    const [filterModalOpen, setFilterModalOpen] = useState(false);    
    const [articleFormModalOpen, setArticleFormModalOpen] = useState(false);
    const [previewModelOpen, setPreviewModelOpen] = useState(false);
    const toggleChat = () => {setPreviewModelOpen(!previewModelOpen);};

    const fetchArticles = async (params: Record<string, string | number | boolean>) => {
      try {
        const { content, pageContext } = await getAllArticle(params);
        console.log("Data:", content);
        setData(content ?? []);
        setTotal(pageContext?.totalPages ?? 0);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
  
    const handleOpenFilter = () => {
      setFilterModalOpen(true);
    };
    
    const handleDelete = () => {
      console.log("Delete selected row IDs:", selectedRows);
    };
  
    const isFilterApplied = Object.values(filters).some((value) => value !== "");
  
    const handleResetFilters = () => {
      const currentParams = Object.fromEntries(searchParams.entries());
      const { ["user.firstName"]: _, ["user.lastName"]: __, ["email"]: ___, ...rest } = currentParams;
      const cleaned = {...rest,pageNo: "0",};
      setFilters({ "user.firstName": "", "user.lastName": "", email:"", });
      updateParams1({ ...cleaned, pageNo: 0 });
    };
  
    const pageNo = Number(searchParams.get("pageNo")) || 0;
    const pageSize = Number(searchParams.get("pageSize")) || 10;
  
    const [total, setTotal] = useState(0);
  
    const updateParams1 = (params: Record<string, string | number>) => {
      setSearchParams((prev) => {
        const merged = { ...Object.fromEntries(prev.entries()), ...params };
        return Object.fromEntries(
          Object.entries(merged).map(([k, v]) => [k, String(v)])
        );
      });
    };
  
    const handlePageChange = (newPageNo: number) => {
      updateParams1({ pageNo: newPageNo });
    };
  
    const handlePageSizeChange = (newPageSize: number) => {
      updateParams1({ pageSize: newPageSize, pageNo: "0" });
    };
  
    const handleSortingChange = (sorting: { id: string; desc: boolean }[]) => {
      if (sorting.length === 0) return;
      if (sorting.length > 0) {
        const { id, desc } = sorting[0];
        updateParams1({
          sortColumn: id,
          sortOrder: desc ? "desc" : "asc",
          pageNo: 0,
        });
      }
    };
  
    const handleSelectedRowsChange = (ids: (string | number)[]) => {
      setSelectedRows(ids);
    };
  
    const [selectedUserId, setSelectedUserId] = useState<string | null >(null);  

    const handleRowClick = (id: string ) => {      
      console.log(id);    
      // setFilterModalOpen(true);
      setArticleFormModalOpen(true);
      setSelectedUserId(id);      
    };

    const handleClose = useCallback(() =>{
      // setFilterModalOpen(false);
      console.log("clicked")
      setArticleFormModalOpen(false);
      setMode("view");
      setSelectedUserId(null);
      const params = Object.fromEntries(searchParams.entries());
      fetchArticles(params);
    },[searchParams]);
    
  
    const toUrlParams = (params: Record<string, string | number | boolean>) =>
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      );
  
    useEffect(() => {
      const params = Object.fromEntries(searchParams.entries());
      fetchArticles(params);
    }, [searchParams]);
  
    useEffect(() => {
      const currentParams = Object.fromEntries(searchParams.entries());
      const hasParams = Object.keys(currentParams).length > 0;
      if (!hasParams) {
        setSearchParams(toUrlParams(DEFAULT_PARAMS));
      }
    }, []);

  return (
    <div className='p-6'>
    <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Articles</h2>
        <p className="text-muted-foreground">
        Equip your AI agent with your company’s knowledge to automatically provide accurate and relevant customer answers.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          className="space-x-1"
          variant={'outline'}
          // onClick={() => setFilterModalOpen(true)}
          onClick={() => {setPreviewModelOpen(true)}}
        >
          <span>Preview</span> 
        </Button>
                <Button
          className="space-x-1"
          // onClick={() => setFilterModalOpen(true)}
          onClick={() => setFilterModalOpen(true)}
        >
          <span>Create</span> <PlusIcon size={18} />
        </Button>
      </div>
    </div>

    <ArticleTable
      data={data}
      columns={columns}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSortingChange={handleSortingChange}
      selectedRowIds={selectedRows}
      onSelectedRowsChange={handleSelectedRowsChange}
      pageCount={total}
      pageIndex={pageNo}
      pageSize={pageSize}
      onDelete={handleDelete}
      isFilterApplied={isFilterApplied}
      onOpenFilter={handleOpenFilter}
      onResetFilters={handleResetFilters}
      onRowClick={handleRowClick}
    />

<ArticleFrom
    mode={mode}
    articleId={selectedUserId ? selectedUserId : null}
    open={articleFormModalOpen}     
    onClose={handleClose}  
    onEdit={() => setMode("edit")}  
/>

<ArticleModal
  open={filterModalOpen}
  onClose={() => setFilterModalOpen(false)}
/>

  <div className="relative bg-transparent">
      <div className="fixed bottom-5 right-5 z-50 ">
        {previewModelOpen && (
          <ChatWindow
            onClose={toggleChat}
            botName={"MindX Agent"}
            messages={[]}
            primaryColor={""}
          />
        )}
      </div>
      </div>
  </div>
  )
}

export default Articles