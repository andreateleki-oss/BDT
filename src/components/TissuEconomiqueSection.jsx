import chartSvg from "../assets/images/tissu-eco-chart.svg"

const LEGEND = [
  { label: "Agroalimentaire (24)", color: "#5a71b4" },
  { label: "Logistique (21)", color: "#448d60" },
  { label: "Métallurgie (17)", color: "#e52b21" },
  { label: "Plasturgie (21)", color: "#ef7757" },
]

function TissuEconomiqueSection() {
  return (
    <section id="tissu-economique" className="flex flex-col gap-10 w-full scroll-mt-24">
      <div className="flex flex-col gap-6 text-brand-blue">
        <p className="font-body font-semibold text-[20px] leading-[22.5px]">
          Tissu économique et formations
        </p>
        <ul className="list-disc pl-5 text-[16px] leading-[1.5]">
          <li>
            Le site est situé à équidistance de grands pôles économiques franciliens qui sont
            Paris, Évry-Courcouronnes, Créteil, Massy et Rungis.
          </li>
          <li>
            Le territoire accueil plusieurs lycées, notamment ceux rattachés à la plateforme
            aéroportuaire d'Orly, qui propose des formations en Bac pro Aéronautique (options
            structure, système ou avionique), en alternance en professionnalisation.
          </li>
        </ul>
      </div>

      <div className="bg-grey-50 p-6 flex flex-col gap-6 w-full">
        <p className="font-heading font-medium text-[17px] leading-[1.2] text-brand-blue">
          Entreprises à proximité
        </p>
        <div className="flex flex-col gap-6 items-start lg:flex-row lg:gap-24 lg:items-center">
          <img src={chartSvg} alt="Répartition des entreprises à proximité" className="size-[224px] shrink-0" />
          <div className="flex flex-col gap-6 w-full lg:w-[313px]">
            <p className="font-heading text-[16px] leading-[1.2] tracking-[-0.3px] text-title-light">
              + 87 entreprises dans un rayon de 5 km
            </p>
            <div className="flex flex-col gap-4">
              {LEGEND.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="size-5 shrink-0" style={{ backgroundColor: item.color }} />
                  <p className="text-[16px] leading-[1.5] text-brand-blue">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TissuEconomiqueSection
