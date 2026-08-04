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
  /** optional extras — not every vehicle has these yet */
  color?: string;
  warrantyUntil?: string;
  features?: Record<Lang, string[]>;
  /** positive condition/maintenance points, e.g. "power steering recently repaired" */
  conditionHighlights?: Record<Lang, string[]>;
  /** honest disclosure of known issues/pending work */
  toImprove?: Record<Lang, string[]>;
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
      es: "Un clasico atemporal del transaxle de Porsche. Motor de cuatro cilindros que gira libre, caja manual de 5 velocidades y el equilibrio de peso perfecto que hizo famoso al 944. En posesion del mismo propietario desde hace 16 anos y cuidado dentro de su edad — una gran oportunidad de inversion para aficionados del clasico en alza.",
      en: "A timeless Porsche transaxle classic. A free-revving four-cylinder, a 5-speed manual, and the perfect weight balance that made the 944 famous. In the same owner's hands for the last 16 years and well cared for given its age — a great investment opportunity for enthusiasts of this rising classic.",
      fr: "Un classique intemporel du transaxle Porsche. Un quatre-cylindres qui aime tourner, une boite manuelle a 5 rapports, et l'equilibre des masses qui a fait la renommee de la 944. Entre les mains du meme proprietaire depuis 16 ans et bien entretenue pour son age — une belle opportunite d'investissement pour les passionnes de cette classique en plein essor.",
    },
    featured: true,
    conditionHighlights: {
      es: [
        "Direccion asistida recien reparada",
        "Cambio de aceite y filtros realizado hace 1.000 km",
        "ITV recien pasada",
        "Llantas originales de 15\" con neumaticos en buen estado",
        "Exento de impuesto de circulacion",
        "Matricula original de Madrid (posibilidad de reinstalarla)",
      ],
      en: [
        "Power steering recently repaired",
        "Oil and filter change done 1,000 km ago",
        "Roadworthiness test (ITV) recently passed",
        "Original 15\" wheels with tires in good condition",
        "Exempt from circulation tax",
        "Original Madrid registration plate (can be reinstated)",
      ],
      fr: [
        "Direction assistee recemment reparee",
        "Vidange et filtres changes il y a 1 000 km",
        "Controle technique (ITV) recemment passe",
        "Jantes 15\" d'origine avec pneus en bon etat",
        "Exonere de la taxe de circulation",
        "Plaque d'immatriculation d'origine de Madrid (reinstallation possible)",
      ],
    },
    toImprove: {
      es: [
        "Aire acondicionado a revisar (actualmente no enfria)",
        "Salpicadero y panel esquinero a reparar o retapizar (posible entrega ya tapizado)",
      ],
      en: [
        "Air conditioning needs checking (currently not cooling)",
        "Dashboard and corner panel need repair or reupholstering (can be delivered already reupholstered)",
      ],
      fr: [
        "Climatisation a verifier (ne refroidit pas actuellement)",
        "Tableau de bord et panneau d'angle a reparer ou retapisser (livraison deja retapissee possible)",
      ],
    },
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
    color: "Verde militar mate (vinilado)",
    warrantyUntil: "09/2026",
    features: {
      es: [
        "Llantas de 23\" en negro",
        "Elementos exteriores en fibra de carbono",
        "Escape Akrapovic",
        "Faros LED",
        "Volante con levas",
        "Interior en cuero y alcantara con costuras amarillas",
        "Head-up display",
        "Asistente de aparcamiento con camara 360°",
        "Conectividad smartphone",
        "Modos de conduccion seleccionables",
        "Asientos deportivos con memoria",
        "Sistema de audio Bang & Olufsen",
        "Techo con efecto starlight (constelacion)",
        "Climatizador para plazas traseras",
        "Tomas de corriente 12V y USB-C",
      ],
      en: [
        "23\" black alloy wheels",
        "Carbon-fiber exterior elements",
        "Akrapovic exhaust",
        "LED headlights",
        "Paddle-shift steering wheel",
        "Leather and Alcantara interior with yellow stitching",
        "Head-up display",
        "360° parking camera assist",
        "Smartphone connectivity",
        "Selectable drive modes",
        "Sport seats with memory function",
        "Bang & Olufsen sound system",
        "Starlight headliner",
        "Rear-seat climate control",
        "12V and USB-C power outlets",
      ],
      fr: [
        "Jantes 23\" noires",
        "Elements exterieurs en fibre de carbone",
        "Echappement Akrapovic",
        "Phares LED",
        "Volant a palettes",
        "Interieur cuir et alcantara avec surpiqures jaunes",
        "Affichage tete haute",
        "Aide au stationnement avec camera 360°",
        "Connectivite smartphone",
        "Modes de conduite selectionnables",
        "Sieges sport avec memoire",
        "Systeme audio Bang & Olufsen",
        "Ciel etoile (starlight)",
        "Climatisation arriere",
        "Prises 12V et USB-C",
      ],
    },
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
