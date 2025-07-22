import { Button } from '@/components/ui/button'
import { DownloadIcon, PlusIcon } from 'lucide-react'
// import React from 'react'

const TasksPrimaryButtons = () => {
  return (
    <div className='flex gap-2'>
    <Button
      variant='outline'
      className='space-x-1'        
    >
      <span>Import</span> <DownloadIcon size={18} />
    </Button>
    <Button className='space-x-1' >
      <span>Create</span> <PlusIcon size={18} />
    </Button>
  </div>
  )
}

export default TasksPrimaryButtons