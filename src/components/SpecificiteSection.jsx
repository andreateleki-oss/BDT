import { Handshake, Radioactive, Plant, Grains } from "@phosphor-icons/react"

const ROWS = [
  { icon: Handshake, label: "Label", value: "Site clef en main 2030" },
  { icon: Radioactive, label: "Site SEVESO", value: "Non" },
  { icon: Plant, label: "Zone protégée", value: "Non" },
  { icon: Grains, label: "Zone de revitalisation rurale", value: "Non" },
]

function SpecificiteSection() {
  return (
    <section id="specificite" className="flex flex-col gap-6 w-full scroll-mt-24 text-brand-blue">
      <p className="font-body font-semibold text-[20px] leading-[22.5px]">Spécificités du site</p>

      <div className="flex flex-col gap-8">
        {ROWS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col gap-2 lg:flex-row lg:items-start">
            <div className="flex-1 flex items-center gap-2">
              <div className="size-7 shrink-0 drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] flex items-center justify-center">
                <Icon size={20} className="text-brand-red" />
              </div>
              <p className="font-heading font-medium text-[16px] leading-[1.2] tracking-[-0.44px]">
                {label}
              </p>
            </div>
            <p className="flex-1 text-[16px] leading-[1.5]">{value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SpecificiteSection
