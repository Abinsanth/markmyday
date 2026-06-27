import { Button } from "@/components/ui/button"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import ConfirmDialog from "@/components/ConfirmDialog"

type Props = {
  rolls: string[]
  presentRolls: Set<string>
  setPresentRolls: React.Dispatch<React.SetStateAction<Set<string>>>
  onFinish: () => void
}

export default function AttendancePanel({
  rolls,
  presentRolls,
  setPresentRolls,
  onFinish,
}: Props) {
  const toggleAttendance = (roll: string) => {
    setPresentRolls((prev) => {
      const updated = new Set(prev)
      if (updated.has(roll)) {
        updated.delete(roll)
      } else {
        updated.add(roll)
      }
      return updated
    })
  }

  const clearAttendance = () => {
    setPresentRolls(new Set())
  }

  const total = rolls.length
  const presentCount = presentRolls.size
  const absentCount = total - presentCount
  const percentage = Math.round((presentCount / total) * 100)

  return (
    <div className="space-y-4 p-4">
      {/* Count indicator */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{presentCount} present</span>
        <span>{absentCount} absent</span>
        <span>{total} total</span>
      </div>

      {/* Roll buttons */}
      <div className="grid grid-cols-5 gap-3">
        {rolls.map((roll) => {
          const isPresent = presentRolls.has(roll)
          return (
            <Button
              key={roll}
              onClick={() => toggleAttendance(roll)}
              variant="outline"
              className={`aspect-square h-auto w-full ${
                isPresent
                  ? "border-0 bg-green-500! text-white hover:bg-green-600!"
                  : "border-0 bg-red-100! text-red-500 hover:bg-red-200!"
              }`}
            >
              {roll}
            </Button>
          )
        })}
      </div>

      {/* Actions */}
      <div className="flex justify-between p-4">
        <ConfirmDialog
          trigger={<Button variant="outline">Clear</Button>}
          title="Clear Attendance?"
          description="This will reset all marked attendance. This action cannot be undone."
          confirmLabel="Clear"
          onConfirm={clearAttendance}
        />

        <ConfirmDialog
          trigger={<Button disabled={presentRolls.size === 0}>Finish</Button>}
          title="Finish Attendance?"
          description={
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
                <span>Present: {presentCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <XCircleIcon className="h-4 w-4 text-red-500" />
                <span>Absent: {absentCount}</span>
              </div>
              <div
                className={`font-medium ${
                  percentage < 50 ? "text-red-500" : "text-green-500"
                }`}
              >
                Attendance: {percentage}%
              </div>
            </div>
          }
          confirmLabel="Finish"
          onConfirm={onFinish}
        />
      </div>
    </div>
  )
}
