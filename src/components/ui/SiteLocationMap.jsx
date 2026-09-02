import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { ArrowsOutSimple, ArrowsInSimple, Globe, MapTrifold } from "@phosphor-icons/react"
import { randomSiteBoundary } from "../../utils/siteBoundary"
import { addSatelliteLayer, toggleSatelliteLayer } from "../../utils/satelliteLayer"

const MAX_ZOOM = 16

function ControlButton({ icon: Icon, className = "", ...props }) {
  return (
    <button
      className={`group bg-white border border-brand-blue size-11 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${className}`}
      {...props}
    >
      <Icon size={20} className="text-brand-blue transition-colors group-hover:text-white" />
    </button>
  )
}

function SiteLocationMap({ coords, className = "" }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [satellite, setSatellite] = useState(false)

  useEffect(() => {
    if (!coords) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: coords,
      zoom: MAX_ZOOM,
      minZoom: 4,
      maxZoom: MAX_ZOOM,
      attributionControl: { compact: true },
    })
    mapRef.current = map

    map.on("load", () => {
      map.addSource("site-boundary", {
        type: "geojson",
        data: randomSiteBoundary(coords),
      })
      map.addLayer({
        id: "site-boundary-fill",
        type: "fill",
        source: "site-boundary",
        paint: { "fill-color": "#e52b21", "fill-opacity": 0.15 },
      })
      map.addLayer({
        id: "site-boundary-outline",
        type: "line",
        source: "site-boundary",
        paint: { "line-color": "#e52b21", "line-width": 2 },
      })
      addSatelliteLayer(map, "site-boundary-fill")
    })

    const el = document.createElement("div")
    el.className = "size-4 rounded-full bg-brand-red border-2 border-white shadow-md"
    new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(coords).addTo(map)

    return () => map.remove()
  }, [coords])

  // The map container itself is never unmounted (only its parent's sizing classes change), so
  // MapLibre's own ResizeObserver picks up the fullscreen switch without recreating the map.
  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    function handleKeyDown(e) {
      if (e.key === "Escape") setExpanded(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [expanded])

  return (
    <div className={`bg-grey-200 ${expanded ? "fixed inset-0 z-50" : `relative ${className}`}`}>
      <div ref={containerRef} className="size-full" />

      <ControlButton
        icon={expanded ? ArrowsInSimple : ArrowsOutSimple}
        onClick={() => setExpanded((e) => !e)}
        className="absolute top-5 right-5 z-10"
        aria-label={expanded ? "Réduire" : "Agrandir"}
      />

      <ControlButton
        icon={satellite ? MapTrifold : Globe}
        onClick={() => mapRef.current && setSatellite(toggleSatelliteLayer(mapRef.current))}
        className="absolute bottom-5 right-5 z-10"
        aria-label={satellite ? "Vue par défaut" : "Vue satellite"}
      />
    </div>
  )
}

export default SiteLocationMap
