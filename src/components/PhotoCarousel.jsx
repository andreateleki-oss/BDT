import { useState } from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

function PhotoCarousel({ images }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="relative w-full h-[240px] lg:h-[400px] overflow-hidden">
        <img src={images[index]} alt="" className="size-full object-cover" />
        <button
          onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
          className="group absolute top-1/2 left-5 -translate-y-1/2 bg-white border border-brand-blue rounded-sm size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Photo précédente"
        >
          <CaretLeft size={20} className="text-brand-blue transition-colors group-hover:text-white" />
        </button>
        <button
          onClick={() => setIndex((i) => (i + 1) % images.length)}
          className="group absolute top-1/2 right-5 -translate-y-1/2 bg-white border border-brand-blue rounded-sm size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          aria-label="Photo suivante"
        >
          <CaretRight size={20} className="text-brand-blue transition-colors group-hover:text-white" />
        </button>
      </div>
      <div className="flex gap-4 w-full">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`flex-1 aspect-[215/121] overflow-hidden transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
              i === index ? "ring-2 ring-brand-blue" : ""
            }`}
          >
            <img src={img} alt="" className="size-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}

export default PhotoCarousel
