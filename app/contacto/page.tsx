import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactView } from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contacto | Zepaimotors París",
  description:
    "Visita Zepaimotors en Avenue Montaigne, París, o escríbenos. Abierto todos los días de 10:00 a 21:00.",
};

// Force per-request rendering: with static generation, useSearchParams() has no
// real query at build time and the Suspense boundary bakes in the empty
// fallback, shipping a blank page until client-side hydration takes over.
export const dynamic = "force-dynamic";

export default function ContactoPage() {
  return (
    <Suspense fallback={null}>
      <ContactView />
    </Suspense>
  );
}
