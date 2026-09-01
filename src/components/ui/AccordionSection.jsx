import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CaretUp, CaretDown } from "@phosphor-icons/react"

function AccordionSection({ title, open, onToggle, count = 0, children }) {
  const [overflowVisible, setOverflowVisible] = useState(false)

  return (
    <div className="flex flex-col gap-3 items-start w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left rounded-sm transition-colors hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <span className="flex-1 flex items-center gap-2">
          <p className="font-body font-semibold text-[17px] leading-[1.2] text-brand-blue">
            {title}
          </p>
          {count > 0 && (
            <span className="size-5 rounded-full bg-brand-red text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
              {count}
            </span>
          )}
        </span>
        {open ? (
          <CaretUp size={18} className="text-brand-blue shrink-0" />
        ) : (
          <CaretDown size={18} className="text-brand-blue shrink-0" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className={`w-full ${overflowVisible ? "overflow-visible" : "overflow-hidden"}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            onAnimationStart={() => setOverflowVisible(false)}
            onAnimationComplete={() => setOverflowVisible(true)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AccordionSection
