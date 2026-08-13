import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Hammer, Warehouse, StackSimple } from "@phosphor-icons/react"
import Dropdown from "./ui/Dropdown"
import franceMap from "../assets/images/france-map.png"

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
]

const KEYWORDS = [
  { icon: Hammer, text: "Friches à réhabilité" },
  { icon: Warehouse, text: "Foncier aménagé" },
  { icon: StackSimple, text: "Gisements invisibles" },
]

function Keyword({ icon: Icon, text }) {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-brand-red shadow-[0px_2px_12px_rgba(91,0,2,0.16)] size-7 flex items-center justify-center shrink-0">
        <Icon size={20} className="text-white" />
      </div>
      <p className="font-semibold text-[20px] text-brand-blue whitespace-nowrap">
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
      className="flex items-center justify-center gap-16 py-16 px-[114px]"
      style={{
        backgroundImage:
          "linear-gradient(179deg, rgb(249, 250, 251) 1%, rgb(255, 255, 255) 99%)",
      }}
    >
      <img src={franceMap} alt="Carte du foncier en France" className="w-[387px] shrink-0" />

      <div className="flex flex-col gap-14 max-w-[610px]">
        <div className="bg-white flex flex-col gap-6 items-start p-6 text-brand-blue">
          <div className="font-heading leading-[1.15] tracking-[-1px] text-[40px]">
            <p className="text-title-light">Le Foncier économique</p>
            <p className="font-bold text-brand-blue">partout en france</p>
          </div>
          <p className="text-[16px] leading-[1.5] text-brand-blue">
            Plus de 1 000 sites référencés, 8 800 hectares disponibles, dans toutes les régions.
          </p>
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

        <div className="flex gap-4 items-end">
          <Dropdown
            label="Localisation"
            options={REGIONS}
            value={region}
            onChange={setRegion}
            muted={false}
            className="w-[296px]"
          />
          <button
            className="bg-brand-red text-white h-12 px-4 font-semibold text-[15px] transition-colors hover:bg-brand-red/90 active:bg-brand-red/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            onClick={() => navigate("/offres/liste", { state: { localisation: region } })}
          >
            Explorer le foncier dans votre région
          </button>
        </div>
      </div>
    </section>
  )
}

export default MapSection
