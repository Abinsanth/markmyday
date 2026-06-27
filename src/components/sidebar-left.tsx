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
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function SidebarLeft({
  onNavigate,
  selectedDate,
  onDateChange,
  ...props
}: Props) {
  const navMain = [
    {
      title: "Take Attendance",
      icon: <ClipboardListIcon />,
      onClick: () => onNavigate("attendance"),
    },
    {
      title: "View Lists",
      icon: <ListIcon />,
      onClick: () => onNavigate("view-list"),
    },
    {
      title: "Manage Lists",
      icon: <FolderPenIcon />,
      onClick: () => onNavigate("manage-list"),
    },
    {
      title: "Profile",
      icon: <UserRoundIcon />,
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
