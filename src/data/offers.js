import propertyPhoto from "../assets/images/property-card.png"

export const OFFERS = Array.from({ length: 16 }, (_, i) => ({
  id: String(i + 1),
  image: propertyPhoto,
  title: "Friche industrielle",
  location: "Lyon, Auvergne-Rhône-Alpes",
  surface: "2.1 ha",
  sector: "Artisanat",
  tag: [5, 12].includes(i) ? "dans vos critères" : null,
  isRental: [5, 12].includes(i),
}))
