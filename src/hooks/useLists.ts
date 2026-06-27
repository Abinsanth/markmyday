import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

export type ListItem = {
  id: string
  name: string
  rolls: string[]
}

export function useLists() {
  const [lists, setLists] = useState<ListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchLists = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("lists")
      .select("id, name, rolls")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) setError(error.message)
    else setLists(data ?? [])

    setLoading(false)
  }

  const createList = async (name: string, rolls: string[]) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from("lists")
      .insert({ name, rolls, user_id: user.id })

    if (error) {
      toast.error(error.message)
      return error
    }
    toast.success("List created successfully!")
    await fetchLists()
  }

  const updateList = async (id: string, name: string, rolls: string[]) => {
    const { error } = await supabase
      .from("lists")
      .update({ name, rolls })
      .eq("id", id)

    if (error) {
      toast.error(error.message)
      return error
    }
    toast.success("List updated successfully!")
    await fetchLists()
  }

  const deleteList = async (id: string) => {
    const { error } = await supabase.from("lists").delete().eq("id", id)

    if (error) {
      toast.error(error.message)
      return error
    }
    toast.success("List deleted successfully!")
    await fetchLists()
  }

  useEffect(() => {
    fetchLists()
  }, [])

  return { lists, loading, error, createList, updateList, deleteList }
}
