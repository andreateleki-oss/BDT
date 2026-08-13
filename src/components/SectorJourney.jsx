import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CaretRight } from "@phosphor-icons/react"
import Button from "./ui/Button"
import Dropdown from "./ui/Dropdown"
import sectorPhoto from "../assets/images/sector-journey-photo.png"

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]

function SectorJourney() {
  const navigate = useNavigate()
  const [sector, setSector] = useState(null)

  return (
    <section className="flex gap-11 items-start px-[114px] py-10">
      <img
        src={sectorPhoto}
        alt="Un parcours guidé par secteur d'activité"
        className="w-[491px] h-[361px] object-cover shrink-0"
      />
      <div className="flex-1 flex flex-col gap-6">
        <div className="font-heading leading-[1.15] tracking-[-1px] text-[40px]">
          <p className="text-title-light">Un parcours guidé par</p>
          <p className="font-bold text-brand-blue">secteur d'activité</p>
        </div>
        <p className="text-[16px] leading-[1.5] text-brand-blue">
          Chaque projet a ses propres contraintes, ses propres échéances.
          Choisissez votre filière pour être guidé sur les démarches à
          accomplir selon les spécificités de votre projet.
        </p>
        <div className="flex gap-4 items-end">
          <Dropdown
            label="Secteur d'activité"
            placeholder="Votre secteur d'activité"
            options={SECTORS}
            value={sector}
            onChange={setSector}
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
    </section>
  )
}

export default SectorJourney
