import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import HeaderFilter from "../components/HeaderFilter"
import OfferListItem from "../components/OfferListItem"
import MapPanel from "../components/MapPanel"
import ViewSwitch from "../components/ui/ViewSwitch"
import Breadcrumb from "../components/ui/Breadcrumb"
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

  useEffect(() => {
    document.title = "Rechercher un terrain - Foncier+"
    return () => {
      document.title = "Prototype Foncier"
    }
  }, [])

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

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {!expanded && (
          <div className="w-full lg:w-[520px] shrink-0 overflow-y-auto max-h-[45vh] lg:max-h-none pt-6 pb-11 px-4 lg:pt-[30px] lg:pl-10 lg:pr-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4 w-full">
              <Breadcrumb items={[{ label: "Accueil", to: "/" }, { label: "Rechercher un terrain" }]} />
              <h1 className="font-heading text-[28px] leading-[1.1] tracking-[-1.04px] text-brand-blue">
                Rechercher un terrain
              </h1>
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue">
                {offers.length.toLocaleString("fr-FR")} offres disponibles
              </p>
              <div className="hidden lg:block shrink-0">
                <ViewSwitch active="carte" filters={appliedFilters} />
              </div>
            </div>
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

        <MapPanel
          offers={offers}
          localisation={appliedFilters.localisation}
          expanded={expanded}
          onExpand={() => setExpanded((e) => !e)}
          className="flex-1 min-h-[300px] lg:min-h-0"
        />
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
