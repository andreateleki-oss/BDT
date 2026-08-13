const ITEMS = [
  {
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer.",
  },
  {
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer",
  },
  {
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer.",
  },
]

function ServicesSection() {
  return (
    <section className="flex gap-11 items-start px-[114px] py-10">
      <div className="w-[479px] shrink-0 flex flex-col gap-6">
        <div className="font-heading leading-[1.15] tracking-[-1px] text-[40px]">
          <p className="text-title-light">Nos</p>
          <p className="font-bold text-brand-blue">Services</p>
        </div>
        <p className="text-[16px] leading-[1.5] text-brand-blue">
          Chaque projet a ses propres contraintes, ses propres échéances.
          Chaque projet a ses propres contraintes, ses propres échéances.
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        {ITEMS.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col gap-2 py-4 ${i > 0 ? "border-t border-grey-200" : ""}`}
          >
            <p className="font-heading font-semibold text-[20px] text-brand-blue">
              {item.title}
            </p>
            <p className="text-[16px] leading-[1.5] text-grey-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
