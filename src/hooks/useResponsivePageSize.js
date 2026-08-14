import { useState, useEffect } from "react"

// Mirrors Tailwind's sm (640px) and lg (1024px) breakpoints: 1 card per page on
// phones, 2 on tablets, 3 on desktop — so the desktop layout stays unchanged.
function computePageSize() {
  if (window.innerWidth < 640) return 1
  if (window.innerWidth < 1024) return 2
  return 3
}

export function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(computePageSize)

  useEffect(() => {
    function handleResize() {
      setPageSize(computePageSize())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return pageSize
}
