import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLists, type ListItem } from "@/hooks/useLists"
import ListCard from "./ListCard"
import CreateListForm from "./CreateListForm"

type View = "list" | "create" | "edit"

export default function ManageList() {
  const { lists, loading, error, createList, updateList, deleteList } =
    useLists()
  const [view, setView] = useState<View>("list")
  const [editingList, setEditingList] = useState<ListItem | undefined>()

  const handleEdit = (list: ListItem) => {
    setEditingList(list)
    setView("edit")
  }

  const handleDelete = async (id: string) => {
    await deleteList(id)
  }

  const handleSubmit = async (name: string, rolls: string[]) => {
    if (editingList) {
      const err = await updateList(editingList.id, name, rolls)
      if (!err) setView("list")
      return err
    } else {
      const err = await createList(name, rolls)
      if (!err) setView("list")
      return err
    }
  }

  const handleCancel = () => {
    setEditingList(undefined)
    setView("list")
  }

  if (loading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-500">{error}</p>

  if (view === "create" || view === "edit") {
    return (
      <CreateListForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        editingList={editingList}
      />
    )
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Lists</h2>
        <Button onClick={() => setView("create")}>Create New List</Button>
      </div>
      {lists.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No lists yet. Create one to get started.
        </p>
      ) : (
        <div className="space-y-3">
          {lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
