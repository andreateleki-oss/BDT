const ITEMS = [
  { id: "descriptif", label: "Descriptif du site" },
  { id: "photos", label: "Photos du site" },
  { id: "environnement", label: "Environnement" },
  { id: "lots", label: "Lots disponibles" },
  { id: "reseaux", label: "Réseaux" },
  { id: "securite-incendie", label: "Sécurité incendie" },
  { id: "infrastructures-transport", label: "Infrastructures de transport" },
  { id: "tissu-economique", label: "Tissu économique et formations" },
  { id: "specificite", label: "Spécificités du site" },
  { id: "contacter", label: "Contacter" },
]

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function SommaireSidebar({ activeId }) {
  return (
    <div className="flex flex-col gap-6">
      <p className="font-heading font-semibold text-[30px] leading-[1.2] tracking-[-0.44px] text-brand-blue">
        Sommaire
      </p>
      <div className="flex flex-col gap-4 pl-8">
        {ITEMS.map((item) => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
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
    </div>
  )
}

export default SommaireSidebar
export { ITEMS as SOMMAIRE_ITEMS }
