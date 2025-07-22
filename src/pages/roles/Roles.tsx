import { Button } from '@/components/ui/button'
import { columns } from '@/features/rolesnew/components/columns';
import RoleFilterModal from '@/features/rolesnew/components/role-filter-modal';
import RolesTable from '@/features/rolesnew/components/roles-table'
import { useRoleService } from '@/features/rolesnew/service/rolesService';
import { PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DEFAULT_PARAMS: Record<string, string> = {
  pageNo: "0",
  pageSize: "10",
  sortColumn: "id",
  sortOrder: "asc",
};
const Roles = () => {
  const navigate = useNavigate();  
  const { getAllRole } = useRoleService();
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number | boolean>>({
    name: "",
    description: "",      
  });
  
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
    
  const fetchRoles = async (params: Record<string, string | number | boolean>) => {
    try {
      const { content, pageContext } = await getAllRole(params);
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
  
  const handleFilterApply = (newFilters: Record<string, string>) => {
    setFilters(newFilters);
    const cleanedFilters = Object.fromEntries(
      Object.entries(newFilters).filter(([_, v]) => v !== "")
    );
    updateParams1({ ...cleanedFilters, pageNo: 0 });

    setFilterModalOpen(false);
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
  
    const toUrlParams = (params: Record<string, string | number | boolean>) =>
      Object.fromEntries(
        Object.entries(params).map(([key, value]) => [key, String(value)])
      );
  
    useEffect(() => {
      const params = Object.fromEntries(searchParams.entries());
      fetchRoles(params);
    }, [searchParams]);
  
    useEffect(() => {
      const currentParams = Object.fromEntries(searchParams.entries());
      const hasParams = Object.keys(currentParams).length > 0;
      if (!hasParams) {
        setSearchParams(toUrlParams(DEFAULT_PARAMS));
      }
    }, []);
  
  return (
    <>
    <div className='p-6'>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Roles and Permissions</h2>
                <p className="text-muted-foreground">
                    Create roles of your own to control what a user can do in the HelpDesk.
                </p>
            </div>
            <div className="flex gap-2">        
                <Button className="space-x-1" onClick={() => navigate("new")}>
                    <span>Create</span> <PlusIcon size={18} />
                </Button>
          </div>
        </div>
        <RolesTable
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
                onResetFilters={handleResetFilters}/>
        <RoleFilterModal
            open={filterModalOpen}
            onClose={() => setFilterModalOpen(false)}
            onApply={handleFilterApply}
        />
        </div>
    </>
  )
}

export default Roles