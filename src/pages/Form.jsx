import { useState, useEffect } from "react"
import { useLocation, Link } from "react-router-dom"
import { PlusSquare, Envelope, Lock, Check, X, CheckCircle, ArrowLeft } from "@phosphor-icons/react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Button from "../components/ui/Button"
import Dropdown from "../components/ui/Dropdown"
import Breadcrumb from "../components/ui/Breadcrumb"
import { REQUEST_TYPES } from "../components/ContactFormWidget"

const SECTORS = ["Data center", "Logistique", "Industrie", "Artisanat"]
const MAX_SITES = 5

function RequestTypeChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`h-[30px] flex items-center px-4 rounded-full text-[15px] font-semibold border border-brand-blue transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue ${
        active ? "bg-brand-blue text-white hover:bg-brand-blue/90" : "bg-white text-brand-blue hover:bg-brand-blue/5"
      }`}
    >
      {label}
    </button>
  )
}

function LabeledInput({ label, placeholder, value, onChange, type = "text", required = false }) {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <p className="font-heading text-[12px] uppercase text-brand-blue">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </p>
      {type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white border border-grey-200 h-[120px] px-[17px] py-[13px] text-[15px] text-brand-blue placeholder:text-grey w-full resize-none transition-colors focus:border-brand-blue outline-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="bg-white border border-grey-200 h-12 px-[17px] text-[15px] text-brand-blue placeholder:text-grey w-full transition-colors focus:border-brand-blue outline-none"
        />
      )}
    </div>
  )
}

function Form() {
  const { state } = useLocation()
  const returnTo = state?.returnTo ?? "/"

  const [submitted, setSubmitted] = useState(false)
  const [requestType, setRequestType] = useState(state?.requestType ?? null)
  const [sites, setSites] = useState(state?.sites ?? [])
  const [addingSite, setAddingSite] = useState(false)
  const [siteUrl, setSiteUrl] = useState("")

  const [nomEntreprise, setNomEntreprise] = useState("")
  const [secteur, setSecteur] = useState(null)
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [formError, setFormError] = useState("")

  function handleValidateSite() {
    if (!siteUrl.trim()) return
    setSites((s) => [...s, { name: siteUrl.trim(), tag: null }])
    setSiteUrl("")
    setAddingSite(false)
  }

  function handleRemoveSite(index) {
    setSites((s) => s.filter((_, i) => i !== index))
  }

  function handleSend(e) {
    e.preventDefault()
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    if (!nom.trim() || !emailValid || !message.trim()) {
      setFormError("Merci de renseigner votre nom, un email valide et un message avant d'envoyer votre demande.")
      return
    }
    setFormError("")
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted) window.scrollTo(0, 0)
  }, [submitted])

  return (
    <main className="font-body">
      <Header />

      <section
        className="w-full"
        style={{
          backgroundImage:
            "linear-gradient(178deg, rgb(249, 250, 251) 1%, rgb(255, 255, 255) 99%)",
        }}
      >
      <div className="flex flex-col gap-4 items-start p-4 lg:px-[114px] lg:pb-[114px] lg:pt-11 max-w-[1400px] mx-auto">
        <Breadcrumb items={[{ label: "Accueil", to: "/" }, { label: "Nous contacter" }]} />

        {submitted ? (
          <div className="bg-white flex flex-col gap-6 items-center justify-center p-8 lg:p-20 w-full">
            <CheckCircle size={64} weight="fill" className="text-brand-blue" />
            <div className="flex flex-col gap-2 items-center text-center">
              <p className="font-heading font-bold text-brand-blue text-[28px]">
                Votre demande a bien été envoyée
              </p>
              <p className="text-[16px] leading-[1.5] text-brand-blue">
                Nos experts vous recontactent sous 48h pour une première analyse gratuite de vos besoins fonciers.
              </p>
            </div>
            <Button as={Link} to={returnTo} variant="outline" icon={ArrowLeft} iconPosition="left">
              Retour
            </Button>
          </div>
        ) : (
        <div className="bg-white flex flex-col gap-10 items-start p-5 w-full">
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-6 w-full">
              <div className="font-heading leading-[1.15] tracking-[-1px] text-[28px] lg:text-[40px]">
                <p className="text-title-light">Un projet d'implantation ?</p>
                <p className="font-semibold text-brand-blue">Nos experts vous accompagnent</p>
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
                    active={requestType === type}
                    onClick={() => setRequestType(type)}
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
                <button
                  type="button"
                  onClick={() => setAddingSite(true)}
                  className="flex items-center gap-2 h-12 px-[17px] w-full max-w-[656px] border border-dashed border-grey-300 text-brand-blue font-accent font-semibold transition-colors hover:bg-grey-50 hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                >
                  <PlusSquare size={20} />
                  <span className="underline underline-offset-2">Ajouter un site à la demande</span>
                </button>
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
                      className="bg-white border border-grey-200 h-12 px-[17px] text-[15px] text-brand-blue placeholder:text-grey w-full transition-colors focus:border-brand-blue outline-none"
                    />
                  </div>
                  <Button variant="solid" icon={Check} onClick={handleValidateSite}>
                    Valider
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-10 w-full">
            <div className="h-px bg-grey-200 w-full" />
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 w-full">
                <LabeledInput
                  label="NOM entreprise"
                  placeholder="Ex : Arko Industrial"
                  value={nomEntreprise}
                  onChange={setNomEntreprise}
                />
                <Dropdown
                  label="Secteur d'activité"
                  placeholder="Sélectionner un secteur d'activité"
                  options={SECTORS}
                  value={secteur}
                  onChange={setSecteur}
                  allLabel="Tous les secteurs"
                  className="flex-1"
                />
              </div>
              <div className="flex flex-col gap-6 lg:flex-row lg:gap-10 w-full">
                <LabeledInput label="NOM" placeholder="Patrick George" value={nom} onChange={setNom} required />
                <LabeledInput
                  label="EMAIL"
                  placeholder="adresse@email.com"
                  value={email}
                  onChange={setEmail}
                  type="email"
                  required
                />
              </div>
              <LabeledInput
                label="votre message"
                placeholder="Message"
                value={message}
                onChange={setMessage}
                type="textarea"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 w-full">
            <p className="text-[14px] text-grey-600">
              <span className="text-brand-red">*</span> Champs obligatoires
            </p>
            {formError && <p className="text-brand-red text-[14px]">{formError}</p>}
            <Button variant="solid" icon={Envelope} onClick={handleSend}>
              Être recontacté
            </Button>
          </div>
        </div>
        )}

        <div className="flex gap-2 items-center">
          <Lock size={16} className="text-brand-blue" />
          <p className="text-[15px] text-brand-blue">
            Données protégées - Réponse sous 48h garantie
          </p>
        </div>
      </div>
      </section>

      <Footer />
    </main>
  )
}

export default Form
