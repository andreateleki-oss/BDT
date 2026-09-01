import { CaretLeft, CaretRight } from "@phosphor-icons/react"

function NavButton({ onClick, disabled, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group size-11 flex items-center justify-center bg-white border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
        disabled ? "border-grey-300 cursor-not-allowed" : "border-brand-blue hover:bg-brand-blue"
      }`}
      aria-label={label}
    >
      <Icon size={20} className={disabled ? "text-grey-300" : "text-brand-blue transition-colors group-hover:text-white"} />
    </button>
  )
}

function CarouselNav({ onPrev, onNext, canPrev = true, canNext = true }) {
  return (
    <div className="flex gap-2 items-center shrink-0">
      <NavButton onClick={onPrev} disabled={!canPrev} icon={CaretLeft} label="Précédent" />
      <NavButton onClick={onNext} disabled={!canNext} icon={CaretRight} label="Suivant" />
    </div>
  )
}

export default CarouselNav
