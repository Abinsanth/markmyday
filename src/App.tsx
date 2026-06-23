import { Button } from "@/components/ui/button"
import { LoginForm } from "./components/login-form"
import Dashboard from "./dashboard/Dashboard"

export function App() {
  return (
    // <div className="flex min-h-svh p-6">
    //   <div className="w-full bg-red-400">
    //     <Dashboard />
    //   </div>
    // </div>
    <div className="h-full w-full">
      <Dashboard />
    </div>
  )
}

export default App
