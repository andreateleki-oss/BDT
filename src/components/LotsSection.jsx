import { useState } from "react"
import { ArrowsOutSimple } from "@phosphor-icons/react"
import LotAccordionItem from "./LotAccordionItem"
import Lightbox from "./ui/Lightbox"
import propertyPhoto from "../assets/images/property-card.png"
import planImage from "../assets/images/list-map-zoomed.png"

const LOTS = [
  {
    id: "lot-1",
    name: "Bâtiment A",
    surface: "1,2 ha",
    disponibilite: "Septembre 2026",
    type: "Achat",
    bati: "600 m2",
    image: propertyPhoto,
  },
  {
    id: "lot-2",
    name: "Bâtiment B",
    surface: "1,2 ha",
    disponibilite: "Septembre 2026",
    type: "Achat",
    bati: "600 m2",
    image: propertyPhoto,
  },
]

function LotsSection() {
  const [openId, setOpenId] = useState(LOTS[0].id)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  return (
    <section id="lots" className="flex flex-col gap-6 w-full scroll-mt-24">
      <div className="flex items-center justify-between w-full relative">
        <div className="flex flex-col gap-1">
          <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
            Lots disponibles
          </p>
          <p className="font-heading text-[14px] leading-[1.5] text-brand-blue">
            2 parcelles disponibles • possibilités de lôts
          </p>
        </div>
        <button
          onClick={() => setLightboxOpen(true)}
          className="bg-white border border-brand-blue rounded-sm size-11 flex items-center justify-center transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Agrandir"
        >
          <ArrowsOutSimple size={20} className="text-brand-blue" />
        </button>
      </div>

      <div className="hidden md:flex bg-grey-50 px-4 py-4 gap-4 text-[16px] leading-[1.2] tracking-[-0.44px] font-heading font-medium text-brand-blue">
        <p className="flex-1">Parcelle</p>
        <p className="w-[100px]">Surface</p>
        <p className="w-[140px]">Disponibilité</p>
        <p className="w-[80px]">Type</p>
        <div className="w-5" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        {LOTS.map((lot) => (
          <LotAccordionItem
            key={lot.id}
            lot={lot}
            planImage={planImage}
            open={openId === lot.id}
            onToggle={() => setOpenId((id) => (id === lot.id ? null : lot.id))}
            onExpandPlan={() => setLightboxOpen(true)}
          />
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        image={planImage}
        alt="Plan de la parcelle"
      />
    </section>
  )
}

export default LotsSection
