import { Button } from '@/components/ui/button'


const AddContent = () => {
  return (
            <div className=" max-w-md">
      {/* <h2 className="text-lg font-semibold">Connect to Zendesk</h2> */}
      <p className="text-sm text-muted-foreground mt-1">
        Start by creating public articles or syncing / importing your existing knowledge base from Zendesk. Then customize your on-brand help center and set it live so customers can self-serve
      </p>
      <Button variant="default" className="mt-4 bg-black text-white rounded-full hover:bg-black/80">
        Add Content
      </Button>
    </div>
  )
}

export default AddContent