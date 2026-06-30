import type { Metadata } from "next";
import { ServicesView } from "@/components/views/ServicesView";

export const metadata: Metadata = {
  title: "Servicios | Zepaimotors París",
  description:
    "Servicios de Zepaimotors: búsqueda y adquisición, permuta, personalización, restauración, concierge y financiamiento a medida.",
};

export default function ServiciosPage() {
  return <ServicesView />;
}
