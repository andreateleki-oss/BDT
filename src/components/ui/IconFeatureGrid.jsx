function IconFeatureGrid({ titleLight, titleBold, description, items }) {
  return (
    <section className="flex flex-col gap-11 items-start py-10 px-[114px]">
      <div className="flex flex-col gap-6 max-w-[956px]">
        <div className="font-heading leading-[1.15] tracking-[-1px] text-[40px]">
          <p className="text-title-light">{titleLight}</p>
          <p className="font-bold text-brand-blue">{titleBold}</p>
        </div>
        {description && (
          <p className="text-[16px] leading-[1.5] text-brand-blue max-w-[907px]">
            {description}
          </p>
        )}
      </div>

      <div className="flex gap-11 items-start w-full">
        {items.map(({ icon: Icon, title, description: itemDescription }, i) => (
          <div key={i} className="flex-1 flex flex-col gap-4">
            <div className="size-12 flex items-center justify-center p-2">
              <Icon size={32} className="text-brand-red" />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-heading font-medium text-[20px] leading-[1.2] tracking-[-0.3px] text-brand-blue">
                {title}
              </p>
              <p className="text-[16px] leading-[1.5] text-grey-600">
                {itemDescription}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default IconFeatureGrid
