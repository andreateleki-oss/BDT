import { useEffect, useRef, useState } from "react"
import { FilePdf, Heart } from "@phosphor-icons/react"
import Button from "./ui/Button"

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
    </section>
  )
}

export default OfferDetailHeader
