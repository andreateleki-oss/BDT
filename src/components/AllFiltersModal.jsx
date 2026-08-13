import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "@phosphor-icons/react"
import AccordionSection from "./ui/AccordionSection"
import Checkbox from "./ui/Checkbox"
import Dropdown from "./ui/Dropdown"
import LocationAutocomplete from "./ui/LocationAutocomplete"
import SurfaceInput from "./ui/SurfaceInput"
import DistanceDropdown from "./ui/DistanceDropdown"
import LabelInfoBox from "./ui/LabelInfoBox"

const SECTIONS = [
  "localisation",
  "acquisition",
  "bien",
  "surface",
  "secteur",
  "disponibilite",
  "transports",
  "electricite",
  "label",
]

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]

const AUTOROUTE_OPTIONS = ["sur site", "moins de 2 km", "moins de 5 km", "moins de 10 km", "moins de 20 km", "plus de 20 km"]
const SHORT_OPTIONS = ["moins de 5 km", "moins de 10 km", "moins de 30 km", "plus de 30 km"]

const LABELS = [
  { id: "label-1", tag: "National" },
  { id: "label-2", tag: "National" },
  { id: "label-3", tag: "Île de France" },
  { id: "label-4", tag: "Nord pas de calais" },
]

function initialState() {
  return {
    location: "",
    acquisition: { achat: false, location: false },
    bien: { terrain: false, immobilier: false },
    surface: "0",
    surfaceUnit: "Ha",
    secteur: null,
    disponibilite: { immediate: false, m0_6: false, m6_12: false, plus12: false },
    transports: {
      autoroute: { checked: false, distance: null },
      gare: { checked: false, distance: null },
      port: { checked: false, distance: null },
      aeroport: { checked: false, distance: null },
    },
    electriciteDistance: null,
    puissance: null,
    labels: {},
  }
}

function computeFilterValues(filters) {
  return {
    localisation: filters.location || null,
    secteur: filters.secteur || null,
    typeImplementation: { ...filters.acquisition },
    typeOffre: { ...filters.bien },
    surface: filters.surface && filters.surface !== "0" ? { value: filters.surface, unit: filters.surfaceUnit } : null,
  }
}

export function toModalInitialValues(activeFilters = {}) {
  return {
    location: activeFilters.localisation || "",
    secteur: activeFilters.secteur || null,
    acquisition: activeFilters.typeImplementation || { achat: false, location: false },
    bien: activeFilters.typeOffre || { terrain: false, immobilier: false },
    surface: activeFilters.surface?.value || "0",
    surfaceUnit: activeFilters.surface?.unit || "Ha",
  }
}

