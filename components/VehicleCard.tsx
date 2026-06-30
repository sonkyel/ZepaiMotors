"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { formatPrice, type Vehicle } from "@/lib/vehicles";
import { useLang } from "./LanguageProvider";

export function VehicleCard({ v, priority = false }: { v: Vehicle; priority?: boolean }) {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group h-full"
    >
      <Link
        href={`/inventario/${v.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-ink-2 shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)] transition-colors group-hover:border-rev-deep"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={v.image}
            alt={`${v.brand} ${v.model} ${v.year}`}
            fill
            priority={priority}
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent opacity-70" />
          <span className="absolute left-3 top-3 bg-ink/80 px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-fog backdrop-blur-sm">
            {v.brand}
          </span>
          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink/75 text-bone backdrop-blur-sm transition-colors group-hover:bg-rev group-hover:text-white">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="display text-xl leading-none text-bone sm:text-2xl">{v.model}</h3>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="bg-ink-3 px-2 py-1 font-mono text-[11px] text-fog">{v.specs.power}</span>
            <span className="bg-ink-3 px-2 py-1 font-mono text-[11px] text-fog">{v.specs.engine}</span>
          </div>

          <div className="mt-auto flex items-end justify-between border-t border-line pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-mist">{t.vehicle.price}</p>
              <p className="font-mono text-[15px] font-semibold text-bone">{formatPrice(v.priceEUR)}</p>
            </div>
            <span className="font-mono text-[13px] text-rev">{lang === "es" ? "Ver" : "View"}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
