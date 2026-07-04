# Recibir un correo por cada lead (Resend)

Con esto, cada vez que alguien rellena el formulario de **Contacto** o **Vende tu auto**, te llega un **correo a info@zepaiagency.com** con los datos del cliente. Es independiente de Google Sheets y de n8n: pueden convivir los tres.

```
Formulario → /api/lead (web) → Resend → correo a info@zepaiagency.com
```

Usamos **Resend** (no EmailJS) porque tiene un plan gratis mucho más amplio (3,000 correos/mes) y está pensado justo para esto: enviar correos desde el servidor de una web.

---

## Paso 1 — Crear la cuenta con el correo correcto
1. Entra a **https://resend.com/signup**.
2. **Regístrate usando exactamente `info@zepaiagency.com`** como correo de la cuenta.

   > ¿Por qué importa esto? Sin verificar un dominio propio, Resend solo permite enviar correos de prueba **a la misma dirección con la que te registraste**. Como te registras con `info@zepaiagency.com` y ese es justo el correo al que queremos que lleguen los avisos, **no hace falta verificar ningún dominio ni tocar DNS**. Si en el futuro quieres enviar desde tu propio dominio (ej. `leads@zepaiagency.com`) o a otras direcciones, se puede verificar el dominio más adelante — no es necesario ahora.

## Paso 2 — Obtener la API Key
1. Dentro de Resend: **API Keys → Create API Key**.
2. Ponle un nombre (ej. `zepaimotors-web`) y permisos de **Sending access**.
3. Copia la key (empieza con `re_...`). **Solo se muestra una vez**, guárdala.

## Paso 3 — Poner la variable en Vercel
1. Vercel → tu proyecto → **Settings → Environment Variables**.
2. Agrega (entorno Production, y Preview si quieres):
   - **`RESEND_API_KEY`** = la key `re_...` del Paso 2.
   - (Opcional) **`RESEND_TO_EMAIL`** = `info@zepaiagency.com` (si no la pones, ya usa ese valor por defecto).
   - (Opcional) **`RESEND_FROM`** = déjalo vacío por ahora; usa automáticamente `ZepaiMotors <onboarding@resend.dev>`, que es el remitente de prueba de Resend y funciona sin configurar nada más.
3. **Redeploy** el proyecto para que tome la variable.

## Paso 4 — Probar
1. Envía el formulario de **Contacto** en tu sitio en producción.
2. En segundos debe llegar un correo a **info@zepaiagency.com** con: fuente, nombre, teléfono, email, mensaje, vehículo, año, kilometraje, idioma y fecha.
3. Revisa también la carpeta de **spam** la primera vez (los correos desde `onboarding@resend.dev` a veces caen ahí al principio).

---

## Si más adelante quieres verificar tu propio dominio
Verificar un dominio (ej. `zepaiagency.com`) te permite:
- Enviar **a cualquier destinatario**, no solo al correo de la cuenta.
- Usar un remitente propio, ej. `leads@zepaiagency.com`, en vez de `onboarding@resend.dev`.

Pasos (opcional, no necesario para el caso actual):
1. Resend → **Domains → Add Domain** → escribe tu dominio.
2. Resend te da unos registros **DNS (TXT/MX)**; los agregas donde administras tu dominio.
3. Cuando Resend confirme "Verified", cambia `RESEND_FROM` a `ZepaiMotors <leads@tudominio.com>` en Vercel y Redeploy.

---

## Notas
- **Límite del plan gratis:** 3,000 correos/mes y 100/día. Si algún día lo superas, ese lead igual queda guardado en Sheets (son destinos independientes, no dependen uno del otro).
- Esto es **adicional** a `GUARDAR-LEADS-SHEET.md` (hoja) e `INTEGRACION-LEADS.md` (llamada de Retell). Puedes activar los tres al mismo tiempo, o solo los que quieras: cada uno se activa con sus propias variables de entorno.
- Para probar en local, copia `.env.local.example` a `.env.local` y pon ahí `RESEND_API_KEY`.
