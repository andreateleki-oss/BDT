import { MapPin, ArrowsOut, Toolbox, Handshake, CalendarBlank, Building } from "@phosphor-icons/react"

const SUMMARY = [
  { label: "Localisation", value: "Parc de Choyau Jaulnes, 77236, Île de France", icon: MapPin },
  { label: "Type d'acquisition", value: "Achat ou location", icon: Handshake },
  { label: "Vocation sectorielle", value: "Tout type de secteur", icon: Toolbox },
  { label: "Disponibilité", value: "Disponible en septembre 2026", icon: CalendarBlank },
  { label: "Taille du site", value: ["Terrain : 2,4 ha", "Bâti : 600 m2"], icon: ArrowsOut },
  { label: "Batiments", value: ["6 bâtiments", "4 étages"], icon: Building },
]

function SummaryItem({ label, value, icon: Icon }) {
  return (
    <div className="flex gap-2 items-start w-full">
      <div className="drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] shrink-0 size-7 flex items-center justify-center">
        <Icon size={20} className="text-brand-red" />
      </div>
      <div className="flex flex-col gap-2 text-brand-blue">
        <p className="font-heading font-medium text-[16px] leading-[1.2] tracking-[-0.44px]">{label}</p>
        {Array.isArray(value) ? (
          value.map((v, i) => <p key={i} className="text-[14px] leading-[1.5]">{v}</p>)
        ) : (
          <p className="text-[14px] leading-[1.5]">{value}</p>
        )}
      </div>
    </div>
  )
}

function VueEnsembleSection() {
  return (
    <section id="vue-ensemble" className="flex flex-col gap-6 w-full scroll-mt-[calc(var(--header-height)+16px)]">
      <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
        Vue d'ensemble
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
        {SUMMARY.map((item) => (
          <SummaryItem key={item.label} {...item} />
        ))}
      </div>
    </section>
  )
}

export default VueEnsembleSection
