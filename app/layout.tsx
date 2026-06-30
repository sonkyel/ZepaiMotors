import type { Metadata } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zepaimotors.com"),
  title: "Zepaimotors | Concesionaria de autos de lujo en París",
  description:
    "Más que un showroom, un destino. Vehículos de lujo verificados en Avenue Montaigne, París. Ferrari, Rolls-Royce, Porsche, Bentley y más, con más de 20 años de experiencia.",
  keywords: [
    "concesionaria de lujo París",
    "autos de lujo",
    "voitures de luxe Paris",
    "luxury car dealership Paris",
    "Ferrari",
    "Rolls-Royce",
    "Porsche",
    "Bentley",
    "Zepaimotors",
  ],
  openGraph: {
    title: "Zepaimotors | Autos de lujo en París",
    description:
      "Más que un showroom, un destino. Vehículos de lujo verificados en Avenue Montaigne, París.",
    type: "website",
    locale: "fr_FR",
    siteName: "Zepaimotors",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${anton.variable} ${archivo.variable} ${mono.variable}`}>
      <body>
        <LanguageProvider>
          <div className="grain" aria-hidden="true" />
          <Nav />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
