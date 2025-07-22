import { Button } from '@/components/ui/button'

const Channels = () => {
  return (
        <div className=" max-w-md">
      {/* <h2 className="text-lg font-semibold">Connect to Zendesk</h2> */}
      <p className="text-sm text-muted-foreground mt-1">
        Customize to have a Messenger that looks and feels exactly like your brand, and suits your preferences such as when you’re available to chat and how inbound conversations are handled.
      </p>
      <Button variant="default" className="mt-4  text-white rounded-full hover:bg-black/80">
        Set up channels
      </Button>
    </div>
  )
}

export default Channels