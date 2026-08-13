import { useState, useRef, useEffect } from "react"
import { CaretDown } from "@phosphor-icons/react"

function Dropdown({ label, placeholder, options, value, onChange, className = "", muted = true }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`flex flex-col gap-2 relative ${className}`} ref={ref}>
      {label && (
        <p className="font-heading text-[12px] uppercase text-brand-blue">{label}</p>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`h-12 flex items-center justify-between px-[17px] border text-left transition-colors hover:border-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
          muted ? "bg-grey-50 border-grey-200" : "bg-white border-grey-200"
        }`}
      >
        <span className={`text-[15px] truncate ${value ? "text-brand-blue" : "text-grey"}`}>
          {value || placeholder}
        </span>
        <CaretDown
          size={20}
          className={`text-grey shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-grey-200 shadow-lg z-30 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              className="w-full text-left px-[17px] py-3 text-[15px] text-brand-blue hover:bg-grey-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
