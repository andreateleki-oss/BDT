const ITEMS = [
  { id: "descriptif", label: "Descriptif du site" },
  { id: "photos", label: "Photos du site" },
  { id: "environnement", label: "Environnement" },
  { id: "lots", label: "Lots disponibles" },
  { id: "tissu-economique", label: "Tissu économique et formations" },
  { id: "specificite", label: "Facilité d'implémentation" },
  { id: "contacter", label: "Contacter" },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function SommaireSidebar({ activeId }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-heading font-bold text-[30px] leading-[1.2] tracking-[-0.44px] text-brand-blue">
        Sommaire
      </p>
      <div className="flex flex-col gap-4 pl-8">
        {ITEMS.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-left font-heading text-[16px] leading-[1.2] tracking-[-0.44px] ${
                isActive ? "font-medium text-brand-red" : "font-normal text-brand-blue"
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default SommaireSidebar
export { ITEMS as SOMMAIRE_ITEMS }
