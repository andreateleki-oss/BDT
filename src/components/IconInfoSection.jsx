function IconInfoSection({ id, title, rows }) {
  return (
    <section id={id} className="flex flex-col gap-6 w-full scroll-mt-[calc(var(--header-height)+16px)] text-brand-blue">
      <p className="font-body font-semibold text-[20px] leading-[22.5px]">{title}</p>
      <div className="flex flex-col gap-8">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col gap-2 lg:flex-row lg:items-start">
            <div className="flex-1 flex items-center gap-2">
              <div className="size-7 shrink-0 drop-shadow-[0px_2px_12px_rgba(91,0,2,0.16)] flex items-center justify-center">
                <Icon size={20} className="text-brand-red" />
              </div>
              <p className="font-heading font-medium text-[16px] leading-[1.2] tracking-[-0.44px]">
                {label}
              </p>
            </div>
            <div className="flex-1 text-[16px] leading-[1.5]">
              {Array.isArray(value) ? (
                value.map((v, i) => <p key={i}>{v}</p>)
              ) : (
                <p>{value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default IconInfoSection
