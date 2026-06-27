import { Calendar } from "@/components/ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"

type Props = {
  onDateChange: (date: Date | undefined) => void
  selected: Date | undefined
}

export function DatePicker({ onDateChange, selected }: Props) {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onDateChange}
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2040, 11)}
          captionLayout="dropdown"
          className="bg-transparent [--cell-size:2.1rem]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
