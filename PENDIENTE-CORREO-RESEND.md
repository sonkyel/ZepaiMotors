# Pendiente: terminar la notificación por correo (Resend)

Documento de traspaso para continuar **exactamente** donde se quedó esta tarea. Léelo antes de tocar nada del dominio o de Resend.

## Objetivo
Que cada vez que alguien rellene el formulario del sitio **ZepaiMotors** (Contacto o Vende tu auto), llegue un **correo a `jordan@consultingzepai.com`** con los datos del cliente.

> Nota: el destino se cambió de `info@zepaiagency.com` a `jordan@consultingzepai.com`. Esto **no requiere verificar ningún dominio adicional**: en Resend, la verificación de dominio es solo del lado del **remitente** (de dónde sale el correo), no del destinatario. `jordan@consultingzepai.com` puede recibir sin tocar su DNS ni lo que tengan configurado en Smartlead.ai.

---

## Qué ya está hecho ✅
- [x] **Código:** `app/api/lead/route.ts` ya envía cada lead a Resend (en paralelo con Google Sheets y n8n, que son otras integraciones independientes). No hace falta tocar código.
- [x] **Cuenta de Resend** creada con el correo `info@zepaiagency.com`.
- [x] **API Key de Resend** creada y guardada en **Vercel** como variable `RESEND_API_KEY` (entorno Production), marcada como *Sensitive* (ya no se puede volver a ver en texto plano; si se pierde, hay que generar una nueva en Resend y pegarla de nuevo en Vercel).
- [x] Proyecto local enlazado a Vercel (`vercel link`): **zepai-agency-s-projects / zepai-motors**.
- [x] **Probado en producción:** un POST a `https://zepai-motors.vercel.app/api/lead` responde `{"ok":true,"forwarded":true}` → Resend **acepta** la petición correctamente.
- [ ] ❌ **Pero el correo NO llega.** Causa encontrada: Resend ahora **exige verificar un dominio propio** para entregar correos de verdad. Sin eso, la API responde bien pero el envío real nunca se completa.

---

## ⚠️ Punto crítico antes de continuar: el dominio ya tiene correo real

El dominio **`zepaiagency.com`** está registrado dentro de Vercel (cuenta `patricksoto987-9096`, team `zepai-agency-s-projects`), y ya tiene configurado **Google Workspace real**:

| Registro DNS actual | Valor |
|---|---|
| MX | `1 smtp.google.com.` |
| TXT (SPF) | `v=spf1 include:_spf.google.com ~all` |
| TXT (DKIM) | `google._domainkey` → clave de Google |
| TXT (DMARC) | `_dmarc` → `v=DMARC1; p=none; rua=mailto:hola@zepaiagency.com` |

Es decir: **`info@zepaiagency.com` y `hola@zepaiagency.com` reciben correo real hoy por Gmail.**

### 🚫 NO verificar Resend sobre `zepaiagency.com` (la raíz)
Si se agrega el SPF de Resend en la raíz, **se duplicaría el registro SPF** (solo puede haber uno por dominio, rompería la validación de ambos). Si Resend pide un MX en la raíz, **chocaría con el de Gmail** y se perdería la recepción de correo real del negocio.

### ✅ Decisión tomada: usar un subdominio dedicado
Verificar **`mail.zepaiagency.com`** (subdominio) en vez de la raíz. Ventajas:
- No toca ningún registro existente (Google Workspace queda intacto).
- El remitente de los leads quedará como `ZepaiMotors <leads@mail.zepaiagency.com>`.
- El **destino** de los avisos es `jordan@consultingzepai.com` (ya configurado en el código y en Vercel como `RESEND_TO_EMAIL`); esto es independiente de qué dominio se verifique como remitente.

---

## Pasos que faltan (en orden)

1. **Entrar a https://resend.com/domains → Add Domain**
   - Escribir exactamente: **`mail.zepaiagency.com`** (NO `zepaiagency.com` a secas).
2. Resend mostrará una tabla de registros DNS a agregar (normalmente 1 **MX** + 2-3 **TXT** para DKIM/SPF, a veces un **DMARC**). Copiar esa tabla completa (no son datos secretos, se pueden compartir sin problema).
3. **Agregar esos registros al DNS de `zepaiagency.com`** (el subdominio se define dentro de la misma zona):
   - Por CLI (si tienes acceso a la cuenta de Vercel): `vercel dns add zepaiagency.com <name> <type> <value>`, donde `<name>` debe quedar bajo `mail` (ej. `mail` o `resend._domainkey.mail`, según lo que pida Resend exactamente).
   - O desde el dashboard: Vercel → proyecto → **Domains → zepaiagency.com → DNS Records → Add**.
4. Volver a Resend y esperar/pulsar **"Verify"** (puede tardar minutos u horas en propagar).
5. Cuando el dominio diga **"Verified"**:
   - En Vercel → **Settings → Environment Variables**, crear/editar **`RESEND_FROM`** = `ZepaiMotors <leads@mail.zepaiagency.com>`
   - **Redeploy** el proyecto.
6. **Probar de verdad:** enviar el formulario de Contacto en https://zepai-motors.vercel.app/contacto y confirmar que esta vez **sí llega** el correo a `jordan@consultingzepai.com` (revisar también la carpeta de spam).

---

## Dónde está todo
- **Repositorio:** https://github.com/sonkyel/ZepaiMotors
- **Proyecto en Vercel:** `zepai-agency-s-projects/zepai-motors` → https://zepai-motors.vercel.app
- **Guía general de este correo:** `ENVIAR-CORREO-LEADS.md` (ya actualizada con esta misma advertencia del subdominio)
- **Guardado en Google Sheets** (pendiente, tarea separada): `GUARDAR-LEADS-SHEET.md`
- **Llamada de Retell.ai vía n8n** (pendiente, opcional): `INTEGRACION-LEADS.md`
- **Documento general de entrega del proyecto:** `ENTREGA-PROYECTO.md`

## Notas de seguridad
- La API Key de Resend ya está guardada en Vercel; no hace falta volver a pegarla salvo que se pierda/rote.
- Nunca poner claves ni tokens dentro del código o del repositorio; todo va en variables de entorno de Vercel.
