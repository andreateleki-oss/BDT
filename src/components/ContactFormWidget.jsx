import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { PlusSquare, CaretRight, Lock, Check, X } from "@phosphor-icons/react"
import Button from "./ui/Button"

export const REQUEST_TYPES = [
  "Demande d'information",
  "Projet d'implémentation",
  "Visite du site",
  "Autre",
]

const MAX_SITES = 5

function RequestTypeChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-8 flex items-center px-2 rounded-full text-[14px] font-semibold border border-brand-blue transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
        active ? "bg-brand-blue text-white hover:bg-brand-blue/90" : "bg-white text-brand-blue hover:bg-brand-blue/5"
      }`}
    >
      {label}
    </button>
  )
}

function ContactFormWidget({
  showSiteList = false,
  showContactForm = false,
  siteName = "Nom du site",
  ctaLabel = "Continuer",
  ctaIcon: CtaIcon = CaretRight,
  onSubmit,
}) {
  const { pathname } = useLocation()
  const [selected, setSelected] = useState(null)
  const [sites, setSites] = useState(
    showSiteList ? [{ name: siteName, tag: "Cette annonce" }] : []
  )
  const [addingSite, setAddingSite] = useState(false)
  const [siteUrl, setSiteUrl] = useState("")

  function handleValidateSite() {
    if (!siteUrl.trim()) return
    setSites((s) => [...s, { name: siteUrl.trim(), tag: null }])
    setSiteUrl("")
    setAddingSite(false)
  }

  function handleRemoveSite(index) {
    setSites((s) => s.filter((_, i) => i !== index))
  }

  return (
    <section
      className="flex flex-col gap-4 items-end px-4 lg:px-[114px] py-10"
      style={{
        backgroundImage:
          "linear-gradient(178deg, rgb(249, 250, 251) 1%, rgb(255, 255, 255) 99%)",
      }}
    >
      <div className="bg-white flex flex-col gap-10 items-start p-5 w-full">
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-6 w-full">
            <div className="font-heading leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px]">
              <p className="text-title-light">Un projet d'implémentation ?</p>
              <p className="font-bold text-brand-blue">Nos experts vous accompagnent</p>
            </div>
            <p className="text-[16px] leading-[1.5] text-brand-blue">
              Nos experts vous recontactent sous 48h pour une première analyse gratuite de vos besoins fonciers.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <p className="font-heading text-[12px] uppercase text-brand-blue">
              Type de demande
            </p>
            <div className="flex gap-2 flex-wrap">
              {REQUEST_TYPES.map((type) => (
                <RequestTypeChip
                  key={type}
                  label={type}
                  active={selected === type}
                  onClick={() => setSelected(type)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            {sites.length > 0 && (
              <div className="flex flex-col gap-2 w-full max-w-[656px]">
                <p className="font-heading text-[12px] uppercase text-brand-blue">
                  Sites concernés par votre demande
                </p>
                {sites.map((site, i) => (
                  <div
                    key={`${site.name}-${i}`}
                    className="group bg-grey-50 border border-grey-200 h-12 flex items-center px-[17px] gap-4"
                  >
                    <span className="size-6 flex items-center justify-center bg-brand-red shrink-0">
                      <Check size={16} weight="bold" className="text-white" />
                    </span>
                    <span className="flex-1 text-[15px] text-brand-blue truncate">{site.name}</span>
                    {site.tag && (
                      <span className="bg-[rgba(34,142,192,0.14)] text-[#0c5585] text-[14px] px-2 py-1 rounded-sm shrink-0">
                        {site.tag}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveSite(i)}
                      aria-label={`Retirer ${site.name} de la demande`}
                      className="shrink-0 size-6 flex items-center justify-center text-grey opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:text-brand-red transition-opacity"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {sites.length < MAX_SITES && !addingSite && (
              <Button
                variant="link"
                icon={PlusSquare}
                iconPosition="left"
                onClick={() => setAddingSite(true)}
              >
                Ajouter un site à la demande
              </Button>
            )}
            {addingSite && (
              <div className="flex flex-col gap-4 items-stretch lg:flex-row lg:items-end">
                <div className="flex flex-col gap-2 w-full lg:w-[656px]">
                  <p className="font-heading text-[12px] uppercase text-brand-blue">
                    Saisissez l'url du site à ajouter à la demande
                  </p>
                  <input
                    type="text"
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="http://url.du.site"
                    className="bg-grey-50 border border-grey-200 h-12 px-[17px] text-[15px] text-brand-blue placeholder:text-grey w-full transition-colors focus:border-brand-blue outline-none"
                  />
                </div>
                <Button variant="solid" icon={Check} onClick={handleValidateSite}>
                  Valider
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end w-full">
          <Button
            variant="solid"
            icon={CtaIcon}
            as={onSubmit ? "button" : Link}
            to={onSubmit ? undefined : "/formulaire"}
            state={onSubmit ? undefined : { requestType: selected, sites, returnTo: pathname }}
            onClick={onSubmit}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Lock size={16} className="text-brand-blue" />
        <p className="text-[15px] text-brand-blue">
          Données protégées - Réponse sous 48h garantie
        </p>
      </div>
    </section>
  )
}

export default ContactFormWidget