function AllFiltersModal({ open, onClose, onApply, initialValues }) {
  const [openSections, setOpenSections] = useState(new Set(SECTIONS))
  const [filters, setFilters] = useState(initialState)

  useEffect(() => {
    if (open) {
      setFilters({ ...initialState(), ...initialValues })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function toggleSection(id) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function reset() {
    setFilters(initialState())
  }

  function handleApply() {
    onApply?.(computeFilterValues(filters))
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-brand-blue/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white w-[661px] max-w-full max-h-[85vh] flex flex-col items-center overflow-hidden">
              <div className="border-b border-grey-200 flex items-center px-6 py-4 w-full shrink-0">
                <div className="flex-1">
                  <button
                    onClick={onClose}
                    aria-label="Fermer"
                    className="rounded-sm p-1 -m-1 transition-colors hover:bg-brand-blue/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                  >
                    <X size={20} className="text-brand-blue" />
                  </button>
                </div>
                <p className="flex-1 font-heading font-medium text-[16px] tracking-[-0.44px] text-brand-blue text-center">
                  Tous les filtres
                </p>
                <button
                  onClick={reset}
                  className="flex-1 text-[16px] text-grey text-right rounded-sm transition-colors hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  Réinitialiser
                </button>
              </div>

              <div className="flex flex-col gap-8 items-start w-full px-11 py-8 overflow-y-auto flex-1 min-h-0">
                <AccordionSection
                  title="Localisation"
                  open={openSections.has("localisation")}
                  onToggle={() => toggleSection("localisation")}
                >
                  <LocationAutocomplete
                    placeholder="Région, département, EPCI, commune"
                    value={filters.location}
                    onChange={(v) => setFilters((f) => ({ ...f, location: v }))}
                  />
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Type d'acquisition"
                  open={openSections.has("acquisition")}
                  onToggle={() => toggleSection("acquisition")}
                >
                  <div className="flex gap-6 items-start w-full">
                    <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                      <Checkbox
                        label="Achat"
                        checked={filters.acquisition.achat}
                        onChange={() =>
                          setFilters((f) => ({
                            ...f,
                            acquisition: { ...f.acquisition, achat: !f.acquisition.achat },
                          }))
                        }
                      />
                    </div>
                    <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                      <Checkbox
                        label="Location"
                        checked={filters.acquisition.location}
                        onChange={() =>
                          setFilters((f) => ({
                            ...f,
                            acquisition: { ...f.acquisition, location: !f.acquisition.location },
                          }))
                        }
                      />
                    </div>
                  </div>
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Type de bien"
                  open={openSections.has("bien")}
                  onToggle={() => toggleSection("bien")}
                >
                  <div className="flex gap-6 items-start w-full">
                    <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                      <Checkbox
                        label="Terrain"
                        checked={filters.bien.terrain}
                        onChange={() =>
                          setFilters((f) => ({ ...f, bien: { ...f.bien, terrain: !f.bien.terrain } }))
                        }
                      />
                    </div>
                    <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                      <Checkbox
                        label="Immobilier"
                        checked={filters.bien.immobilier}
                        onChange={() =>
                          setFilters((f) => ({ ...f, bien: { ...f.bien, immobilier: !f.bien.immobilier } }))
                        }
                      />
                    </div>
                  </div>
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Surface minimale"
                  open={openSections.has("surface")}
                  onToggle={() => toggleSection("surface")}
                >
                  <SurfaceInput
                    value={filters.surface}
                    onChange={(v) => setFilters((f) => ({ ...f, surface: v }))}
                    unit={filters.surfaceUnit}
                    onUnitChange={(u) => setFilters((f) => ({ ...f, surfaceUnit: u }))}
                  />
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Secteur d'activité"
                  open={openSections.has("secteur")}
                  onToggle={() => toggleSection("secteur")}
                >
                  <Dropdown
                    placeholder="Tout type de secteur"
                    options={SECTORS}
                    value={filters.secteur}
                    onChange={(v) => setFilters((f) => ({ ...f, secteur: v }))}
                  />
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Disponibilité"
                  open={openSections.has("disponibilite")}
                  onToggle={() => toggleSection("disponibilite")}
                >
                  <div className="flex flex-col gap-6 w-full">
                    <div className="flex gap-6 items-start w-full">
                      <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                        <Checkbox
                          label="Immédiate"
                          checked={filters.disponibilite.immediate}
                          onChange={() =>
                            setFilters((f) => ({
                              ...f,
                              disponibilite: { ...f.disponibilite, immediate: !f.disponibilite.immediate },
                            }))
                          }
                        />
                      </div>
                      <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                        <Checkbox
                          label="0 à 6 mois"
                          checked={filters.disponibilite.m0_6}
                          onChange={() =>
                            setFilters((f) => ({
                              ...f,
                              disponibilite: { ...f.disponibilite, m0_6: !f.disponibilite.m0_6 },
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-6 items-start w-full">
                      <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                        <Checkbox
                          label="6 à 12 mois"
                          checked={filters.disponibilite.m6_12}
                          onChange={() =>
                            setFilters((f) => ({
                              ...f,
                              disponibilite: { ...f.disponibilite, m6_12: !f.disponibilite.m6_12 },
                            }))
                          }
                        />
                      </div>
                      <div className="flex-1 border border-grey-200 p-2.5 flex items-center">
                        <Checkbox
                          label="plus de 12 mois"
                          checked={filters.disponibilite.plus12}
                          onChange={() =>
                            setFilters((f) => ({
                              ...f,
                              disponibilite: { ...f.disponibilite, plus12: !f.disponibilite.plus12 },
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Infrastructures de transports"
                  open={openSections.has("transports")}
                  onToggle={() => toggleSection("transports")}
                >
                  <div className="flex flex-col gap-2 w-full">
                    {[
                      { key: "autoroute", label: "Autoroute", options: AUTOROUTE_OPTIONS, placeholder: "moins de 5 km" },
                      { key: "gare", label: "Gare / Gare de fret", options: SHORT_OPTIONS, placeholder: "moins de 10 km" },
                      { key: "port", label: "Port Maritime", options: SHORT_OPTIONS, placeholder: "moins de 30 km" },
                      { key: "aeroport", label: "Aéroport / Aérodrome", options: SHORT_OPTIONS, placeholder: "moins de 30 km" },
                    ].map(({ key, label, options, placeholder }) => (
                      <div
                        key={key}
                        className="border border-grey-200 h-12 flex items-center justify-between px-[17px]"
                      >
                        <Checkbox
                          label={label}
                          checked={filters.transports[key].checked}
                          onChange={() =>
                            setFilters((f) => ({
                              ...f,
                              transports: {
                                ...f.transports,
                                [key]: { ...f.transports[key], checked: !f.transports[key].checked },
                              },
                            }))
                          }
                        />
                        <DistanceDropdown
                          options={options}
                          value={filters.transports[key].distance}
                          placeholder={placeholder}
                          onChange={(v) =>
                            setFilters((f) => ({
                              ...f,
                              transports: { ...f.transports, [key]: { ...f.transports[key], distance: v } },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Electricité"
                  open={openSections.has("electricite")}
                  onToggle={() => toggleSection("electricite")}
                >
                  <div className="flex flex-col gap-4 w-full">
                    <Dropdown
                      label="Distance au point de livraison (poste source HTA)"
                      placeholder="Sélectionner une distance"
                      options={["moins de 5 km", "moins de 10 km", "moins de 20 km", "plus de 20 km"]}
                      value={filters.electriciteDistance}
                      onChange={(v) => setFilters((f) => ({ ...f, electriciteDistance: v }))}
                    />
                    <Dropdown
                      label="Puissance recherchée"
                      placeholder="Sélectionner une puissance"
                      options={["< 5 MW", "5 à 20 MW", "20 à 50 MW", "> 50 MW"]}
                      value={filters.puissance}
                      onChange={(v) => setFilters((f) => ({ ...f, puissance: v }))}
                    />
                  </div>
                </AccordionSection>
                <div className="h-px bg-grey-200 w-full" />

                <AccordionSection
                  title="Label"
                  open={openSections.has("label")}
                  onToggle={() => toggleSection("label")}
                >
                  <div className="flex flex-col gap-2 w-full">
                    {LABELS.map((l) => (
                      <LabelInfoBox
                        key={l.id}
                        label="Site clef en main 2023"
                        tag={l.tag}
                        checked={!!filters.labels[l.id]}
                        onChange={() =>
                          setFilters((f) => ({
                            ...f,
                            labels: { ...f.labels, [l.id]: !f.labels[l.id] },
                          }))
                        }
                      />
                    ))}
                  </div>
                </AccordionSection>
              </div>

              <div className="border-t border-grey-200 flex items-center justify-center py-4 w-full shrink-0">
                <button
                  onClick={handleApply}
                  className="bg-brand-red text-white h-12 px-4 font-semibold text-[14px] transition-colors hover:bg-brand-red/90 active:bg-brand-red/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  Voir les résultats
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AllFiltersModal
