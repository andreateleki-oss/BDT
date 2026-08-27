import { useEffect, useRef, useState } from "react"

export function useHideOnScrollDown(threshold = 10) {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    function handleScroll() {
      const y = window.scrollY
      if (y <= threshold) {
        setHidden(false)
      } else if (y > lastY.current) {
        setHidden(true)
      } else if (y < lastY.current) {
        setHidden(false)
      }
      lastY.current = y
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return hidden
}
