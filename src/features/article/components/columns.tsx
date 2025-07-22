import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Article>[] = [ 
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
      accessorKey: "title",      
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Article
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (<div className="capitalize">{row.getValue("title")}</div>),
    },
    {
      accessorKey: "source",
      header: ({ column }) => {
        return (
          <Button variant="ghost"onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Source <ArrowUpDown />
          </Button>
        )
      },
      // cell: ({ row }) => <div className="lowercase">{row.getValue("source.source")}</div>,
      cell: ({ row }) => {
        const source = row.getValue("source") as Source;
        return <div className="lowercase">{source.source}</div>;
      },
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

  export type Article = {
    id:  string
    title: string
    name: string
    description: string
    content: string
    createdAt: string
    updatedAt: string
    isEnable: boolean
    status: string
    source: Source
  }

  export type Source = {
    id: string
    source: string
    url: string
  }

  export const callTypes = new Map<string, string>([
    ['PUBLISHED', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['INACTIVE', 'bg-neutral-300/40 border-neutral-300'],    
  ])
 