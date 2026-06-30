"use client";

import Link from "next/link";
import { InstagramLogo, FacebookLogo, LinkedinLogo, WhatsappLogo } from "@phosphor-icons/react";
import { useLang } from "./LanguageProvider";
import { business } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const navLinks = [
    { href: "/inventario", label: t.nav.inventory },
    { href: "/servicios", label: t.nav.services },
    { href: "/vender", label: t.nav.sell },
    { href: "/nosotros", label: t.nav.about },
    { href: "/contacto", label: t.nav.contact },
  ];

  const socials = [
    { Icon: InstagramLogo, href: business.social.instagram, label: "Instagram" },
    { Icon: FacebookLogo, href: business.social.facebook, label: "Facebook" },
    { Icon: LinkedinLogo, href: business.social.linkedin, label: "LinkedIn" },
    { Icon: WhatsappLogo, href: `https://wa.me/${business.whatsappHref}`, label: "WhatsApp" },
  ];

  return (
    <footer className="border-t border-line bg-ink">
      <div className="h-1 stripe-edge" />
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="display text-2xl leading-none text-bone">ZEPAIMOTORS</span>
              <span className="h-4 w-[3px] bg-rev" />
            </div>
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-fog">{t.footer.tagline}</p>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-mist">{t.footer.nav}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[15px] text-fog transition-colors hover:text-bone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] uppercase tracking-[0.18em] text-mist">{t.footer.contactCol}</p>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] text-fog">
              <li>{business.address}</li>
              <li>
                <a href={`tel:${business.phoneHref}`} className="transition-colors hover:text-bone">
                  {business.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="transition-colors hover:text-bone">
                  {business.email}
                </a>
              </li>
            </ul>

            <p className="mt-6 text-[12px] uppercase tracking-[0.18em] text-mist">{t.footer.followCol}</p>
            <div className="mt-4 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-line text-fog transition-colors hover:border-rev hover:text-rev"
                >
                  <Icon size={18} weight="regular" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-mist">
            {year} {business.name}. {t.footer.rights}
          </p>
          <p className="text-[13px] text-mist">{business.address}</p>
        </div>
      </div>
    </footer>
  );
}
