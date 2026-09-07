import { Link } from "react-router-dom"
import { FadersHorizontal, ArrowsClockwise, GridFour, MapTrifold } from "@phosphor-icons/react"
import logo from "../assets/images/logo-foncier.png"
import Button from "./ui/Button"
import FilterPill from "./ui/FilterPill"
import LocationAutocomplete from "./ui/LocationAutocomplete"
import Dropdown from "./ui/Dropdown"
import SurfaceInput from "./ui/SurfaceInput"
import Checkbox from "./ui/Checkbox"
import LanguageSelector from "./ui/LanguageSelector"
import { LABEL_CATEGORIES } from "./ui/LabelMultiSelect"

const ALL_LABEL_OPTIONS = LABEL_CATEGORIES.flatMap((c) => c.options)

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]

const FILTERS = [
  { key: "localisation", label: "Localisation" },
  { key: "typeImplementation", label: "Type d'acquisition" },
  { key: "secteur", label: "Secteur d'activité" },
  { key: "typeOffre", label: "Type d'offres" },
  { key: "surface", label: "Surface minimale" },
]

function displayTypeImplementation(v) {
  const parts = [v?.achat && "Achat", v?.location && "Location"].filter(Boolean)
  return parts.length ? parts.join(", ") : null
}

function displayTypeOffre(v) {
  const parts = [v?.terrain && "Terrain", v?.immobilier && "Immobilier"].filter(Boolean)
  return parts.length ? parts.join(", ") : null
}

function displaySurface(v) {
  return v?.value ? `${v.value} ${v.unit}` : null
}

const DISPONIBILITE_LABELS = { immediate: "Immédiate", m0_6: "0 à 6 mois", m6_12: "6 à 12 mois", plus12: "plus de 12 mois" }

function displayDisponibilite(v) {
  if (!v) return null
  const parts = Object.keys(DISPONIBILITE_LABELS).filter((k) => v[k]).map((k) => DISPONIBILITE_LABELS[k])
  return parts.length ? parts.join(", ") : null
}

const TRANSPORT_LABELS = { autoroute: "Autoroute", gare: "Gare", port: "Port", aeroport: "Aéroport" }

function displayTransports(v) {
  if (!v) return null
  const parts = Object.keys(TRANSPORT_LABELS).filter((k) => v[k]?.checked).map((k) => TRANSPORT_LABELS[k])
  return parts.length ? parts.join(", ") : null
}

function displayElectricite(distance, puissance) {
  const parts = [distance, puissance].filter(Boolean)
  return parts.length ? parts.join(", ") : null
}

function displayLabels(v) {
  if (!v) return null
  const activeIds = Object.keys(v).filter((id) => v[id])
  if (activeIds.length === 0) return null
  if (activeIds.length === 1) {
    return ALL_LABEL_OPTIONS.find((opt) => opt.id === activeIds[0])?.label ?? "1 label"
  }
  return `${activeIds.length} labels`
}

function countActiveFilters(v = {}) {
  let count = 0
  if (v.localisation) count += 1
  count += [v.typeImplementation?.achat, v.typeImplementation?.location].filter(Boolean).length
  if (v.secteur) count += 1
  count += [v.typeOffre?.terrain, v.typeOffre?.immobilier].filter(Boolean).length
  if (v.surface?.value) count += 1
  if (v.disponibilite) count += Object.values(v.disponibilite).filter(Boolean).length
  if (v.transports) count += Object.values(v.transports).filter((t) => t?.checked).length
  count += [v.electriciteDistance, v.puissance].filter(Boolean).length
  if (v.labels) count += Object.values(v.labels).filter(Boolean).length
  return count
}

