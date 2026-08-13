import frichePhoto from "../assets/images/property-card.png"
import complexePhoto from "../assets/images/studies-photo.png"
import entrepotPhoto from "../assets/images/implanted-photo.png"
import zonePhoto from "../assets/images/sector-journey-photo.png"

const SITE_PHOTOS = [frichePhoto, complexePhoto, entrepotPhoto, zonePhoto]

export const OFFERS = [
  {
    id: "1",
    image: SITE_PHOTOS[0],
    title: "Parc d'activités des Tourterelles",
    location: "Rennes, Bretagne",
    surface: "4,2 ha",
    sector: "Logistique",
    bienType: "terrain",
    tag: "dans vos critères",
    isRental: false,
  },
  {
    id: "2",
    image: SITE_PHOTOS[1],
    title: "ZAC du Val de Saône",
    location: "Belleville-en-Beaujolais, Auvergne-Rhône-Alpes",
    surface: "27,6 ha",
    sector: "Industrie",
    bienType: "terrain",
    tag: null,
    isRental: false,
  },
  {
    id: "3",
    image: SITE_PHOTOS[2],
    title: "Friche industrielle des Carmes",
    location: "Clermont-Ferrand, Auvergne-Rhône-Alpes",
    surface: "8,9 ha",
    sector: "Métallurgie",
    bienType: "immobilier",
    tag: null,
    isRental: true,
  },
  {
    id: "4",
    image: SITE_PHOTOS[3],
    title: "Entrepôt frigorifique du Sévéron",
    location: "Rungis, Île-de-France",
    surface: "1,4 ha",
    sector: "Agroalimentaire",
    bienType: "immobilier",
    tag: null,
    isRental: false,
  },
  {
    id: "5",
    image: SITE_PHOTOS[0],
    title: "Terrain nu - ZAE de l'Orgerie",
    location: "Liffré, Bretagne",
    surface: "0,8 ha",
    sector: "Artisanat",
    bienType: "terrain",
    tag: null,
    isRental: false,
  },
  {
    id: "6",
    image: SITE_PHOTOS[1],
    title: "Plateforme logistique de la Plaine",
    location: "Douai, Hauts-de-France",
    surface: "15,3 ha",
    sector: "Logistique",
    bienType: "immobilier",
    tag: "dans vos critères",
    isRental: false,
  },
  {
    id: "7",
    image: SITE_PHOTOS[2],
    title: "Bureaux du Technopôle Nord",
    location: "Lille, Hauts-de-France",
    surface: "0,6 ha",
    sector: "Data center",
    bienType: "immobilier",
    tag: null,
    isRental: true,
  },
  {
    id: "8",
    image: SITE_PHOTOS[3],
    title: "Ancien site industriel des Forges",
    location: "Le Creusot, Bourgogne-Franche-Comté",
    surface: "5,7 ha",
    sector: "Métallurgie",
    bienType: "immobilier",
    tag: null,
    isRental: false,
  },
  {
    id: "9",
    image: SITE_PHOTOS[0],
    title: "ZAE des Vergers",
    location: "Angers, Pays de la Loire",
    surface: "3,1 ha",
    sector: "Agroalimentaire",
    bienType: "terrain",
    tag: null,
    isRental: false,
  },
  {
    id: "10",
    image: SITE_PHOTOS[1],
    title: "Parc éco-industriel de l'Estuaire",
    location: "Le Havre, Normandie",
    surface: "22,4 ha",
    sector: "Industrie",
    bienType: "terrain",
    tag: null,
    isRental: false,
  },
  {
    id: "11",
    image: SITE_PHOTOS[2],
    title: "Site clé en main - Les Tanneries",
    location: "Romans-sur-Isère, Auvergne-Rhône-Alpes",
    surface: "6 ha",
    sector: "Plasturgie",
    bienType: "immobilier",
    tag: "dans vos critères",
    isRental: false,
  },
  {
    id: "12",
    image: SITE_PHOTOS[3],
    title: "Data center de la Garonne",
    location: "Bordeaux, Nouvelle-Aquitaine",
    surface: "2,3 ha",
    sector: "Data center",
    bienType: "immobilier",
    tag: null,
    isRental: false,
  },
  {
    id: "13",
    image: SITE_PHOTOS[0],
    title: "Terrain nu de Sévailles",
    location: "Liffré, Bretagne",
    surface: "0,3 ha",
    sector: "Artisanat",
    bienType: "terrain",
    tag: null,
    isRental: false,
  },
  {
    id: "14",
    image: SITE_PHOTOS[1],
    title: "Halle logistique de l'Aéroparc",
    location: "Toulouse, Occitanie",
    surface: "4,9 ha",
    sector: "Logistique",
    bienType: "immobilier",
    tag: null,
    isRental: true,
  },
  {
    id: "15",
    image: SITE_PHOTOS[2],
    title: "Zone d'activités des Trois Chênes",
    location: "Metz, Grand Est",
    surface: "9,2 ha",
    sector: "Industrie",
    bienType: "terrain",
    tag: null,
    isRental: false,
  },
  {
    id: "16",
    image: SITE_PHOTOS[3],
    title: "Ancienne sucrerie de la Beauce",
    location: "Chartres, Centre-Val de Loire",
    surface: "11,6 ha",
    sector: "Agroalimentaire",
    bienType: "immobilier",
    tag: null,
    isRental: false,
  },
]

function parseSurfaceToHa(surface) {
  const value = parseFloat(surface.replace(",", "."))
  if (Number.isNaN(value)) return null
  return surface.includes("m²") ? value / 10000 : value
}

const MIN_RESULTS = 3

export function filterOffers(offers, filters = {}) {
  const matched = offers.filter((offer) => {
    if (filters.localisation) {
      const query = filters.localisation.toLowerCase()
      if (!offer.location.toLowerCase().includes(query)) return false
    }

    if (filters.secteur && offer.sector !== filters.secteur) return false

    const { terrain, immobilier } = filters.typeOffre || {}
    if (terrain || immobilier) {
      const matches = (terrain && offer.bienType === "terrain") || (immobilier && offer.bienType === "immobilier")
      if (!matches) return false
    }

    const { achat, location: wantsLocation } = filters.typeImplementation || {}
    if (achat || wantsLocation) {
      const matches = (wantsLocation && offer.isRental) || (achat && !offer.isRental)
      if (!matches) return false
    }

    if (filters.surface?.value) {
      const minValue = parseFloat(filters.surface.value)
      if (!Number.isNaN(minValue) && minValue > 0) {
        const minHa = filters.surface.unit === "m²" ? minValue / 10000 : minValue
        const offerHa = parseSurfaceToHa(offer.surface)
        if (offerHa !== null && offerHa < minHa) return false
      }
    }

    return true
  })

  if (matched.length >= MIN_RESULTS) return matched

  const matchedIds = new Set(matched.map((offer) => offer.id))
  const padding = offers.filter((offer) => !matchedIds.has(offer.id)).slice(0, MIN_RESULTS - matched.length)
  return [...matched, ...padding]
}
