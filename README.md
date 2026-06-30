# Zepaimotors — Sitio web premium

Concesionaria de autos de lujo en París (Avenue Montaigne). Sitio **multipágina** trilingüe (ES/EN/FR), precios en EUR, estética "performance audaz" (acento rojo, tipografía condensada), construido con Next.js 15 (App Router), Tailwind v4 y Motion.

## Páginas
- `/` Inicio (hero, destacados, marcas, servicios, CTA)
- `/inventario` Catálogo con filtro por marca y ordenamiento
- `/inventario/[slug]` Ficha de cada vehículo (specs, precio, WhatsApp, relacionados)
- `/servicios` Servicios
- `/vender` Vende tu auto (con formulario de valoración)
- `/nosotros` Sobre la empresa
- `/contacto` Contacto con mapa y formulario

## Requisitos
- Node.js 18.18+ (probado con Node 24)

## Desarrollo
```bash
npm install
npm run dev
```
Abre http://localhost:3000

## Build de producción
```bash
npm run build
npm start
```

## Estructura
- `app/` — rutas (una carpeta por página) + layout, estilos globales y tokens de diseño
- `components/` — Nav, Footer, tarjetas y piezas compartidas; `components/views/` las vistas de cada página
- `lib/i18n.ts` — todos los textos en español e inglés
- `lib/vehicles.ts` — inventario completo (edita aquí para añadir/quitar autos, precios y specs)
- `public/` — imágenes generadas (hero, showroom y vehículos)

## Personalización rápida
- **Datos de contacto / redes:** `lib/i18n.ts` -> objeto `business`
- **Inventario:** `lib/vehicles.ts` (modelo, año, precio, specs, imagen)
- **Colores de marca:** `app/globals.css` -> bloque `@theme` (el acento es `--color-champ`)
- **Imágenes de vehículos:** reemplaza los archivos en `public/vehicles/` manteniendo el nombre

## Notas
- El formulario de contacto es de demostración (no envía a un backend todavía).
  Conecta un endpoint real en `components/Contact.tsx` -> función `onSubmit`.
- Listo para desplegar en Vercel, Netlify o cualquier hosting con Node.
