import * as React from "react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { SearchIcon, Settings2Icon, BlocksIcon, HomeIcon } from "lucide-react"
import { NavUser } from "./nav-user"
import { DatePicker } from "./date-picker"
type Props = React.ComponentProps<typeof Sidebar> & {
  onNavigate: (
    view: "attendance" | "view-list" | "manage-list" | "manage-profile"
  ) => void
}

export function SidebarLeft({ onNavigate, ...props }: Props) {
  const navMain = [
    {
      title: "Attendance",
      icon: <HomeIcon />,
      onClick: () => onNavigate("attendance"),
    },
    {
      title: "View List",
      icon: <SearchIcon />,
      onClick: () => onNavigate("view-list"),
    },
    {
      title: "Manage List",
      icon: <BlocksIcon />,
      onClick: () => onNavigate("manage-list"),
    },
    {
      title: "Manage Profile",
      icon: <Settings2Icon />,
      onClick: () => onNavigate("manage-profile"),
    },
  ]

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavUser />
        <SidebarSeparator className="mx-0" />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
