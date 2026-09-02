import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CompassTool, Funnel, MagnifyingGlass } from "@phosphor-icons/react"
import Checkbox from "./ui/Checkbox"
import Dropdown from "./ui/Dropdown"
import LocationAutocomplete from "./ui/LocationAutocomplete"
import SurfaceInput from "./ui/SurfaceInput"
import Button from "./ui/Button"
import AllFiltersModal from "./AllFiltersModal"
import heroBg from "../assets/images/hero-bg.png"

const KEYWORDS = [
  "Offres qualifiées",
  "Accompagnement dans la recherche de foncier et l'implantation",
]

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]

function Keyword({ text }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-brand-red shadow-[0px_2px_12px_rgba(91,0,2,0.16)] size-7 flex items-center justify-center shrink-0">
        <CompassTool size={20} className="text-white" />
      </div>
      <p className="font-semibold text-[16px] lg:text-[20px] text-white">{text}</p>
    </div>
  )
}

function HeroSearch() {
  const navigate = useNavigate()
  const [location, setLocation] = useState("")
  const [forSale, setForSale] = useState({ acheter: false, louer: false })
  const [sector, setSector] = useState(null)
  const [offerType, setOfferType] = useState({ terrain: false, immobilier: false })
  const [surface, setSurface] = useState("")
  const [surfaceUnit, setSurfaceUnit] = useState("Ha")
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [advancedCount, setAdvancedCount] = useState(0)
  const [advancedFilters, setAdvancedFilters] = useState({
    disponibilite: null,
    transports: null,
    electriciteDistance: null,
    puissance: null,
    labels: null,
  })

  function handleApplyFilters(filterValues, count) {
    setLocation(filterValues.localisation || "")
    setSector(filterValues.secteur || null)
    setForSale({
      acheter: !!filterValues.typeImplementation?.achat,
      louer: !!filterValues.typeImplementation?.location,
    })
    setOfferType({
      terrain: !!filterValues.typeOffre?.terrain,
      immobilier: !!filterValues.typeOffre?.immobilier,
    })
    setSurface(filterValues.surface?.value || "")
    setSurfaceUnit(filterValues.surface?.unit || "Ha")
    setAdvancedCount(count)
    setAdvancedFilters({
      disponibilite: filterValues.disponibilite,
      transports: filterValues.transports,
      electriciteDistance: filterValues.electriciteDistance,
      puissance: filterValues.puissance,
      labels: filterValues.labels,
    })
  }

  function handleSearch() {
    navigate("/offres/liste", {
      state: {
        localisation: location || null,
        secteur: sector || null,
        typeImplementation: { achat: forSale.acheter, location: forSale.louer },
        typeOffre: { ...offerType },
        surface: surface ? { value: surface, unit: surfaceUnit } : null,
        ...advancedFilters,
      },
    })
  }

  return (
    <section
      className="relative flex items-center py-10 lg:py-[60px] bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="flex-1 max-w-[1400px] mx-auto px-4 lg:px-[114px] flex flex-col gap-8 lg:gap-12 relative z-10">
        <div className="flex flex-col gap-9">
          <h1 className="font-heading font-bold text-white text-[32px] leading-[1.15] lg:text-[65px] lg:leading-[1.2] lg:tracking-[-1.04px] max-w-full lg:max-w-[930px]">
            Trouvez le foncier idéal
            <br />
            pour réaliser votre projet économique
          </h1>
          <div className="flex gap-5 flex-wrap">
            {KEYWORDS.map((text) => (
              <Keyword key={text} text={text} />
            ))}
          </div>
        </div>

        <div className="bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.06)] flex flex-col gap-6 p-5 w-full lg:w-fit">
          <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:items-end">
            <LocationAutocomplete
              label="Localisation"
              placeholder="Région, département, EPCI, commune"
              value={location}
              onChange={setLocation}
              className="flex-1 lg:min-w-[299px]"
            />
            <div className="flex flex-col gap-2">
              <p className="font-heading text-[12px] uppercase text-muted-blue">
                Type d'acquisition
              </p>
              <div className="bg-white border border-grey-300 h-12 flex gap-6 items-center px-[17px]">
                <Checkbox
                  label="Achat"
                  checked={forSale.acheter}
                  onChange={() =>
                    setForSale((s) => ({ ...s, acheter: !s.acheter }))
                  }
                />
                <Checkbox
                  label="Location"
                  checked={forSale.louer}
                  onChange={() => setForSale((s) => ({ ...s, louer: !s.louer }))}
                />
              </div>
            </div>
            <Dropdown
              label="Secteur d'activité"
              placeholder="Sélectionner un secteur d'activité"
              options={SECTORS}
              value={sector}
              onChange={setSector}
              allLabel="Tous les secteurs"
              className="w-full lg:w-[299px]"
            />
          </div>

          <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:items-end lg:gap-6">
            <div className="flex flex-col gap-4 items-stretch lg:flex-1 lg:flex-row lg:items-end">
              <div className="flex flex-col gap-2">
                <p className="font-heading text-[12px] uppercase text-muted-blue">
                  Type d'offres
                </p>
                <div className="bg-white border border-grey-300 h-12 flex gap-6 items-center px-[17px]">
                  <Checkbox
                    label="Terrain"
                    checked={offerType.terrain}
                    onChange={() =>
                      setOfferType((s) => ({ ...s, terrain: !s.terrain }))
                    }
                  />
                  <Checkbox
                    label="Immobilier"
                    checked={offerType.immobilier}
                    onChange={() =>
                      setOfferType((s) => ({ ...s, immobilier: !s.immobilier }))
                    }
                  />
                </div>
              </div>
              <SurfaceInput
                label="Surface minimale"
                value={surface}
                onChange={setSurface}
                unit={surfaceUnit}
                onUnitChange={setSurfaceUnit}
                className="w-full lg:w-[168px]"
              />
              <div className="h-12 flex items-center shrink-0">
                <Button
                  variant="outline"
                  icon={Funnel}
                  iconPosition="left"
                  onClick={() => setFiltersOpen(true)}
                  className="whitespace-nowrap"
                >
                  Ajouter des filtres
                  {advancedCount > 0 && (
                    <span className="size-5 rounded-full bg-brand-red text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                      {advancedCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
            <Button variant="solid" icon={MagnifyingGlass} className="w-full lg:w-[201px]" onClick={handleSearch}>
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      <AllFiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={handleApplyFilters}
        initialValues={{
          location,
          acquisition: { achat: forSale.acheter, location: forSale.louer },
          bien: { ...offerType },
          surface: surface || "0",
          surfaceUnit,
          secteur: sector,
          ...(advancedFilters.disponibilite && { disponibilite: advancedFilters.disponibilite }),
          ...(advancedFilters.transports && { transports: advancedFilters.transports }),
          ...(advancedFilters.electriciteDistance && { electriciteDistance: advancedFilters.electriciteDistance }),
          ...(advancedFilters.puissance && { puissance: advancedFilters.puissance }),
          ...(advancedFilters.labels && { labels: advancedFilters.labels }),
        }}
      />
    </section>
  )
}

export default HeroSearch
