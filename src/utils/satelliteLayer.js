export const SATELLITE_SOURCE_ID = "satellite"
export const SATELLITE_LAYER_ID = "satellite-layer"

// Esri World Imagery: free raster satellite tiles, no API key required.
const SATELLITE_TILES_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

// Adds the satellite raster layer hidden, right below `beforeId` so it can sit under any
// overlay layers (site boundary, etc.) already added to the style. Toggle it on/off afterwards.
export function addSatelliteLayer(map, beforeId) {
  map.addSource(SATELLITE_SOURCE_ID, {
    type: "raster",
    tiles: [SATELLITE_TILES_URL],
    tileSize: 256,
    attribution: "Esri, Maxar, Earthstar Geographics, and the GIS User Community",
  })
  map.addLayer(
    { id: SATELLITE_LAYER_ID, type: "raster", source: SATELLITE_SOURCE_ID, layout: { visibility: "none" } },
    beforeId
  )
}

// Returns whether satellite is now visible.
export function toggleSatelliteLayer(map) {
  const isVisible = map.getLayoutProperty(SATELLITE_LAYER_ID, "visibility") === "visible"
  map.setLayoutProperty(SATELLITE_LAYER_ID, "visibility", isVisible ? "none" : "visible")
  return !isVisible
}
