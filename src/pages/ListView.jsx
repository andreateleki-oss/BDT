import { useState } from "react"
import { useLocation } from "react-router-dom"
import HeaderFilter from "../components/HeaderFilter"
import OfferListItem from "../components/OfferListItem"
import MapPanel from "../components/MapPanel"
import AllFiltersModal, { toModalInitialValues } from "../components/AllFiltersModal"
import { OFFERS, filterOffers } from "../data/offers"

function ListView() {
  const { state } = useLocation()
  const [expanded, setExpanded] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(state ?? {})
  const [appliedFilters, setAppliedFilters] = useState(state ?? {})

  const offers = filterOffers(OFFERS, appliedFilters)
  const hasPendingChanges = JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters)

  return (
    <main className="font-body h-screen flex flex-col">
      <HeaderFilter
        activeView="carte"
        onOpenAllFilters={() => setFiltersOpen(true)}
        filterValues={draftFilters}
        appliedFilterValues={appliedFilters}
        hasPendingChanges={hasPendingChanges}
        onRefresh={() => setAppliedFilters(draftFilters)}
        onFilterChange={(key, value) => setDraftFilters((f) => ({ ...f, [key]: value || null }))}
      />

      <div className="flex-1 flex overflow-hidden">
        {!expanded && (
          <div className="w-[520px] shrink-0 overflow-y-auto pt-[30px] pb-11 pl-10 pr-6 flex flex-col gap-8">
            <p className="font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue">
              {offers.length.toLocaleString("fr-FR")} offres disponibles
            </p>
            {offers.length > 0 ? (
              <div className="flex flex-col gap-6">
                {offers.map((offer) => (
                  <OfferListItem key={offer.id} to={`/offre/${offer.id}`} {...offer} />
                ))}
              </div>
            ) : (
              <p className="text-[16px] text-grey-600">
                Aucune offre ne correspond à vos critères de recherche.
              </p>
            )}
          </div>
        )}

        <MapPanel onExpand={() => setExpanded((e) => !e)} className="flex-1" />
      </div>

      <AllFiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onApply={(filterValues) => {
          setDraftFilters(filterValues)
          setAppliedFilters(filterValues)
        }}
        initialValues={toModalInitialValues(draftFilters)}
      />
    </main>
  )
}

export default ListView
