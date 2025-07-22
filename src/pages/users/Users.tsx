import { Button } from "@/components/ui/button";
import { columns } from "@/features/users/components/columns";
import InviteUser from "@/features/users/components/invite-user";
import UserFilterModal from "@/features/users/components/user-filter-modal";
import UsersTable from "@/features/users/components/users-table";
import { useUserService } from "@/features/users/service/usersService";
import { MailPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_PARAMS: Record<string, string> = {
  pageNo: "0",
  pageSize: "10",
  sortColumn: "id",
  sortOrder: "asc",
};

const Users = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const { getAllUser } = useUserService();
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Record<string, string | number | boolean>>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  
  const fetchUsers = async (params: Record<string, string | number | boolean>) => {
    try {
      const { content, pageContext } = await getAllUser(params);
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

  const [selectedUserId, setSelectedUserId] = useState<string |number >("");  
  const handleEditUser = (userId: string | number ) => {
    console.log(userId);    
    setSelectedUserId(userId);
    setInviteModalOpen(true);
  }

  const toUrlParams = (params: Record<string, string | number | boolean>) =>
    Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    );

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    fetchUsers(params);
  }, [searchParams]);

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries());
    const hasParams = Object.keys(currentParams).length > 0;
    if (!hasParams) {
      setSearchParams(toUrlParams(DEFAULT_PARAMS));
    }
  }, []);

  return (
    <div className="p-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">
            Manage all your users from here: you can add more users, remove
            those who're no longer in your Organization.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="space-x-1"
            onClick={() => setInviteModalOpen(true)}
          >
            <span>Invite User</span> <MailPlus size={18} />
          </Button>
        </div>
      </div>

      <UsersTable
        data={data}
        columns={columns({onEdit: handleEditUser,onDelete: handleDelete,onInvite: handleEditUser})}
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
      />

      <InviteUser
        open={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        mode="create"
        userId={selectedUserId}
      />

      <UserFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
      />

    </div>
  );
};

export default Users;
