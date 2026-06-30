import type { Lang } from "./i18n";

export type BodyType = "supercar" | "suv" | "sedan" | "coupe" | "convertible";

export type Vehicle = {
  slug: string;
  brand: string;
  model: string;
  year: number;
  priceEUR: number;
  image: string;
  bodyType: BodyType;
  specs: { power: string; engine: string; drivetrain: string; mileageKm: number };
  blurb: Record<Lang, string>;
  featured?: boolean;
};

export const vehicles: Vehicle[] = [
  {
    slug: "ferrari-sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    year: 2021,
    priceEUR: 340000,
    image: "/vehicles/ferrari-sf90.png",
    bodyType: "supercar",
    specs: { power: "986 hp", engine: "4.0L V8 Hibrido", drivetrain: "AWD", mileageKm: 8400 },
    blurb: {
      es: "El primer hibrido enchufable de serie de Maranello. Aceleracion casi irreal con la finesa de un Ferrari.",
      en: "Maranello's first series plug-in hybrid. Almost unreal acceleration with true Ferrari finesse.",
      fr: "La premiere hybride rechargeable de serie de Maranello. Une acceleration presque irreelle avec la finesse d'une Ferrari.",
    },
    featured: true,
  },
  {
    slug: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    year: 2024,
    priceEUR: 560000,
    image: "/vehicles/lamborghini-revuelto.png",
    bodyType: "supercar",
    specs: { power: "1015 hp", engine: "6.5L V12 Hibrido", drivetrain: "AWD", mileageKm: 3200 },
    blurb: {
      es: "El nuevo V12 hibrido de Sant'Agata. Puertas de tijera, potencia electrificada y teatro puro.",
      en: "Sant'Agata's new hybrid V12. Scissor doors, electrified power and pure theatre.",
      fr: "Le nouveau V12 hybride de Sant'Agata. Portes en ciseaux, puissance electrifiee et pur spectacle.",
    },
    featured: true,
  },
  {
    slug: "porsche-911-gt3-rs",
    brand: "Porsche",
    model: "911 GT3 RS (992)",
    year: 2025,
    priceEUR: 290000,
    image: "/vehicles/porsche-gt3rs.png",
    bodyType: "coupe",
    specs: { power: "525 hp", engine: "4.0L Flat-6", drivetrain: "RWD", mileageKm: 1900 },
    blurb: {
      es: "Un coche de carreras con placa. Paquete Weissach y aerodinamica activa para la pista.",
      en: "A race car with plates. Weissach package and active aero built for the track.",
      fr: "Une voiture de course immatriculee. Pack Weissach et aero active concue pour la piste.",
    },
    featured: true,
  },
  {
    slug: "rolls-royce-phantom-series-ii",
    brand: "Rolls-Royce",
    model: "Phantom Series II",
    year: 2024,
    priceEUR: 520000,
    image: "/vehicles/rolls-phantom.png",
    bodyType: "sedan",
    specs: { power: "571 hp", engine: "6.75L V12", drivetrain: "RWD", mileageKm: 5600 },
    blurb: {
      es: "La cumbre del lujo automotriz. Silencio absoluto, cielo de estrellas y presencia incomparable.",
      en: "The summit of automotive luxury. Absolute silence, starlight headliner and unmatched presence.",
      fr: "Le sommet du luxe automobile. Silence absolu, ciel etoile et presence incomparable.",
    },
    featured: true,
  },
  {
    slug: "ferrari-purosangue",
    brand: "Ferrari",
    model: "Purosangue",
    year: 2024,
    priceEUR: 420000,
    image: "/vehicles/ferrari-purosangue.png",
    bodyType: "suv",
    specs: { power: "725 hp", engine: "6.5L V12", drivetrain: "AWD", mileageKm: 4100 },
    blurb: {
      es: "El primer cuatro puertas de Ferrari. Un V12 atmosferico con el alma de un superdeportivo.",
      en: "Ferrari's first four-door. A naturally aspirated V12 with the soul of a supercar.",
      fr: "La premiere quatre portes de Ferrari. Un V12 atmospherique avec l'ame d'une supercar.",
    },
  },
  {
    slug: "lamborghini-urus-performante",
    brand: "Lamborghini",
    model: "Urus Performante",
    year: 2023,
    priceEUR: 265000,
    image: "/vehicles/lamborghini-urus.png",
    bodyType: "suv",
    specs: { power: "666 hp", engine: "4.0L V8 Twin-Turbo", drivetrain: "AWD", mileageKm: 11200 },
    blurb: {
      es: "El SUV mas afilado del mundo. Rendimiento de superdeportivo con uso diario.",
      en: "The sharpest SUV in the world. Supercar performance with everyday usability.",
      fr: "Le SUV le plus affute du monde. Des performances de supercar au quotidien.",
    },
  },
  {
    slug: "mercedes-benz-g63-amg",
    brand: "Mercedes-Benz",
    model: "G63 AMG",
    year: 2024,
    priceEUR: 230000,
    image: "/vehicles/mercedes-g63.png",
    bodyType: "suv",
    specs: { power: "585 hp", engine: "4.0L V8 Biturbo", drivetrain: "AWD", mileageKm: 9800 },
    blurb: {
      es: "El icono inconfundible. Presencia brutal, V8 AMG hecho a mano y lujo absoluto.",
      en: "The unmistakable icon. Brutal presence, hand-built AMG V8 and absolute luxury.",
      fr: "L'icone reconnaissable entre toutes. Presence brutale, V8 AMG fait main et luxe absolu.",
    },
  },
  {
    slug: "rolls-royce-cullinan-series-ii",
    brand: "Rolls-Royce",
    model: "Cullinan Series II",
    year: 2024,
    priceEUR: 430000,
    image: "/vehicles/rolls-cullinan.png",
    bodyType: "suv",
    specs: { power: "563 hp", engine: "6.75L V12", drivetrain: "AWD", mileageKm: 3400 },
    blurb: {
      es: "El refinamiento elevado a SUV. Se desliza sobre cualquier camino con serenidad total.",
      en: "Refinement elevated to an SUV. Glides over any road with total serenity.",
      fr: "Le raffinement eleve au rang de SUV. Il glisse sur toutes les routes avec une serenite totale.",
    },
  },
  {
    slug: "aston-martin-dbx-707",
    brand: "Aston Martin",
    model: "DBX 707",
    year: 2023,
    priceEUR: 215000,
    image: "/vehicles/aston-dbx707.png",
    bodyType: "suv",
    specs: { power: "707 hp", engine: "4.0L V8 Twin-Turbo", drivetrain: "AWD", mileageKm: 14500 },
    blurb: {
      es: "El SUV mas potente de su clase. Elegancia britanica con respuesta inmediata a cualquier velocidad.",
      en: "The most powerful SUV in its class. British elegance with instant response at any speed.",
      fr: "Le SUV le plus puissant de sa categorie. Elegance britannique et reponse immediate a toute vitesse.",
    },
  },
  {
    slug: "land-rover-defender-110",
    brand: "Land Rover",
    model: "Defender 110 P525",
    year: 2023,
    priceEUR: 135000,
    image: "/vehicles/defender-110.png",
    bodyType: "suv",
    specs: { power: "525 hp", engine: "5.0L V8", drivetrain: "AWD", mileageKm: 22000 },
    blurb: {
      es: "El todoterreno definitivo reinventado. Capacidad legendaria con lujo moderno.",
      en: "The definitive off-roader reinvented. Legendary capability with modern luxury.",
      fr: "Le tout-terrain de reference reinvente. Une capacite legendaire avec un luxe moderne.",
    },
  },
  {
    slug: "bentley-bentayga-v8",
    brand: "Bentley",
    model: "Bentayga V8",
    year: 2025,
    priceEUR: 245000,
    image: "/vehicles/bentley-bentayga.png",
    bodyType: "suv",
    specs: { power: "542 hp", engine: "4.0L V8", drivetrain: "AWD", mileageKm: 2100 },
    blurb: {
      es: "Elegancia atletica y lujo hecho a mano. Acabado Mulliner y artesania britanica.",
      en: "Athletic elegance and handcrafted luxury. Mulliner trim and British artistry.",
      fr: "Elegance athletique et luxe fait main. Finition Mulliner et savoir-faire britannique.",
    },
  },
  {
    slug: "mercedes-benz-eqs-580",
    brand: "Mercedes-Benz",
    model: "EQS 580",
    year: 2023,
    priceEUR: 95000,
    image: "/vehicles/mercedes-eqs.png",
    bodyType: "sedan",
    specs: { power: "516 hp", engine: "Dual Motor EV", drivetrain: "AWD", mileageKm: 18700 },
    blurb: {
      es: "El buque insignia electrico. Hyperscreen MBUX y autonomia de gran turismo en silencio total.",
      en: "The electric flagship. MBUX Hyperscreen and grand-touring range in total silence.",
      fr: "Le vaisseau amiral electrique. MBUX Hyperscreen et autonomie de grand tourisme dans un silence total.",
    },
  },
];

export function getVehicle(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export const brandLogos: { name: string; slug: string }[] = [
  { name: "Ferrari", slug: "ferrari" },
  { name: "Lamborghini", slug: "lamborghini" },
  { name: "Rolls-Royce", slug: "rollsroyce" },
  { name: "Bentley", slug: "bentley" },
  { name: "Porsche", slug: "porsche" },
  { name: "McLaren", slug: "mclaren" },
  { name: "Aston Martin", slug: "astonmartin" },
  { name: "Mercedes-Benz", slug: "mercedes" },
  { name: "BMW", slug: "bmw" },
  { name: "Audi", slug: "audi" },
  { name: "Land Rover", slug: "landrover" },
  { name: "Lotus", slug: "lotus" },
  { name: "Cadillac", slug: "cadillac" },
  { name: "Ford", slug: "ford" },
];

export function formatPrice(value: number): string {
  return "€" + value.toLocaleString("en-US");
}

export function formatKm(value: number): string {
  return value.toLocaleString("en-US") + " km";
}
