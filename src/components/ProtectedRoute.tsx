import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { LoaderIcon } from "lucide-react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderIcon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )

  if (!session) return <Navigate to="/login" />

  return <>{children}</>
}
