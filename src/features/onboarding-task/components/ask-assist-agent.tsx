import { Button } from '@/components/ui/button'

const AskAssistAgent = () => {
  return (
            <div className=" max-w-md">
      {/* <h2 className="text-lg font-semibold">Connect to Zendesk</h2> */}
      <p className="text-sm text-muted-foreground mt-1">
        If you’d like to test Fin internally with teammates, or trial it on a specific group of customers, it’s easy to do this using audience rules.
      </p>
      <Button variant="default" className="mt-4 bg-black text-white rounded-full hover:bg-black/80">
        Test Fin
      </Button>
    </div>
  )
}

export default AskAssistAgent