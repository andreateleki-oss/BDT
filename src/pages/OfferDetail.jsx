import { useRef, useEffect } from "react"
import { useParams } from "react-router-dom"
import Header from "../components/Header"
import OfferDetailHeader from "../components/OfferDetailHeader"
import SommaireSidebar, { SOMMAIRE_ITEMS } from "../components/SommaireSidebar"
import DescriptifSection from "../components/DescriptifSection"
import PhotoCarousel from "../components/PhotoCarousel"
import EnvironnementSection from "../components/EnvironnementSection"
import LotsSection from "../components/LotsSection"
import TissuEconomiqueSection from "../components/TissuEconomiqueSection"
import SpecificiteSection from "../components/SpecificiteSection"
import ContactFormWidget from "../components/ContactFormWidget"
import Footer from "../components/Footer"
import { useScrollSpy } from "../hooks/useScrollSpy"
import { OFFERS } from "../data/offers"

import sectorPhoto from "../assets/images/sector-journey-photo.png"
import siloPhoto from "../assets/images/silo-site.jpg"
import brickFacadePhoto from "../assets/images/brick-facade.jpg"
import factoryChimneyPhoto from "../assets/images/factory-chimney.jpg"

// studies-photo.png and implanted-photo.png (512px wide) are excluded here: this carousel's
// tall crop (~681x400) would upscale them 1.3-1.8x and look soft. These 4 assets are high-res enough.
const CAROUSEL_IMAGES = [
  siloPhoto,
  brickFacadePhoto,
  factoryChimneyPhoto,
  sectorPhoto,
]

function OfferDetail() {
  const { id } = useParams()
  const offer = OFFERS.find((o) => o.id === id)
  const siteName = offer?.title ?? "Nom du site"
  const activeId = useScrollSpy(SOMMAIRE_ITEMS.map((i) => i.id))
  const contactRef = useRef(null)

  useEffect(() => {
    document.title = `${siteName} - Foncier+`
    return () => {
      document.title = "Prototype Foncier"
    }
  }, [siteName])

  return (
    <main className="font-body">
      <Header />

      <div className="flex flex-col gap-11 pt-15 pb-11">
        <OfferDetailHeader
          title={siteName}
          onContact={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}
        />

        <div className="h-px bg-grey-200 w-full" />

        <div className="flex gap-8 px-[114px] items-start">
          <aside className="w-[284px] shrink-0 sticky top-24 self-start">
            <SommaireSidebar activeId={activeId} />
          </aside>

          <div className="flex-1 max-w-[712px] flex flex-col gap-11">
            <DescriptifSection />
            <div className="h-px bg-grey-200 w-full" />

            <section id="photos" className="flex flex-col gap-6 w-full scroll-mt-24">
              <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
                Photos du site
              </p>
              <PhotoCarousel images={CAROUSEL_IMAGES} />
            </section>
            <div className="h-px bg-grey-200 w-full" />

            <EnvironnementSection />
            <div className="h-px bg-grey-200 w-full" />

            <LotsSection />
            <div className="h-px bg-grey-200 w-full" />

            <TissuEconomiqueSection />
            <div className="h-px bg-grey-200 w-full" />

            <SpecificiteSection />
          </div>
        </div>

        <div id="contacter" ref={contactRef} className="scroll-mt-24">
          <ContactFormWidget showSiteList siteName={siteName} />
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default OfferDetail
