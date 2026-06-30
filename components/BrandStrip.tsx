"use client";

import { brandLogos } from "@/lib/vehicles";

export function BrandStrip({ heading }: { heading: string }) {
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section className="border-y border-line bg-ink-2/40 py-12">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="mb-8 text-center text-[12px] uppercase tracking-[0.22em] text-mist">{heading}</p>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14 sm:gap-20">
          {loop.map((b, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${b.slug}-${i}`}
              src={`https://cdn.simpleicons.org/${b.slug}/9c9ca6`}
              alt={b.name}
              width={44}
              height={44}
              loading="lazy"
              className="h-7 w-auto shrink-0 opacity-70 grayscale transition hover:opacity-100 sm:h-9"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
