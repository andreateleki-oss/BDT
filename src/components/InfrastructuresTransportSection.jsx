import { RoadHorizon, Airplane, TrainSimple, Boat } from "@phosphor-icons/react"
import IconInfoSection from "./IconInfoSection"

const ROWS = [
  { icon: RoadHorizon, label: "Autoroute", value: ["A6 à 2 km", "A86 à 5 km"] },
  { icon: Airplane, label: "Aéroport", value: "Orly à 13 km" },
  { icon: TrainSimple, label: "Gare de fret", value: "Massy TGV à 13 km" },
  { icon: Boat, label: "Port industriel", value: ["Port de Nogent à 17 km", "HAROPA PORT à 19 km"] },
]

function InfrastructuresTransportSection() {
  return <IconInfoSection id="infrastructures-transport" title="Infrastructures de transport" rows={ROWS} />
}

export default InfrastructuresTransportSection
