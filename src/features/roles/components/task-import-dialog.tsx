
import  { useRef } from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
// import { toast } from 'sonner'
import { Input } from '@/components/ui/input'

interface Props {
    open: boolean
    onOpenChange: (val: boolean) => void
  }

const TasksImportDialog = ({open, onOpenChange}: Props) => {

    
        const fileInputRef = useRef<HTMLInputElement>(null)
    
      // const onSubmit = () => {
      //   const file = fileInputRef.current?.files?.[0]
    
      //   if (file) {
      //       const fileDetails = {
      //         name: file.name,
      //         size: file.size,
      //         type: file.type,
      //       }
      //     toast( 'You have imported the following file:',{            
      //       description: (
      //         <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
      //           <code className='text-white'>{JSON.stringify(fileDetails, null, 2)}</code>
      //         </pre>
      //       ),
      //     })
      //   }
      //   onOpenChange(false)
      // }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='gap-2 sm:max-w-sm'>
        <DialogHeader className='text-left'>
          <DialogTitle>Import Tasks</DialogTitle>
          <DialogDescription>
            Import tasks quickly from a CSV file.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-2'>
          <label htmlFor='file' className='text-sm font-medium'>
            File
          </label>
          <Input id='file' type='file' ref={fileInputRef} className='h-8' />
        </div>

        <DialogFooter className='gap-2 sm:gap-0'>
          <DialogClose asChild>
            <Button variant='outline'>Close</Button>
          </DialogClose>
          <Button type='submit' form='task-import-form'>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default TasksImportDialog