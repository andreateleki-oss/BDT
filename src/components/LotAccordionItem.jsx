import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CaretUp,
  CaretDown,
  Binoculars,
  ArrowsOutCardinal,
  Building,
  Factory,
  CalendarBlank,
  Handshake,
  FrameCorners,
} from "@phosphor-icons/react"

const INFO_ROWS = (lot) => [
  { icon: Binoculars, label: "Descriptif", value: lot.disponibilite },
  { icon: ArrowsOutCardinal, label: "Taille de parcelle", value: [`Terrain de ${lot.surface}`, `Bâtiment : ${lot.bati}`] },
  { icon: Building, label: "Bâtiment", value: [`Terrain de ${lot.surface}`, `Bâtiment : ${lot.bati}`] },
  { icon: Factory, label: "Vocation sectorielle", value: "Tout type de secteur" },
  { icon: CalendarBlank, label: "Disponibilité", value: lot.disponibilite },
  { icon: Handshake, label: "Type d'acquisition", value: lot.type },
]

function LotAccordionItem({ lot, open, onToggle, onExpandPlan, planImage }) {
  const [overflowVisible, setOverflowVisible] = useState(false)

  return (
    <div className="bg-grey-200 border border-grey-200 overflow-hidden w-full">
      <button
        onClick={onToggle}
        className="bg-white flex items-center justify-between p-4 w-full text-left transition-colors hover:bg-grey-50 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-brand-blue"
      >
        <div className="flex-1 flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-4 text-brand-blue text-[16px]">
          <p className="flex-1 font-heading font-medium leading-[1.2] tracking-[-0.44px] truncate">
            {lot.name}
          </p>
          <div className="flex flex-col gap-1 lg:contents">
            <p className="shrink-0 lg:w-[100px] font-body text-[14px] lg:text-[16px] leading-[1.5]">{lot.surface}</p>
            <p className="shrink-0 lg:w-[140px] font-body text-[14px] lg:text-[16px] leading-[1.5]">{lot.disponibilite}</p>
            <p className="shrink-0 lg:w-[80px] font-body text-[14px] lg:text-[16px] leading-[1.5]">{lot.type}</p>
          </div>
        </div>
        {open ? (
          <CaretUp size={20} className="text-brand-blue shrink-0" />
        ) : (
          <CaretDown size={20} className="text-brand-blue shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={overflowVisible ? "overflow-visible" : "overflow-hidden"}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onAnimationStart={() => setOverflowVisible(false)}
            onAnimationComplete={() => setOverflowVisible(true)}
          >
            <div className="bg-white flex flex-col gap-6 px-6 pb-6 border-t border-grey-200 pt-6">
              <div className="w-full aspect-video overflow-hidden">
                <img src={lot.image} alt={lot.name} className="size-full object-cover" />
              </div>

              <div className="flex flex-col gap-8">
                {INFO_ROWS(lot).map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col gap-2 lg:flex-row lg:items-start">
                    <div className="flex-1 flex items-center gap-2">
                      <div className="size-7 shrink-0 drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] flex items-center justify-center">
                        <Icon size={20} className="text-brand-red" />
                      </div>
                      <p className="font-heading font-medium text-[16px] leading-[1.2] tracking-[-0.44px] text-brand-blue">
                        {label}
                      </p>
                    </div>
                    <div className="flex-1 font-body text-[16px] leading-[1.5] text-brand-blue">
                      {Array.isArray(value) ? value.map((v, i) => <p key={i}>{v}</p>) : <p>{value}</p>}
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-2 lg:flex-row lg:items-start">
                  <div className="flex-1 flex items-center gap-2">
                    <div className="size-7 shrink-0 drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] flex items-center justify-center">
                      <FrameCorners size={20} className="text-brand-red" />
                    </div>
                    <p className="font-heading font-medium text-[16px] leading-[1.2] tracking-[-0.44px] text-brand-blue">
                      Plan de la parcelle
                    </p>
                  </div>
                  <div className="flex-1 relative">
                    <img src={planImage} alt="Plan de la parcelle" className="w-full aspect-video object-cover" />
                    <button
                      onClick={onExpandPlan}
                      className="group absolute top-2 right-2 bg-white border border-brand-blue size-6 flex items-center justify-center transition-colors hover:bg-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                      aria-label="Agrandir le plan"
                    >
                      <FrameCorners size={14} className="text-brand-blue transition-colors group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LotAccordionItem
