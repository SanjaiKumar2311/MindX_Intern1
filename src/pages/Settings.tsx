import { Separator } from '@/components/ui/separator'
import SidebarNav from '@/features/settings/components/sidebar-nav'
import { Bell, Monitor, Palette, UserRound, Wrench } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const sidebarNavItems = [
    {
      title: 'Profile',
      icon: <UserRound size={18} />,      
      href: '/settings/profile',
    },
    {
      title: 'Account',
      icon: <Wrench size={18} />,
      href: '/settings/account',
    },
    {
      title: 'Appearance',
      icon: <Palette size={18} />,
      href: '/settings/appearance',
    },
    {
      title: 'Notifications',
      icon: <Bell size={18} />,
      href: '/settings/notifications',
    },
    {
      title: 'Display',
      icon: <Monitor size={18} />,
      href: '/settings/display',
    },
    {
      title: 'Roles',
      icon: <Monitor size={18} />,
      href: '/settings/roles',
    },
  ]

const Settings = () => {
  return (
    <div >
            <div className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Settings
          </h1>
          <p className='text-muted-foreground'>
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1 pr-4'>
            <Outlet />
          </div>
        </div>
    </div>
  )
}

export default Settings