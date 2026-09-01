import { Link } from "react-router-dom"
import { CaretRight } from "@phosphor-icons/react"
import PropertyCard from "./PropertyCard"
import Button from "./ui/Button"
import CarouselHeader from "./ui/CarouselHeader"
import { OFFERS } from "../data/offers"
import decorPiece from "../assets/images/logo-piece-1.png"

function PropertySection({ titleLight = "Derniers fonciers", titleBold = "disponibles" }) {
  const offers = OFFERS.slice(0, 3)

  return (
    <section className="flex flex-col gap-11 items-center justify-center py-10 px-4 lg:px-[114px] max-w-[1400px] mx-auto">
      <CarouselHeader titleLight={titleLight} titleBold={titleBold}>
        <div className="hidden lg:block">
          <Button as={Link} to="/offres/liste" variant="outline" icon={CaretRight}>
            Voir toutes les offres
          </Button>
        </div>
      </CarouselHeader>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16 w-full">
        {offers.map((offer, i) =>
          i === 0 ? (
            <div key={offer.id} className="relative flex-1">
              <img
                src={decorPiece}
                alt=""
                className="absolute top-0 left-0 -translate-x-full -translate-y-full w-[34px] h-[34px] pointer-events-none"
              />
              <PropertyCard to={`/offre/${offer.id}`} iconColor="text-brand-red" {...offer} />
            </div>
          ) : (
            <PropertyCard key={offer.id} to={`/offre/${offer.id}`} iconColor="text-brand-red" {...offer} />
          )
        )}
      </div>

      <Button as={Link} to="/offres/liste" variant="outline" icon={CaretRight} className="w-full lg:hidden">
        Voir toutes les offres
      </Button>
    </section>
  )
}

export default PropertySection
