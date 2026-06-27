import { Button } from "@/components/ui/button"
import { List } from "../list/List"
import AttendancePanel from "./AttendancePanel"

type Props = {}

export default function Attendance({}: Props) {
  const rolls = ["1", "2", "3", "4", "5", "6", "7", "8"]
  return (
    <div className="flex w-full flex-col justify-center gap-4 p-4">
      <div className="bg-green-400">
        <span className="text-xl font-bold"> Welcome</span>
      </div>
      <div className="flex flex-col gap-2 bg-green-400">
        <div className="flex flex-col gap-2 px-3">
          <span>Take Attendance</span>
          <span>Choose a list</span>
        </div>
        <div>
          <List />
        </div>
        <div>
          <Button variant="outline">Take Attendance</Button>
        </div>
      </div>
      <div className="">
        <AttendancePanel rolls={rolls} />
      </div>
    </div>
  )
}
