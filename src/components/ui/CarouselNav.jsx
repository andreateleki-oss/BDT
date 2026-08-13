import { CaretLeft, CaretRight } from "@phosphor-icons/react"

function NavButton({ onClick, disabled, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`size-11 flex items-center justify-center transition-colors ${
        disabled ? "bg-brand-blue/30 cursor-not-allowed" : "bg-brand-blue"
      }`}
      aria-label={label}
    >
      <Icon size={20} className="text-white" />
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
