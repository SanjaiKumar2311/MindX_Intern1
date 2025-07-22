import { Customer } from "./columns";
import DataTable from "./data-table";

import { ColumnDef } from "@tanstack/react-table";

interface DataTableProps {
  columns: ColumnDef<Customer>[]
  data: Customer[],
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSortingChange: (sorting: { id: string; desc: boolean }[]) => void;
  onSelectedRowsChange?: (selectedIds: (string | number)[]) => void;
  selectedRowIds: (string | number)[];
  onDelete?: () => void;
  onOpenFilter?: () => void;
  isFilterApplied?: boolean;
  onResetFilters?: () => void;
  onRowClick?: (id: string ) => void;
}


const CustomerTable = ({
    columns, 
    data,
    pageCount,
    pageIndex,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onSortingChange,
    onSelectedRowsChange,
    selectedRowIds,
    onDelete,
    onOpenFilter,
    isFilterApplied,
    onResetFilters,
    onRowClick,
  }: DataTableProps) => {
  return (
    <>
    <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0 ">
      <DataTable
        data={data}
        columns={columns}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortingChange={onSortingChange}
        onSelectedRowsChange={onSelectedRowsChange}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        selectedRowIds={selectedRowIds}
        onDelete={onDelete}
        onOpenFilter={onOpenFilter}
        isFilterApplied={isFilterApplied}
        onResetFilters={onResetFilters}
        onRowClick={onRowClick}
      />
    </div>          
  </> 
  )
}

export default CustomerTable