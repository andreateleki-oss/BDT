import { Link } from "react-router-dom"
import { MapPin, ArrowsOut, Toolbox, Handshake } from "@phosphor-icons/react"

function OfferListItem({ to, image, title, location, surface, sector, tag, isRental }) {
  return (
    <Link to={to} className="flex gap-4 items-start w-full group">
      <div className="relative size-[135px] shrink-0 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="flex-1 font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue truncate">
            {title}
          </p>
          {tag && (
            <span className="bg-[rgba(34,142,192,0.14)] text-[#0c5585] text-[14px] px-2 py-1 rounded-sm shrink-0">
              {tag}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {isRental && (
            <div className="flex gap-2 items-center">
              <Handshake size={18} className="text-brand-red shrink-0" />
              <p className="text-[14px] text-grey-600">Location</p>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <MapPin size={18} className="text-brand-red shrink-0" />
            <p className="text-[14px] text-grey-600">{location}</p>
          </div>
          <div className="flex gap-2 items-center">
            <ArrowsOut size={18} className="text-brand-red shrink-0" />
            <p className="text-[14px] text-grey-600">{surface}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Toolbox size={18} className="text-brand-red shrink-0" />
            <p className="text-[14px] text-grey-600">{sector}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default OfferListItem
