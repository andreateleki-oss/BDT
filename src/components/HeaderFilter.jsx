import { Link } from "react-router-dom"
import { Globe, CaretDown, FadersHorizontal, ArrowsClockwise, GridFour, MapTrifold } from "@phosphor-icons/react"
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
        <div className="flex flex-wrap justify-end items-center gap-2 px-4 pt-4 lg:px-10">
          <Button variant="dark" className="!h-auto !py-1 !px-4 text-[14px]">
            Entreprise
          </Button>
          <Button variant="outline" className="!h-auto !py-1 !px-4 text-[14px]">
            Collectivité
          </Button>
          <Button variant="outline" className="!h-auto !py-1 !px-4 text-[14px]">
            Mon compte
          </Button>
          <button className="flex items-center gap-2 px-4 py-1 text-brand-blue font-accent font-semibold underline rounded-sm transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
            <Globe size={20} />
            FR
            <CaretDown size={20} />
          </button>
        </div>
        <div className="h-px bg-grey-200 mt-4" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 lg:px-10 lg:py-0">
          <Link
            to="/"
            className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <img src={logo} alt="Foncier+" className="h-12 w-auto lg:h-[72px]" />
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center font-heading text-[14px] lg:text-[16px] text-brand-blue">
            {NAV_LINKS.map((link) => {
              const className =
                "h-12 flex items-center rounded-sm transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              return link === "Rechercher un terrain" ? (
                <Link key={link} to="/offres" className={className}>
                  {link}
                </Link>
              ) : (
                <a key={link} href="#" className={className}>
                  {link}
                </a>
              )
            })}
          </nav>
        </div>
      </header>

      <div className="relative border-t border-grey-200 flex flex-col gap-3 px-4 py-2 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex items-center gap-3 lg:contents">
          <div className="flex flex-wrap gap-2 items-start lg:flex-nowrap">
            <button
              onClick={onOpenAllFilters}
              className="h-6 flex items-center gap-1 px-2 border border-brand-blue rounded-full text-[14px] font-semibold text-brand-blue transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue shrink-0"
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
                <div key={f.label} className="shrink-0">
                  <FilterPill
                    label={f.label}
                    value={displayValue}
                    contentWidth={isCompact ? "w-[180px]" : "w-[340px]"}
                    renderContent={({ close }) => renderFilterWidget(f.key, close)}
                  />
                </div>
              )
            })}
          </div>
          <div className="hidden lg:block shrink-0">
            <ViewSwitch active={activeView} filters={appliedFilterValues ?? filterValues} />
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
          <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-lg rounded-b-lg pt-1 pb-2 px-2 z-30">
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
