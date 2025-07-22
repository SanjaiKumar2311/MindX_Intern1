// import React from 'react'

// import { Input } from '@/components/ui/input'
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
// import { toast } from 'sonner'

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    // currentRow?: Task
  }
  
const TasksMutateDrawer = ({ open, onOpenChange,  }: Props) => {
    // const isUpdate = !!currentRow
  
    // const onSubmit = (data: TasksForm) => {
    //   // do something with the form data
    //   onOpenChange(false)
    // //   form.reset()
    //   toast('You submitted the following values:',{        
    //     description: (
    //       <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
    //         <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
    //       </pre>
    //     ),
    //   })
    // }
  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        // form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          {/* <SheetTitle>{isUpdate ? 'Update' : 'Create'} Task</SheetTitle> */}
          <SheetTitle>Task</SheetTitle>
          <SheetDescription>
            {/* {isUpdate
              ? 'Update the task by providing necessary info.'
              : 'Add a new task by providing necessary info.'} */}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        
        {/* <form
          id='tasks-form'
          onSubmit={onSubmit}
          className='flex-1 space-y-5 overflow-y-auto'
        >
          <div className='space-y-1'>
            <label className='text-sm font-medium'>Title</label>
            <Input  placeholder='Enter a title' />
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium'>Status</label>
            <select  className='h-10 rounded-md border px-3'>
              <option value=''>Select dropdown</option>
              <option value='in progress'>In Progress</option>
              <option value='backlog'>Backlog</option>
              <option value='todo'>Todo</option>
              <option value='canceled'>Canceled</option>
              <option value='done'>Done</option>
            </select>
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium'>Label</label>
            <div className='flex flex-col space-y-2'>
              {['documentation', 'feature', 'bug'].map((value, i) => (
                <label key={value} className='flex items-center space-x-2'>
                  <input
                    type='radio'
                    name='label'
                    value={value}
                    ref={(el) => (labelRef.current[i] = el!)}
                  />
                  <span className='capitalize'>{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className='space-y-1'>
            <label className='text-sm font-medium'>Priority</label>
            <div className='flex flex-col space-y-2'>
              {['high', 'medium', 'low'].map((value, i) => (
                <label key={value} className='flex items-center space-x-2'>
                  <input
                    type='radio'
                    name='priority'
                    value={value}
                    ref={(el) => (priorityRef.current[i] = el!)}
                  />
                  <span className='capitalize'>{value}</span>
                </label>
              ))}
            </div>
          </div>
        </form> */}
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='tasks-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default TasksMutateDrawer