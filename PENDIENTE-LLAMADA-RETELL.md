# Pendiente: llamada de Retell.ai avisando al dueño de cada lead

Documento de traspaso para que otra persona (socio/trabajador) termine esta tarea puntual. Léelo completo antes de tocar nada en n8n.

## Objetivo
Cuando alguien rellena el formulario del sitio **ZepaiMotors** (Contacto o Vende tu auto), el agente de **Retell.ai debe llamar al dueño** (no al cliente) para avisarle en vivo de los datos del lead.

## Qué ya está funcionando (no tocar)
- **Correo por cada lead (Resend):** funcionando, llega a `info@zepaiagency.com`.
- **Guardado en Google Sheets:** funcionando, vía Apps Script directo (sin n8n).
- **Código del sitio:** `app/api/lead/route.ts` ya reenvía cada lead a `process.env.N8N_WEBHOOK_URL` **si esa variable existe**, en paralelo con Sheets/Resend (si n8n falla, los otros dos igual funcionan). **No requiere ningún cambio de código** — solo falta crear el workflow en n8n y darme la URL para configurar la variable.

## ⚠️ Hallazgo importante: hay un workflow existente que NO sirve para esto (no tocar)

Ya existe en n8n un workflow llamado **"zepaimotors-postcall"** (webhook path `zepaimotors-postcall`). Se analizó su estructura completa:

```
Webhook Retell (evento call_analyzed)
   → Filtro: solo pasa si el evento es "call_analyzed"
   → Code: extrae body.call.call_analysis.custom_analysis_data (tipo de auto, presupuesto, km máximos, marcas, forma de pago, plazo, modelo de interés, si quiere prueba de manejo, horario de contacto, clasificación, resumen...)
   → Google Sheets: guarda esos datos analizados
```

Esto es la **mitad "después de la llamada"** de un sistema distinto: es el webhook que **Retell llama a n8n** después de analizar una conversación (probablemente para cuando Retell llama o recibe llamadas de clientes directamente, en otro flujo). **No es un punto de entrada para que el sitio web dispare una llamada.**

**Por qué no se puede reutilizar:** si el formulario del sitio se conectara a ese webhook, el filtro `call_analyzed` descartaría todo (nuestro payload no tiene ese campo), y aunque pasara, el nodo Code espera una estructura de datos de Retell que nuestro sitio no envía. Resultado: no pasaría nada, o se guardarían filas vacías/con errores.

**Conclusión: se necesita un workflow NUEVO y separado.** "zepaimotors-postcall" se deja intacto, sin modificar, por si se usa para otro propósito.

---

## Lo que falta hacer

### 1. Crear el workflow nuevo en n8n
1. En **https://zecuenin.app.n8n.cloud/home/workflows** → **"Add workflow"** (uno nuevo, no editar el existente).
2. Nombrarlo, por ejemplo: **"ZepaiMotors - Aviso de lead"**.
3. Agregar un nodo **Webhook**:
   - Method: `POST`
   - Path: `zepaimotors-lead-alert` (distinto al ya usado, `zepaimotors-postcall`)
   - Respond: **"Immediately"**
4. Conectar un nodo **HTTP Request** después del Webhook:
   - Method: `POST`
   - URL: `https://api.retellai.com/v2/create-phone-call`
   - Authentication: Header Auth → Header name `Authorization`, value `Bearer <API_KEY_DE_RETELL>`
   - Body (JSON), reemplazando los placeholders con los datos reales de Retell:
     ```json
     {
       "from_number": "<NUMERO_RETELL>",
       "to_number": "<TELEFONO_DEL_DUENO>",
       "override_agent_id": "<AGENT_ID>",
       "retell_llm_dynamic_variables": {
         "cliente_nombre": "={{ $json.name }}",
         "cliente_telefono": "={{ $json.phone }}",
         "vehiculo": "={{ $json.brandModel }}",
         "mensaje": "={{ $json.message }}",
         "fuente": "={{ $json.source }}"
       }
     }
     ```
   - `from_number`: número de Retell comprado (formato `+...`).
   - `to_number`: el teléfono del dueño, a donde debe sonar la llamada (formato `+...`).
   - `override_agent_id`: el ID del agente de Retell que hará esta llamada de aviso (puede omitirse si el número ya tiene un agente asignado por defecto).
   - En el **prompt de ese agente**, usar las variables `{{cliente_nombre}}`, `{{cliente_telefono}}`, `{{vehiculo}}`, `{{mensaje}}`, `{{fuente}}` para que en la llamada informe del lead.
5. **Guardar** el workflow.
6. **Activar** el workflow (toggle "Active" arriba a la derecha) — si no está activo, el webhook no responde.
7. Hacer clic en el nodo **Webhook** → copiar la **"Production URL"** (no la de "Test").

### 2. Conectar la URL al sitio (yo lo hago, o quien tenga acceso a Vercel)
1. En Vercel → proyecto `zepai-agency-s-projects/zepai-motors` → **Settings → Environment Variables**.
2. Agregar `N8N_WEBHOOK_URL` = la Production URL copiada arriba.
3. **Redeploy** el proyecto.

### 3. Probar
1. Enviar el formulario de Contacto en https://zepai-motors.vercel.app/contacto.
2. Confirmar que la API responde `{"ok":true,"forwarded":true}`.
3. Confirmar que **suena la llamada en el teléfono del dueño**, con los datos del cliente mencionados correctamente por el agente.

---

## Datos y accesos necesarios
| Dato | Para qué | Dónde se usa |
|---|---|---|
| API key de Retell | Autenticar la llamada al API | Header del nodo HTTP en n8n (pegar directo ahí, no compartir por chat) |
| Número de Retell (`from_number`) | Desde dónde sale la llamada | Body del nodo HTTP |
| Teléfono del dueño (`to_number`) | A dónde suena la llamada | Body del nodo HTTP |
| Agent ID de Retell | Qué agente hace la llamada | Body del nodo HTTP (`override_agent_id`) |
| Acceso a n8n (`zecuenin.app.n8n.cloud`) | Crear/activar el workflow | — |
| Acceso a Vercel (proyecto `zepai-motors`) | Poner `N8N_WEBHOOK_URL` y redeploy | — |

**Seguridad:** la API key de Retell se pega directo en el nodo de n8n, nunca por chat ni en el repositorio. Los teléfonos van en formato internacional E.164 (`+33...`, `+1...`, etc.).

## Referencias
- Repositorio: https://github.com/sonkyel/ZepaiMotors
- Guía general (versión previa, con Sheets incluido en n8n — ya no aplica porque Sheets se guarda directo): `INTEGRACION-LEADS.md`
- Resumen general de todo lo pendiente del proyecto: `PENDIENTE.md`
- Endpoint del sitio: `POST /api/lead` (ver `app/api/lead/route.ts` — no requiere cambios)
