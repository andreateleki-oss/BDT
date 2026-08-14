import { useState } from "react"
import { ArrowsOutSimple } from "@phosphor-icons/react"
import Lightbox from "./ui/Lightbox"
import mapZoomed from "../assets/images/list-map-zoomed.png"

function EnvironnementSection() {
  const [open, setOpen] = useState(false)

  return (
    <section id="environnement" className="flex flex-col gap-6 w-full scroll-mt-24">
      <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">Environnement</p>
      <div className="relative w-full h-[240px] lg:h-[400px] overflow-hidden">
        <img src={mapZoomed} alt="Environnement du site" className="size-full object-cover" />
        <button
          onClick={() => setOpen(true)}
          className="group absolute top-5 right-5 bg-white border border-brand-blue rounded-sm size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Agrandir"
        >
          <ArrowsOutSimple size={20} className="text-brand-blue transition-colors group-hover:text-white" />
        </button>
      </div>
      <Lightbox open={open} onClose={() => setOpen(false)} image={mapZoomed} alt="Environnement du site" />
    </section>
  )
}

export default EnvironnementSection
