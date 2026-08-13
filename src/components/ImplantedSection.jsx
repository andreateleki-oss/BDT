import { useState } from "react"
import CarouselHeader from "./ui/CarouselHeader"
import CarouselNav from "./ui/CarouselNav"
import ArticleCard from "./ArticleCard"
import implantedPhoto from "../assets/images/implanted-photo.png"

const CASE_STUDIES = Array.from({ length: 6 }, (_, i) => ({
  image: implantedPhoto,
  category: "Logistique",
  title: "LogiTech FR",
  location: "Dunkerque Port",
  description:
    "Analyse approfondie des dynamiques territoriales et opportunités d'implantation pour l'année à venir.",
}))

const PAGE_SIZE = 3
const PAGES = Array.from({ length: Math.ceil(CASE_STUDIES.length / PAGE_SIZE) }, (_, i) =>
  CASE_STUDIES.slice(i * PAGE_SIZE, i * PAGE_SIZE + PAGE_SIZE)
)

function ImplantedSection() {
  const [page, setPage] = useState(0)

  return (
    <section className="flex flex-col gap-11 items-center justify-center py-10 px-[114px]">
      <CarouselHeader titleLight="Ils se sont" titleBold="implantés">
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
            <div key={i} className="flex gap-16 w-full shrink-0">
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
