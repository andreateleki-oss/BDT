import { useState, useEffect } from "react"
import CarouselHeader from "./ui/CarouselHeader"
import CarouselNav from "./ui/CarouselNav"
import ArticleCard from "./ArticleCard"
import { useResponsivePageSize } from "../hooks/useResponsivePageSize"
import implantedPhoto from "../assets/images/implanted-photo.png"

const CASE_STUDIES = Array.from({ length: 6 }, (_, i) => ({
  image: implantedPhoto,
  category: "Logistique",
  title: "LogiTech FR",
  location: "Dunkerque Port",
  description:
    "Analyse approfondie des dynamiques territoriales et opportunités d'implantation pour l'année à venir.",
}))

function ImplantedSection() {
  const [page, setPage] = useState(0)
  const pageSize = useResponsivePageSize()
  const PAGES = Array.from({ length: Math.ceil(CASE_STUDIES.length / pageSize) }, (_, i) =>
    CASE_STUDIES.slice(i * pageSize, i * pageSize + pageSize)
  )

  useEffect(() => {
    setPage(0)
  }, [pageSize])

  return (
    <section className="flex flex-col gap-11 items-center justify-center pt-10 pb-20 px-4 lg:px-[114px] max-w-[1400px] mx-auto">
      <CarouselHeader titleLight="Ils se sont" titleBold="implantés" size="sm">
        <CarouselNav
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
          canPrev={page > 0}
          canNext={page < PAGES.length - 1}
        />
      </CarouselHeader>

      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {PAGES.map((pageStudies, i) => (
            <div key={i} className="flex gap-6 lg:gap-16 w-full shrink-0">
              {pageStudies.map((study, j) => (
                <ArticleCard key={j} {...study} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImplantedSection
