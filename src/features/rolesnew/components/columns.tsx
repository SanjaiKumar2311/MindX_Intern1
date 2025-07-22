import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

export const columns: ColumnDef<Role>[] = [ 
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
    {
      accessorKey: "name",      
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Roles
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (<div className="capitalize">{row.getValue("name")}</div>),
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button variant="ghost"onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Description <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: 'Action',
      cell: ({ row }) => {
        const role = row.original
        const navigate = useNavigate();

        const handleDelete = (id: number) => {
          // You can replace this with a confirmation modal + actual delete logic
          console.log("Deleting role with id:", id);
          // deleteRole(id) ...
        };
        
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${role.id}`)}>
                Copy role ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate(`/settings/roles/${role.id}/edit`)}>Edit Role </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(role.id)}>Delete Role </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

// export const data: Payment[] = [
//     {
//       id: "m5gr84i9",
//       amount: 316,
//       status: "success",
//       email: "ken99@example.com",
//     },
//     {
//       id: "3u1reuv4",
//       amount: 242,
//       status: "success",
//       email: "Abe45@example.com",
//     },
//     {
//       id: "derv1ws0",
//       amount: 837,
//       status: "processing",
//       email: "Monserrat44@example.com",
//     },
//     {
//       id: "bhqecj4p",
//       amount: 721,
//       status: "failed",
//       email: "carmella@example.com",
//     },
//   ]
  
  export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
  }

  export type Role = {
    id: number
    name: string
    description: string
  }