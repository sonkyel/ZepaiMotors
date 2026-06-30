"use client";

import Image from "next/image";
import { ShieldCheck, Medal, Handshake } from "@phosphor-icons/react";
import { useLang } from "../LanguageProvider";
import { PageHeader } from "../PageHeader";
import { CTABand } from "../CTABand";
import { Reveal } from "../Reveal";

const valueIcons = [ShieldCheck, Medal, Handshake];

export function AboutView() {
  const { t } = useLang();

  return (
    <>
      <PageHeader eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} />

      {/* Story + image */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line">
              <Image src="/showroom-night.png" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute bottom-0 left-0 h-1 w-full stripe-edge opacity-70" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col justify-center">
            <p className="text-[16px] leading-relaxed text-fog">{t.about.body1}</p>
            <p className="mt-5 text-[16px] leading-relaxed text-fog">{t.about.body2}</p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-line bg-ink-2/40 py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 px-5 sm:px-8 lg:grid-cols-4">
          {t.about.stats.map((s) => (
            <Reveal key={s.label} className="text-center lg:text-left">
              <p className="display text-5xl text-rev sm:text-6xl">{s.value}</p>
              <p className="mt-2 text-[13px] uppercase tracking-wide text-fog">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal>
            <h2 className="display text-3xl text-bone sm:text-5xl">{t.about.valuesTitle}</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {t.about.values.map((val, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={val.title} delay={0.08 * i}>
                  <div className="flex flex-col gap-4">
                    <span className="flex h-11 w-11 items-center justify-center border border-rev-deep/60 text-rev">
                      <Icon size={20} weight="regular" />
                    </span>
                    <h3 className="text-xl font-bold text-bone">{val.title}</h3>
                    <p className="text-[15px] leading-relaxed text-fog">{val.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand title={t.home.ctaTitle} sub={t.home.ctaSub} buttonLabel={t.home.ctaButton} href="/contacto" />
    </>
  );
}
