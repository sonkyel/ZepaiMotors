# Guardar los leads directo en Google Sheets (Apps Script)

Con esto, cada formulario enviado desde la web **agrega una fila** en la hoja **ZepaiMotors - Leads**, sin depender de n8n. Son ~3 minutos, una sola vez.

```
Formulario → /api/lead (web) → Apps Script (Web App) → agrega fila en la hoja
```

---

## Paso 1 — Pegar el script en la hoja
1. Abre la hoja: **https://docs.google.com/spreadsheets/d/1hDom_Ndv2Q-Hskz3a5UStacz2RL4YZE2CVWRY4h05z0/edit**
2. Menú **Extensiones → Apps Script**.
3. Borra lo que haya y pega **todo** este código:

```javascript
// Token secreto. Debe ser IGUAL al valor de SHEETS_TOKEN en Vercel.
// Cámbialo por uno tuyo (letras/números), pero que coincida en ambos lados.
const TOKEN = "zepai-2026-CAMBIA-ESTO";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Seguridad: rechaza si el token no coincide.
    if (String(data.token || "") !== TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(20000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    // Orden EXACTO de columnas de la hoja:
    // Fecha | Fuente | Nombre | Telefono | Email | Mensaje | Marca/Modelo | Ano | Km | Idioma
    sheet.appendRow([
      data.createdAt || new Date().toISOString(),
      data.source || "",
      data.name || "",
      data.phone || "",
      data.email || "",
      data.message || "",
      data.brandModel || "",
      data.year || "",
      data.mileage || "",
      data.locale || ""
    ]);

    lock.releaseLock();
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Cambia** el valor de `TOKEN` por uno tuyo (guárdalo, lo usarás en el Paso 3). Guarda el proyecto (icono de disquete).

---

## Paso 2 — Desplegar como App web
1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. En "Tipo", elige **Aplicación web** (Web app).
3. Configura:
   - **Descripción:** `Leads ZepaiMotors` (o lo que quieras).
   - **Ejecutar como:** *Yo* (tu cuenta).
   - **Quién tiene acceso:** **Cualquier persona** (Anyone).
4. **Implementar** → Google pedirá **autorizar**: acepta los permisos (es tu propio script sobre tu hoja).
5. Copia la **URL de la aplicación web** (termina en `/exec`). La necesitas en el Paso 3.

> Si luego editas el código, usa **Implementar → Gestionar implementaciones → editar (lápiz) → Nueva versión** para que los cambios tomen efecto en la misma URL.

---

## Paso 3 — Poner las variables en Vercel
1. En Vercel: tu proyecto → **Settings → Environment Variables**.
2. Agrega dos variables (entorno: Production, y Preview si quieres):
   - **`SHEETS_WEBAPP_URL`** = la URL `/exec` que copiaste.
   - **`SHEETS_TOKEN`** = el mismo texto que pusiste en `TOKEN` dentro del script.
3. **Redeploy** el proyecto (Deployments → ⋯ → Redeploy) para que tome las variables.

---

## Paso 4 — Probar
1. Abre tu sitio en producción, ve a **Contacto** y envía el formulario.
2. En segundos debe aparecer una **fila nueva** en la hoja `ZepaiMotors - Leads`.
3. Si no aparece: revisa que `SHEETS_TOKEN` (Vercel) y `TOKEN` (script) sean **idénticos**, y que hiciste **Redeploy**.

---

## Notas
- La URL del Web App queda del lado servidor (variable de entorno), nunca se ve en el navegador. El **token** evita que alguien más agregue filas.
- Este guardado es **independiente de n8n**. Si además quieres la **llamada de Retell.ai**, se configura aparte en n8n (ver `INTEGRACION-LEADS.md`); ambos pueden convivir.
- Para probar en local, copia `.env.local.example` a `.env.local` y pon ahí `SHEETS_WEBAPP_URL` y `SHEETS_TOKEN`.
