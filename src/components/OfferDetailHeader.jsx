import { useState } from "react"
import { FilePdf, Heart, CompassTool } from "@phosphor-icons/react"
import Button from "./ui/Button"
import heroImage from "../assets/images/property-card.png"

const SUMMARY = [
  { label: "Localisation", value: "Parc de Choyau Jaulnes, 77236, Île de France" },
  { label: "Type d'acquisition", value: "Achat ou location" },
  { label: "Vocation sectorielle", value: "Tout type de secteur" },
  { label: "Disponibilité", value: "Disponible en septembre 2026" },
  { label: "Taille du site", value: ["Terrain : 2,4 ha", "Bâti : 600 m2"] },
  { label: "Batiments", value: ["6 bâtiments", "4 étages"] },
]

function SummaryItem({ label, value }) {
  return (
    <div className="flex gap-2 items-start w-full">
      <div className="drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] shrink-0 size-7 flex items-center justify-center">
        <CompassTool size={20} className="text-brand-red" />
      </div>
      <div className="flex flex-col gap-2 text-brand-blue">
        <p className="font-heading font-medium text-[16px] leading-[1.2] tracking-[-0.44px]">{label}</p>
        {Array.isArray(value) ? (
          value.map((v, i) => <p key={i} className="text-[14px] leading-[1.5]">{v}</p>)
        ) : (
          <p className="text-[14px] leading-[1.5]">{value}</p>
        )}
      </div>
    </div>
  )
}

function OfferDetailHeader({ title = "Nom du site", onContact }) {
  const [favorited, setFavorited] = useState(false)

  return (
    <section className="flex flex-col gap-11 px-[114px]">
      <div className="flex items-center justify-between w-full">
        <p className="font-heading text-[46px] leading-[1.01] tracking-[-1.04px] text-brand-blue">
          {title}
        </p>
        <div className="flex gap-2 items-center">
          <button
            className="bg-white border border-brand-blue rounded-sm size-12 flex items-center justify-center transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Télécharger la fiche PDF"
          >
            <FilePdf size={20} className="text-brand-blue" />
          </button>
          <button
            onClick={() => setFavorited((f) => !f)}
            className="bg-white border border-brand-blue rounded-sm size-12 flex items-center justify-center transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} weight={favorited ? "fill" : "regular"} className="text-brand-red" />
          </button>
          <Button variant="solid" onClick={onContact}>
            Prendre contact
          </Button>
        </div>
      </div>

      <div className="flex gap-8 items-end w-full">
        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
          {SUMMARY.map((item) => (
            <SummaryItem key={item.label} {...item} />
          ))}
        </div>
        <div className="flex-1 h-[255px]">
          <img src={heroImage} alt={title} className="size-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default OfferDetailHeader
