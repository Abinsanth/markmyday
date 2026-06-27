import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import { toast } from "sonner"

type Props = {
  rolls: string[]
  presentRolls: Set<string>
  title?: string
  selectedDate?: Date
  onBack: () => void
}

export default function CopyAttendance({
  rolls,
  presentRolls,
  title,
  selectedDate,
  onBack,
}: Props) {
  const present = rolls.filter((r) => presentRolls.has(r))
  const absent = rolls.filter((r) => !presentRolls.has(r))
  const date = (selectedDate ?? new Date()).toLocaleDateString()
  const total = rolls.length
  const percentage = Math.round((present.length / total) * 100)

  const handleCopy = () => {
    const text = `Batch: ${title ?? "N/A"}
Date: ${date}

Present (${present.length}):
${present.join(", ")}

Absent (${absent.length}):
${absent.join(", ")}`

    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Attendance copied to clipboard!"))
      .catch(() => toast.error("Failed to copy. Please try again."))
  }

  return (
    <div className="space-y-4 p-4">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Attendance
      </button>

      {/* Summary card */}
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Batch</p>
            <p className="font-semibold">{title ?? "N/A"}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-semibold">{date}</p>
          </div>
        </div>

        {/* Attendance percentage */}
        <div
          className={`text-center text-2xl font-bold ${
            percentage < 50 ? "text-red-500" : "text-green-500"
          }`}
        >
          {percentage}% Attendance
        </div>

        {/* Present */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-green-500">
            Present ({present.length})
          </p>
          <p className="text-sm text-muted-foreground">
            {present.join(", ") || "None"}
          </p>
        </div>

        {/* Absent */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-red-500">
            Absent ({absent.length})
          </p>
          <p className="text-sm text-muted-foreground">
            {absent.join(", ") || "None"}
          </p>
        </div>
      </div>

      <Button className="w-full" onClick={handleCopy}>
        Copy to Clipboard
      </Button>
    </div>
  )
}
