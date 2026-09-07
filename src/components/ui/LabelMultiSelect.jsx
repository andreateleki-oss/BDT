import { useState, useRef, useEffect } from "react"
import { CaretDown, X } from "@phosphor-icons/react"
import Checkbox from "./Checkbox"

export const LABEL_CATEGORIES = [
  {
    title: "Rapidité / Implémentation",
    options: [
      { id: "site-clef-en-main", label: "Site clef en main France 2030" },
      { id: "territoire-industrie", label: "Territoire d'Industrie" },
    ],
  },
  {
    title: "Aide & Fiscalité",
    options: [
      { id: "zone-afr", label: "Zone AFR (Aide à Finalité Régionale)" },
      { id: "ber", label: "Bassin d'Emploie à Redynamiser (BER)" },
    ],
  },
  {
    title: "Environnement & Urbanisme",
    options: [
      { id: "quartiers-innovants", label: "100 Quartiers Innovants (Région idf)" },
      { id: "hqe-eco-parc", label: "HQE Aménagement / Eco-Parc" },
    ],
  },
]

const ALL_OPTIONS = LABEL_CATEGORIES.flatMap((c) => c.options)

function LabelMultiSelect({ value = {}, onChange, location, className = "" }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const selected = ALL_OPTIONS.filter((opt) => value[opt.id])
  const [first, ...rest] = selected

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
    <div className={`flex flex-col gap-2 relative ${className}`} ref={ref}>
      <p className="font-heading text-[12px] uppercase text-muted-blue">Label</p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="h-12 flex items-center justify-between gap-2 px-[13px] border border-grey-300 bg-white text-left transition-colors hover:border-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <span className="flex-1 flex items-center gap-1.5 min-w-0 overflow-hidden">
          {!first ? (
            <span className="text-[15px] text-grey truncate">Sélectionner un label</span>
          ) : (
            <>
              <span className="inline-flex items-center gap-1 bg-grey-50 border border-grey-200 pl-2 pr-1 py-1 text-[13px] text-brand-blue min-w-0">
                <span className="truncate">{first.label}</span>
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(first.id)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.stopPropagation()
                      e.preventDefault()
                      onChange(first.id)
                    }
                  }}
                  aria-label={`Retirer ${first.label}`}
                  className="size-4 shrink-0 flex items-center justify-center text-grey hover:text-brand-red transition-colors"
                >
                  <X size={12} weight="bold" />
                </span>
              </span>
              {rest.length > 0 && (
                <span className="shrink-0 bg-brand-red text-white text-[12px] font-semibold h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full">
                  +{rest.length}
                </span>
              )}
            </>
          )}
        </span>
        <CaretDown
          size={20}
          className={`text-grey shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-grey-200 shadow-lg z-30 max-h-[360px] overflow-y-auto min-w-[280px]">
          {location && (
            <>
              <p className="px-4 pt-4 pb-3 text-[13px] leading-[1.5] text-brand-blue">
                Label compatible avec la localisation : <span className="font-semibold">{location}</span>
              </p>
              <div className="h-px bg-grey-200 w-full" />
            </>
          )}
          <div className="flex flex-col gap-4 p-4">
            {LABEL_CATEGORIES.map((category) => (
              <div key={category.title} className="flex flex-col gap-2">
                <p className="font-heading text-[12px] uppercase text-grey">{category.title}</p>
                <div className="flex flex-col gap-3">
                  {category.options.map((opt) => (
                    <Checkbox
                      key={opt.id}
                      label={opt.label}
                      checked={!!value[opt.id]}
                      onChange={() => onChange(opt.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LabelMultiSelect
