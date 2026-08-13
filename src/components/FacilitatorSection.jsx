import { Hammer, Lightbulb, Gauge, FolderSimple } from "@phosphor-icons/react"
import IconFeatureGrid from "./ui/IconFeatureGrid"

const ITEMS = [
  {
    icon: Hammer,
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer.",
  },
  {
    icon: Lightbulb,
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer",
  },
  {
    icon: Gauge,
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer.",
  },
  {
    icon: FolderSimple,
    title: "Laurem Ipsum",
    description: "Laurem Ipsum dolor sit amer, consectetur. Laurem Ipsum dolor sit amer.",
  },
]

function FacilitatorSection() {
  return (
    <IconFeatureGrid
      titleLight="Être le facilitateur public"
      titleBold="de vos projets"
      description="Foncier + ets un regroupement ... Lorem ipsum sit amte, consectur adipiscing elit, sed eiusmod tempor incididunt ut alobre et dolore magna aliqua."
      items={ITEMS}
    />
  )
}

export default FacilitatorSection
