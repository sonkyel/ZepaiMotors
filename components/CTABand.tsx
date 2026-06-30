"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

export function CTABand({
  title,
  sub,
  buttonLabel,
  href,
}: {
  title: string;
  sub: string;
  buttonLabel: string;
  href: string;
}) {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-2">
      <div className="absolute inset-y-0 right-0 w-1 stripe-edge" />
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="display max-w-2xl text-4xl text-bone sm:text-6xl">{title}</h2>
            <p className="mt-4 max-w-md text-[16px] leading-relaxed text-fog">{sub}</p>
          </div>
          <Link
            href={href}
            className="group inline-flex shrink-0 items-center gap-2 bg-rev px-8 py-4 text-[15px] font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:bg-rev-soft active:scale-[0.97]"
          >
            {buttonLabel}
            <ArrowRight size={18} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
