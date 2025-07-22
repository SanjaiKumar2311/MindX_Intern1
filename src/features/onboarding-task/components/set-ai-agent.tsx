import { Button } from '@/components/ui/button'

const SetAiAgent = () => {
  return (
            <div className=" max-w-md">
      {/* <h2 className="text-lg font-semibold">Connect to Zendesk</h2> */}
      <p className="text-sm text-muted-foreground mt-1">
        All Fin needs to perform well and start resolving conversations is your support content, so you’ll need to get this added before you can preview and start interacting with Fin in the Messenger.
      </p>
      <Button variant="default" className="mt-4 bg-black text-white rounded-full hover:bg-black/80">
        Set up Fin
      </Button>
    </div>
  )
}

export default SetAiAgent