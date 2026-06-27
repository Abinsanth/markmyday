import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export function usePasswordToggle() {
  const [show, setShow] = useState(false)

  const icon = (
    <button
      type="button"
      onClick={() => setShow((p) => !p)}
      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
    >
      {show ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
    </button>
  )

  return { show, icon }
}
