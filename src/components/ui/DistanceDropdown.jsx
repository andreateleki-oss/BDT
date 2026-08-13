import { useState, useRef, useEffect } from "react"
import { CaretUp, CaretDown } from "@phosphor-icons/react"

function DistanceDropdown({ options, value, onChange, placeholder = "Sélectionner" }) {
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
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="border-l border-grey-200 pl-2 flex items-center gap-1 h-full"
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
            <label key={opt} className="flex items-center gap-2 cursor-pointer">
              <span
                className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  value === opt ? "border-brand-red" : "border-grey-300"
                }`}
              >
                {value === opt && <span className="size-3 rounded-full bg-brand-red" />}
              </span>
              <input
                type="radio"
                className="sr-only"
                checked={value === opt}
                onChange={() => {
                  onChange(opt)
                  setOpen(false)
                }}
              />
              <span className="text-[14px] font-semibold text-grey-900 whitespace-nowrap">{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default DistanceDropdown
