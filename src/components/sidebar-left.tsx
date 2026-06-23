"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { SearchIcon, Settings2Icon, BlocksIcon } from "lucide-react"
import { NavUser } from "./nav-user"
import { DatePicker } from "./date-picker"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "View List",
      url: "#",
      icon: <SearchIcon />,
    },
    {
      title: "Manage List",
      url: "#",
      icon: <BlocksIcon />,
    },
    {
      title: "Manage Profile",
      url: "#",
      icon: <Settings2Icon />,
    },
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
        <SidebarSeparator className="mx-0" />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
