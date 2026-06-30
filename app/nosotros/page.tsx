import type { Metadata } from "next";
import { AboutView } from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "Nosotros | Zepaimotors París",
  description:
    "Más que un showroom, un destino. Más de 20 años de experiencia y transparencia total en el mercado de autos de lujo en París.",
};

export default function NosotrosPage() {
  return <AboutView />;
}
