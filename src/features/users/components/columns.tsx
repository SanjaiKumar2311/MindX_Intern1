import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = ({
  onEdit,
  onInvite,
  onDelete,
}:{
  onEdit: (id: number | string ) => void,
  onDelete: (id: number | string ) => void,
  onInvite: (id: number | string ) => void
}) : ColumnDef<User>[] => [ 
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
      accessorKey: "status",
      header: 'Status',
      cell: ({ row }) => {
        const {status} = row.original;
        const badgeColor = callTypes.get(status)
        return (
          <div className='flex space-x-2 capitalize'>
            <Badge variant='outline' className={cn('capitalize', badgeColor)}>
              {row.getValue("status")}
            </Badge>
          </div>
        )
      }
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
              <DropdownMenuItem onClick={() => onInvite(user.id)}>Invite again</DropdownMenuItem>
              <DropdownMenuItem>Mark as Inactive</DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  


  export type Role = {
    id: number
    name: string
    description: string
  }

  export type User = {
    id: number | string 
    firstName: string
    lastName: string
    email: string
    authProvider: string
    status: string
    imageURL: string
  
  }


  export const callTypes = new Map<string, string>([
    ['ACTIVE', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['INACTIVE', 'bg-neutral-300/40 border-neutral-300'],
    ['INVITED', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    ['SUSPENDED','bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',],
  ])