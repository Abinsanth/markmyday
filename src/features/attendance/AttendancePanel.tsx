import { Button } from "@/components/ui/button"
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

  return (
    <div className="space-y-4 p-4">
      {/* Count indicator */}
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>{presentRolls.size} present</span>
        <span>{rolls.length - presentRolls.size} absent</span>
        <span>{rolls.length} total</span>
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
                  ? "border-0 !bg-green-500 text-white hover:!bg-green-600"
                  : "border-0 !bg-red-100 text-red-500 hover:!bg-red-200"
              }`}
            >
              {roll}
            </Button>
          )
        })}
      </div>

      {/* Actions - pushed apart */}
      <div className="flex justify-between">
        <Button disabled={presentRolls.size === 0} onClick={onFinish}>
          Finish
        </Button>
        <ConfirmDialog
          trigger={<Button variant="outline">Clear</Button>}
          title="Clear Attendance?"
          description="This will reset all marked attendance. This action cannot be undone."
          confirmLabel="Clear"
          onConfirm={clearAttendance}
        />
      </div>
    </div>
  )
}
