import { Link } from "react-router-dom"
import { CaretRight } from "@phosphor-icons/react"

function Breadcrumb({ items }) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center flex-wrap gap-2 text-[14px]">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <CaretRight size={14} className="text-grey shrink-0" />}
            {item.to && !isLast ? (
              <Link
                to={item.to}
                className="text-grey-600 hover:text-brand-blue transition-colors rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
              >
                {item.label}
              </Link>
            ) : (
              <span className={`truncate max-w-[240px] ${isLast ? "text-brand-blue font-medium" : "text-grey-600"}`}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export default Breadcrumb
