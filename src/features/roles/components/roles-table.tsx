// import React from 'react'
// import TasksImportDialog from './task-import-dialog'
// import TasksMutateDrawer from './tasks-mutate-drawer'
import TasksPrimaryButtons from './tasks-primary-buttons'
import DataTable from './data-table'
import { tasks } from '../data/tasks'
import { columns } from './columns'

const RolesTable = () => {
    
  return (
    <>
     <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <TasksPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
    </>
  )
}

export default RolesTable