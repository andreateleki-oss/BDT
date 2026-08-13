import { useState } from "react"
import { ArrowsOutSimple, Stack, Plus, Minus } from "@phosphor-icons/react"
import MapPreviewPin from "./ui/MapPreviewPin"
import { OFFERS } from "../data/offers"
import mapFrance from "../assets/images/list-map-france.png"
import mapZoomed from "../assets/images/list-map-zoomed.png"

const PINS = [
  { offer: OFFERS[0], style: { left: "55.6%", top: "36.4%" } },
  { offer: OFFERS[1], style: { left: "43.9%", top: "70.1%" } },
]

function ControlButton({ icon: Icon, className = "", ...props }) {
  return (
    <button
      className={`bg-white border border-brand-blue rounded-sm size-11 flex items-center justify-center transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${className}`}
      {...props}
    >
      <Icon size={20} className="text-brand-blue" />
    </button>
  )
}

function MapPanel({ onExpand, className = "" }) {
  const [zoomed, setZoomed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-grey-200 ${className}`}>
      <img
        src={zoomed ? mapZoomed : mapFrance}
        alt="Carte des offres"
        onClick={() => !zoomed && setZoomed(true)}
        className={`absolute inset-0 size-full object-cover ${!zoomed ? "cursor-pointer" : ""}`}
      />

      {zoomed &&
        PINS.map((pin, i) => <MapPreviewPin key={i} offer={pin.offer} style={pin.style} />)}

      <ControlButton
        icon={ArrowsOutSimple}
        onClick={onExpand}
        className="absolute top-5 left-5"
        aria-label="Plein écran"
      />

      <div className="absolute top-5 right-5 flex flex-col gap-2">
        <ControlButton icon={Plus} onClick={() => setZoomed(true)} aria-label="Zoomer" />
        <ControlButton icon={Minus} onClick={() => setZoomed(false)} aria-label="Dézoomer" />
      </div>

      <ControlButton icon={Stack} className="absolute bottom-5 right-5" aria-label="Calques" />
    </div>
  )
}

export default MapPanel
