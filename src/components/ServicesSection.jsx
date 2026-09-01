const ITEMS = [
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
]

function ServicesSection() {
  return (
    <section id="services" className="flex flex-col gap-8 px-4 lg:px-[114px] pt-10 pb-10 scroll-mt-24 max-w-[1400px] mx-auto">
      <p className="font-heading font-semibold text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.3px] text-brand-blue">
        Nos Services
      </p>

      <div className="flex flex-col gap-8 items-start lg:flex-row lg:gap-11 w-full">
        <p className="w-full lg:w-[479px] shrink-0 text-[16px] leading-[1.5] text-brand-blue">
          Chaque projet a ses propres contraintes, ses propres échéances.
          Chaque projet a ses propres contraintes, ses propres échéances.
        </p>

        <div className="flex-1 flex flex-col">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 pb-4 ${i > 0 ? "border-t border-grey-200 pt-4" : ""}`}
            >
              <p className="font-heading font-semibold text-[20px] text-brand-blue">
                {item.title}
              </p>
              <p className="text-[16px] leading-[1.5] text-grey-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
