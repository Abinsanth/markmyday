import * as React from "react"
import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  ClipboardListIcon,
  ListIcon,
  FolderPenIcon,
  UserRoundIcon,
} from "lucide-react"
import { NavUser } from "./nav-user"
import { DatePicker } from "./date-picker"

type Props = React.ComponentProps<typeof Sidebar> & {
  onNavigate: (
    view: "attendance" | "view-list" | "manage-list" | "manage-profile"
  ) => void
  activeView: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function SidebarLeft({
  onNavigate,
  selectedDate,
  onDateChange,
  activeView,
  ...props
}: Props) {
  const navMain = [
    {
      title: "Take Attendance",
      icon: <ClipboardListIcon />,
      isActive: activeView === "attendance",
      onClick: () => onNavigate("attendance"),
    },
    {
      title: "View Lists",
      icon: <ListIcon />,
      isActive: activeView === "view-list",
      onClick: () => onNavigate("view-list"),
    },
    {
      title: "Manage Lists",
      icon: <FolderPenIcon />,
      isActive: activeView === "manage-list",
      onClick: () => onNavigate("manage-list"),
    },
    {
      title: "Profile",
      icon: <UserRoundIcon />,
      isActive: activeView === "manage-profile",
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
        <DatePicker selected={selectedDate} onDateChange={onDateChange} />
        <SidebarSeparator className="mx-0" />
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
