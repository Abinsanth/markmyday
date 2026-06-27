import { Button } from "@/components/ui/button"

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
                  : ""
              }`}
            >
              {roll}
            </Button>
          )
        })}
      </div>
      <div className="flex gap-2">
        <Button onClick={onFinish}>Finish</Button>
        <Button variant="outline" onClick={clearAttendance}>
          Clear
        </Button>
      </div>
    </div>
  )
}
