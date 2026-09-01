import { Link } from "react-router-dom"
import { GridFour, MapTrifold } from "@phosphor-icons/react"

function ViewSwitch({ active, filters }) {
  return (
    <div className="border border-brand-blue rounded-full flex items-center gap-0.5 p-0.5">
      <Link
        to="/offres"
        state={filters}
        className={`flex items-center gap-1 px-4 py-1 rounded-full text-[15px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
          active === "grille" ? "bg-brand-blue text-white" : "text-brand-blue hover:bg-brand-blue/10"
        }`}
      >
        <GridFour size={18} />
        Grille
      </Link>
      <Link
        to="/offres/liste"
        state={filters}
        className={`flex items-center gap-1 px-4 py-1 rounded-full text-[15px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
          active === "carte" ? "bg-brand-blue text-white" : "text-brand-blue hover:bg-brand-blue/10"
        }`}
      >
        <MapTrifold size={16} />
        Carte
      </Link>
    </div>
  )
}

export default ViewSwitch
