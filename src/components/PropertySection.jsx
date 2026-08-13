import { Link } from "react-router-dom"
import { CaretRight } from "@phosphor-icons/react"
import PropertyCard from "./PropertyCard"
import Button from "./ui/Button"
import CarouselHeader from "./ui/CarouselHeader"
import { OFFERS } from "../data/offers"

function PropertySection({ titleLight = "Derniers fonciers", titleBold = "disponibles" }) {
  const offers = OFFERS.slice(0, 3)

  return (
    <section className="flex flex-col gap-11 items-center justify-center py-10 px-[114px]">
      <CarouselHeader titleLight={titleLight} titleBold={titleBold}>
        <Button as={Link} to="/offres/liste" variant="solid" icon={CaretRight}>
          Voir toutes les offres
        </Button>
      </CarouselHeader>

      <div className="flex gap-16 w-full">
        {offers.map((offer) => (
          <PropertyCard key={offer.id} to={`/offre/${offer.id}`} iconColor="text-brand-red" {...offer} />
        ))}
      </div>
    </section>
  )
}

export default PropertySection
