import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    icon: React.ReactNode
    isActive?: boolean
    onClick?: () => void
  }[]
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton isActive={item.isActive} onClick={item.onClick}>
            {item.icon}
            <span>{item.title}</span>
          </SidebarMenuButton>
          <SidebarSeparator className="mx-0" />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
