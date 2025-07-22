import Task from "@/features/onboarding-task/components/task"


const GettingStarted = () => {
  return (
        <div className='p-6'>
    {/* <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Get started with Fin</h2>
        <p className="text-muted-foreground">
        Set up and deploy Fin in less than an hour. Fin will automatically adapt to zendesk, follow your assignment rules, and hand off to your team.
        </p>
      </div>
    </div> */}

    <Task/>

  </div>
  )
}

export default GettingStarted