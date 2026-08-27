import { FireExtinguisher, Fire } from "@phosphor-icons/react"
import IconInfoSection from "./IconInfoSection"

const ROWS = [
  { icon: FireExtinguisher, label: "Bouches incendie", value: "32 bouches installées" },
  { icon: Fire, label: "Caserne de pompier", value: "À 2 km d'une caserne" },
]

function SecuriteIncendieSection() {
  return <IconInfoSection id="securite-incendie" title="Sécurité incendie" rows={ROWS} />
}

export default SecuriteIncendieSection
