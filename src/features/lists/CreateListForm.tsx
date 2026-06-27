import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { type ListItem } from "@/hooks/useLists"

type Props = {
  onSubmit: (name: string, rolls: string[]) => Promise<any>
  onCancel: () => void
  editingList?: ListItem
}

export default function CreateListForm({
  onSubmit,
  onCancel,
  editingList,
}: Props) {
  const [name, setName] = useState("")
  const [mode, setMode] = useState<"range" | "manual">("range")

  // Range mode
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [exclude, setExclude] = useState("")

  // Manual mode
  const [manualRolls, setManualRolls] = useState("")

  const [preview, setPreview] = useState<string[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Prefill if editing
  useEffect(() => {
    if (editingList) {
      setName(editingList.name)
      setMode("manual")
      setManualRolls(editingList.rolls.join(", "))
      setPreview(editingList.rolls)
    }
  }, [editingList])

  const generatePreview = () => {
    setError("")
    if (mode === "range") {
      const f = parseInt(from)
      const t = parseInt(to)
      if (isNaN(f) || isNaN(t) || f > t) {
        setError("Invalid range")
        return
      }
      const excludeSet = new Set(
        exclude
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
      const rolls = []
      for (let i = f; i <= t; i++) {
        if (!excludeSet.has(String(i))) rolls.push(String(i))
      }
      setPreview(rolls)
    } else {
      const rolls = manualRolls
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)

      const allNumeric = rolls.every((r) => !isNaN(Number(r)))
      const sorted = allNumeric
        ? [...rolls].sort((a, b) => Number(a) - Number(b))
        : [...rolls].sort()

      setPreview(sorted)
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("List name is required")
      return
    }
    if (!preview.length) {
      setError("Generate a preview first")
      return
    }

    setLoading(true)
    const err = await onSubmit(name, preview)
    if (err) setError(err.message)
    setLoading(false)
  }

  return (
    <div className="space-y-4 p-4">
      <FieldGroup>
        {/* List Name */}
        <Field>
          <FieldLabel>List Name</FieldLabel>
          <Input
            placeholder="e.g. Class A"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant={mode === "range" ? "default" : "outline"}
            onClick={() => setMode("range")}
          >
            Range
          </Button>
          <Button
            type="button"
            variant={mode === "manual" ? "default" : "outline"}
            onClick={() => setMode("manual")}
          >
            Manual
          </Button>
        </div>

        {/* Range Mode */}
        {mode === "range" ? (
          <>
            <Field>
              <FieldLabel>From</FieldLabel>
              <Input
                type="number"
                placeholder="1"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>To</FieldLabel>
              <Input
                type="number"
                placeholder="60"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel>Exclude</FieldLabel>
              <Input
                placeholder="e.g. 15, 32, 47"
                value={exclude}
                onChange={(e) => setExclude(e.target.value)}
              />
              <FieldDescription>
                Comma separated roll numbers to exclude
              </FieldDescription>
            </Field>
          </>
        ) : (
          /* Manual Mode */
          <Field>
            <FieldLabel>Roll Numbers</FieldLabel>
            <Input
              placeholder="e.g. CS001, CS002, CS045"
              value={manualRolls}
              onChange={(e) => setManualRolls(e.target.value)}
            />
            <FieldDescription>Comma separated roll numbers</FieldDescription>
          </Field>
        )}

        {/* Error */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Preview Button */}
        <Button type="button" variant="outline" onClick={generatePreview}>
          Preview
        </Button>

        {/* Preview Result */}
        {preview.length > 0 && (
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="mb-1 font-semibold">{preview.length} students</p>
            <p className="text-muted-foreground">{preview.join(", ")}</p>
          </div>
        )}

        {/* Actions */}
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : editingList ? "Update List" : "Save List"}
        </Button>
      </FieldGroup>
    </div>
  )
}
