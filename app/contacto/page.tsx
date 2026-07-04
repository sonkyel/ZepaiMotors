import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contacto | Zepaimotors París",
  description:
    "Visita Zepaimotors en Avenue Montaigne, París, o escríbenos. Abierto todos los días de 10:00 a 21:00.",
};

export default function ContactoPage() {
  return (
    <Suspense fallback={null}>
      <ContactView />
    </Suspense>
  );
}
