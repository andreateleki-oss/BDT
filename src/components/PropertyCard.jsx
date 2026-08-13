import { Link } from "react-router-dom"
import { MapPin, ArrowsOut, Toolbox, Handshake } from "@phosphor-icons/react"

function PropertyCard({
  image,
  title,
  location,
  surface,
  sector,
  tag,
  isRental = false,
  compact = false,
  to,
  iconColor = "text-grey-600",
}) {
  const Wrapper = to ? Link : "div"

  return (
    <Wrapper
      to={to}
      className="flex-1 flex flex-col gap-6 group rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {tag && (
          <span className="absolute bottom-2 right-2 bg-[#e0eff6] text-[#0c5585] text-[14px] px-2 py-1 rounded-sm">
            {tag}
          </span>
        )}
      </div>
      <div className={`flex flex-col ${compact ? "gap-2" : "gap-4"}`}>
        <p
          className={`font-heading font-medium text-brand-blue leading-[1.2] transition-colors group-hover:text-brand-red ${
            compact ? "text-[16px] tracking-[-0.44px]" : "text-[20px] tracking-[-0.3px]"
          }`}
        >
          {title}
        </p>
        <div className="flex flex-col gap-1">
          {isRental && (
            <div className="flex gap-2 items-center">
              <Handshake size={compact ? 18 : 24} className={`${iconColor} shrink-0`} />
              <p className={`text-grey-600 ${compact ? "text-[14px]" : "text-[16px]"}`}>Location</p>
            </div>
          )}
          <div className="flex gap-2 items-center">
            <MapPin size={compact ? 18 : 24} className={`${iconColor} shrink-0`} />
            <p className={`text-grey-600 ${compact ? "text-[14px]" : "text-[16px]"}`}>{location}</p>
          </div>
          <div className="flex gap-2 items-center">
            <ArrowsOut size={compact ? 18 : 24} className={`${iconColor} shrink-0`} />
            <p className={`text-grey-600 ${compact ? "text-[14px]" : "text-[16px]"}`}>{surface}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Toolbox size={compact ? 18 : 24} className={`${iconColor} shrink-0`} />
            <p className={`text-grey-600 ${compact ? "text-[14px]" : "text-[16px]"}`}>{sector}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default PropertyCard
