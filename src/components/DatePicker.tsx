import { Calendar } from "@/components/ui/calendar"
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar"

type Props = {
  selected: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function DatePicker({ selected, onDateChange }: Props) {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onDateChange}
          captionLayout="dropdown"
          startMonth={new Date(2020, 0)}
          endMonth={new Date(2030, 11)}
          className="bg-transparent [--cell-size:2.1rem]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
