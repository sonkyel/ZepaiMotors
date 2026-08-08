"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { useLang } from "./LanguageProvider";
import { business } from "@/lib/i18n";

const messages: Record<"es" | "en" | "fr", string> = {
  es: "Hola, me gustaria mas informacion sobre sus vehiculos.",
  en: "Hi, I'd like more information about your vehicles.",
  fr: "Bonjour, je souhaiterais plus d'informations sur vos vehicules.",
};

export function WhatsAppFloat() {
  const { lang } = useLang();
  const text = encodeURIComponent(messages[lang]);

  return (
    <a
      href={`https://wa.me/${business.whatsappHref}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-5 z-40 flex h-14 w-14 items-center justify-center border border-line bg-ink-2 text-rev shadow-lg shadow-black/40 transition-colors duration-200 hover:border-rev hover:bg-rev hover:text-white sm:right-8"
    >
      <WhatsappLogo size={26} weight="fill" />
    </a>
  );
}
