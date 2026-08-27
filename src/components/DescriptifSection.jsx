function DescriptifSection() {
  return (
    <section id="descriptif" className="flex flex-col gap-6 w-full scroll-mt-24 text-brand-blue">
      <p className="font-body font-semibold text-[20px] leading-[22.5px]">Description du site</p>
      <ul className="list-disc pl-5 text-[16px] leading-[1.5]">
        <li>Ancien site de production de 4 200 m2 sur parcelle de 1,2 ha</li>
        <li>En zone d'activité raccordée</li>
        <li>Bâti existant à réhabiliter, hauteur sous plafond 8 m</li>
        <li>Desserte poids lourds directe</li>
        <li>Sortie d'autoroute 6 min</li>
      </ul>
    </section>
  )
}

export default DescriptifSection
