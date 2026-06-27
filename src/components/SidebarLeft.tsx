import * as React from "react"
import { NavMain } from "@/components/NavMain"
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
import { NavUser } from "./NavUser"
import { DatePicker } from "./DatePicker"

type Props = React.ComponentProps<typeof Sidebar> & {
  onNavigate: (path: string) => void
  activePath: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function SidebarLeft({
  onNavigate,
  activePath,
  selectedDate,
  onDateChange,
  ...props
}: Props) {
  const navMain = [
    {
      title: "Take Attendance",
      icon: <ClipboardListIcon />,
      isActive: activePath === "/dashboard/attendance",
      onClick: () => onNavigate("/dashboard/attendance"),
    },
    {
      title: "View Lists",
      icon: <ListIcon />,
      isActive: activePath === "/dashboard/view-lists",
      onClick: () => onNavigate("/dashboard/view-lists"),
    },
    {
      title: "Manage Lists",
      icon: <FolderPenIcon />,
      isActive: activePath === "/dashboard/manage-lists",
      onClick: () => onNavigate("/dashboard/manage-lists"),
    },
    {
      title: "Profile",
      icon: <UserRoundIcon />,
      isActive: activePath === "/dashboard/profile",
      onClick: () => onNavigate("/dashboard/profile"),
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
