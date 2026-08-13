import { useState } from "react"
import { useLocation } from "react-router-dom"
import HeaderFilter from "../components/HeaderFilter"
import PropertyCard from "../components/PropertyCard"
import Pagination from "../components/ui/Pagination"
import AllFiltersModal from "../components/AllFiltersModal"
import Footer from "../components/Footer"
import { OFFERS } from "../data/offers"

function GridView() {
  const { state } = useLocation()
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [offerCount, setOfferCount] = useState(1400)
  const [activeFilters, setActiveFilters] = useState(state ?? {})

  return (
    <main className="font-body">
      <HeaderFilter
        activeView="grille"
        onOpenAllFilters={() => setFiltersOpen(true)}
        filterValues={activeFilters}
        onFilterChange={(key, value) => setActiveFilters((f) => ({ ...f, [key]: value || null }))}
        onFilterApply={() => setOfferCount(Math.floor(300 + Math.random() * 1100))}
      />

      <section className="flex flex-col gap-8 items-center py-[60px] px-[114px]">
        <p className="font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue w-full">
          {offerCount.toLocaleString("fr-FR")} offres disponibles
        </p>

        <div className="grid grid-cols-4 gap-x-6 gap-y-8 w-full">
          {OFFERS.map((offer) => (
            <PropertyCard key={offer.id} to={`/offre/${offer.id}`} compact iconColor="text-brand-red" {...offer} />
          ))}
        </div>

        <Pagination page={page} pageCount={3} onChange={setPage} />
      </section>

      <Footer />

      <AllFiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={(filterValues) => {
          setActiveFilters(filterValues)
          setOfferCount(Math.floor(300 + Math.random() * 1100))
        }}
      />
    </main>
  )
}

export default GridView
