"use client";

import { useState } from "react";
import Image from "next/image";
import { useLang } from "../LanguageProvider";
import { PageHeader } from "../PageHeader";
import { Reveal } from "../Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function SellView() {
  const { t } = useLang();
  const f = t.sell.form;
  const [status, setStatus] = useState<Status>("idle");
  const [v, setV] = useState({ name: "", phone: "", email: "", brandModel: "", year: "", mileage: "", message: "" });

  const invalid = {
    name: status === "error" && v.name.trim() === "",
    phone: status === "error" && v.phone.trim() === "",
    brandModel: status === "error" && v.brandModel.trim() === "",
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (v.name.trim() === "" || v.phone.trim() === "" || v.brandModel.trim() === "") {
      setStatus("error");
      return;
    }
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  }

  const field =
    "w-full rounded-[2px] border bg-ink px-4 py-3 text-[15px] text-bone placeholder:text-mist transition-colors focus:border-rev focus:outline-none";

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [k]: e.target.value }));

  return (
    <>
      <PageHeader eyebrow={t.sell.eyebrow} title={t.sell.title} lead={t.sell.lead} />

      {/* Steps */}
      <section className="bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <ol className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.sell.steps.map((step, i) => (
              <Reveal key={step.k} delay={0.06 * i}>
                <li className="flex h-full flex-col gap-4 bg-ink-2 p-7">
                  <span className="font-mono text-[13px] text-rev">{step.k}</span>
                  <h3 className="text-lg font-bold text-bone">{step.title}</h3>
                  <p className="text-[14px] leading-relaxed text-fog">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-line bg-ink-2/30 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line">
              <Image src="/showroom-night.png" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-2/80 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="display text-3xl text-bone sm:text-4xl">{t.sell.formTitle}</h2>
            {status === "sent" ? (
              <div className="mt-6 flex min-h-[280px] flex-col items-center justify-center border border-rev-deep/50 bg-ink-2 p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rev text-2xl text-white">✓</span>
                <p className="mt-5 max-w-xs text-[17px] text-bone">{f.sent}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-6 border border-line bg-ink-2 p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="s-name" className="text-[13px] font-medium text-fog">{f.name}</label>
                    <input id="s-name" value={v.name} onChange={set("name")} placeholder={f.namePh} className={`${field} ${invalid.name ? "border-rev" : "border-line"}`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="s-phone" className="text-[13px] font-medium text-fog">{f.phone}</label>
                    <input id="s-phone" type="tel" value={v.phone} onChange={set("phone")} placeholder={f.phonePh} className={`${field} ${invalid.phone ? "border-rev" : "border-line"}`} />
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="s-email" className="text-[13px] font-medium text-fog">{f.email}</label>
                  <input id="s-email" type="email" value={v.email} onChange={set("email")} placeholder={f.emailPh} className={`${field} border-line`} />
                </div>
                <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <div className="flex flex-col gap-2 sm:col-span-1">
                    <label htmlFor="s-bm" className="text-[13px] font-medium text-fog">{f.brandModel}</label>
                    <input id="s-bm" value={v.brandModel} onChange={set("brandModel")} placeholder={f.brandModelPh} className={`${field} ${invalid.brandModel ? "border-rev" : "border-line"}`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="s-year" className="text-[13px] font-medium text-fog">{f.year}</label>
                    <input id="s-year" value={v.year} onChange={set("year")} placeholder={f.yearPh} className={`${field} border-line`} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="s-km" className="text-[13px] font-medium text-fog">{f.mileage}</label>
                    <input id="s-km" value={v.mileage} onChange={set("mileage")} placeholder={f.mileagePh} className={`${field} border-line`} />
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-2">
                  <label htmlFor="s-msg" className="text-[13px] font-medium text-fog">{f.message}</label>
                  <textarea id="s-msg" rows={3} value={v.message} onChange={set("message")} placeholder={f.messagePh} className={`${field} resize-none border-line`} />
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
