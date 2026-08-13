import { Link } from "react-router-dom"
import { GridFour, MapTrifold } from "@phosphor-icons/react"

function ViewSwitch({ active, filters }) {
  return (
    <div className="border border-brand-blue rounded-full flex items-center gap-0.5 p-0.5">
      <Link
        to="/offres"
        state={filters}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[14px] font-medium ${
          active === "grille" ? "bg-brand-blue text-white" : "text-brand-blue"
        }`}
      >
        <GridFour size={18} />
        Grille
      </Link>
      <Link
        to="/offres/liste"
        state={filters}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[14px] font-medium ${
          active === "carte" ? "bg-brand-blue text-white" : "text-brand-blue"
        }`}
      >
        <MapTrifold size={16} />
        Carte
      </Link>
    </div>
  )
}

export default ViewSwitch
