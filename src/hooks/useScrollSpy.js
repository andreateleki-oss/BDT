import { useEffect, useState } from "react"

const OFFSET = 120

export function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    function handleScroll() {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)

      let current = elements[0]?.id
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= OFFSET) {
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
