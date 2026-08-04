"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, WhatsappLogo, Lightning, Engine, GitFork, Gauge, Calendar, Car, GasPump } from "@phosphor-icons/react";
import { useLang } from "../LanguageProvider";
import { business } from "@/lib/i18n";
import { formatPrice, formatKm, type Vehicle } from "@/lib/vehicles";
import { VehicleCard } from "../VehicleCard";
import { Reveal } from "../Reveal";

export function VehicleDetail({ vehicle: v, related }: { vehicle: Vehicle; related: Vehicle[] }) {
  const { t, lang } = useLang();
  const gallery = v.images.length > 0 ? v.images : [v.image];
  const [activeImage, setActiveImage] = useState(0);

  const price = formatPrice(v.priceEUR);
  const waMessages: Record<typeof lang, string> = {
    es: `Hola, me interesa el ${v.brand} ${v.model} ${v.year} (${price}). ¿Sigue disponible?`,
    en: `Hi, I'm interested in the ${v.brand} ${v.model} ${v.year} (${price}). Is it still available?`,
    fr: `Bonjour, je suis interesse par la ${v.brand} ${v.model} ${v.year} (${price}). Est-elle toujours disponible ?`,
  };
  const waText = encodeURIComponent(waMessages[lang]);

  const specRows = [
    { Icon: Lightning, label: t.vehicle.power, value: v.specs.power },
    { Icon: Engine, label: t.vehicle.engine, value: v.specs.engine },
    { Icon: GitFork, label: t.vehicle.drivetrain, value: v.specs.drivetrain },
    { Icon: Gauge, label: t.vehicle.mileage, value: formatKm(v.specs.mileageKm) },
    { Icon: Calendar, label: t.vehicle.year, value: String(v.year) },
    { Icon: Car, label: t.vehicle.body, value: v.bodyType },
    { Icon: GasPump, label: t.vehicle.fuel, value: t.fuel[v.fuelType] },
  ];

  return (
    <article className="bg-ink pt-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <Link href="/inventario" className="inline-flex items-center gap-2 py-6 text-[13px] uppercase tracking-wide text-fog transition-colors hover:text-bone">
          <ArrowLeft size={16} weight="bold" />
          {t.vehicle.back}
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Image gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-line">
              <Image
                key={gallery[activeImage]}
                src={gallery[activeImage]}
                alt={`${v.brand} ${v.model} — ${activeImage + 1}/${gallery.length}`}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 bg-ink/80 px-3 py-1.5 font-mono text-[12px] uppercase tracking-wide text-fog backdrop-blur-sm">
                {v.brand}
              </div>
              {gallery.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-ink/80 px-2.5 py-1 font-mono text-[12px] text-fog backdrop-blur-sm">
                  {activeImage + 1}/{gallery.length}
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 grid grid-cols-5 gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`${t.vehicle.overview} ${i + 1}`}
                    className={`relative aspect-[4/3] overflow-hidden border transition-colors ${
                      i === activeImage ? "border-rev" : "border-line hover:border-rev-deep"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="120px" className="object-cover" />
                    {i !== activeImage && <div className="absolute inset-0 bg-ink/40" />}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <div className="flex flex-col">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="font-mono text-[13px] text-rev">{v.year}</p>
              <h1 className="display mt-2 text-4xl text-bone sm:text-5xl">{v.model}</h1>
              <p className="mt-5 text-[15px] leading-relaxed text-fog">{v.blurb[lang]}</p>

              <div className="mt-7 border-y border-line py-5">
                <p className="text-[12px] uppercase tracking-wide text-mist">{t.vehicle.price}</p>
                <p className="mt-1 font-mono text-3xl font-semibold text-bone">{price}</p>
                <p className="mt-2 text-[13px] text-mist">{t.vehicle.financeNote}</p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link href={`/contacto?auto=${v.slug}`} className="flex-1 bg-rev px-6 py-3.5 text-center text-[14px] font-semibold uppercase tracking-wide text-white transition-transform duration-200 hover:bg-rev-soft active:scale-[0.98]">
                  {t.vehicle.inquire}
                </Link>
                <a
                  href={`https://wa.me/${business.whatsappHref}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 border border-line px-6 py-3.5 text-[14px] font-semibold uppercase tracking-wide text-bone transition-colors hover:border-rev"
                >
                  <WhatsappLogo size={18} weight="fill" className="text-rev" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-14">
          <h2 className="display text-2xl text-bone sm:text-3xl">{t.vehicle.specsTitle}</h2>
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {specRows.map(({ Icon, label, value }) => (
              <div key={label} className="flex flex-col gap-2 bg-ink-2 p-5">
                <Icon size={20} weight="regular" className="text-rev" />
                <p className="text-[12px] uppercase tracking-wide text-mist">{label}</p>
                <p className="font-mono text-[15px] capitalize text-bone">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 pb-24">
            <h2 className="display text-2xl text-bone sm:text-3xl">{t.vehicle.relatedTitle}</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rv, i) => (
                <Reveal key={rv.slug} delay={0.06 * i}>
                  <VehicleCard v={rv} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
