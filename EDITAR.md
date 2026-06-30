# Guía para editar la página (sin instalar nada)

Esta página se publica sola: **cada cambio que guardes en GitHub se publica en el sitio en 1-2 minutos** (Vercel lo hace automático).

No necesitas instalar nada. Todo se edita desde el navegador en GitHub.

## Cómo editar un archivo (pasos)
1. Entra al repositorio: **https://github.com/sonkyel/ZepaiMotors**
2. Abre la carpeta y el archivo que quieras cambiar (ver la tabla de abajo).
3. Pulsa el botón del **lápiz** (Edit, arriba a la derecha del archivo).
4. Cambia solo el texto entre comillas. **No borres las comillas `"` ni las comas `,`.**
5. Abajo pulsa **Commit changes** (botón verde) y de nuevo **Commit changes**.
6. Espera 1-2 minutos y recarga la página del sitio. Listo.

> Consejo: si te equivocas, no pasa nada. GitHub guarda el historial y se puede volver atrás.

## ¿Dónde cambio cada cosa?

| Quiero cambiar... | Archivo | Notas |
|---|---|---|
| Textos de la página en español, inglés y francés | `lib/i18n.ts` | Cada idioma está en su bloque: `es`, `en`, `fr`. Cambia el texto entre comillas. |
| Teléfono, correo, dirección, redes sociales | `lib/i18n.ts` | Busca el bloque `business = { ... }` (casi al final). |
| Horario / textos de contacto | `lib/i18n.ts` | Dentro de cada idioma, bloque `contact`. |
| Autos, precios, año, specs | `lib/vehicles.ts` | Cada auto es un bloque. `priceEUR: 560000` es el precio en euros (sin símbolo ni comas). |
| Marcar un auto como "destacado" (sale en Inicio) | `lib/vehicles.ts` | Pon `featured: true` en ese auto. |
| Fotos del hero o de los autos | Carpeta `public/` y `public/vehicles/` | Sube una imagen con **el mismo nombre** del archivo que reemplazas. |
| Colores de la marca (rojo, fondo, etc.) | `app/globals.css` | Bloque `@theme` arriba. `--color-rev` es el rojo de acento. |

## Ejemplos rápidos

**Cambiar un precio:** en `lib/vehicles.ts`, busca el auto y cambia el número:
```
priceEUR: 560000,   ->   priceEUR: 575000,
```

**Cambiar el teléfono:** en `lib/i18n.ts`, en el bloque `business`:
```
phone: "+33 1 53 67 84 00",
```

**Cambiar un texto del botón principal (en español):** en `lib/i18n.ts`, dentro de `es` -> `home`:
```
heroCtaPrimary: "Ver inventario",
```

## Reglas importantes
- Cambia **solo lo que está entre comillas**. No toques los nombres antes de los dos puntos (ej. `phone:`, `priceEUR:`).
- Mantén las **comas** al final de cada línea.
- Si añades un auto nuevo, copia un bloque completo de otro auto y cambia sus datos (incluida una imagen en `public/vehicles/`).
- Los precios van **sin símbolo y sin comas**: `265000`, no `€265,000`.

## ¿Algo se rompió?
Si tras un cambio el sitio muestra error, Vercel marca el último despliegue como fallido y **el sitio sigue mostrando la versión anterior** (no se cae). Revisa que no hayas borrado una comilla o una coma, o deshaz el cambio desde el historial del archivo en GitHub.
