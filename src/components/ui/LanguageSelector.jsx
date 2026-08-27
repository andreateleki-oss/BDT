import { useState, useRef, useEffect } from "react"
import { Globe, CaretDown } from "@phosphor-icons/react"

const LANGUAGES = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
]

function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState("FR")
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-2 px-4 py-1 text-brand-blue font-accent font-semibold underline rounded-sm transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <Globe size={20} />
        {lang}
        <CaretDown size={20} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-grey-200 shadow-lg z-30 min-w-[140px]">
          {LANGUAGES.map((l) => (
            <button
              type="button"
              key={l.code}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-[15px] no-underline font-accent hover:bg-grey-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-brand-blue ${
                l.code === lang ? "font-semibold text-brand-blue" : "text-brand-blue/80"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
