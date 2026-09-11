function CarouselHeader({ titleLight, titleBold, titleBoldWeight = "font-semibold", size = "lg", children }) {
  return (
    <div className="flex flex-col gap-4 items-start lg:flex-row lg:items-end lg:justify-between w-full">
      {size === "sm" ? (
        <p className="flex-1 font-accent font-semibold text-[22px] lg:text-[26px] leading-[1.2] tracking-[-0.3px] text-brand-blue">
          {titleLight} {titleBold}
        </p>
      ) : (
        <div className="flex-1 font-accent leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px]">
          <p className="text-title-light">{titleLight}</p>
          <p className={`${titleBoldWeight} text-brand-blue`}>{titleBold}</p>
        </div>
      )}
      {children}
    </div>
  )
}

export default CarouselHeader
