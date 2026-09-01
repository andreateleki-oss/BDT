import { useEffect, useRef, useState } from "react"
import { CaretLeft, CaretRight, ArrowsOutSimple } from "@phosphor-icons/react"
import Lightbox from "./ui/Lightbox"

function PhotoCarousel({ images }) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const stripRef = useRef(null)

  function updateScrollState() {
    const el = stripRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 1)
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }

  useEffect(() => {
    updateScrollState()
    const raf = requestAnimationFrame(updateScrollState)
    window.addEventListener("resize", updateScrollState)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [images])

  function scrollStrip(direction) {
    const el = stripRef.current
    if (!el) return
    const thumb = el.firstElementChild
    const amount = thumb ? thumb.getBoundingClientRect().width + 16 : 200
    el.scrollBy({ left: direction * amount, behavior: "smooth" })
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full aspect-video overflow-hidden">
        <img src={images[index]} alt="" className="size-full object-cover" />
        <button
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="group absolute top-1/2 left-5 -translate-y-1/2 bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Photo précédente"
        >
          <CaretLeft size={20} className="text-brand-blue transition-colors group-hover:text-white" />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="group absolute top-1/2 right-5 -translate-y-1/2 bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Photo suivante"
        >
          <CaretRight size={20} className="text-brand-blue transition-colors group-hover:text-white" />
        </button>
        <button
          onClick={() => setLightboxOpen(true)}
          className="group absolute top-5 right-5 bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Agrandir"
        >
          <ArrowsOutSimple size={20} className="text-brand-blue transition-colors group-hover:text-white" />
        </button>
      </div>

      <div className="flex items-center gap-1 w-full">
        {images.length > 4 && (
          <button
            onClick={() => scrollStrip(-1)}
            disabled={!canScrollPrev}
            className="shrink-0 flex items-center justify-center size-6 text-brand-blue transition-colors hover:text-brand-blue/70 disabled:text-grey-300 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Photos précédentes"
          >
            <CaretLeft size={20} />
          </button>
        )}
        <div
          ref={stripRef}
          onScroll={updateScrollState}
          className="flex gap-4 w-full overflow-x-auto scroll-smooth"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`shrink-0 basis-[calc((100%-3rem)/4)] aspect-video overflow-hidden transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                i === index ? "ring-2 ring-brand-blue" : ""
              }`}
            >
              <img src={img} alt="" className="size-full object-cover" />
            </button>
          ))}
        </div>
        {images.length > 4 && (
          <button
            onClick={() => scrollStrip(1)}
            disabled={!canScrollNext}
            className="shrink-0 flex items-center justify-center size-6 text-brand-blue transition-colors hover:text-brand-blue/70 disabled:text-grey-300 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            aria-label="Photos suivantes"
          >
            <CaretRight size={20} />
          </button>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={index}
        alt="Photo du site"
      />
    </div>
  )
}

export default PhotoCarousel
