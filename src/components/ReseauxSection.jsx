import { Lightning, Flame, HardDrives, Globe } from "@phosphor-icons/react"
import IconInfoSection from "./IconInfoSection"

const ROWS = [
  {
    icon: Lightning,
    label: "Électricité",
    value: ["Centrale électrique à 5 km", "Puissance : 20 MW", "Point de livraison sur site"],
  },
  { icon: Flame, label: "Gaz", value: "Non raccordé" },
  {
    icon: HardDrives,
    label: "Fibre Optique",
    value: ["Site raccordé", "Technologie : FTTH", "Débit max : 100 Gb/s"],
  },
  { icon: Globe, label: "5G Industrielle", value: "Non" },
]

function ReseauxSection() {
  return <IconInfoSection id="reseaux" title="Réseaux" rows={ROWS} />
}

export default ReseauxSection
