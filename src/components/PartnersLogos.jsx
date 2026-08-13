import logos from "../assets/images/partners-logos.png"

function LogoStrip() {
  return (
    <div className="relative h-[142px] w-[1052px] shrink-0 overflow-hidden">
      <img
        src={logos}
        alt=""
        className="absolute left-0 w-full mix-blend-luminosity opacity-80"
        style={{ height: "182.28%", top: "-0.1%" }}
      />
    </div>
  )
}

function PartnersLogos() {
  return (
    <section className="bg-white flex items-center justify-center py-4 pb-10 px-[114px] overflow-hidden">
      <div className="flex w-max animate-marquee">
        <LogoStrip />
        <LogoStrip />
      </div>
    </section>
  )
}

export default PartnersLogos
