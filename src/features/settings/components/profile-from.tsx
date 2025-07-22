import ContentSection from './content-section'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const ProfileFrom = () => {
  return (    
    <ContentSection title='Profile' desc='This is how others will see you on the site'>
        <>
        <form className="space-y-8">
      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          placeholder="shadcn"
        />
        <p className="text-sm text-muted-foreground">
          This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
        </p>
      </div>

      {/* Email Selector */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Select>
          <SelectTrigger id="email">
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m@example.com">m@example.com</SelectItem>
            <SelectItem value="m@google.com">m@google.com</SelectItem>
            <SelectItem value="m@support.com">m@support.com</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          You can manage verified email addresses in your <a href="/" className="underline">email settings</a>.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          placeholder="Tell us a little bit about yourself"
          defaultValue="I own a computer."
          className="resize-none"
        />
        <p className="text-sm text-muted-foreground">
          You can <span className="font-medium">@mention</span> other users and organizations to link to them.
        </p>
      </div>

      {/* URLs */}
      <div className="space-y-2">
        <Label htmlFor="url-0">URLs</Label>
        <p className="text-sm text-muted-foreground">
          Add links to your website, blog, or social media profiles.
        </p>
        <Input
          id="url-0"
          name="urls.0.value"
          defaultValue="https://shadcn.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url-1" className="sr-only">URLs</Label>
        <Input
          id="url-1"
          name="urls.1.value"
          defaultValue="http://twitter.com/shadcn"
        />
      </div>

      {/* Add URL Button (can be wired for dynamic inputs) */}
      <Button variant="outline" type="button" className="text-xs mt-2">
        Add URL
      </Button>

      {/* Submit Button */}
      <Button type="submit">
        Update profile
      </Button>
    </form>
        </>
    </ContentSection>
    
  )
}

export default ProfileFrom