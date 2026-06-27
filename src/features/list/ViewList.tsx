import { useOutletContext } from "react-router-dom"
import type { DashboardContext } from "@/dashboard/Dashboard"

export default function ViewList() {
  const { listsData } = useOutletContext<DashboardContext>()
  const { lists, loading, error } = listsData

  if (loading)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    )

  if (error)
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    )

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Your Lists</h2>
      {lists.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No lists yet. Go to Manage Lists to create one.
        </p>
      ) : (
        <div className="space-y-3">
          {lists.map((list) => (
            <div
              key={list.id}
              className="space-y-2 rounded-lg border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{list.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {list.rolls.length} students
                </span>
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {list.rolls.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
