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

function Home() {
  return (
    <main className="font-body">
      <Header />
      <HeroSearch />
      <PropertySection />
      <MapSection />
      <StudiesSection />
      <SectorJourney />
      <ServicesSection />
      <FacilitatorSection />
      <PartnersLogos />
      <ImplantedSection />
      <ContactFormWidget />
      <Footer />
    </main>
  )
}

export default Home
