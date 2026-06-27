import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

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

    if (!error) await fetchLists()
    return error
  }

  const updateList = async (id: string, name: string, rolls: string[]) => {
    const { error } = await supabase
      .from("lists")
      .update({ name, rolls })
      .eq("id", id)

    if (!error) await fetchLists()
    return error
  }

  const deleteList = async (id: string) => {
    const { error } = await supabase.from("lists").delete().eq("id", id)

    if (!error) await fetchLists()
    return error
  }

  useEffect(() => {
    fetchLists()
  }, [])

  return { lists, loading, error, createList, updateList, deleteList }
}
