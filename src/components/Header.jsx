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
      <div className="flex justify-end items-center gap-2 px-10 pt-4">
        <Button variant="dark" className="!h-auto !py-1 !px-4 text-[15px]">
          Entreprise
        </Button>
        <Button variant="outline" className="!h-auto !py-1 !px-4 text-[15px]">
          Collectivité
        </Button>
        <Button variant="outline" className="!h-auto !py-1 !px-4 text-[15px]">
          Mon compte
        </Button>
        <button className="flex items-center gap-2 px-4 py-1 text-brand-blue font-accent font-semibold underline">
          <Globe size={20} />
          FR
          <CaretDown size={20} />
        </button>
      </div>
      <div className="h-px bg-grey-200 mt-4" />
      <div className="flex items-center justify-between px-10">
        <Link to="/">
          <img src={logo} alt="Foncier+" className="h-[72px] w-auto" />
        </Link>
        <nav className="flex gap-6 items-center font-heading text-[16px] uppercase text-brand-blue">
          {NAV_LINKS.map((link) => (
            <a key={link} href="#" className="h-12 flex items-center hover:opacity-70">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
