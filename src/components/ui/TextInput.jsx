import { CaretDown } from "@phosphor-icons/react"

function TextInput({ label, placeholder, unit, hasCaret, muted = true, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <p className="font-heading text-[12px] uppercase text-brand-blue">
          {label}
        </p>
      )}
      <div
        className={`h-12 flex items-center justify-between px-[17px] py-[13px] border ${
          muted ? "bg-grey-50 border-grey-200" : "bg-white border-grey-200"
        }`}
      >
        <span className="text-[15px] text-grey">{placeholder}</span>
        {unit && (
          <div className="border-l border-grey-200 pl-2 flex items-center gap-1 text-grey text-[15px]">
            {unit}
            {hasCaret && <CaretDown size={20} className="text-grey" />}
          </div>
        )}
        {!unit && hasCaret && <CaretDown size={20} className="text-grey" />}
      </div>
    </div>
  )
}

export default TextInput
