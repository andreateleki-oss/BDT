function CarouselHeader({ titleLight, titleBold, titleBoldWeight = "font-semibold", children }) {
  return (
    <div className="flex flex-col gap-4 items-start lg:flex-row lg:items-end lg:justify-between w-full">
      <div className="flex-1 font-heading leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px]">
        <p className="text-title-light">{titleLight}</p>
        <p className={`${titleBoldWeight} text-brand-blue`}>{titleBold}</p>
      </div>
      {children}
    </div>
  )
}

export default CarouselHeader
