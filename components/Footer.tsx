import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./icons/SocialIcons";

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: FacebookIcon },
  { label: "TikTok", href: siteConfig.social.tiktok, Icon: TikTokIcon },
  { label: "WhatsApp", href: siteConfig.social.whatsapp, Icon: WhatsAppIcon },
];

export default function Footer() {
  return (
    <footer className="bg-creme text-cacau-darker">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-start">
          <div className="max-w-sm">
            <span className="font-display text-2xl">{siteConfig.name}</span>
            <p className="mt-4 text-sm leading-relaxed text-cacau-darker/70">
              {siteConfig.description}
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <span className="text-cacau-darker/50">Contacto</span>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="text-cacau-darker transition-colors hover:text-laranja"
            >
              {siteConfig.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm text-cacau-darker/50">Redes sociais</span>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-cacau-darker/20 transition-colors hover:border-laranja hover:text-laranja"
                >
                  <Icon width={16} height={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-cacau-darker/15 pt-6 text-xs text-cacau-darker/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. Todos os direitos
            reservados.
          </span>
          <span>Luanda, Angola</span>
        </div>
      </div>
    </footer>
  );
}
