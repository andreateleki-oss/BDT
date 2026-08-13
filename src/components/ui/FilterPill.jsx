import { useState, useRef, useEffect } from "react"

function FilterPill({ label, icon: Icon, onOpenFull, options, value, renderContent, contentWidth = "w-[340px]" }) {
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
    <div className="relative" ref={ref}>
      <button
        onClick={() => (onOpenFull ? onOpenFull() : setOpen((o) => !o))}
        className={`h-6 flex items-center gap-1 px-2 border border-brand-blue rounded-full text-[14px] font-semibold whitespace-nowrap ${
          value ? "bg-brand-blue text-white" : "text-brand-blue"
        }`}
      >
        {value || label}
        {Icon && <Icon size={20} />}
      </button>

      {open && !onOpenFull && (
        <div
          className={`absolute top-full left-0 mt-2 bg-white border border-grey-200 shadow-lg rounded-sm z-30 ${
            renderContent ? `${contentWidth} p-3` : "min-w-[220px] p-4 flex flex-col gap-2"
          }`}
        >
          {renderContent ? (
            renderContent({ close: () => setOpen(false) })
          ) : options && options.length > 0 ? (
            options.map((opt) => (
              <label key={opt} className="flex items-center gap-2 text-[14px] text-grey-900">
                <input type="checkbox" />
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
