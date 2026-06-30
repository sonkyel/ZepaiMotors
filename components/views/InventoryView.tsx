"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "../LanguageProvider";
import { vehicles } from "@/lib/vehicles";
import { VehicleCard } from "../VehicleCard";
import { PageHeader } from "../PageHeader";

type Sort = "featured" | "priceAsc" | "priceDesc" | "year";

export function InventoryView() {
  const { t } = useLang();
  const [brand, setBrand] = useState<string>("__all");
  const [sort, setSort] = useState<Sort>("featured");

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.brand))).sort(),
    []
  );

  const list = useMemo(() => {
    let arr = vehicles.filter((v) => brand === "__all" || v.brand === brand);
    arr = [...arr].sort((a, b) => {
      if (sort === "priceAsc") return a.priceEUR - b.priceEUR;
      if (sort === "priceDesc") return b.priceEUR - a.priceEUR;
      if (sort === "year") return b.year - a.year;
      return Number(b.featured ?? false) - Number(a.featured ?? false);
    });
    return arr;
  }, [brand, sort]);

  const chip = (active: boolean) =>
    `px-4 py-2 text-[13px] font-medium uppercase tracking-wide transition-colors ${
      active ? "bg-rev text-white" : "border border-line text-fog hover:border-rev hover:text-bone"
    }`;

  return (
    <>
      <PageHeader title={t.inventory.title} lead={t.inventory.lead} />

      <section className="bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Controls */}
          <div className="flex flex-col gap-5 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setBrand("__all")} className={chip(brand === "__all")}>
                {t.inventory.filterAll}
              </button>
              {brands.map((b) => (
                <button key={b} onClick={() => setBrand(b)} className={chip(brand === b)}>
                  {b}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[12px] uppercase tracking-wide text-mist">{t.inventory.sortLabel}</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border border-line bg-ink-2 px-3 py-2 text-[13px] text-bone focus:border-rev focus:outline-none"
              >
                <option value="featured">{t.inventory.sortFeatured}</option>
                <option value="priceAsc">{t.inventory.sortPriceAsc}</option>
                <option value="priceDesc">{t.inventory.sortPriceDesc}</option>
                <option value="year">{t.inventory.sortYear}</option>
              </select>
            </div>
          </div>

          <p className="mt-6 font-mono text-[13px] text-mist">
            {list.length} {t.inventory.results}
          </p>

          {/* Grid */}
          {list.length === 0 ? (
            <p className="py-24 text-center text-[16px] text-fog">{t.inventory.empty}</p>
          ) : (
            <motion.div layout className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((v) => (
                  <motion.div
                    key={v.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <VehicleCard v={v} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