function HeaderFilter({
  activeView = "grille",
  onOpenAllFilters,
  filterValues = {},
  onFilterChange,
  appliedFilterValues,
  hasPendingChanges = false,
  onRefresh,
}) {
  function renderFilterWidget(key, close) {
    switch (key) {
      case "localisation":
        return (
          <LocationAutocomplete
            placeholder="Région, département, EPCI, commune"
            value={filterValues.localisation || ""}
            onChange={(v) => onFilterChange?.("localisation", v)}
            onSelect={() => close()}
          />
        )
      case "secteur":
        return (
          <Dropdown
            placeholder="Sélectionner un secteur d'activité"
            options={SECTORS}
            value={filterValues.secteur || null}
            allLabel="Tous les secteurs"
            onChange={(v) => {
              onFilterChange?.("secteur", v)
              close()
            }}
          />
        )
      case "typeImplementation": {
        const v = filterValues.typeImplementation || { achat: false, location: false }
        return (
          <div className="flex flex-col gap-3 w-full">
            <Checkbox
              label="Achat"
              checked={!!v.achat}
              onChange={() => onFilterChange?.("typeImplementation", { ...v, achat: !v.achat })}
            />
            <Checkbox
              label="Location"
              checked={!!v.location}
              onChange={() => onFilterChange?.("typeImplementation", { ...v, location: !v.location })}
            />
          </div>
        )
      }
      case "typeOffre": {
        const v = filterValues.typeOffre || { terrain: false, immobilier: false }
        return (
          <div className="flex flex-col gap-3 w-full">
            <Checkbox
              label="Terrain"
              checked={!!v.terrain}
              onChange={() => onFilterChange?.("typeOffre", { ...v, terrain: !v.terrain })}
            />
            <Checkbox
              label="Immobilier"
              checked={!!v.immobilier}
              onChange={() => onFilterChange?.("typeOffre", { ...v, immobilier: !v.immobilier })}
            />
          </div>
        )
      }
      case "surface": {
        const v = filterValues.surface || { value: "", unit: "Ha" }
        return (
          <SurfaceInput
            value={v.value}
            unit={v.unit}
            onChange={(val) => onFilterChange?.("surface", { ...v, value: val })}
            onUnitChange={(u) => onFilterChange?.("surface", { ...v, unit: u })}
          />
        )
      }
      default:
        return null
    }
  }

  return (
    <div className="bg-white shadow-[0px_2px_12px_rgba(4,63,84,0.25)] sticky top-0 z-20">
      <header className="bg-white">
        <div className={activeView === "carte" ? "w-full" : "max-w-[1400px] mx-auto"}>
          <div
            className={`flex flex-wrap items-center justify-between gap-2 px-4 py-4 ${
              activeView === "carte" ? "lg:px-[46px]" : "lg:px-[114px]"
            }`}
          >
            <Link
              to="/"
              className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              <img src={logo} alt="Foncier+" className="w-[242px] h-auto" />
            </Link>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="dark" className="!h-auto !py-1 !px-4 text-[14px]">
                Entreprise
              </Button>
              <Button variant="outline" className="!h-auto !py-1 !px-4 text-[14px]">
                Collectivité
              </Button>
              <Button variant="outline" className="!h-auto !py-1 !px-4 text-[14px]">
                Mon compte
              </Button>
              <Button as={Link} to="/formulaire" variant="solid" className="!h-auto !py-1 !px-4 text-[14px]">
                Nous contacter
              </Button>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`relative border-t border-grey-200 flex flex-col gap-3 px-4 py-2 lg:flex-row lg:items-center lg:justify-between ${
          activeView === "carte" ? "w-full lg:px-[46px]" : "max-w-[1400px] mx-auto lg:px-[114px]"
        }`}
      >
        <div className="flex items-center gap-3 lg:contents">
          <div className="flex flex-wrap gap-2 items-start lg:flex-nowrap">
            <button
              onClick={onOpenAllFilters}
              className="h-[30px] flex items-center gap-1 px-4 border border-brand-blue rounded-full text-[15px] font-semibold text-brand-blue transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue shrink-0"
            >
              Filtres
              <FadersHorizontal size={20} />
              {countActiveFilters(filterValues) > 0 && (
                <span className="size-4 rounded-full bg-brand-red text-white text-[10px] font-semibold flex items-center justify-center shrink-0">
                  {countActiveFilters(filterValues)}
                </span>
              )}
            </button>
            {FILTERS.map((f) => {
              let displayValue
              if (f.key === "typeImplementation") displayValue = displayTypeImplementation(filterValues.typeImplementation)
              else if (f.key === "typeOffre") displayValue = displayTypeOffre(filterValues.typeOffre)
              else if (f.key === "surface") displayValue = displaySurface(filterValues.surface)
              else displayValue = filterValues[f.key]

              const isCompact = f.key === "typeImplementation" || f.key === "typeOffre"

              return (
                <div key={f.label} className="shrink-0">
                  <FilterPill
                    label={f.label}
                    value={displayValue}
                    contentWidth={isCompact ? "w-[180px]" : "w-[340px]"}
                    renderContent={({ close }) => renderFilterWidget(f.key, close)}
                    onClear={() => onFilterChange?.(f.key, null)}
                  />
                </div>
              )
            })}
            {displayDisponibilite(filterValues.disponibilite) && (
              <div className="shrink-0">
                <FilterPill
                  label="Disponibilité"
                  value={displayDisponibilite(filterValues.disponibilite)}
                  onOpenFull={onOpenAllFilters}
                  onClear={() => onFilterChange?.("disponibilite", null)}
                />
              </div>
            )}
            {displayTransports(filterValues.transports) && (
              <div className="shrink-0">
                <FilterPill
                  label="Infrastructures de transports"
                  value={displayTransports(filterValues.transports)}
                  onOpenFull={onOpenAllFilters}
                  onClear={() => onFilterChange?.("transports", null)}
                />
              </div>
            )}
            {displayElectricite(filterValues.electriciteDistance, filterValues.puissance) && (
              <div className="shrink-0">
                <FilterPill
                  label="Electricité"
                  value={displayElectricite(filterValues.electriciteDistance, filterValues.puissance)}
                  onOpenFull={onOpenAllFilters}
                  onClear={() => {
                    onFilterChange?.("electriciteDistance", null)
                    onFilterChange?.("puissance", null)
                  }}
                />
              </div>
            )}
            {displayLabels(filterValues.labels) && (
              <div className="shrink-0">
                <FilterPill
                  label="Label"
                  value={displayLabels(filterValues.labels)}
                  onOpenFull={onOpenAllFilters}
                  onClear={() => onFilterChange?.("labels", null)}
                />
              </div>
            )}
          </div>
        </div>

        <Link
          to={activeView === "grille" ? "/offres/liste" : "/offres"}
          state={appliedFilterValues ?? filterValues}
          className="lg:hidden flex items-center justify-center gap-2 h-10 rounded-full bg-brand-blue text-white font-heading font-semibold text-[14px] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          {activeView === "grille" ? <MapTrifold size={18} /> : <GridFour size={18} />}
          {activeView === "grille" ? "Voir la carte" : "Voir la liste"}
        </Link>

        {hasPendingChanges && (
          <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-lg rounded-b-lg pt-1 pb-2 px-2 z-10">
            <Button variant="solid" icon={ArrowsClockwise} onClick={onRefresh}>
              Actualiser
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default HeaderFilter
