function metersToLngLat([lng, lat], dx, dy) {
  const dLat = dy / 110_540
  const dLng = dx / (111_320 * Math.cos((lat * Math.PI) / 180))
  return [lng + dLng, lat + dLat]
}

// A rough quadrilateral standing in for a site's real boundary: one point in each
// direction (N/E/S/W) with angle + radius jitter, kept in angular order so the ring stays simple.
export function randomSiteBoundary(center, radiusMeters = 120) {
  const points = [0, 90, 180, 270].map((baseAngle) => {
    const angle = (baseAngle + (Math.random() - 0.5) * 70) * (Math.PI / 180)
    const r = radiusMeters * (0.6 + Math.random() * 0.6)
    return metersToLngLat(center, Math.cos(angle) * r, Math.sin(angle) * r)
  })
  return {
    type: "Feature",
    geometry: { type: "Polygon", coordinates: [[...points, points[0]]] },
  }
}
