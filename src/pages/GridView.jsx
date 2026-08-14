import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import HeaderFilter from "../components/HeaderFilter"
import PropertyCard from "../components/PropertyCard"
import Pagination from "../components/ui/Pagination"
import AllFiltersModal, { toModalInitialValues } from "../components/AllFiltersModal"
import Footer from "../components/Footer"
import { OFFERS, filterOffers } from "../data/offers"

const PAGE_SIZE = 8

function GridView() {
  const { state } = useLocation()
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(state ?? {})
  const [appliedFilters, setAppliedFilters] = useState(state ?? {})

  const offers = filterOffers(OFFERS, appliedFilters)
  const hasPendingChanges = JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters)
  const pageCount = Math.max(1, Math.ceil(offers.length / PAGE_SIZE))
  const pagedOffers = offers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [appliedFilters])

  return (
    <main className="font-body">
      <HeaderFilter
        activeView="grille"
        onOpenAllFilters={() => setFiltersOpen(true)}
        filterValues={draftFilters}
        appliedFilterValues={appliedFilters}
        hasPendingChanges={hasPendingChanges}
        onRefresh={() => setAppliedFilters(draftFilters)}
        onFilterChange={(key, value) => setDraftFilters((f) => ({ ...f, [key]: value || null }))}
      />

      <section className="flex flex-col gap-8 items-center py-[60px] px-4 lg:px-[114px]">
        <p className="font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue w-full">
          {offers.length.toLocaleString("fr-FR")} offres disponibles
        </p>

        {pagedOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 w-full">
            {pagedOffers.map((offer) => (
              <PropertyCard key={offer.id} to={`/offre/${offer.id}`} compact iconColor="text-brand-red" {...offer} />
            ))}
          </div>
        ) : (
          <p className="text-[16px] text-grey-600 py-20">
            Aucune offre ne correspond à vos critères de recherche.
          </p>
        )}

        {pageCount > 1 && <Pagination page={page} pageCount={pageCount} onChange={setPage} />}
      </section>

      <Footer />

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

export default GridView
