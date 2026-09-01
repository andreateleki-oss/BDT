import { useState, useRef, useEffect } from "react"
import { X } from "@phosphor-icons/react"

function FilterPill({ label, icon: Icon, onOpenFull, options, value, renderContent, contentWidth = "w-[340px]", onClear }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = !!value

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
      <div
        className={`h-[30px] flex items-center rounded-full text-[15px] font-semibold whitespace-nowrap transition-colors ${
          active ? "bg-brand-blue text-white" : "border border-brand-blue text-brand-blue"
        }`}
      >
        <button
          type="button"
          onClick={() => (onOpenFull ? onOpenFull() : setOpen((o) => !o))}
          className={`h-full flex items-center gap-1 rounded-l-full pl-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
            active && onClear ? "pr-2" : "pr-4 rounded-r-full"
          } ${active ? "hover:bg-brand-blue/90" : "hover:bg-brand-blue/5"}`}
        >
          {value || label}
          {Icon && <Icon size={20} />}
        </button>
        {active && onClear && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onClear()
            }}
            aria-label={`Retirer le filtre ${label}`}
            className="h-full flex items-center pr-4 rounded-r-full transition-colors hover:bg-brand-blue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X size={14} weight="bold" />
          </button>
        )}
      </div>

      {open && !onOpenFull && (
        <div
          className={`absolute top-full left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 mt-2 bg-white border border-grey-200 shadow-lg rounded-sm z-30 max-w-[calc(100vw-2rem)] ${
            renderContent ? `${contentWidth} p-3` : "min-w-[220px] p-4 flex flex-col gap-2"
          }`}
        >
          {renderContent ? (
            renderContent({ close: () => setOpen(false) })
          ) : options && options.length > 0 ? (
            options.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-[14px] text-grey-900 hover:text-brand-blue cursor-pointer transition-colors">
                <input type="checkbox" className="accent-brand-red" />
                {opt}
              </label>
            ))
          ) : (
            <p className="text-[14px] text-grey">Options à venir</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FilterPill
