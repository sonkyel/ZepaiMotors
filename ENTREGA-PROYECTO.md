# Entrega del proyecto — ZepaiMotors

Documento de traspaso para el trabajador que continuará el proyecto. Explica **qué está hecho**, **qué falta** para terminar la automatización de leads, y **cómo dar acceso** a otra persona.

---

## 1. Resumen y arquitectura

Sitio web de concesionaria de autos de lujo (Next.js 15, App Router, trilingüe ES/EN/FR), desplegado en Vercel y con el código en GitHub.

Objetivo de la automatización: cuando un cliente rellena un formulario, guardar el lead en Google Sheets y disparar una llamada saliente del agente de Retell.ai al teléfono del dueño, informándole del cliente.

```
Formulario (Contacto / Vende tu auto)
        │  POST
        ▼
/api/lead  (función en Vercel — ya hecha)
        │  reenvía JSON
        ▼
Webhook de n8n   ──►  Google Sheets (agregar fila)
                 └─►  Retell.ai (llamada saliente al dueño)
```

### Ya está LISTO (no hay que tocar)
- Web completa y desplegada en Vercel (auto-deploy en cada push a `main`).
- Repositorio: **https://github.com/sonkyel/ZepaiMotors**
- Captación de leads en el código:
  - `app/api/lead/route.ts` — recibe el formulario, valida, filtra bots (honeypot) y reenvía a la variable `N8N_WEBHOOK_URL`.
  - `components/views/ContactView.tsx` y `components/views/SellView.tsx` — formularios ya conectados a `/api/lead`.
- Google Sheet creada con columnas listas (ver sección 5).
- Guía detallada nodo por nodo: **`INTEGRACION-LEADS.md`**.

### FALTA (esto es lo que se delega) → ver sección 2.

---

## 2. Checklist: lo que falta para que funcione

> Guía paso a paso completa en **`INTEGRACION-LEADS.md`**. Aquí va el resumen accionable.

- [ ] **n8n — crear el workflow** (3 nodos) y **activarlo**:
  - [ ] **Webhook** (HTTP Method `POST`, Respond `Immediately`). Copiar su **Production URL**.
  - [ ] **Google Sheets → Append Row**: conectar la cuenta de Google, elegir la hoja `ZepaiMotors - Leads` (ID en sección 5), pestaña `Hoja 1`, y mapear columnas con `{{ $json.name }}`, `{{ $json.phone }}`, etc.
  - [ ] **HTTP Request → Retell** (`POST https://api.retellai.com/v2/create-phone-call`):
    - Header `Authorization: Bearer <RETELL_API_KEY>`
    - Body con `from_number` (número Retell), `to_number` (teléfono del dueño), `override_agent_id`, y `retell_llm_dynamic_variables` (nombre, teléfono, email, mensaje, vehículo del cliente).
- [ ] **Retell — prompt del agente**: usar las variables `{{cliente_nombre}}`, `{{cliente_telefono}}`, `{{vehiculo}}`, `{{mensaje}}` para que en la llamada informe del lead.
- [ ] **Vercel — variable de entorno**: en Project → Settings → Environment Variables, agregar `N8N_WEBHOOK_URL` = la Production URL del webhook → **Redeploy**.
- [ ] **Probar end-to-end**: enviar el formulario de Contacto en la web pública → debe aparecer una fila en la hoja y llegar la llamada al teléfono en segundos.

---

## 3. Datos y accesos que necesita el trabajador

Pedir al dueño (NO van escritos en este repo, son sensibles):

| Dato / acceso | Para qué |
|---|---|
| **Retell API key** | Header de autorización del nodo HTTP en n8n |
| **Retell agent_id** (outbound) | Identificar el agente que llama |
| **Número Retell** (`from`, formato `+...`) | Número desde el que sale la llamada |
| **Teléfono del dueño** (`to`, formato `+...`) | A dónde debe llamar el agente |
| **Acceso a n8n** | Crear/activar el workflow |
| **Acceso a Vercel** (proyecto) | Poner la variable de entorno y redeploy |
| **Acceso a GitHub** (repo) | Editar el código si hace falta |
| **Acceso a la Google Sheet** | Ver/ajustar columnas |

> Teléfonos siempre en formato internacional E.164, ej. `+33612345678`.

---

## 4. Cómo compartir el proyecto con otro trabajador

Sí se puede, por cada plataforma:

- **GitHub (código):** repo → **Settings → Collaborators → Add people** → su usuario de GitHub, rol **Write**. Él acepta la invitación por correo. (Si no es técnico, puede editar archivos directo en github.com con el botón del lápiz.)
- **Vercel (deploy y variables):** Dashboard del proyecto → **Settings → Members** (o invitar al Team) → su correo. Así puede gestionar `N8N_WEBHOOK_URL` y ver los despliegues.
- **n8n (automatización):** darle acceso a la instancia de n8n / al workflow (en n8n Cloud: invitar miembro o compartir el workflow).
- **Google Sheet (leads):** abrir la hoja → botón **Compartir** → agregar su correo como **Editor** (o Lector).
- **Retell:** la API key es **muy sensible**. Mejor que el dueño la pegue él mismo en n8n, o agregar al trabajador como miembro del equipo en Retell en lugar de pasarle la key suelta.

**Seguridad (importante):**
- **Nunca** poner claves/API keys en el código ni en este repositorio.
- Las claves van **solo** dentro de n8n (Retell, Google) y en variables de entorno de Vercel (`N8N_WEBHOOK_URL`).
- Compartir credenciales por un canal seguro (gestor de contraseñas), no por chat público.

---

## 5. Referencias rápidas

- **Repositorio:** https://github.com/sonkyel/ZepaiMotors
- **Google Sheet (leads):** https://docs.google.com/spreadsheets/d/1hDom_Ndv2Q-Hskz3a5UStacz2RL4YZE2CVWRY4h05z0/edit
  - Cuenta dueña: `info@zepaiagency.com`
  - Columnas: `Fecha | Fuente | Nombre | Telefono | Email | Mensaje | Marca/Modelo | Ano | Km | Idioma`
- **Variable de entorno (Vercel):** `N8N_WEBHOOK_URL`
- **Endpoint del sitio:** `POST /api/lead`
- **Guías en el repo:** `INTEGRACION-LEADS.md` (automatización), `EDITAR.md` (editar textos/precios), `README.md` (correr el proyecto).

### Forma del JSON que la web envía al webhook de n8n
```json
{
  "source": "contact",            // o "sell"
  "name": "Juan Pérez",
  "email": "juan@correo.com",
  "phone": "+33 6 12 34 56 78",
  "message": "Me interesa el SF90",
  "brandModel": "Ferrari 296 GTB", // solo en "sell"
  "year": "2022",                  // solo en "sell"
  "mileage": "15000 km",           // solo en "sell"
  "locale": "es",
  "createdAt": "2026-06-30T12:00:00.000Z"
}
```

---

## 6. Notas
- **Costo:** cada lead dispara una llamada de Retell (tiene costo). El formulario incluye un *honeypot* anti-bots; si llega spam, conviene añadir un límite por IP más adelante.
- Si el webhook de n8n está apagado o falla, el formulario muestra error (no "enviado"), así no se pierden leads silenciosamente.
