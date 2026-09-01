import { Link, useLocation, useNavigate } from "react-router-dom"
import { ArrowSquareOut } from "@phosphor-icons/react"
import Button from "./ui/Button"
import logo from "../assets/images/logo-foncier-white.png"

const PLAN_DU_SITE = [
  { label: "Rechercher un terrain", sectionId: "rechercher-un-terrain" },
  { label: "Nos secteurs d'activités", sectionId: "secteur-activite" },
  { label: "À propos de Foncier+", sectionId: "a-propos" },
  { label: "Actualités", sectionId: "actualites" },
]

const CONTACT_LINKS = [
  { label: "12 Rue Xoxoxox , Paris" },
  { label: "+33 1 45 67 89 00" },
  { label: "LinkedIn", external: true },
  { label: "Twitter", external: true },
]

const PARTNER_LINKS = [
  { label: "BPI France", external: true },
  { label: "Chambres Commerce", external: true },
  { label: "Régions France", external: true },
  { label: "Business France", external: true },
]

const LEGAL_LINKS = [
  { label: "Politique de confidentialité" },
  { label: "Cookies" },
]

const linkClassName =
  "flex items-center gap-2 rounded-sm transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

function FooterLink({ label, external }) {
  return (
    <a key={label} href="#" className={linkClassName}>
      {label}
      {external && <ArrowSquareOut size={16} />}
    </a>
  )
}

function Footer() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function handleSectionClick(sectionId) {
    return (e) => {
      e.preventDefault()
      if (pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      } else {
        navigate("/", { state: { scrollTo: sectionId } })
      }
    }
  }

  return (
    <footer className="bg-brand-blue pt-12 lg:pt-26 pb-10 flex flex-col gap-12 lg:gap-26 items-center w-full">
      <div className="flex items-start justify-between w-full max-w-[1400px] mx-auto px-4 lg:px-[114px] gap-12 flex-wrap">
        <div className="flex flex-col gap-9 max-w-[566px]">
          <img src={logo} alt="Foncier+" className="w-[242px] h-auto self-start shrink-0" />
          <p className="text-white text-[18px] leading-[1.5]">
            L'institution publique dédiée au pilotage foncier et à l'accompagnement des entreprises pour une croissance territoriale durable.
          </p>
          <Button as={Link} to="/formulaire" variant="solid" className="self-start">
            Nous contacter
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 text-white">
          <div className="flex flex-col gap-6">
            <p className="font-heading text-[24px]">Plan du Site</p>
            <div className="flex flex-col gap-4 font-heading text-[14px]">
              {PLAN_DU_SITE.map((item) => (
                <a
                  key={item.label}
                  href="#"
                  onClick={handleSectionClick(item.sectionId)}
                  className={linkClassName}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-heading text-[24px]">Nous contacter</p>
            <div className="flex flex-col gap-4 font-heading text-[14px]">
              {CONTACT_LINKS.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-heading text-[24px]">Partenaires</p>
            <div className="flex flex-col gap-4 font-heading text-[14px]">
              {PARTNER_LINKS.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-heading text-[24px]">Mentions légales</p>
            <div className="flex flex-col gap-4 font-heading text-[14px]">
              {LEGAL_LINKS.map((item) => (
                <FooterLink key={item.label} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="font-heading text-[13px] text-white">
        © 2026 GIP Foncier. Tous droits réservés.
      </p>
    </footer>
  )
}

export default Footer
