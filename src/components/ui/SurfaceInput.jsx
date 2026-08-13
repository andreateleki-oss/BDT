import { useState, useRef, useEffect } from "react"
import { CaretDown } from "@phosphor-icons/react"

const UNITS = ["Ha", "m²"]

function SurfaceInput({ label, value, onChange, unit, onUnitChange, className = "" }) {
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
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <p className="font-heading text-[12px] uppercase text-brand-blue">{label}</p>
      )}
      <div className="h-12 bg-grey-50 border border-grey-200 flex items-center px-[17px] gap-2 relative transition-colors hover:border-brand-blue focus-within:border-brand-blue" ref={ref}>
        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0"
          className="w-full min-w-0 bg-transparent outline-none text-[15px] text-brand-blue placeholder:text-grey"
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="border-l border-grey-200 pl-2 flex items-center gap-1 text-grey text-[15px] shrink-0 hover:text-brand-blue transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          {unit}
          <CaretDown size={20} className="text-grey" />
        </button>
        {open && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-grey-200 shadow-lg z-30 w-20">
            {UNITS.map((u) => (
              <button
                type="button"
                key={u}
                onClick={() => {
                  onUnitChange(u)
                  setOpen(false)
                }}
                className="w-full text-left px-3 py-2 text-[15px] text-brand-blue hover:bg-grey-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
              >
                {u}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SurfaceInput
