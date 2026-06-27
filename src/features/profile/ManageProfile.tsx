import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { toast } from "sonner"
import { usePasswordToggle } from "@/hooks/usePasswordToggle"

export default function ManageProfile() {
  const { session } = useAuth()
  const user = session?.user

  const [name, setName] = useState(user?.user_metadata?.full_name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { show: showCurrent, icon: currentIcon } = usePasswordToggle()
  const { show: showNew, icon: newIcon } = usePasswordToggle()
  const { show: showConfirm, icon: confirmIcon } = usePasswordToggle()

  const handleUpdateName = async () => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    })
    if (error) toast.error(error.message)
    else toast.success("Name updated successfully!")
    setLoading(false)
  }

  const handleUpdateEmail = async () => {
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ email })
    if (error) toast.error(error.message)
    else toast.success("Email updated successfully!")
    setLoading(false)
  }

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) toast.error(error.message)
    else {
      toast.success("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    setLoading(false)
  }

  return (
    <div className="max-w-md space-y-6 p-6">
      <h2 className="text-lg font-semibold">Manage Profile</h2>

      {/* Name */}
      <div className="space-y-3 rounded-lg border bg-card p-4">
        <h3 className="text-sm font-medium">Display Name</h3>
        <FieldGroup>
          <Field>
            <FieldLabel>Full Name</FieldLabel>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </Field>
          <Button onClick={handleUpdateName} disabled={loading}>
            Update Name
          </Button>
        </FieldGroup>
      </div>

      {/* Email */}
      <div className="space-y-3 rounded-lg border bg-card p-4">
        <h3 className="text-sm font-medium">Email Address</h3>
        <FieldGroup>
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
            />
          </Field>
          <Button onClick={handleUpdateEmail} disabled={loading}>
            Update Email
          </Button>
        </FieldGroup>
      </div>

      {/* Password */}
      <div className="space-y-3 rounded-lg border bg-card p-4">
        <h3 className="text-sm font-medium">Change Password</h3>
        <FieldGroup>
          <Field>
            <FieldLabel>Current Password</FieldLabel>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              {currentIcon}
            </div>
          </Field>
          <Field>
            <FieldLabel>New Password</FieldLabel>
            <FieldDescription>Must be at least 8 characters.</FieldDescription>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {newIcon}
            </div>
          </Field>
          <Field>
            <FieldLabel>Confirm New Password</FieldLabel>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmIcon}
            </div>
          </Field>
          <Button onClick={handleUpdatePassword} disabled={loading}>
            Update Password
          </Button>
        </FieldGroup>
      </div>
    </div>
  )
}
