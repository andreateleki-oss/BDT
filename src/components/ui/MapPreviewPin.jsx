import { useState, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Link } from "react-router-dom"
import { MapPin as MapPinIcon, ArrowsOut, Toolbox } from "@phosphor-icons/react"

const CLOSE_DELAY = 250

function MapPreviewPin({ style, offer }) {
  const [hovered, setHovered] = useState(false)
  const closeTimer = useRef(null)

  function handleEnter() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
    setHovered(true)
  }

  function handleLeave() {
    closeTimer.current = setTimeout(() => setHovered(false), CLOSE_DELAY)
  }

  return (
    <div className="absolute -translate-x-1/2 -translate-y-full size-4" style={style}>
      <div className="relative size-4" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
        <div className="size-4 rounded-full bg-brand-red border-2 border-white shadow-md" />
        <div className="absolute -inset-3 cursor-pointer" />

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[230px] bg-white shadow-xl z-10"
            >
              <Link to={`/offre/${offer.id}`} className="block">
                <img src={offer.image} alt={offer.title} className="w-full h-[140px] object-cover" />
                <div className="flex flex-col gap-2 p-3">
                  <p className="font-heading font-medium text-[16px] text-brand-blue">
                    {offer.title}
                  </p>
                  <div className="flex gap-2 items-center">
                    <MapPinIcon size={16} className="text-brand-red shrink-0" />
                    <p className="text-[13px] text-grey-600">{offer.location}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <ArrowsOut size={16} className="text-brand-red shrink-0" />
                    <p className="text-[13px] text-grey-600">{offer.surface}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Toolbox size={16} className="text-brand-red shrink-0" />
                    <p className="text-[13px] text-grey-600">{offer.sector}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MapPreviewPin
