import { Link } from "react-router-dom"
import { Globe, CaretDown, FadersHorizontal } from "@phosphor-icons/react"
import logo from "../assets/images/logo-foncier.png"
import Button from "./ui/Button"
import FilterPill from "./ui/FilterPill"
import ViewSwitch from "./ui/ViewSwitch"
import LocationAutocomplete from "./ui/LocationAutocomplete"
import Dropdown from "./ui/Dropdown"
import SurfaceInput from "./ui/SurfaceInput"
import Checkbox from "./ui/Checkbox"

const NAV_LINKS = [
  "Secteur d'activité",
  "Rechercher un terrain",
  "Nos services",
  "Nous contacter",
]

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]

const FILTERS = [
  { key: "typeImplementation", label: "Type d'implémentation" },
  { key: "localisation", label: "Localisation" },
  { key: "secteur", label: "Secteur d'activité" },
  { key: "typeOffre", label: "Type d'offre" },
  { key: "surface", label: "Surface" },
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

function HeaderFilter({ activeView = "grille", onOpenAllFilters, filterValues = {}, onFilterChange, onFilterApply }) {
  function renderFilterWidget(key, close) {
    switch (key) {
      case "localisation":
        return (
          <LocationAutocomplete
            placeholder="Région, département, EPCI, commune"
            value={filterValues.localisation || ""}
            onChange={(v) => onFilterChange?.("localisation", v)}
            onSelect={() => {
              onFilterApply?.()
              close()
            }}
          />
        )
      case "secteur":
        return (
          <Dropdown
            placeholder="Sélectionner un secteur d'activité"
            options={SECTORS}
            value={filterValues.secteur || null}
            onChange={(v) => {
              onFilterChange?.("secteur", v)
              onFilterApply?.()
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
              onChange={() => {
                onFilterChange?.("typeImplementation", { ...v, achat: !v.achat })
                onFilterApply?.()
              }}
            />
            <Checkbox
              label="Location"
              checked={!!v.location}
              onChange={() => {
                onFilterChange?.("typeImplementation", { ...v, location: !v.location })
                onFilterApply?.()
              }}
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
              onChange={() => {
                onFilterChange?.("typeOffre", { ...v, terrain: !v.terrain })
                onFilterApply?.()
              }}
            />
            <Checkbox
              label="Immobilier"
              checked={!!v.immobilier}
              onChange={() => {
                onFilterChange?.("typeOffre", { ...v, immobilier: !v.immobilier })
                onFilterApply?.()
              }}
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
            onUnitChange={(u) => {
              onFilterChange?.("surface", { ...v, unit: u })
              onFilterApply?.()
            }}
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
        <div className="flex justify-end items-center gap-2 px-10 pt-4">
          <Button variant="dark" className="!h-auto !py-1 !px-4 text-[14px]">
            Entreprise
          </Button>
          <Button variant="outline" className="!h-auto !py-1 !px-4 text-[14px]">
            Collectivité
          </Button>
          <Button variant="outline" className="!h-auto !py-1 !px-4 text-[14px]">
            Mon compte
          </Button>
          <button className="flex items-center gap-2 px-4 py-1 text-brand-blue font-accent font-semibold underline">
            <Globe size={20} />
            FR
            <CaretDown size={20} />
          </button>
        </div>
        <div className="h-px bg-grey-200 mt-4" />
        <div className="flex items-center justify-between px-10">
          <Link to="/">
            <img src={logo} alt="Foncier+" className="h-[72px] w-auto" />
          </Link>
          <nav className="flex gap-6 items-center font-heading text-[16px] text-brand-blue">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="h-12 flex items-center hover:opacity-70">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="border-t border-grey-200 flex items-center justify-between px-10 py-2">
        <div className="flex gap-2 items-start">
          <button
            onClick={onOpenAllFilters}
            className="h-6 flex items-center gap-1 px-2 border border-brand-blue rounded-full text-[14px] font-semibold text-brand-blue"
          >
            Filters
            <FadersHorizontal size={20} />
          </button>
          {FILTERS.map((f) => {
            let displayValue
            if (f.key === "typeImplementation") displayValue = displayTypeImplementation(filterValues.typeImplementation)
            else if (f.key === "typeOffre") displayValue = displayTypeOffre(filterValues.typeOffre)
            else if (f.key === "surface") displayValue = displaySurface(filterValues.surface)
            else displayValue = filterValues[f.key]

            const isCompact = f.key === "typeImplementation" || f.key === "typeOffre"

            return (
              <FilterPill
                key={f.label}
                label={f.label}
                value={displayValue}
                contentWidth={isCompact ? "w-[180px]" : "w-[340px]"}
                renderContent={({ close }) => renderFilterWidget(f.key, close)}
              />
            )
          })}
        </div>
        <ViewSwitch active={activeView} filters={filterValues} />
      </div>
    </div>
  )
}

export default HeaderFilter
