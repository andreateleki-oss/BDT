import { useLayoutEffect, useRef, useState } from "react"
import Button from "./ui/Button"
import decorPiece2 from "../assets/images/logo-piece-2.png"

const ITEMS = [
  { id: "photos", label: "Photos du site" },
  { id: "vue-ensemble", label: "Vue d'ensemble" },
  { id: "descriptif", label: "Descriptif du site" },
  { id: "environnement", label: "Environnement" },
  { id: "lots", label: "Lots disponibles" },
  { id: "reseaux", label: "Réseaux" },
  { id: "securite-incendie", label: "Sécurité incendie" },
  { id: "infrastructures-transport", label: "Infrastructures de transport" },
  { id: "tissu-economique", label: "Tissu économique et formations" },
  { id: "specificite", label: "Spécificités du site" },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function SommaireSidebar({ activeId, showCta = true }) {
  const containerRef = useRef(null)
  const buttonRefs = useRef({})
  const [decorBottom, setDecorBottom] = useState(0)

  useLayoutEffect(() => {
    function updateDecorPosition() {
      const container = containerRef.current
      const activeButton = buttonRefs.current[activeId]
      if (!container || !activeButton) return
      setDecorBottom(activeButton.getBoundingClientRect().bottom - container.getBoundingClientRect().top)
    }
    updateDecorPosition()
    window.addEventListener("resize", updateDecorPosition)
    return () => window.removeEventListener("resize", updateDecorPosition)
  }, [activeId])

  return (
    <div className="flex flex-col gap-6">
      <div ref={containerRef} className="relative flex flex-col gap-4 pl-8">
        <img
          src={decorPiece2}
          alt=""
          style={{ top: decorBottom }}
          className="absolute left-6 -translate-x-full -translate-y-full w-[29px] h-[29px] pointer-events-none transition-[top] duration-300"
        />
        {ITEMS.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              ref={(el) => (buttonRefs.current[item.id] = el)}
              onClick={() => scrollToSection(item.id)}
              className={`text-left font-heading text-[16px] leading-[1.2] tracking-[-0.44px] rounded-sm transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                isActive ? "font-medium text-brand-red" : "font-normal text-brand-blue"
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <Button
        variant="solid"
        onClick={() => scrollToSection("contacter")}
        className={`self-start ml-8 transition-opacity ${showCta ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        Prendre contact
      </Button>
    </div>
  )
}

export default SommaireSidebar
export { ITEMS as SOMMAIRE_ITEMS }
