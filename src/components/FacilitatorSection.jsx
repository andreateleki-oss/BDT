import { Hammer, Lightbulb, Gauge, FolderSimple } from "@phosphor-icons/react"
import IconFeatureGrid from "./ui/IconFeatureGrid"

const ITEMS = [
  {
    icon: Hammer,
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
  {
    icon: Lightbulb,
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer",
  },
  {
    icon: Gauge,
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
  {
    icon: FolderSimple,
    title: "Lorem Ipsum",
    description: "Lorem Ipsum dolor sit amer, consectetur. Lorem Ipsum dolor sit amer.",
  },
]

function FacilitatorSection() {
  return (
    <IconFeatureGrid
      titleLight="Être le facilitateur public"
      titleBold="de vos projets"
      description="Foncier + est un regroupement ... Lorem ipsum sit amte, consectur adipiscing elit, sed eiusmod tempor incididunt ut alobre et dolore magna aliqua."
      items={ITEMS}
    />
  )
}

export default FacilitatorSection
