import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CaretRight } from "@phosphor-icons/react"
import Button from "./ui/Button"
import Dropdown from "./ui/Dropdown"
import sectorPhoto from "../assets/images/sector-journey-photo-2.png"

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]

function SectorJourney() {
  const navigate = useNavigate()
  const [sector, setSector] = useState(null)

  return (
    <section id="secteur-activite" className="flex flex-col gap-8 items-start lg:flex-row lg:gap-11 px-4 lg:px-[114px] py-20 scroll-mt-24 max-w-[1400px] mx-auto">
      <div className="flex-1 flex flex-col gap-6">
        <div className="font-heading leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px]">
          <p className="text-title-light">Nos</p>
          <p className="font-semibold text-brand-blue">secteurs d'activités</p>
        </div>
        <p className="text-[16px] leading-[1.5] text-brand-blue">
          Chaque projet a ses propres contraintes, ses propres échéances.
          Choisissez votre filière pour être guidé sur les démarches à
          accomplir selon les spécificités de votre projet.
        </p>
        <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:items-end">
          <Dropdown
            label="Secteur d'activité"
            placeholder="Sélectionner un secteur d'activité"
            options={SECTORS}
            value={sector}
            onChange={setSector}
            allLabel="Tous les secteurs"
            muted={false}
            className="flex-1"
          />
          <Button
            variant="solid"
            icon={CaretRight}
            onClick={() => navigate("/offres/liste", { state: { secteur: sector } })}
          >
            Démarrer le parcours guidé
          </Button>
        </div>
      </div>
      <img
        src={sectorPhoto}
        alt="Nos secteurs d'activités"
        className="w-full aspect-video lg:w-[491px] object-cover shrink-0"
      />
    </section>
  )
}

export default SectorJourney
