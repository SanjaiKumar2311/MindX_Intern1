import ActionForm from '@/features/actions/components/action-form'
import { useParams } from 'react-router-dom'


const Action = () => {
  const {actionId} = useParams();
  return (
    <div className='p-6'><ActionForm 
    mode={actionId ? "edit" : "create"}
    actionId={actionId ? actionId : undefined}/></div>
  )
}

export default Action