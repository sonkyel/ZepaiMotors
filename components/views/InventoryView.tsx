"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "../LanguageProvider";
import { vehicles, type FuelType } from "@/lib/vehicles";
import { VehicleCard } from "../VehicleCard";
import { PageHeader } from "../PageHeader";

type Sort = "featured" | "priceAsc" | "priceDesc" | "year";
type PriceBand = "any" | "under100k" | "100to250k" | "250to500k" | "over500k";
type YearBand = "any" | "from2024" | "2022to2023" | "2020to2021" | "before2020";
type KmBand = "any" | "under10k" | "10to30k" | "over30k";

const FUEL_TYPES: FuelType[] = ["gasolina", "diesel", "hibrido", "electrico"];

function matchesPrice(priceEUR: number, band: PriceBand): boolean {
  if (band === "under100k") return priceEUR < 100000;
  if (band === "100to250k") return priceEUR >= 100000 && priceEUR <= 250000;
  if (band === "250to500k") return priceEUR >= 250000 && priceEUR <= 500000;
  if (band === "over500k") return priceEUR > 500000;
  return true;
}

function matchesYear(year: number, band: YearBand): boolean {
  if (band === "from2024") return year >= 2024;
  if (band === "2022to2023") return year >= 2022 && year <= 2023;
  if (band === "2020to2021") return year >= 2020 && year <= 2021;
  if (band === "before2020") return year < 2020;
  return true;
}

function matchesKm(km: number, band: KmBand): boolean {
  if (band === "under10k") return km < 10000;
  if (band === "10to30k") return km >= 10000 && km <= 30000;
  if (band === "over30k") return km > 30000;
  return true;
}

export function InventoryView() {
  const { t } = useLang();
  const [brand, setBrand] = useState<string>("__all");
  const [fuel, setFuel] = useState<string>("__all");
  const [priceBand, setPriceBand] = useState<PriceBand>("any");
  const [yearBand, setYearBand] = useState<YearBand>("any");
  const [kmBand, setKmBand] = useState<KmBand>("any");
  const [sort, setSort] = useState<Sort>("featured");

  const brands = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.brand))).sort(),
    []
  );

  const list = useMemo(() => {
    let arr = vehicles.filter(
      (v) =>
        (brand === "__all" || v.brand === brand) &&
        (fuel === "__all" || v.fuelType === fuel) &&
        matchesPrice(v.priceEUR, priceBand) &&
        matchesYear(v.year, yearBand) &&
        matchesKm(v.specs.mileageKm, kmBand)
    );
    arr = [...arr].sort((a, b) => {
      if (sort === "priceAsc") return a.priceEUR - b.priceEUR;
      if (sort === "priceDesc") return b.priceEUR - a.priceEUR;
      if (sort === "year") return b.year - a.year;
      return Number(b.featured ?? false) - Number(a.featured ?? false);
    });
    return arr;
  }, [brand, fuel, priceBand, yearBand, kmBand, sort]);

  const chip = (active: boolean) =>
    `px-4 py-2 text-[13px] font-medium uppercase tracking-wide transition-colors ${
      active ? "bg-rev text-white" : "border border-line text-fog hover:border-rev hover:text-bone"
    }`;

  const select = "border border-line bg-ink-2 px-3 py-2 text-[13px] text-bone focus:border-rev focus:outline-none";

  return (
    <>
      <PageHeader title={t.inventory.title} lead={t.inventory.lead} />

      <section className="bg-ink py-12 sm:py-16">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
          {/* Controls */}
          <div className="flex flex-col gap-5 border-b border-line pb-8">
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

            <div className="flex flex-wrap gap-2">
              <button onClick={() => setFuel("__all")} className={chip(fuel === "__all")}>
                {t.inventory.filterAll}
              </button>
              {FUEL_TYPES.map((f) => (
                <button key={f} onClick={() => setFuel(f)} className={chip(fuel === f)}>
                  {t.fuel[f]}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[12px] uppercase tracking-wide text-mist">{t.inventory.filterPrice}</span>
                <select value={priceBand} onChange={(e) => setPriceBand(e.target.value as PriceBand)} className={select}>
                  <option value="any">{t.inventory.priceAny}</option>
                  <option value="under100k">{t.inventory.priceUnder100k}</option>
                  <option value="100to250k">{t.inventory.price100to250k}</option>
                  <option value="250to500k">{t.inventory.price250to500k}</option>
                  <option value="over500k">{t.inventory.priceOver500k}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[12px] uppercase tracking-wide text-mist">{t.inventory.filterYear}</span>
                <select value={yearBand} onChange={(e) => setYearBand(e.target.value as YearBand)} className={select}>
                  <option value="any">{t.inventory.yearAny}</option>
                  <option value="from2024">{t.inventory.yearFrom2024}</option>
                  <option value="2022to2023">{t.inventory.year2022to2023}</option>
                  <option value="2020to2021">{t.inventory.year2020to2021}</option>
                  <option value="before2020">{t.inventory.yearBefore2020}</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[12px] uppercase tracking-wide text-mist">{t.inventory.filterKm}</span>
                <select value={kmBand} onChange={(e) => setKmBand(e.target.value as KmBand)} className={select}>
                  <option value="any">{t.inventory.kmAny}</option>
                  <option value="under10k">{t.inventory.kmUnder10k}</option>
                  <option value="10to30k">{t.inventory.km10to30k}</option>
                  <option value="over30k">{t.inventory.kmOver30k}</option>
                </select>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <span className="text-[12px] uppercase tracking-wide text-mist">{t.inventory.sortLabel}</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={select}>
                  <option value="featured">{t.inventory.sortFeatured}</option>
                  <option value="priceAsc">{t.inventory.sortPriceAsc}</option>
                  <option value="priceDesc">{t.inventory.sortPriceDesc}</option>
                  <option value="year">{t.inventory.sortYear}</option>
                </select>
              </div>
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
