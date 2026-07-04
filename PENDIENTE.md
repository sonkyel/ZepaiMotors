# Pendiente — resumen rápido

Estado actual y lo que falta para dejar 100% funcionando la captación de leads. Guías detalladas de cada punto están linkeadas abajo.

**Sitio:** https://zepai-motors.vercel.app · **Repo:** https://github.com/sonkyel/ZepaiMotors · **Vercel:** `zepai-agency-s-projects/zepai-motors`

---

## 🔴 1. Correo de leads (Resend) — a medio terminar, es lo más urgente

**Ya hecho:**
- [x] Código conectado (`/api/lead` ya manda cada lead a Resend).
- [x] Cuenta Resend + API Key guardada en Vercel (`RESEND_API_KEY`).
- [x] Destino configurado: `jordan@consultingzepai.com` (`RESEND_TO_EMAIL`).
- [x] Soporte de template de marca (opcional, `RESEND_TEMPLATE_ID`).

**Falta (esto es lo que bloquea que llegue el correo de verdad):**
- [ ] Verificar el dominio **`mail.zepaiagency.com`** en Resend (Domains → Add Domain).
  - ⚠️ NO usar `zepaiagency.com` a secas — esa raíz ya tiene Google Workspace real (Gmail), y agregar el SPF/MX de Resend ahí rompería la recepción de correo del negocio. Por eso se usa el subdominio `mail.zepaiagency.com`, que no toca nada existente.
  - Resend da unos registros DNS → agregarlos (el dominio está en Vercel, se puede hacer por `vercel dns add` o desde Vercel → Domains → DNS Records).
- [ ] Cuando diga "Verified": poner `RESEND_FROM = ZepaiMotors <leads@mail.zepaiagency.com>` en Vercel → Redeploy.
- [ ] Probar: enviar el formulario de Contacto → confirmar que llega el correo a `jordan@consultingzepai.com`.
- [ ] (Opcional) Crear el template con la marca en resend.com/templates y poner su ID en `RESEND_TEMPLATE_ID`.

📄 Detalle completo: **`PENDIENTE-CORREO-RESEND.md`** y **`ENVIAR-CORREO-LEADS.md`**

---

## 🟡 2. Guardar leads en Google Sheets — no iniciado

**Falta:**
- [ ] Pegar y desplegar el Apps Script en la hoja **"ZepaiMotors - Leads"**.
- [ ] Poner `SHEETS_WEBAPP_URL` y `SHEETS_TOKEN` en Vercel → Redeploy.
- [ ] Probar: enviar el formulario → aparece fila nueva en la hoja.

📄 Detalle completo: **`GUARDAR-LEADS-SHEET.md`**

---

## 🟢 3. Llamada de Retell.ai vía n8n — opcional, no iniciado

**Falta (solo si se quiere esta parte):**
- [ ] Crear el workflow en n8n (Webhook → Google Sheets → HTTP a Retell).
- [ ] Poner `N8N_WEBHOOK_URL` en Vercel → Redeploy.

📄 Detalle completo: **`INTEGRACION-LEADS.md`**

---

## Notas para quien continúe
- Todas las claves/tokens van **solo** en variables de entorno de Vercel (Settings → Environment Variables), nunca en el código ni en el repo.
- Las 3 integraciones son **independientes**: se puede activar una, dos o las tres; ninguna depende de que las otras estén listas.
- Documento completo de entrega (accesos, contexto general): **`ENTREGA-PROYECTO.md`**
