import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { vehicles, getVehicle, formatPrice } from "@/lib/vehicles";
import { VehicleDetail } from "@/components/views/VehicleDetail";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) return { title: "Zepaimotors París" };
  return {
    title: `${v.brand} ${v.model} (${v.year}) | Zepaimotors París`,
    description: `${v.brand} ${v.model} ${v.year}. ${v.specs.power}, ${v.specs.engine}. ${formatPrice(v.priceEUR)}. ${v.blurb.es}`,
    openGraph: {
      title: `${v.brand} ${v.model} (${v.year})`,
      description: v.blurb.es,
      images: [{ url: v.image }],
    },
  };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = getVehicle(slug);
  if (!v) notFound();

  const related = vehicles
    .filter((x) => x.slug !== v.slug && (x.brand === v.brand || x.bodyType === v.bodyType))
    .slice(0, 3);

  return <VehicleDetail vehicle={v} related={related} />;
}
