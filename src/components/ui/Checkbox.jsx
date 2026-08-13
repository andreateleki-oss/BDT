import { Check } from "@phosphor-icons/react"

function Checkbox({ label, checked, onChange, name }) {
  return (
    <label className="group inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <span
        className={`size-6 flex items-center justify-center border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-brand-blue ${
          checked
            ? "bg-brand-red border-brand-red group-hover:bg-brand-red/90"
            : "bg-white border-grey-300 group-hover:border-brand-blue"
        }`}
      >
        {checked && <Check size={16} weight="bold" className="text-white" />}
      </span>
      <span className="text-[15px] font-semibold text-grey-900">{label}</span>
    </label>
  )
}

export default Checkbox
