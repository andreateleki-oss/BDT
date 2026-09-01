import { useState, useRef, useEffect } from "react"
import { CaretUp, CaretDown } from "@phosphor-icons/react"

function DistanceDropdown({ options, value, onChange, placeholder = "Sélectionner" }) {
  const [open, setOpen] = useState(false)
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
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border border-grey-200 bg-white h-12 w-full px-[17px] flex items-center justify-between gap-1 transition-colors hover:border-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <span className={`text-[15px] whitespace-nowrap ${value ? "text-brand-blue" : "text-grey"}`}>
          {value || placeholder}
        </span>
        {open ? (
          <CaretUp size={20} className="text-brand-blue shrink-0" />
        ) : (
          <CaretDown size={20} className="text-grey shrink-0" />
        )}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-grey-200 shadow-lg rounded-sm z-30 p-4 flex flex-col gap-4 w-max">
          {options.map((opt) => (
            <label key={opt} className="group flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                className="sr-only peer"
                checked={value === opt}
                onChange={() => {
                  onChange(opt)
                  setOpen(false)
                }}
              />
              <span
                className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-brand-blue ${
                  value === opt ? "border-brand-red" : "border-grey-300 group-hover:border-brand-blue"
                }`}
              >
                {value === opt && <span className="size-3 rounded-full bg-brand-red" />}
              </span>
              <span className="text-[14px] font-semibold text-grey-900 whitespace-nowrap">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default DistanceDropdown
