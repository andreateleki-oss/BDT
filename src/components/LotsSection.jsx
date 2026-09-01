import { useEffect, useRef, useState } from "react"
import LotAccordionItem from "./LotAccordionItem"
import Lightbox from "./ui/Lightbox"
import brickFacadePhoto from "../assets/images/brick-facade.jpg"
import factoryChimneyPhoto from "../assets/images/factory-chimney.jpg"
import planImage from "../assets/images/list-map-zoomed.png"

const LOTS = [
  {
    id: "lot-1",
    name: "Bâtiment A",
    surface: "1,2 ha",
    disponibilite: "Septembre 2026",
    type: "Achat",
    bati: "600 m2",
    image: brickFacadePhoto,
  },
  {
    id: "lot-2",
    name: "Bâtiment B",
    surface: "1,2 ha",
    disponibilite: "Septembre 2026",
    type: "Achat",
    bati: "600 m2",
    image: factoryChimneyPhoto,
  },
]

function LotsSection() {
  const [openIds, setOpenIds] = useState(new Set())
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const firstItemRef = useRef(null)

  function toggleLot(id) {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    const el = firstItemRef.current
    if (!el) return
    let timer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => {
            setOpenIds((prev) => new Set(prev).add(LOTS[0].id))
          }, 600)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [])

  return (
    <section id="lots" className="flex flex-col gap-6 w-full scroll-mt-[calc(var(--header-height)+16px)]">
      <div className="flex flex-col gap-1 w-full">
        <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
          Lots disponibles
        </p>
        <p className="font-heading text-[14px] leading-[1.5] text-brand-blue">
          2 parcelles disponibles • possibilités de lôts
        </p>
      </div>

      <div className="hidden md:flex bg-grey-50 px-4 py-4 gap-4 text-[16px] leading-[1.2] tracking-[-0.44px] font-heading font-medium text-brand-blue">
        <p className="flex-1">Parcelle</p>
        <p className="w-[100px]">Surface</p>
        <p className="w-[140px]">Disponibilité</p>
        <p className="w-[80px]">Type</p>
        <div className="w-5" />
      </div>

      <div className="flex flex-col gap-2 w-full">
        {LOTS.map((lot, i) => (
          <div key={lot.id} ref={i === 0 ? firstItemRef : undefined}>
            <LotAccordionItem
              lot={lot}
              planImage={planImage}
              open={openIds.has(lot.id)}
              onToggle={() => toggleLot(lot.id)}
              onExpandPlan={() => setLightboxOpen(true)}
            />
          </div>
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
