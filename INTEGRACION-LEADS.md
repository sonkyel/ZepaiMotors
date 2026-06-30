# Leads del formulario → Google Sheets + llamada de Retell.ai (con n8n)

Cuando alguien rellena el formulario de **Contacto** o **Vende tu auto**, la web envía el lead a un **webhook de n8n**. Ahí tú decides qué hacer: en este caso, **guardar una fila en Google Sheets** y **disparar una llamada saliente de tu agente de Retell.ai** a tu teléfono con los datos del cliente.

```
Formulario  →  /api/lead (web en Vercel)  →  Webhook n8n  →  Google Sheets (fila)
                                                          →  Retell (llamada a tu teléfono)
```

La web solo necesita **una** variable secreta: `N8N_WEBHOOK_URL`. Las claves de Google y de Retell viven dentro de n8n.

---

## Qué datos envía la web a n8n
Un JSON con estos campos:

| Campo | Ejemplo | Notas |
|---|---|---|
| `source` | `contact` o `sell` | De qué formulario vino |
| `name` | `Juan Pérez` | |
| `email` | `juan@correo.com` | |
| `phone` | `+33 6 12 34 56 78` | |
| `message` | `Me interesa el SF90` | |
| `brandModel` | `Ferrari 296 GTB` | Solo en "Vende tu auto" |
| `year` | `2022` | Solo en "Vende tu auto" |
| `mileage` | `15000 km` | Solo en "Vende tu auto" |
| `locale` | `es` / `en` / `fr` | Idioma del visitante |
| `createdAt` | `2026-06-30T12:00:00.000Z` | Fecha/hora |

---

## Paso 1 — Crear el workflow en n8n

### Nodo 1: Webhook (disparador)
1. Nuevo Workflow → agregar nodo **Webhook**.
2. **HTTP Method:** `POST`.
3. **Respond:** `Immediately` (para que el formulario responda rápido).
4. Copia la **Production URL** (la usarás en el Paso 3). Para pruebas usa la **Test URL**.

### Nodo 2: Google Sheets → "Append Row"
1. Agregar nodo **Google Sheets**, operación **Append Row in Sheet**.
2. Conectar tu cuenta de Google (OAuth) y elegir el **documento** y la **pestaña**.
3. Crea en la hoja una primera fila de encabezados, por ejemplo:
   `Fecha | Fuente | Nombre | Teléfono | Email | Mensaje | Marca/Modelo | Año | Km | Idioma`
4. Mapea cada columna a los datos del webhook:
   - Fecha → `{{ $json.createdAt }}`
   - Fuente → `{{ $json.source }}`
   - Nombre → `{{ $json.name }}`
   - Teléfono → `{{ $json.phone }}`
   - Email → `{{ $json.email }}`
   - Mensaje → `{{ $json.message }}`
   - Marca/Modelo → `{{ $json.brandModel }}`
   - Año → `{{ $json.year }}`
   - Km → `{{ $json.mileage }}`
   - Idioma → `{{ $json.locale }}`

### Nodo 3: HTTP Request → Retell (crear llamada saliente)
1. Agregar nodo **HTTP Request**.
2. **Method:** `POST`
3. **URL:** `https://api.retellai.com/v2/create-phone-call`
4. **Headers:**
   - `Authorization`: `Bearer TU_RETELL_API_KEY`
   - `Content-Type`: `application/json`
5. **Body (JSON):**
   ```json
   {
     "from_number": "+1XXXXXXXXXX",
     "to_number": "+33XXXXXXXXX",
     "override_agent_id": "agent_xxxxxxxx",
     "retell_llm_dynamic_variables": {
       "cliente_nombre": "{{ $json.name }}",
       "cliente_telefono": "{{ $json.phone }}",
       "cliente_email": "{{ $json.email }}",
       "mensaje": "{{ $json.message }}",
       "fuente": "{{ $json.source }}",
       "vehiculo": "{{ $json.brandModel }}"
     }
   }
   ```
   - `from_number`: tu número **comprado en Retell** (formato internacional `+...`).
   - `to_number`: **tu teléfono**, al que quieres que te llame el agente.
   - `override_agent_id`: el ID de tu agente outbound. (Si tu número ya está asignado a ese agente en Retell, puedes omitir esta línea.)
6. **Activa** el workflow (toggle "Active" arriba a la derecha).

### Que el agente te informe del cliente
En el **prompt de tu agente** en Retell, usa las variables para que en la llamada te diga el lead. Ejemplo:

> "Hola, tienes un nuevo cliente desde la web. Nombre: {{cliente_nombre}}. Teléfono: {{cliente_telefono}}. Interés: {{vehiculo}} {{mensaje}}. Vino del formulario de {{fuente}}."

---

## Paso 2 — Probar en local (opcional)
1. Copia `.env.local.example` a **`.env.local`** y pon la **Test URL** del webhook:
   ```
   N8N_WEBHOOK_URL=https://tu-n8n/webhook-test/xxxx
   ```
2. En n8n pulsa **"Listen for test event"**, arranca la web (`npm run dev`) y envía el formulario de Contacto.
3. Deberías ver: la ejecución en n8n, una fila nueva en Google Sheets y la llamada de Retell.

---

## Paso 3 — Activar en producción (Vercel)
1. En Vercel: **Project → Settings → Environment Variables**.
2. Agrega:
   - **Name:** `N8N_WEBHOOK_URL`
   - **Value:** la **Production URL** del webhook de n8n
   - Entornos: Production (y Preview si quieres).
3. **Redeploy** el proyecto (Deployments → ⋯ → Redeploy) para que tome la variable.
4. Rellena el formulario en la URL pública → fila en Sheets + llamada a tu teléfono en segundos.

---

## Notas importantes
- **Costo:** cada lead dispara una llamada de Retell (tiene costo). El formulario ya incluye un *honeypot* anti-bots para reducir spam.
- **Teléfonos:** siempre en formato internacional E.164 (ej. `+33612345678`).
- **Seguridad:** la API key de Retell y la cuenta de Google quedan dentro de n8n; en la web solo está la URL del webhook (como variable de entorno, no en el código).
- **Si n8n está apagado o falla**, el formulario mostrará un mensaje de error en vez de "enviado".
