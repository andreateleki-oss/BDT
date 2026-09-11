import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Hammer, Warehouse, StackSimple } from "@phosphor-icons/react"
import Dropdown from "./ui/Dropdown"
import FranceInteractiveMap from "./ui/FranceInteractiveMap"

const REGIONS = [
  "Toute la France",
  "Île-de-France",
  "Auvergne-Rhône-Alpes",
  "Hauts-de-France",
  "Provence-Alpes-Côte d'Azur",
  "Nouvelle-Aquitaine",
  "Occitanie",
  "Grand Est",
  "Bretagne",
  "Pays de la Loire",
  "Normandie",
  "Bourgogne-Franche-Comté",
  "Centre-Val de Loire",
  "Corse",
]

const KEYWORDS = [
  { icon: Hammer, text: "Friches à réhabiliter" },
  { icon: Warehouse, text: "Foncier aménagé" },
  { icon: StackSimple, text: "Gisements invisibles" },
]

function Keyword({ icon: Icon, text }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-brand-red shadow-[0px_2px_12px_rgba(91,0,2,0.16)] size-7 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <p className="font-semibold text-[14px] text-brand-blue lg:whitespace-nowrap">
        {text}
      </p>
    </div>
  )
}

function MapSection() {
  const navigate = useNavigate()
  const [region, setRegion] = useState("Toute la France")

  return (
    <section
      className="w-full"
      style={{
        backgroundImage:
          "linear-gradient(179deg, rgb(249, 250, 251) 1%, rgb(255, 255, 255) 99%)",
      }}
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-16 py-16 px-4 lg:px-[114px] max-w-[1400px] mx-auto">
        <div className="w-full max-w-[560px] lg:w-[560px] shrink-0">
          <FranceInteractiveMap />
        </div>

        <div className="flex flex-col gap-8 w-full lg:max-w-[610px]">
          <div className="flex flex-col gap-6 items-start text-brand-blue">
            <div className="font-accent leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px]">
              <p className="text-title-light">Le foncier économique</p>
              <p className="font-semibold text-brand-blue">partout en France</p>
            </div>
            <p className="text-[16px] leading-[1.5] text-brand-blue">
              Plus de 1 000 sites référencés, 8 800 hectares disponibles, dans toutes les régions.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:items-end">
            <Dropdown
              label="Localisation"
              options={REGIONS}
              value={region}
              onChange={setRegion}
              muted={false}
              className="w-full lg:w-[296px]"
            />
            <button
              className="bg-brand-red text-white h-12 px-4 font-semibold text-[15px] transition-colors hover:bg-brand-red/90 active:bg-brand-red/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              onClick={() => navigate("/offres/liste", { state: { localisation: region } })}
            >
              Explorer le foncier
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-6">
              {KEYWORDS.map((k) => (
                <Keyword key={k.text} {...k} />
              ))}
            </div>
            <p className="text-[16px] leading-[1.5] text-brand-blue">
              Foncier+ agrège l'ensemble du foncier économique national en un référentiel unique, qualifié et à jour.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
