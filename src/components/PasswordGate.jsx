import { useState } from "react"
import Button from "./ui/Button"
import logo from "../assets/images/logo-foncier.png"

const PASSWORD = "Foncier+2026"
const STORAGE_KEY = "foncier-plus-unlocked"

function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => localStorage.getItem(STORAGE_KEY) === "true")
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  if (unlocked) return children

  function handleSubmit(e) {
    e.preventDefault()
    if (value === PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true")
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[380px] flex flex-col gap-6 items-center bg-white p-8 shadow-[0px_2px_12px_rgba(4,63,84,0.1)]"
      >
        <img src={logo} alt="Foncier+" className="w-[180px] h-auto" />
        <p className="text-[14px] text-grey-600 text-center">
          Ce prototype est protégé. Merci de saisir le mot de passe pour continuer.
        </p>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            placeholder="Mot de passe"
            className={`h-12 w-full px-[17px] border text-[15px] text-brand-blue outline-none transition-colors ${
              error ? "border-brand-red" : "border-grey-200 focus:border-brand-blue"
            }`}
          />
          {error && <p className="text-[13px] text-brand-red">Mot de passe incorrect.</p>}
        </div>
        <Button type="submit" variant="solid" className="w-full">
          Accéder au prototype
        </Button>
      </form>
    </div>
  )
}

export default PasswordGate
