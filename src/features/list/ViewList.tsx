import { useLists } from "@/hooks/useLists"

export default function ViewList() {
  const { lists, loading, error } = useLists()

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Your Lists</h2>
      {lists.length === 0 ? (
        <p className="text-sm text-muted-foreground">No lists yet.</p>
      ) : (
        <div className="space-y-3">
          {lists.map((list) => (
            <div
              key={list.id}
              className="space-y-2 rounded-lg border bg-card p-4"
            >
              <h3 className="font-semibold">{list.name}</h3>
              <p className="text-sm text-muted-foreground">
                {list.rolls.length} students
              </p>
              <p className="text-sm text-muted-foreground">
                {list.rolls.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
