import type { Lang } from "./i18n";

export type BodyType = "supercar" | "suv" | "sedan" | "coupe" | "convertible" | "hatchback";
export type FuelType = "gasolina" | "diesel" | "hibrido" | "electrico";

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  priceEUR: number;
  /** primary/thumbnail image, used on cards */
  image: string;
  /** full photo gallery for the detail page, in display order */
  images: string[];
  bodyType: BodyType;
  fuelType: FuelType;
  specs: { power: string; engine: string; drivetrain: string; mileageKm: number };
  blurb: Record<Lang, string>;
  featured?: boolean;
};

export const vehicles: Vehicle[] = [
  {
    slug: "porsche-944",
    brand: "Porsche",
    model: "944",
    year: 1986,
    priceEUR: 12950,
    image: "/vehicles/porsche-944-1.png",
    images: [
      "/vehicles/porsche-944-1.png",
      "/vehicles/porsche-944-2.png",
      "/vehicles/porsche-944-3.png",
    ],
    bodyType: "coupe",
    fuelType: "gasolina",
    specs: { power: "162 hp", engine: "2.5L I4", drivetrain: "RWD", mileageKm: 227000 },
    blurb: {
      es: "Un clasico atemporal del transaxle de Porsche. Motor de cuatro cilindros que gira libre, caja manual de 5 velocidades y el equilibrio de peso perfecto que hizo famoso al 944.",
      en: "A timeless Porsche transaxle classic. A free-revving four-cylinder, a 5-speed manual, and the perfect weight balance that made the 944 famous.",
      fr: "Un classique intemporel du transaxle Porsche. Un quatre-cylindres qui aime tourner, une boite manuelle a 5 rapports, et l'equilibre des masses qui a fait la renommee de la 944.",
    },
    featured: true,
  },
  {
    slug: "mercedes-amg-a45-azul",
    brand: "Mercedes-Benz",
    model: "A 45 AMG 4MATIC",
    year: 2016,
    priceEUR: 27900,
    image: "/vehicles/mercedes-a45-azul-1.png",
    images: [
      "/vehicles/mercedes-a45-azul-1.png",
      "/vehicles/mercedes-a45-azul-2.png",
      "/vehicles/mercedes-a45-azul-3.png",
      "/vehicles/mercedes-a45-azul-4.png",
      "/vehicles/mercedes-a45-azul-5.png",
    ],
    bodyType: "hatchback",
    fuelType: "gasolina",
    specs: { power: "381 hp", engine: "2.0L I4 Turbo", drivetrain: "AWD", mileageKm: 80000 },
    blurb: {
      es: "El hot hatch mas potente de su epoca. Traccion integral 4MATIC y 381 CV en un formato compacto y del dia a dia.",
      en: "The most powerful hot hatch of its time. 4MATIC all-wheel drive and 381 hp in a compact, everyday format.",
      fr: "La compacte sportive la plus puissante de son epoque. Transmission integrale 4MATIC et 381 ch dans un format compact et polyvalent.",
    },
    featured: true,
  },
  {
    slug: "mercedes-cla-45-amg-blanco",
    brand: "Mercedes-Benz",
    model: "CLA 45 AMG Shooting Brake 4MATIC",
    year: 2017,
    priceEUR: 24900,
    image: "/vehicles/mercedes-a45-blanco-1.png",
    images: [
      "/vehicles/mercedes-a45-blanco-1.png",
      "/vehicles/mercedes-a45-blanco-2.png",
      "/vehicles/mercedes-a45-blanco-3.png",
      "/vehicles/mercedes-a45-blanco-4.png",
    ],
    bodyType: "hatchback",
    fuelType: "gasolina",
    specs: { power: "381 hp", engine: "2.0L I4 Turbo", drivetrain: "AWD", mileageKm: 119900 },
    blurb: {
      es: "La formula AMG en carroceria shooting brake: 381 CV, traccion 4MATIC y una silueta que combina deportividad con practicidad.",
      en: "The AMG formula in shooting brake form: 381 hp, 4MATIC drive and a silhouette that blends sportiness with practicality.",
      fr: "La formule AMG en carrosserie shooting brake : 381 ch, transmission 4MATIC et une silhouette qui allie sportivite et praticite.",
    },
    featured: true,
  },
  {
    slug: "lamborghini-urus-performante",
    brand: "Lamborghini",
    model: "Urus Performante",
    year: 2023,
    priceEUR: 304900,
    image: "/vehicles/urus-performante-1.png",
    images: [
      "/vehicles/urus-performante-1.png",
      "/vehicles/urus-performante-2.png",
      "/vehicles/urus-performante-3.png",
      "/vehicles/urus-performante-4.png",
      "/vehicles/urus-performante-5.png",
    ],
    bodyType: "suv",
    fuelType: "gasolina",
    specs: { power: "666 hp", engine: "4.0L V8 Twin-Turbo", drivetrain: "AWD", mileageKm: 24900 },
    blurb: {
      es: "La version mas radical del Urus. Suspension mas rigida, menos peso y el ADN de superdeportivo de Lamborghini en un SUV.",
      en: "The most radical version of the Urus. Stiffer suspension, less weight, and Lamborghini's supercar DNA in an SUV.",
      fr: "La version la plus radicale de l'Urus. Suspension plus ferme, poids reduit, et l'ADN supercar de Lamborghini dans un SUV.",
    },
    featured: true,
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export const brandLogos: { name: string; slug: string }[] = [
  { name: "Porsche", slug: "porsche" },
  { name: "Mercedes-Benz", slug: "mercedes" },
  { name: "Lamborghini", slug: "lamborghini" },
];

export function formatPrice(value: number): string {
  if (value <= 0) return "Consultar precio";
  return "€" + value.toLocaleString("en-US");
}

export function formatKm(value: number): string {
  return value.toLocaleString("en-US") + " km";
}
