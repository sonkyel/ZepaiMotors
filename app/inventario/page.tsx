import type { Metadata } from "next";
import { InventoryView } from "@/components/views/InventoryView";

export const metadata: Metadata = {
  title: "Inventario | Zepaimotors París",
  description:
    "Explora nuestro inventario de superdeportivos y autos de lujo verificados en París: Ferrari, Lamborghini, Rolls-Royce, Porsche y más.",
};

export default function InventarioPage() {
  return <InventoryView />;
}
