import { useState, useRef, useEffect, useMemo } from "react"

const LOCATIONS = [
  // Régions
  { label: "Île-de-France", type: "Région" },
  { label: "Auvergne-Rhône-Alpes", type: "Région" },
  { label: "Hauts-de-France", type: "Région" },
  { label: "Provence-Alpes-Côte d'Azur", type: "Région" },
  { label: "Nouvelle-Aquitaine", type: "Région" },
  { label: "Occitanie", type: "Région" },
  { label: "Grand Est", type: "Région" },
  { label: "Bretagne", type: "Région" },
  { label: "Pays de la Loire", type: "Région" },
  { label: "Normandie", type: "Région" },
  { label: "Bourgogne-Franche-Comté", type: "Région" },
  { label: "Centre-Val de Loire", type: "Région" },
  { label: "Corse", type: "Région" },
  // Départements
  { label: "Rhône", type: "Département" },
  { label: "Nord", type: "Département" },
  { label: "Bouches-du-Rhône", type: "Département" },
  { label: "Paris", type: "Département" },
  { label: "Gironde", type: "Département" },
  { label: "Haute-Garonne", type: "Département" },
  { label: "Loire-Atlantique", type: "Département" },
  { label: "Bas-Rhin", type: "Département" },
  { label: "Pas-de-Calais", type: "Département" },
  { label: "Alpes-Maritimes", type: "Département" },
  // EPCI
  { label: "Métropole de Lyon", type: "EPCI" },
  { label: "Métropole Européenne de Lille", type: "EPCI" },
  { label: "Aix-Marseille-Provence Métropole", type: "EPCI" },
  { label: "Bordeaux Métropole", type: "EPCI" },
  { label: "Toulouse Métropole", type: "EPCI" },
  { label: "Nantes Métropole", type: "EPCI" },
  { label: "Eurométropole de Strasbourg", type: "EPCI" },
  { label: "CU Dunkerque Grand Littoral", type: "EPCI" },
  // Communes
  { label: "Lyon", type: "Commune" },
  { label: "Marseille", type: "Commune" },
  { label: "Lille", type: "Commune" },
  { label: "Dunkerque", type: "Commune" },
  { label: "Paris", type: "Commune" },
  { label: "Toulouse", type: "Commune" },
  { label: "Nantes", type: "Commune" },
  { label: "Strasbourg", type: "Commune" },
  { label: "Bordeaux", type: "Commune" },
  { label: "Nice", type: "Commune" },
  { label: "Rennes", type: "Commune" },
]

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
}

function levenshtein(a, b) {
  const m = a.length
  const n = b.length
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}

// Lower score = better match. 0 = exact substring match.
function matchScore(query, target) {
  const q = normalize(query)
  const t = normalize(target)
  if (t.includes(q)) return 0

  const words = t.split(/[\s-']+/)
  let best = Infinity
  for (const word of words) {
    const clipped = word.slice(0, q.length + 2)
    best = Math.min(best, levenshtein(q, clipped))
  }
  return best
}

function searchLocations(query) {
  if (!query) return LOCATIONS
  const maxDistance = Math.max(1, Math.ceil(query.length * 0.34))
  return LOCATIONS.map((loc) => ({ loc, score: matchScore(query, loc.label) }))
    .filter(({ score }) => score <= maxDistance)
    .sort((a, b) => a.score - b.score)
    .slice(0, 8)
    .map(({ loc }) => loc)
}

function LocationAutocomplete({ label, placeholder, value, onChange, onSelect, className = "" }) {
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

  const query = value || ""
  const filtered = useMemo(() => searchLocations(query), [query])

  return (
    <div className={`flex flex-col gap-2 relative ${className}`} ref={ref}>
      {label && (
        <p className="font-heading text-[12px] uppercase text-brand-blue">{label}</p>
      )}
      <div className="h-12 bg-grey-50 border border-grey-200 flex items-center px-[17px] transition-colors hover:border-brand-blue focus-within:border-brand-blue">
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          className="w-full bg-transparent outline-none text-[15px] text-brand-blue placeholder:text-grey"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-grey-200 shadow-lg z-30 max-h-[135px] overflow-y-auto">
          {filtered.map((loc) => (
            <button
              type="button"
              key={`${loc.type}-${loc.label}`}
              onClick={() => {
                onChange(loc.label)
                setOpen(false)
                onSelect?.(loc.label)
              }}
              className="w-full flex items-center justify-between gap-3 text-left px-[17px] py-3 text-[15px] text-brand-blue hover:bg-grey-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
            >
              <span>{loc.label}</span>
              <span className="text-[12px] uppercase text-grey shrink-0">{loc.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationAutocomplete
