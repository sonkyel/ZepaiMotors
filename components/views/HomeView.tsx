"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, MagnifyingGlass, ArrowsLeftRight, PaintRoller, Wrench, Crown, Bank } from "@phosphor-icons/react";
import { useLang } from "../LanguageProvider";
import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "../VehicleCard";
import { BrandStrip } from "../BrandStrip";
import { CTABand } from "../CTABand";
import { Reveal } from "../Reveal";

const serviceIcons = [MagnifyingGlass, ArrowsLeftRight, PaintRoller, Wrench, Crown, Bank];

export function HomeView() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const featured = vehicles.filter((v) => v.featured).slice(0, 4);

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  // 3D word reveal: each headline line rotates in on a vertical axis.
  const reveal3D = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, rotateX: 78, y: 36 },
    animate: { opacity: 1, rotateX: 0, y: 0 },
    transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  // 3D pointer parallax for the hero image (motion values, never useState).
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 });
  const scale = useTransform(px, [-0.5, 0.5], [1.08, 1.08]);

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetPointer = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <>
      {/* HERO */}
      <section
        onPointerMove={onPointer}
        onPointerLeave={resetPointer}
        className="relative min-h-[100dvh] w-full overflow-hidden [perspective:1400px]"
      >
        <motion.div
          style={reduce ? undefined : { rotateX: rotX, rotateY: rotY, scale }}
          className="absolute inset-0 [transform-style:preserve-3d]"
        >
          <Image src="/hero-showroom.png" alt="" fill priority sizes="100vw" className="object-cover" />
          {/* Lighter overlays so the image reads clearly */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/15" />
        </motion.div>
        {/* Radial scrim only behind the centered text for legibility */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(60% 55% at 50% 52%, rgba(11,11,13,0.72), rgba(11,11,13,0) 70%)" }}
        />
        <div className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full stripe-edge opacity-70" />

        <div
          className="relative mx-auto flex min-h-[100dvh] max-w-[1100px] flex-col items-center justify-center px-5 pt-24 pb-16 text-center sm:px-8"
          style={{ perspective: 1000 }}
        >
          <motion.p {...rise(0.05)} className="mb-6 flex items-center justify-center gap-3 text-[12px] font-semibold uppercase tracking-[0.24em] text-rev">
            <span className="h-px w-8 bg-rev" />
            {t.home.heroEyebrow}
            <span className="h-px w-8 bg-rev" />
          </motion.p>
          <h1 className="display text-[2.15rem] text-bone [transform-style:preserve-3d] [hyphens:none] [overflow-wrap:break-word] xs:text-[2.75rem] sm:text-7xl lg:text-[9rem]">
            <motion.span {...reveal3D(0.12)} className="block origin-top">{t.home.heroTitleA}</motion.span>
            <motion.span {...reveal3D(0.26)} className="block origin-top text-rev">{t.home.heroTitleB}</motion.span>
          </h1>
          <motion.p {...rise(0.44)} className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-bone/80 sm:mt-7 sm:text-[17px]">
            {t.home.heroSub}
          </motion.p>
          <motion.div {...rise(0.56)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/inventario" className="group inline-flex items-center gap-2 bg-rev px-7 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:bg-rev-soft active:scale-[0.97]">
              {t.home.heroCtaPrimary}
              <ArrowRight size={18} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href="/vender" className="inline-flex items-center gap-2 border border-line bg-ink-2/40 px-7 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-bone backdrop-blur-sm transition-colors duration-200 hover:border-rev">
              {t.home.heroCtaSecondary}
            </Link>
          </motion.div>
        </div>
      </section>

      <BrandStrip heading={t.home.brandsTitle} />

      {/* FEATURED */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[12px] uppercase tracking-[0.22em] text-rev">{t.home.featuredEyebrow}</p>
              <h2 className="display mt-3 text-4xl text-bone sm:text-6xl">{t.home.featuredTitle}</h2>
            </div>
            <Link href="/inventario" className="group inline-flex w-fit items-center gap-2 border border-line px-5 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-bone transition-colors hover:border-rev">
              {t.home.featuredCta}
              <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((v, i) => (
              <Reveal key={v.slug} delay={0.06 * i}>
                <VehicleCard v={v} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="border-t border-line bg-ink-2/30 py-24 sm:py-32">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <p className="text-[12px] uppercase tracking-[0.22em] text-rev">{t.home.servicesEyebrow}</p>
            <h2 className="display mt-3 text-4xl text-bone sm:text-6xl">{t.home.servicesTitle}</h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {t.services.items.map((item, i) => {
              const Icon = serviceIcons[i];
              return (
                <Reveal key={item.title} delay={0.04 * i}>
                  <div className="group flex h-full flex-col gap-4 bg-ink-2 p-7 transition-colors hover:bg-ink-3">
                    <Icon size={26} weight="regular" className="text-rev" />
                    <h3 className="text-lg font-bold text-bone">{item.title}</h3>
                    <p className="text-[14px] leading-relaxed text-fog">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1}>
            <Link href="/servicios" className="group mt-10 inline-flex items-center gap-2 text-[14px] font-semibold uppercase tracking-wide text-bone">
              {t.home.servicesCta}
              <ArrowRight size={16} weight="bold" className="text-rev transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTABand title={t.home.ctaTitle} sub={t.home.ctaSub} buttonLabel={t.home.ctaButton} href="/contacto" />
    </>
  );
}
