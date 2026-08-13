function CarouselHeader({ titleLight, titleBold, children }) {
  return (
    <div className="flex items-end justify-between w-full">
      <div className="flex-1 font-heading leading-[1.15] tracking-[-1px] text-[40px]">
        <p className="text-title-light">{titleLight}</p>
        <p className="font-bold text-brand-blue">{titleBold}</p>
      </div>
      {children}
    </div>
  )
}

export default CarouselHeader
