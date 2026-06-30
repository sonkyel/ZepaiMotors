import type { Metadata } from "next";
import { SellView } from "@/components/views/SellView";

export const metadata: Metadata = {
  title: "Vende tu auto | Zepaimotors París",
  description:
    "Vende tu auto de lujo con Zepaimotors: fotografía profesional, promoción digital y una red de compradores. Recibe una valoración justa.",
};

export default function VenderPage() {
  return <SellView />;
}
