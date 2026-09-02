import SiteLocationMap from "./ui/SiteLocationMap"

function EnvironnementSection({ coords }) {
  return (
    <section id="environnement" className="flex flex-col gap-6 w-full scroll-mt-[calc(var(--header-height)+16px)]">
      <p className="font-body font-semibold text-[20px] leading-[22.5px] text-brand-blue">Environnement</p>
      <SiteLocationMap coords={coords} className="w-full aspect-video overflow-hidden" />
    </section>
  )
}

export default EnvironnementSection
