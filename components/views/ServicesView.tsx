"use client";

import { MagnifyingGlass, ArrowsLeftRight, PaintRoller, Wrench, Crown, Bank } from "@phosphor-icons/react";
import { useLang } from "../LanguageProvider";
import { PageHeader } from "../PageHeader";
import { CTABand } from "../CTABand";
import { Reveal } from "../Reveal";

const icons = [MagnifyingGlass, ArrowsLeftRight, PaintRoller, Wrench, Crown, Bank];

export function ServicesView() {
  const { t } = useLang();

  return (
    <>
      <PageHeader eyebrow={t.nav.services} title={t.services.title} lead={t.services.lead} />

      <section className="bg-ink py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <Reveal key={item.title} delay={0.04 * i}>
                  <div className="group flex h-full flex-col gap-5 bg-ink-2 p-8 transition-colors hover:bg-ink-3">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center bg-ink-3 text-rev transition-colors group-hover:bg-rev group-hover:text-white">
                        <Icon size={22} weight="regular" />
                      </span>
                      <span className="font-mono text-[12px] text-mist">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="text-xl font-bold text-bone">{item.title}</h3>
                    <p className="text-[14px] leading-relaxed text-fog">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand title={t.services.ctaTitle} sub={t.services.ctaSub} buttonLabel={t.services.ctaButton} href="/contacto" />
    </>
  );
}
