# Recibir un correo por cada lead (Resend)

Con esto, cada vez que alguien rellena el formulario de **Contacto** o **Vende tu auto**, te llega un **correo a jordan@consultingzepai.com** con los datos del cliente. Es independiente de Google Sheets y de n8n: pueden convivir los tres.

```
Formulario → /api/lead (web) → Resend → correo a jordan@consultingzepai.com
```

Usamos **Resend** (no EmailJS) porque tiene un plan gratis mucho más amplio (3,000 correos/mes) y está pensado justo para esto: enviar correos desde el servidor de una web.

---

> **Actualización importante:** Resend cambió su política. Ya **no** basta con registrarse con `info@zepaiagency.com`: **hace falta verificar un dominio propio** para que los correos se entreguen de verdad (sin esto, la API responde "OK" pero el correo nunca llega). Ver el estado exacto y los pasos pendientes en **`PENDIENTE-CORREO-RESEND.md`**.

## Paso 1 — Crear la cuenta
1. Entra a **https://resend.com/signup** y regístrate (ideal con `info@zepaiagency.com`).

## Paso 2 — Obtener la API Key
1. Dentro de Resend: **API Keys → Create API Key**.
2. Ponle un nombre (ej. `zepaimotors-web`) y permisos de **Sending access**.
3. Copia la key (empieza con `re_...`). **Solo se muestra una vez**, guárdala.

## Paso 3 — Poner la variable en Vercel
1. Vercel → tu proyecto → **Settings → Environment Variables**.
2. Agrega (entorno Production, y Preview si quieres):
   - **`RESEND_API_KEY`** = la key `re_...` del Paso 2.
   - (Opcional) **`RESEND_TO_EMAIL`** = `jordan@consultingzepai.com` (si no la pones, ya usa ese valor por defecto).
3. **Redeploy** el proyecto para que tome la variable.

## Paso 4 — Verificar un dominio (OBLIGATORIO para que se entregue el correo)
Sin este paso, Resend acepta la petición pero **no entrega** el correo.

⚠️ **Importante si el dominio ya tiene correo real (Google Workspace/Outlook):** NO verifiques el dominio raíz (ej. `zepaiagency.com`) directamente, porque el registro SPF/MX de Resend puede chocar con el que ya usas para recibir correo real y **dejarías de recibir correos en ese dominio**. En ese caso, verifica un **subdominio dedicado** (ej. `mail.zepaiagency.com`), que no toca nada de lo que ya existe en la raíz.

1. Resend → **Domains → Add Domain** → escribe el dominio (o subdominio) a verificar.
2. Resend muestra una tabla de registros **DNS** (normalmente MX + TXT para SPF/DKIM, a veces DMARC).
3. Agrega esos registros donde administras el DNS de ese dominio (si está en Vercel, puede hacerse por `vercel dns add` o desde el dashboard: proyecto → Domains → DNS Records).
4. Espera a que Resend marque el dominio como **"Verified"** (minutos a horas).
5. En Vercel, agrega/edita **`RESEND_FROM`** = `ZepaiMotors <leads@tudominio-verificado.com>` → **Redeploy**.

## Paso 5 — (Opcional) Crear un template con la marca ZepaiMotors
Por defecto, el código ya genera un correo HTML simple sin necesidad de nada más. Si prefieres diseñar el correo visualmente desde el dashboard de Resend:

1. Entra a **https://resend.com/templates → Create template**.
2. Configura:
   - **Subject:** `Nuevo lead ({{{LEAD_SOURCE}}}): {{{LEAD_NAME}}}`
   - **Contenido (HTML)**, con los colores de la marca (rojo `#e11122`, fondo oscuro `#0b0b0d`):
     ```html
     <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
       <div style="background:#0b0b0d; padding: 20px; text-align:center;">
         <span style="color:#f5f4f2; font-size:20px; font-weight:bold; letter-spacing:1px;">ZEPAIMOTORS</span>
         <span style="color:#e11122;"> ●</span>
       </div>
       <div style="padding: 24px; border: 1px solid #eee;">
         <h2 style="color:#e11122; margin-top:0;">Nuevo lead ({{{LEAD_SOURCE}}})</h2>
         <p><b>Nombre:</b> {{{LEAD_NAME}}}</p>
         <p><b>Teléfono:</b> {{{LEAD_PHONE}}}</p>
         <p><b>Email:</b> {{{LEAD_EMAIL}}}</p>
         <p><b>Mensaje:</b> {{{LEAD_MESSAGE}}}</p>
         <p><b>Vehículo:</b> {{{LEAD_BRAND_MODEL}}} ({{{LEAD_YEAR}}})</p>
         <p><b>Kilometraje:</b> {{{LEAD_MILEAGE}}}</p>
         <p style="color:#888; font-size:12px;">Idioma: {{{LEAD_LOCALE}}} · {{{LEAD_CREATED_AT}}}</p>
       </div>
     </div>
     ```
   - Las variables usan **triple llave** `{{{ }}}` (no doble). Deben llamarse **exactamente así** (`LEAD_SOURCE`, `LEAD_NAME`, etc.), porque son las que manda el código.
3. Botón **"Publish"** (mientras esté en borrador, no se puede usar).
4. Copia el **Template ID**.
5. En Vercel, agrega **`RESEND_TEMPLATE_ID`** = ese ID → **Redeploy**. A partir de ahí, el correo usará el diseño del template en vez del HTML simple.

## Paso 6 — Probar
1. Envía el formulario de **Contacto** en tu sitio en producción.
2. En segundos debe llegar un correo a **jordan@consultingzepai.com** (o el que pongas en `RESEND_TO_EMAIL`) con: fuente, nombre, teléfono, email, mensaje, vehículo, año, kilometraje, idioma y fecha.
3. Revisa también la carpeta de **spam** la primera vez.

---

## Notas
- **Límite del plan gratis:** 3,000 correos/mes y 100/día. Si algún día lo superas, ese lead igual queda guardado en Sheets (son destinos independientes, no dependen uno del otro).
- Esto es **adicional** a `GUARDAR-LEADS-SHEET.md` (hoja) e `INTEGRACION-LEADS.md` (llamada de Retell). Puedes activar los tres al mismo tiempo, o solo los que quieras: cada uno se activa con sus propias variables de entorno.
- Para probar en local, copia `.env.local.example` a `.env.local` y pon ahí `RESEND_API_KEY`.
