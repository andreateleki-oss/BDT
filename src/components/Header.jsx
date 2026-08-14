import { Link } from "react-router-dom"
import { Globe, CaretDown } from "@phosphor-icons/react"
import logo from "../assets/images/logo-foncier.png"
import Button from "./ui/Button"

const NAV_LINKS = [
  "Secteur d'activité",
  "Rechercher un terrain",
  "Nos services",
  "Nous contacter",
]

function Header() {
  return (
    <header className="bg-white shadow-[0px_2px_12px_rgba(4,63,84,0.15)] relative z-20">
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
        <button className="flex items-center gap-2 px-4 py-1 text-brand-blue font-accent font-semibold underline rounded-sm transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
          <Globe size={20} />
          FR
          <CaretDown size={20} />
        </button>
      </div>
      <div className="h-px bg-grey-200 mt-4" />
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3 lg:px-10 lg:py-0">
        <Link
          to="/"
          className="rounded-sm transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
        >
          <img src={logo} alt="Foncier+" className="h-12 w-auto lg:h-[72px]" />
        </Link>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 items-center font-heading text-[14px] lg:text-[16px] uppercase text-brand-blue">
          {NAV_LINKS.map((link) => {
            const className =
              "h-12 flex items-center rounded-sm transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            return link === "Rechercher un terrain" ? (
              <Link key={link} to="/offres" className={className}>
                {link}
              </Link>
            ) : (
              <a key={link} href="#" className={className}>
                {link}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}

export default Header
