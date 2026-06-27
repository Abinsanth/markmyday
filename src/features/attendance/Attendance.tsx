import { useState } from "react"
import { Button } from "@/components/ui/button"
import List from "../list/List"
import AttendancePanel from "./AttendancePanel"
import CopyAttendance from "./CopyAttendance"

export default function Attendance() {
  const [rolls, setRolls] = useState<string[]>([])
  const [listName, setListName] = useState("")
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [presentRolls, setPresentRolls] = useState<Set<string>>(new Set())

  const handleStart = () => {
    if (rolls.length === 0) return
    setStarted(true)
    setFinished(false)
    setPresentRolls(new Set())
  }

  if (finished) {
    return (
      <CopyAttendance
        rolls={rolls}
        presentRolls={presentRolls}
        title={listName}
      />
    )
  }

  if (started) {
    return (
      <AttendancePanel
        rolls={rolls}
        presentRolls={presentRolls}
        setPresentRolls={setPresentRolls}
        onFinish={() => setFinished(true)}
      />
    )
  }

  return (
    <div className="flex w-full flex-col justify-center gap-4 p-4">
      <div>
        <span className="text-xl font-bold">Welcome</span>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 px-3">
          <span>Take Attendance</span>
          <span>Choose a list</span>
        </div>
        <List
          onSelect={(rolls, name) => {
            setRolls(rolls)
            setListName(name)
          }}
        />
        <Button
          variant="outline"
          disabled={rolls.length === 0}
          onClick={handleStart}
        >
          Take Attendance
        </Button>
      </div>
    </div>
  )
}
