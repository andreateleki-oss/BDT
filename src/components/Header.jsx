import { useLayoutEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import logo from "../assets/images/logo-foncier.png"
import Button from "./ui/Button"
import LanguageSelector from "./ui/LanguageSelector"
import { useHideOnScrollDown } from "../hooks/useHideOnScrollDown"

const NAV_LINKS = [
  { label: "Secteur d'activité", sectionId: "secteur-activite" },
  { label: "Rechercher un terrain", to: "/offres" },
  { label: "Nos services", sectionId: "services" },
  { label: "Nous contacter", to: "/formulaire" },
]

function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const hidden = useHideOnScrollDown()
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)

  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const height = entries[0].contentRect.height
      setHeaderHeight(height)
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
    <>
      <div style={{ height: headerHeight }} />
      <header
        ref={headerRef}
        className={`bg-white shadow-[0px_2px_12px_rgba(4,63,84,0.15)] fixed top-0 inset-x-0 z-20 transition-transform duration-300 ${
          hidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="flex flex-wrap justify-end items-center gap-2 px-4 pt-4 lg:px-10">
          <Button variant="dark" className="!h-auto !py-1 !px-4 text-[15px]">
            Entreprise
          </Button>
          <Button variant="outline" className="!h-auto !py-1 !px-4 text-[15px]">
            Collectivité
          </Button>
          <Button variant="outline" className="!h-auto !py-1 !px-4 text-[15px]">
            Mon compte
          </Button>
          <LanguageSelector />
        </div>
        <div className="h-px bg-grey-200 mt-4" />
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 lg:px-10 lg:py-0">
          <Link
            to="/"
            className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
          >
            <img src={logo} alt="Foncier+" className="h-12 w-auto lg:h-[72px]" />
          </Link>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center font-heading text-[14px] lg:text-[16px] text-brand-blue">
            {NAV_LINKS.map((link) => {
              const className =
                "h-12 flex items-center rounded-sm transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              return link.sectionId ? (
                <a
                  key={link.label}
                  href="#"
                  onClick={handleSectionClick(link.sectionId)}
                  className={className}
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.to} className={className}>
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
