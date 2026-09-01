import { useEffect, useState } from "react"

const FALLBACK_OFFSET = 120

function getOffset() {
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height"))
  // +16 matches the scroll-mt buffer used on section targets, so a section that
  // scrollIntoView just landed on (top === headerHeight + 16) is recognized as active.
  return (headerHeight || FALLBACK_OFFSET) + 16
}

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    function handleScroll() {
      const offset = getOffset()
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      let current = elements[0]?.id
      for (const el of elements) {
        if (Math.round(el.getBoundingClientRect().top) <= offset) {
          current = el.id
        } else {
          break
        }
      }
      if (current) setActiveId(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [ids])

  return activeId
}
