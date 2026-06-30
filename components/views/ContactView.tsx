"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { useLang } from "../LanguageProvider";
import { business } from "@/lib/i18n";
import { PageHeader } from "../PageHeader";
import { Reveal } from "../Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactView() {
  const { t, lang } = useLang();
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", company: "" });

  const invalid = {
    name: status === "error" && values.name.trim() === "",
    email: status === "error" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
    message: status === "error" && values.message.trim() === "",
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (values.name.trim() === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.message.trim() === "") {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", ...values, locale: lang }),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-[2px] border bg-ink px-4 py-3 text-[15px] text-bone placeholder:text-mist transition-colors focus:border-rev focus:outline-none";

  const info = [
    { Icon: MapPin, label: t.contact.addressLabel, value: business.address },
    { Icon: Clock, label: t.contact.hoursLabel, value: t.contact.hours },
    { Icon: Phone, label: t.contact.phoneLabel, value: business.phone, href: `tel:${business.phoneHref}` },
    { Icon: EnvelopeSimple, label: t.contact.emailLabel, value: business.email, href: `mailto:${business.email}` },
  ];

  return (
    <>
      <PageHeader title={t.contact.title} lead={t.contact.lead} />

      <section className="bg-ink py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ul className="flex flex-col gap-6">
              {info.map(({ Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-line text-rev">
                    <Icon size={18} weight="regular" />
                  </span>
                  <div>
                    <p className="text-[12px] uppercase tracking-wide text-mist">{label}</p>
                    {href ? (
                      <a href={href} className="text-[15px] text-bone transition-colors hover:text-rev">{value}</a>
                    ) : (
                      <p className="text-[15px] text-bone">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${business.whatsappHref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex items-center gap-2 border border-rev-deep/60 px-6 py-3 text-[15px] font-semibold text-bone transition-colors hover:border-rev"
            >
              <WhatsappLogo size={20} weight="fill" className="text-rev" />
              {t.contact.whatsapp}
            </a>

            <div className="mt-9 aspect-[16/9] w-full overflow-hidden border border-line">
              <iframe
                title="Zepaimotors Paris"
                src="https://www.google.com/maps?q=Avenue%20Montaigne%2075008%20Paris&output=embed"
                className="h-full w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            {status === "sent" ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center border border-rev-deep/50 bg-ink-2 p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rev text-2xl text-white">✓</span>
                <p className="mt-5 max-w-xs text-[17px] text-bone">{f.sent}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="border border-line bg-ink-2 p-6 sm:p-8">
                {/* Honeypot anti-spam: oculto para humanos, los bots lo rellenan */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={values.company}
                  onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="c-name" className="text-[13px] font-medium text-fog">{f.name}</label>
                    <input id="c-name" value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} placeholder={f.namePh} className={`${field} ${invalid.name ? "border-rev" : "border-line"}`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="c-phone" className="text-[13px] font-medium text-fog">{f.phone}</label>
                    <input id="c-phone" type="tel" value={values.phone} onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))} placeholder={f.phonePh} className={`${field} border-line`} />
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="c-email" className="text-[13px] font-medium text-fog">{f.email}</label>
                  <input id="c-email" type="email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} placeholder={f.emailPh} className={`${field} ${invalid.email ? "border-rev" : "border-line"}`} />
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="c-msg" className="text-[13px] font-medium text-fog">{f.message}</label>
                  <textarea id="c-msg" rows={5} value={values.message} onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))} placeholder={f.messagePh} className={`${field} resize-none ${invalid.message ? "border-rev" : "border-line"}`} />
                </div>
                {status === "error" && <p className="mt-4 text-[13px] text-rev-soft">{f.error}</p>}
                <button type="submit" disabled={status === "sending"} className="mt-6 w-full bg-rev px-6 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:bg-rev-soft active:scale-[0.98] disabled:opacity-70">
                  {status === "sending" ? f.sending : f.send}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}
