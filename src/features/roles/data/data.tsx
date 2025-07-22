// import {
//     IconArrowDown,
    
//     IconArrowRight,
    
//     IconArrowUp,
    
//     IconCircle,
    
//     IconCircleCheck,
    
//     IconCircleX,
    
//     IconExclamationCircle,
    
//     IconStopwatch,
    
//   } from '@tabler/icons-react'
import { ArrowDown,ArrowRight,ArrowUp,Circle,CircleCheck,CircleX,CircleAlert,Timer } from 'lucide-react'
  
  export const labels = [
    {
      value: 'bug',
      label: 'Bug',
    },
    {
      value: 'feature',
      label: 'Feature',
    },
    {
      value: 'documentation',
      label: 'Documentation',
    },
  ]
  
  export const statuses = [
    {
      value: 'backlog',
      label: 'Backlog',
      icon: CircleAlert,
    },
    {
      value: 'todo',
      label: 'Todo',
      icon: Circle,
    },
    {
      value: 'in progress',
      label: 'In Progress',
      icon: Timer,
    },
    {
      value: 'done',
      label: 'Done',
      icon: CircleCheck,
    },
    {
      value: 'canceled',
      label: 'Canceled',
      icon: CircleX,
    },
  ]
  
  export const priorities = [
    {
      label: 'Low',
      value: 'low',
      icon: ArrowDown,
    },
    {
      label: 'Medium',
      value: 'medium',
      icon: ArrowRight,
    },
    {
      label: 'High',
      value: 'high',
      icon: ArrowUp,
    },
  ]