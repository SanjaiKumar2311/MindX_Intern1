import { Button } from "@/components/ui/button";
import { FilterIcon, Trash2, X } from "lucide-react";
import DataTableViewOptions from "./data-table-view-options";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedRowIds: (string | number)[];
  onDelete?: () => void;
  onOpenFilter?: () => void;
  isFilterApplied?: boolean;
  onResetFilters?: () => void;
}

const DataTableToolbar = <TData,>({ 
  table,
  selectedRowIds,
  onDelete,
  onOpenFilter,
  isFilterApplied,
  onResetFilters,
 }: DataTableToolbarProps<TData>) => {
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">                        
      </div>
      {isFilterApplied ? (
        <Button variant="ghost" onClick={onResetFilters} className="h-8 px-2 lg:px-3">
          Reset <X className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button variant="outline" className="h-8 px-2 lg:px-3 me-1" onClick={onOpenFilter}>
          <FilterIcon className="mr-2 h-4 w-4" /> Filter
        </Button>
      )}

      {selectedRowIds.length > 0 && (
        <Button variant="destructive" className="h-8 px-2 lg:px-3 me-1" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete ({selectedRowIds.length})
        </Button>
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
};

export default DataTableToolbar;
