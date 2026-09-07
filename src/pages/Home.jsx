import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import HeroSearch from "../components/HeroSearch"
import PropertySection from "../components/PropertySection"
import MapSection from "../components/MapSection"
import StudiesSection from "../components/StudiesSection"
import SectorJourney from "../components/SectorJourney"
import ServicesSection from "../components/ServicesSection"
import FacilitatorSection from "../components/FacilitatorSection"
import PartnersLogos from "../components/PartnersLogos"
import ImplantedSection from "../components/ImplantedSection"
import ContactFormWidget from "../components/ContactFormWidget"
import Footer from "../components/Footer"
import decorPiece from "../assets/images/logo-piece-1.png"

function Home() {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (state?.scrollTo) {
      document.getElementById(state.scrollTo)?.scrollIntoView({ behavior: "smooth", block: "start" })
      navigate(".", { replace: true, state: {} })
    }
  }, [state, navigate])

  return (
    <main className="font-body">
      <Header />

      <div id="rechercher-un-terrain" className="scroll-mt-24">
        <HeroSearch />
        <PropertySection />
        <MapSection />
      </div>

      <SectorJourney />

      <div id="a-propos" className="scroll-mt-24">
        <div className="flex flex-col px-4 lg:px-[114px] pt-20 max-w-[1400px] mx-auto">
          <div className="relative font-heading leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px] text-brand-blue">
            <img
              src={decorPiece}
              alt=""
              className="absolute top-0 left-0 -translate-x-full -translate-y-full w-[34px] h-[34px] pointer-events-none"
            />
            <p className="text-title-light">À propos de</p>
            <p className="font-semibold text-brand-blue">Foncier+</p>
          </div>
        </div>
        <ServicesSection />
        <FacilitatorSection />
        <StudiesSection />
        <PartnersLogos />
      </div>

      <div id="actualites" className="scroll-mt-24">
        <div className="flex flex-col px-4 lg:px-[114px] pt-20 max-w-[1400px] mx-auto">
          <p className="font-heading font-semibold text-[28px] lg:text-[40px] text-brand-blue">
            Actualités
          </p>
        </div>
        <ImplantedSection />
      </div>

      <ContactFormWidget
        showRequestType={false}
        allowAddingSites={false}
        ctaLabel="Nous contacter"
        ctaIcon={null}
      />
      <Footer />
    </main>
  )
}

export default Home
