import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const columns = ({onRowClick}:{onRowClick: (id: number | string ) => void,}): ColumnDef<Action>[] => [ 
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
            Actions
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <div 
          onClick={() => onRowClick(row.original.id)}
          className="capitalize cursor-pointer font-semibold hover:underline">
            {row.getValue("name")}
          </div>
        )
      },
    },
    {
      accessorKey: "url",
      header: "URL",
      cell: ({ row }) => <div className="lowercase">{row.getValue("url")}</div>,
    },
    {
      accessorKey: "updatedAt",
      header: "Last edited",
      cell: ({ row }) => <div className="lowercase">{row.getValue("updatedAt")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
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
      },  
    },
  ]

  export type Action = {
    id: number | string
    name: string
    description: string
    status: string
    httpMethod: string
    url: string
    headers: Header[]
    mockResponse: MockResponse
    inputs: Input[]
    responseFields: ResponseField[]    
    createdAt: string
    updatedAt: string    
  }

  export type Header = {
    id: string
    name: string
    value: string

  }

  export type MockResponse = {
    id: string
    body: string
    createdAt: string
    updatedAt: string
  }

  export type Input = {
    id: string
    name: string
    description: string
    type: string
    required: boolean
    defaultValue: string    
  }

  export type ResponseField = {
    id: string
    responsePath: string
    description: string
    example: string
    value: string
  }

  export const callTypes = new Map<string, string>([
    ['PUBLISHED', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['INACTIVE', 'bg-neutral-300/40 border-neutral-300'],    
  ])