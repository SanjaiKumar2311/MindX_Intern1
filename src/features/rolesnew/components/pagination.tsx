
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface PageContext {
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  first: boolean
  last: boolean
}


interface PaginationProps {
  pageContext: PageContext
  onPageChange: (page: number) => void
  onItemsPerPageChange: (pageSize: number) => void
  selectedCount: number
}

const Pagination=({
  pageContext,
  selectedCount,
  onPageChange,
  onItemsPerPageChange
}: PaginationProps)  => {
  
  const {
    pageNumber,
    pageSize,
    totalElements,
    totalPages,
    first,
    last,
  } = pageContext;
  console.log(pageSize,"Pagesize");
  

  return (
    <div className='flex items-center justify-between overflow-clip px-2' style={{ overflowClipMargin: 1 }} >
      <div className='hidden flex-1 text-sm text-muted-foreground sm:block'>
        {selectedCount} of {totalElements} row(s) selected.
      </div>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
          <Select
            value={`${pageSize}`} 
            // value={String(pageSize)}           
            onValueChange={(value) => {
              console.log(value);
              
              onItemsPerPageChange(Number(value))}}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
          Page {pageNumber + 1} of {totalPages}
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onPageChange(0)}
            disabled={first}
          >
            <span className='sr-only'>Go to first page</span>
            <ChevronsLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(pageNumber - 1)}
            disabled={first}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='h-8 w-8 p-0'
            onClick={() => onPageChange(pageNumber+1)}
            disabled={last}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            variant='outline'
            className='hidden h-8 w-8 p-0 lg:flex'
            onClick={() => onPageChange(totalPages-1)}
            disabled={last}
          >
            <span className='sr-only'>Go to last page</span>
            <ChevronsRight className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Pagination