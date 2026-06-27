import { Button } from "@/components/ui/button"
import { useState } from "react"
import CopyAttendance from "./CopyAttendance"

type Props = {
  rolls: string[]
}

export default function AttendancePanel({ rolls }: Props) {
  const [presentRolls, setPresentRolls] = useState<Set<string>>(new Set())
  const [showCopy, setShowCopy] = useState(false)

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
    <div className="">
      {showCopy ? (
        <CopyAttendance rolls={rolls} presentRolls={presentRolls} />
      ) : (
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
      )}
      <Button onClick={() => setShowCopy((p) => !p)}>
        {showCopy ? "Back" : "Show"}
      </Button>
      {/* <Button onClick={() => console.log(presentRolls)}>show</Button> */}
      <Button onClick={clearAttendance}>clear</Button>
    </div>
  )
}
