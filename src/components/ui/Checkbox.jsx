import { Check } from "@phosphor-icons/react"

function Checkbox({ label, checked, onChange, name }) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`size-6 flex items-center justify-center border transition-colors ${
          checked
            ? "bg-brand-red border-brand-red"
            : "bg-white border-grey-300"
        }`}
      >
        {checked && <Check size={16} weight="bold" className="text-white" />}
      </span>
      <span className="text-[15px] font-semibold text-grey-900">{label}</span>
    </label>
  )
}

export default Checkbox
