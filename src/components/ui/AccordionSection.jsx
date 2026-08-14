import { CaretUp, CaretDown } from "@phosphor-icons/react"

function AccordionSection({ title, open, onToggle, active = false, children }) {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left rounded-sm transition-colors hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <span className="flex-1 flex items-center gap-2">
          <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
            {title}
          </p>
          {active && <span className="size-2 rounded-full bg-brand-red shrink-0" aria-hidden="true" />}
        </span>
        {open ? (
          <CaretUp size={20} className="text-brand-blue shrink-0" />
        ) : (
          <CaretDown size={20} className="text-brand-blue shrink-0" />
        )}
      </button>
      {open && <div className="w-full">{children}</div>}
    </div>
  )
}

export default AccordionSection
