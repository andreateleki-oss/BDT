import { Link } from "react-router-dom"
import logo from "../assets/images/logo-foncier.png"

const COLUMNS = [
  {
    title: "Plan du Site",
    links: ["Rechercher un terrain", "Observatoire", "Secteurs d'activités", "Nos services"],
  },
  {
    title: "Nous contacter",
    links: ["12 Rue Xoxoxox , Paris", "+33 1 45 67 89 00", "LinkedIn / Twitter"],
  },
  {
    title: "Partenaires",
    links: ["BPI France", "Chambres Commerce", "Régions France", "Business France"],
  },
  {
    title: "Mentions légales",
    links: ["Politique de confidentialité", "Cookies"],
  },
]

function Footer() {
  return (
    <footer className="bg-brand-blue pt-12 lg:pt-26 pb-10 px-4 lg:px-16 flex flex-col gap-12 lg:gap-26 items-center">
      <div className="flex items-start justify-between w-full max-w-[1218px] gap-12 flex-wrap">
        <div className="flex flex-col gap-9 max-w-[566px]">
          <img src={logo} alt="Foncier+" className="h-[72px] w-auto self-start shrink-0 bg-white" />
          <p className="text-white text-[24px]">
            L'institution publique dédiée au pilotage foncier et à l'accompagnement des entreprises pour une croissance territoriale durable.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-10 text-white">
          {COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-6">
              <p className="font-heading text-[24px]">{col.title}</p>
              <div className="flex flex-col gap-4 font-heading text-[14px]">
                {col.links.map((link) => {
                  const className =
                    "rounded-sm transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  return link === "Rechercher un terrain" ? (
                    <Link key={link} to="/offres" className={className}>
                      {link}
                    </Link>
                  ) : (
                    <a key={link} href="#" className={className}>
                      {link}
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="font-heading text-[13px] text-white">
        © 2026 GIP Foncier. Tous droits réservés.
      </p>
    </footer>
  )
}

export default Footer
