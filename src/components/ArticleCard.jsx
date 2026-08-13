import { MapPin, CaretRight } from "@phosphor-icons/react"
import Button from "./ui/Button"

function ArticleCard({ image, category, title, location, description }) {
  return (
    <div className="flex-1 flex flex-col gap-6">
      <img src={image} alt={title} className="w-full h-[238px] object-cover" />
      <div className="flex flex-col gap-4">
        <p className="font-heading font-bold text-[14px] uppercase text-slate">
          {category}
        </p>
        <p className="font-heading font-medium text-[20px] leading-[1.2] tracking-[-0.3px] text-brand-blue">
          {title}
        </p>
        {location && (
          <div className="flex gap-2 items-center -mt-2">
            <MapPin size={20} className="text-brand-red shrink-0" />
            <p className="text-[14px] text-grey-600">{location}</p>
          </div>
        )}
        <p className="text-[16px] leading-[1.5] text-grey-600">{description}</p>
      </div>
      <Button variant="link" icon={CaretRight}>
        Lire l'étude
      </Button>
    </div>
  )
}

export default ArticleCard
