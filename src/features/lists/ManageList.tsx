import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type ListItem } from "@/hooks/useLists"
import ListCard from "./ListCard"
import CreateListForm from "./CreateListForm"
import type { DashboardContext } from "@/dashboard/Dashboard"

type View = "list" | "create" | "edit"

export default function ManageList() {
  const { listsData } = useOutletContext<DashboardContext>()
  const { lists, loading, error, createList, updateList, deleteList } =
    listsData
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
      if (!err) {
        setEditingList(undefined)
        setView("list")
      }
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

  if (view === "create" || view === "edit") {
    return (
      <div>
        <button
          onClick={handleCancel}
          className="flex items-center gap-1 p-4 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Lists
        </button>
        <CreateListForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editingList={editingList}
        />
      </div>
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
