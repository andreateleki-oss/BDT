import { useLayoutEffect, useRef } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/images/logo-foncier.png"
import Button from "./ui/Button"
import LanguageSelector from "./ui/LanguageSelector"
import { useScrollSpy } from "../hooks/useScrollSpy"

const NAV_LINKS = [
  { label: "Rechercher un terrain", sectionId: "rechercher-un-terrain" },
  { label: "Nos secteurs d'activités", sectionId: "secteur-activite" },
  { label: "À propos de Foncier+", sectionId: "a-propos" },
  { label: "Actualités", sectionId: "actualites" },
]

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const headerRef = useRef(null)
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.sectionId))

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height
      document.documentElement.style.setProperty("--header-height", `${height}px`)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function handleSectionClick(sectionId) {
    return (e) => {
      e.preventDefault()
      if (pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        navigate("/", { state: { scrollTo: sectionId } })
      }
    }
  }

  return (
    <header ref={headerRef} className="bg-white shadow-[0px_2px_12px_rgba(4,63,84,0.15)] sticky top-0 z-20">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-4 lg:px-[114px]">
          <Link
            to="/"
            className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <img src={logo} alt="Foncier+" className="w-[242px] h-auto" />
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="dark" className="!h-auto !py-1 !px-4 text-[15px]">
              Entreprise
            </Button>
            <Button variant="outline" className="!h-auto !py-1 !px-4 text-[15px]">
              Collectivité
            </Button>
            <Button variant="outline" className="!h-auto !py-1 !px-4 text-[15px]">
              Mon compte
            </Button>
            <Button as={Link} to="/formulaire" variant="solid" className="!h-auto !py-1 !px-4 text-[15px]">
              Nous contacter
            </Button>
            <LanguageSelector />
          </div>
        </div>
        <div className="h-px bg-grey-200 mt-4" />
        <div className="flex flex-wrap items-center gap-6 lg:gap-11 px-4 py-3 lg:px-[114px]">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center font-heading text-[14px] lg:text-[16px]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href="#"
                onClick={handleSectionClick(link.sectionId)}
                className={`h-12 flex items-center rounded-sm transition-colors hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
                  pathname === "/" && activeId === link.sectionId ? "font-medium text-brand-red" : "font-normal text-brand-blue"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
