import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type Props = {
  rolls: string[]
  presentRolls: Set<string>
  title?: string
}

export default function CopyAttendance({ rolls, presentRolls, title }: Props) {
  const present = rolls.filter((r) => presentRolls.has(r))
  const absent = rolls.filter((r) => !presentRolls.has(r))
  const date = new Date().toLocaleDateString()

  const handleCopy = () => {
    const text = `Batch: ${title ?? "N/A"}
Date: ${date}

Present (${present.length}):
${present.join(", ")}

Absent (${absent.length}):
${absent.join(", ")}`

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Attendance copied to clipboard!")
      })
      .catch(() => {
        toast.error("Failed to copy. Please try again.")
      })
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <p className="text-sm text-muted-foreground">Title</p>
        <p className="font-semibold">{title ?? "N/A"}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Date</p>
        <p className="font-semibold">{date ?? "N/A"}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          Present ({present.length})
        </p>
        <p className="font-semibold">{present.join(", ") || "None"}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">
          Absent ({absent.length})
        </p>
        <p className="font-semibold">{absent.join(", ") || "None"}</p>
      </div>
      <Button onClick={handleCopy}>Copy to Clipboard</Button>
    </div>
  )
}
