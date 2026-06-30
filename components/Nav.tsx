"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useLang } from "./LanguageProvider";

// Current language -> the language the toggle switches to (code + flag).
const NEXT_LANG: Record<string, { code: string; flag: string }> = {
  es: { code: "EN", flag: "gb" },
  en: { code: "FR", flag: "fr" },
  fr: { code: "ES", flag: "es" },
};

export function Nav() {
  const { t, lang, toggle } = useLang();
  const next = NEXT_LANG[lang];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/inventario", label: t.nav.inventory },
    { href: "/servicios", label: t.nav.services },
    { href: "/vender", label: t.nav.sell },
    { href: "/nosotros", label: t.nav.about },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "border-b border-line bg-ink/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="display text-[20px] leading-none text-bone">ZEPAIMOTORS</span>
          <span className="h-[14px] w-[3px] bg-rev" />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[13px] font-medium uppercase tracking-wide transition-colors ${
                isActive(l.href) ? "text-bone" : "text-fog hover:text-bone"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Cambiar idioma / Switch language / Changer de langue"
            className="flex items-center gap-2 border border-line px-2.5 py-[6px] text-[12px] font-semibold tracking-wide text-fog transition-colors hover:border-rev hover:text-bone"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://flagcdn.com/h20/${next.flag}.png`}
              alt=""
              width={20}
              height={14}
              className="h-3.5 w-5 rounded-[1px] object-cover"
            />
            {next.code}
          </button>
          <Link
            href="/contacto"
            className="hidden bg-rev px-5 py-[9px] text-[13px] font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:bg-rev-soft active:scale-[0.97] sm:inline-block"
          >
            {t.nav.contact}
          </Link>
          <button
            className="text-bone lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink/97 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-[1400px] flex-col px-5 py-4">
            {[...links, { href: "/contacto", label: t.nav.contact }].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-line py-4 text-[16px] uppercase tracking-wide last:border-0 ${
                  isActive(l.href) ? "text-rev" : "text-fog"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
