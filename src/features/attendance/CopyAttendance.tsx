import { Button } from "@/components/ui/button"

type Props = {
  rolls: string[]
  presentRolls: Set<string>
  title?: string
  date?: string
}

export default function CopyAttendance({
  rolls,
  presentRolls,
  title,
  date,
}: Props) {
  const present = rolls.filter((r) => presentRolls.has(r))
  const absent = rolls.filter((r) => !presentRolls.has(r))

  const handleCopy = () => {
    const text = `
Title: ${title ?? "N/A"}
Date: ${date ?? "N/A"}

Present (${present.length}): 
${present.join(", ")}
Absent (${absent.length}):
 ${absent.join(", ")}
    `.trim()

    navigator.clipboard.writeText(text)
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
