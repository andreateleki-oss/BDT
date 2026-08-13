import { CaretUp, CaretDown } from "@phosphor-icons/react"

function AccordionSection({ title, open, onToggle, children }) {
  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <p className="flex-1 font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">
          {title}
        </p>
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
