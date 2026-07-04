# Pendiente — resumen rápido

Estado actual y lo que falta para dejar 100% funcionando la captación de leads. Guías detalladas de cada punto están linkeadas abajo.

**Sitio:** https://zepai-motors.vercel.app · **Repo:** https://github.com/sonkyel/ZepaiMotors · **Vercel:** `zepai-agency-s-projects/zepai-motors`

---

## ✅ 1. Correo de leads (Resend) — COMPLETO

- [x] Código conectado, cuenta Resend, API Key en Vercel, destino `info@zepaiagency.com`.
- [x] Dominio `mail.zepaiagency.com` verificado en Resend (3 registros DNS agregados, Google Workspace de la raíz intacto).
- [x] `RESEND_FROM` = `ZepaiMotors <leads@mail.zepaiagency.com>` puesto en Vercel → Redeploy hecho.
- [x] Lead de prueba enviado a producción → API responde `{"ok":true,"forwarded":true}`.
- [x] Confirmado: el correo de prueba llegó a `info@zepaiagency.com` (cayó en spam la primera vez, normal para un dominio recién verificado; mejora con el tiempo).
- [ ] (Opcional, cosmético) Crear el template con la marca en resend.com/templates y poner su ID en `RESEND_TEMPLATE_ID`.

📄 Detalle completo: **`PENDIENTE-CORREO-RESEND.md`** y **`ENVIAR-CORREO-LEADS.md`**

---

## ✅ 2. Guardar leads en Google Sheets — COMPLETO

- [x] Apps Script desplegado en la hoja **"ZepaiMotors - Leads"** (token: `ZepaiAgency`).
- [x] `SHEETS_WEBAPP_URL` y `SHEETS_TOKEN` puestos en Vercel → Redeploy hecho.
- [x] Probado: lead de prueba enviado → confirmada fila nueva en la hoja.

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
