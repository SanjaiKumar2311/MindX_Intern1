import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  // ChartSpline,
  Command,
  Frame,
  GalleryVerticalEnd,
  Inbox,
  Map,
  PieChart,
  Settings2,  
  Users,
} from "lucide-react"

import { NavMain } from "@/layouts/components/nav-main"
// import { NavProjects } from "@/layouts/components/nav-projects"
import { NavUser } from "@/layouts/components/nav-user"
import { TeamSwitcher } from "@/layouts/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Inbox",
      url: "/inbox",
      icon: Inbox,
      items: []
    },
    {
      title: "AI Agent",
      url: "/ai-agent",
      icon: Bot,
      items: []
    },
    {
      title: "Training",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Knowledge",
          url: "/articles",
        },
        {
          title: "Actions",
          url: "/actions",
        },
        // {
        //   title: "Processes",
        //   url: "/processes",
        // },
      ],
    },
    // {
    //   title: "Report",
    //   url: "/report",
    //   icon: ChartSpline,
    //   items: []
    // },
    {
      title: "Contact",
      url: "/contact",
      icon: Users,
      items: []
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
      items: []
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
