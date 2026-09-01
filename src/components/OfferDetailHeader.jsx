import { useEffect, useRef, useState } from "react"
import { FilePdf, Heart, MapPin, ArrowsOut, Toolbox, Handshake, CalendarBlank, Building } from "@phosphor-icons/react"
import Button from "./ui/Button"
import heroImage from "../assets/images/factory-chimney.jpg"

const SUMMARY = [
  { label: "Localisation", value: "Parc de Choyau Jaulnes, 77236, Île de France", icon: MapPin },
  { label: "Type d'acquisition", value: "Achat ou location", icon: Handshake },
  { label: "Vocation sectorielle", value: "Tout type de secteur", icon: Toolbox },
  { label: "Disponibilité", value: "Disponible en septembre 2026", icon: CalendarBlank },
  { label: "Taille du site", value: ["Terrain : 2,4 ha", "Bâti : 600 m2"], icon: ArrowsOut },
  { label: "Batiments", value: ["6 bâtiments", "4 étages"], icon: Building },
]

function SummaryItem({ label, value, icon: Icon }) {
  return (
    <div className="flex gap-2 items-start w-full">
      <div className="drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] shrink-0 size-7 flex items-center justify-center">
        <Icon size={20} className="text-brand-red" />
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

function OfferDetailHeader({ title = "Nom du site", onContact, onContactVisibilityChange }) {
  const [favorited, setFavorited] = useState(false)
  const ctaRef = useRef(null)

  useEffect(() => {
    const el = ctaRef.current
    if (!el || !onContactVisibilityChange) return
    const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0
    const observer = new IntersectionObserver(
      ([entry]) => onContactVisibilityChange(entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px` }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [onContactVisibilityChange])

  return (
    <section className="flex flex-col gap-11 px-4 lg:px-[114px]">
      <div className="flex flex-col gap-4 items-start lg:flex-row lg:items-center lg:justify-between w-full">
        <p className="font-heading text-[28px] leading-[1.1] lg:text-[46px] lg:leading-[1.01] lg:tracking-[-1.04px] text-brand-blue">
          {title}
        </p>
        <div className="flex gap-2 items-center flex-wrap">
          <button
            className="bg-white border border-brand-blue size-12 flex items-center justify-center transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Télécharger la fiche PDF"
          >
            <FilePdf size={20} className="text-brand-blue" />
          </button>
          <button
            onClick={() => setFavorited((f) => !f)}
            className="bg-white border border-brand-blue size-12 flex items-center justify-center transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Ajouter aux favoris"
          >
            <Heart size={20} weight={favorited ? "fill" : "regular"} className="text-brand-red" />
          </button>
          <div ref={ctaRef} className="inline-flex">
            <Button variant="solid" onClick={onContact}>
              Prendre contact
            </Button>
          </div>
        </div>
      </div>

      <div id="vue-ensemble" className="flex flex-col gap-8 items-stretch lg:flex-row lg:items-end w-full scroll-mt-[calc(var(--header-height)+16px)]">
        <div className="flex-1 flex flex-col gap-6">
          <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
            Vue d'ensemble
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {SUMMARY.map((item) => (
              <SummaryItem key={item.label} {...item} />
            ))}
          </div>
        </div>
        <div className="flex-1 aspect-video">
          <img src={heroImage} alt={title} className="size-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default OfferDetailHeader
