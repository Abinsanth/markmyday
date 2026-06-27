import { useState } from "react"
import { Button } from "@/components/ui/button"
import List from "../list/List"
import AttendancePanel from "./AttendancePanel"
import CopyAttendance from "./CopyAttendance"
import { useAuth } from "@/context/AuthContext"
import { CalendarIcon } from "lucide-react"

type Props = {
  selectedDate: Date | undefined
}

export default function Attendance({ selectedDate }: Props) {
  const [rolls, setRolls] = useState<string[]>([])
  const [listName, setListName] = useState("")
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [presentRolls, setPresentRolls] = useState<Set<string>>(new Set())
  const { session } = useAuth()
  const name = session?.user?.user_metadata?.full_name ?? "User"

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
        selectedDate={selectedDate}
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
    <div className="flex w-full flex-col gap-6 p-6">
      {/* Welcome */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Welcome, {name} </h1>
        <p className="text-sm text-muted-foreground">
          Mark and copy attendance in just a few steps.
        </p>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Attendance Date:</span>
        <span className="font-medium">
          {(selectedDate ?? new Date()).toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Steps */}
      {/* <div className="space-y-3 rounded-lg border bg-card p-4">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          How it works
        </h2>
        <ol className="list-inside list-decimal space-y-2 text-sm text-muted-foreground">
          <li>Select a saved student list from the dropdown below.</li>
          <li>
            Click{" "}
            <span className="font-medium text-foreground">Take Attendance</span>{" "}
            to start marking.
          </li>
          <li>
            Tap each roll number —{" "}
            <span className="font-medium text-green-500">green</span> means
            present, default means absent.
          </li>
          <li>
            Click <span className="font-medium text-foreground">Finish</span> to
            review and copy the attendance.
          </li>
        </ol>
      </div> */}

      {/* List Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Select a List</label>
        <List
          onSelect={(rolls, name) => {
            setRolls(rolls)
            setListName(name)
          }}
        />
        {rolls.length > 0 && (
          <p className="text-xs text-muted-foreground">
            {rolls.length} students in this list.
          </p>
        )}
      </div>

      <Button disabled={rolls.length === 0} onClick={handleStart}>
        Take Attendance
      </Button>
    </div>
  )
}
