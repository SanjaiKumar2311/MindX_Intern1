import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";


export const columns = ({
  onEdit,  
  onDelete,
}:{
  onEdit: (id: number | string ) => void,
  onDelete: (id: number | string ) => void,  
}) : ColumnDef<Customer>[] => [ 
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
      id: "name",      
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        const {firstName, lastName} = row.original
        const name = `${firstName}${lastName}`
          return<div className="capitalize">{name}</div>
      },
    },
    {
      accessorKey: "email",
      // header: 'Description',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: 'Phone Number',
      cell: ({ row }) => <div className="lowercase">{row.getValue("phoneNumber")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: 'Action',
      cell: ({ row }) => {
        const user = row.original

        
  
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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${user.id}`)}>Copy user ID</DropdownMenuItem>
              <DropdownMenuSeparator />              
              <DropdownMenuItem onClick={() => onEdit(user.id)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(user.id)}>Delete</DropdownMenuItem>              
              <DropdownMenuItem>Mark as Inactive</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  

  export type Customer = {
    id: number | string 
    firstName: string
    lastName: string
    email: string
  
  }
