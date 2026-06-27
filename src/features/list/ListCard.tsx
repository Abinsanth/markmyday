import { Button } from "@/components/ui/button"
import type { ListItem } from "@/hooks/useLists"
type Props = {
  list: ListItem
  onEdit: (list: ListItem) => void
  onDelete: (id: string) => void
}

export default function ListCard({ list, onEdit, onDelete }: Props) {
  return (
    <div className="space-y-2 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">{list.name}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(list)}>
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              if (confirm(`Delete "${list.name}"?`)) onDelete(list.id)
            }}
          >
            Delete
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {list.rolls.length} students
      </p>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {list.rolls.join(", ")}
      </p>
    </div>
  )
}
