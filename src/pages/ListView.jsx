import { useState } from "react"
import { useLocation } from "react-router-dom"
import HeaderFilter from "../components/HeaderFilter"
import OfferListItem from "../components/OfferListItem"
import MapPanel from "../components/MapPanel"
import AllFiltersModal from "../components/AllFiltersModal"
import { OFFERS } from "../data/offers"

function ListView() {
  const { state } = useLocation()
  const [expanded, setExpanded] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [offerCount, setOfferCount] = useState(1400)
  const [activeFilters, setActiveFilters] = useState(state ?? {})

  return (
    <main className="font-body h-screen flex flex-col">
      <HeaderFilter
        activeView="carte"
        onOpenAllFilters={() => setFiltersOpen(true)}
        filterValues={activeFilters}
        onFilterChange={(key, value) => setActiveFilters((f) => ({ ...f, [key]: value || null }))}
        onFilterApply={() => setOfferCount(Math.floor(300 + Math.random() * 1100))}
      />

      <div className="flex-1 flex overflow-hidden">
        {!expanded && (
          <div className="w-[520px] shrink-0 overflow-y-auto pt-[30px] pb-11 pl-10 pr-6 flex flex-col gap-8">
            <p className="font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue">
              {offerCount.toLocaleString("fr-FR")} offres disponibles
            </p>
            <div className="flex flex-col gap-6">
              {OFFERS.map((offer) => (
                <OfferListItem key={offer.id} to={`/offre/${offer.id}`} {...offer} />
              ))}
            </div>
          </div>
        )}

        <MapPanel onExpand={() => setExpanded((e) => !e)} className="flex-1" />
      </div>

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

export default ListView
