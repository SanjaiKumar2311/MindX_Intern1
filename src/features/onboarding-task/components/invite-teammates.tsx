import { Button } from '@/components/ui/button'


const InviteTeammates = () => {
  return (
            <div className=" max-w-md">
      {/* <h2 className="text-lg font-semibold">Connect to Zendesk</h2> */}
      <p className="text-sm text-muted-foreground mt-1">
        Now you can ask teammates to join your workspace and set their permissions. Depending on your plan, you can also assign lite seats to collaborate with teammates outside of your Support team.
      </p>
      <Button variant="default" className="mt-4 bg-black text-white rounded-full hover:bg-black/80">
        Invite team
      </Button>
    </div>
  )
}

export default InviteTeammates