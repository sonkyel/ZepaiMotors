# Recibir un correo por cada lead (EmailJS)

Con esto, cada vez que alguien rellena el formulario de **Contacto** o **Vende tu auto**, te llega un **correo a info@zepaiagency.com** con los datos del cliente. Es independiente de Google Sheets y de n8n: pueden convivir los tres.

```
Formulario → /api/lead (web) → EmailJS → correo a info@zepaiagency.com
```

---

## Paso 1 — Crear el Email Service
1. Entra a **https://www.emailjs.com/** y crea una cuenta (o inicia sesión).
2. Panel izquierdo → **Email Services → Add New Service**.
3. Elige tu proveedor (ej. **Gmail**) y conecta la cuenta que quieres usar para **enviar** los correos (puede ser la misma `info@zepaiagency.com` u otra).
4. Guarda y copia el **Service ID** (ej. `service_abc1234`).

## Paso 2 — Crear el Template
1. Panel izquierdo → **Email Templates → Create New Template**.
2. En **To Email**, escribe: `info@zepaiagency.com` (así todos los leads llegan siempre ahí, sin importar quién los envió).
3. En **Subject**, por ejemplo:
   ```
   Nuevo lead ({{source}}): {{name}}
   ```
4. En el **Content** (cuerpo del correo), pega algo así:
   ```
   Nuevo cliente interesado desde la web.

   Fuente: {{source}}
   Nombre: {{name}}
   Teléfono: {{phone}}
   Email: {{email}}
   Mensaje: {{message}}

   Vehículo: {{brand_model}}
   Año: {{year}}
   Kilometraje: {{mileage}}

   Idioma: {{locale}}
   Fecha: {{created_at}}
   ```
   (Estos nombres entre llaves `{{...}}` deben quedar **exactamente así**, son las variables que la web va a rellenar.)
5. Guarda y copia el **Template ID** (ej. `template_xyz9876`).

## Paso 3 — Copiar tus claves
1. Panel izquierdo → **Account → General**.
2. Copia tu **Public Key**.
3. Baja a la sección de seguridad y copia tu **Private Key** (a veces está en **Account → Security**). Es necesaria para que EmailJS acepte el envío **desde el servidor** (no desde un navegador).

## Paso 4 — Poner las variables en Vercel
1. Vercel → tu proyecto → **Settings → Environment Variables**.
2. Agrega (entorno Production, y Preview si quieres):
   - **`EMAILJS_SERVICE_ID`** = el Service ID del Paso 1
   - **`EMAILJS_TEMPLATE_ID`** = el Template ID del Paso 2
   - **`EMAILJS_PUBLIC_KEY`** = tu Public Key
   - **`EMAILJS_PRIVATE_KEY`** = tu Private Key
3. **Redeploy** el proyecto para que tome las variables.

## Paso 5 — Probar
1. Envía el formulario de **Contacto** en tu sitio en producción.
2. En segundos debe llegar un correo a **info@zepaiagency.com** con los datos del cliente.
3. Si no llega: revisa que las 4 variables estén bien copiadas (sin espacios de más) y que hiciste **Redeploy**. También revisa la carpeta de spam la primera vez.

---

## Notas
- **Límite de envíos:** el plan gratis de EmailJS tiene un límite mensual de correos (revisa tu plan en emailjs.com). Si superas el límite, ese lead igual queda guardado en Sheets (son destinos independientes).
- Esto es **adicional** a `GUARDAR-LEADS-SHEET.md` (hoja) e `INTEGRACION-LEADS.md` (llamada de Retell). Puedes activar los tres al mismo tiempo, o solo los que quieras: cada uno se activa con sus propias variables de entorno.
- Para probar en local, copia `.env.local.example` a `.env.local` y pon ahí las 4 variables `EMAILJS_*`.
