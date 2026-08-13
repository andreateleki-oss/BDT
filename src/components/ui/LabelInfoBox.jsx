import { ArrowSquareOut } from "@phosphor-icons/react"
import Checkbox from "./Checkbox"

function LabelInfoBox({ label, tag, checked, onChange }) {
  return (
    <div className="border border-grey w-full flex flex-col gap-4 p-4">
      <div className="flex gap-6 items-end w-full">
        <div className="flex-1">
          <Checkbox label={label} checked={checked} onChange={onChange} />
        </div>
        <span className="bg-brand-blue text-white text-[15px] h-[26px] px-2 flex items-center justify-center rounded-sm shrink-0">
          {tag}
        </span>
      </div>
      <p className="font-heading text-[14px] leading-[1.5] text-brand-blue">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua.
      </p>
      <button
        type="button"
        className="flex items-center gap-2 text-brand-blue font-accent font-semibold underline rounded-sm transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        en savoir plus
        <ArrowSquareOut size={20} />
      </button>
    </div>
  )
}

export default LabelInfoBox
