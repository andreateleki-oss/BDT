import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import maplibregl from "../utils/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import { ArrowsOutSimple, ArrowsInSimple, Plus, Minus, Globe, MapTrifold } from "@phosphor-icons/react"
import MapPreviewPin from "./ui/MapPreviewPin"
import { LOCATION_VIEWS } from "../data/locationViews"
import { randomSiteBoundary } from "../utils/siteBoundary"
import { addSatelliteLayer, toggleSatelliteLayer } from "../utils/satelliteLayer"

const FRANCE_CENTER = [2.4, 46.6]
const FRANCE_ZOOM = 5.2
const SITE_BOUNDARY_SOURCE_ID = "site-boundary"

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

function MapPanel({ offers, localisation, expanded = false, onExpand, className = "" }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const [markerNodes, setMarkerNodes] = useState([])
  const [satellite, setSatellite] = useState(false)

  useEffect(() => {
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: FRANCE_CENTER,
      zoom: FRANCE_ZOOM,
      minZoom: 4,
      maxZoom: 16,
      attributionControl: { compact: true },
    })
    mapRef.current = map

    map.on("load", () => {
      map.addSource(SITE_BOUNDARY_SOURCE_ID, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      })
      map.addLayer({
        id: "site-boundary-fill",
        type: "fill",
        source: SITE_BOUNDARY_SOURCE_ID,
        paint: { "fill-color": "#e52b21", "fill-opacity": 0.15 },
      })
      map.addLayer({
        id: "site-boundary-outline",
        type: "line",
        source: SITE_BOUNDARY_SOURCE_ID,
        paint: { "line-color": "#e52b21", "line-width": 2 },
      })
      addSatelliteLayer(map, "site-boundary-fill")
    })

    return () => map.remove()
  }, [])

  function handlePinClick(offer) {
    const map = mapRef.current
    if (!map) return
    map.flyTo({ center: offer.coords, zoom: map.getMaxZoom() })
    map.getSource(SITE_BOUNDARY_SOURCE_ID)?.setData(randomSiteBoundary(offer.coords))
  }

  // Markers are DOM overlays positioned via the map's projection, independent of style/tile
  // loading, so they don't need to wait for the "load" event. Their content is rendered via
  // portal (below) so it stays inside the app's React tree, e.g. for routing context.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const markers = []
    const nodes = []
    const coordsList = []
    offers.forEach((offer) => {
      if (!offer.coords) return
      // Padding offers (added when a filter has too few real matches) sit at their own real
      // location, not the filtered one, so they'd throw off the zoom — only fit real matches.
      if (!offer.isPadding) coordsList.push(offer.coords)
      const el = document.createElement("div")
      markers.push(new maplibregl.Marker({ element: el, anchor: "bottom" }).setLngLat(offer.coords).addTo(map))
      nodes.push({ offer, el })
    })
    setMarkerNodes(nodes)

    // Zoom the map to match the filtered results, e.g. the selected region.
    if (coordsList.length === 1) {
      map.flyTo({ center: coordsList[0], zoom: 10 })
    } else if (coordsList.length > 1) {
      const bounds = coordsList.reduce(
        (b, coords) => b.extend(coords),
        new maplibregl.LngLatBounds(coordsList[0], coordsList[0])
      )
      map.fitBounds(bounds, { padding: 60, maxZoom: 12, duration: 600 })
    } else if (localisation && LOCATION_VIEWS[localisation]) {
      // No real offer matches the filter — frame the selected location itself rather than
      // falling back to the full France view.
      map.flyTo(LOCATION_VIEWS[localisation])
    } else {
      map.flyTo({ center: FRANCE_CENTER, zoom: FRANCE_ZOOM })
    }

    return () => markers.forEach((marker) => marker.remove())
  }, [offers, localisation])

  return (
    <div className={`relative overflow-hidden bg-grey-200 ${className}`}>
      <div ref={containerRef} className="size-full" />

      {markerNodes.map(({ offer, el }) =>
        createPortal(<MapPreviewPin offer={offer} onPinClick={handlePinClick} />, el, offer.id)
      )}

      <ControlButton
        icon={expanded ? ArrowsInSimple : ArrowsOutSimple}
        onClick={onExpand}
        className="absolute top-5 left-5 z-10"
        aria-label={expanded ? "Réduire" : "Plein écran"}
      />

      <div className="absolute top-5 right-5 z-10 flex flex-col gap-2">
        <ControlButton icon={Plus} onClick={() => mapRef.current?.zoomIn()} aria-label="Zoomer" />
        <ControlButton icon={Minus} onClick={() => mapRef.current?.zoomOut()} aria-label="Dézoomer" />
      </div>

      <ControlButton
        icon={satellite ? MapTrifold : Globe}
        onClick={() => mapRef.current && setSatellite(toggleSatelliteLayer(mapRef.current))}
        className="absolute bottom-5 right-5 z-10"
        aria-label={satellite ? "Vue par défaut" : "Vue satellite"}
      />
    </div>
  )
}

export default MapPanel
