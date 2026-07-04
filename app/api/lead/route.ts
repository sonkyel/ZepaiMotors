import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  source?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  brandModel?: string;
  year?: string;
  mileage?: string;
  locale?: string;
  company?: string; // honeypot — must stay empty
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field. Silently accept and drop.
  if (str(body.company) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);

  // Minimum viable lead: a name plus at least one way to reach them.
  if (name === "" || (email === "" && phone === "")) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const lead = {
    source: str(body.source) || "contact",
    name,
    email,
    phone,
    message: str(body.message),
    brandModel: str(body.brandModel),
    year: str(body.year),
    mileage: str(body.mileage),
    locale: str(body.locale) || "es",
    createdAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? "",
  };

  const sheetsUrl = process.env.SHEETS_WEBAPP_URL;
  const sheetsToken = process.env.SHEETS_TOKEN ?? "";
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const resendTo = process.env.RESEND_TO_EMAIL || "jordan@consultingzepai.com";
  const resendFrom = process.env.RESEND_FROM || "ZepaiMotors <onboarding@resend.dev>";

  const post = (url: string, payload: unknown, extraHeaders?: Record<string, string>) =>
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...extraHeaders },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    }).then((r) => {
      if (!r.ok) throw new Error(`status_${r.status}`);
      return r;
    });

  // Send the lead to every configured destination in parallel so one failure
  // never loses the lead: Google Sheets (storage) + n8n (Retell call) + Resend (inbox alert).
  const targets: Promise<Response>[] = [];
  if (sheetsUrl) targets.push(post(sheetsUrl, { ...lead, token: sheetsToken }));
  if (n8nUrl) targets.push(post(n8nUrl, lead));
  if (resendKey) {
    const html = `
      <h2>Nuevo lead (${lead.source})</h2>
      <p><b>Nombre:</b> ${lead.name}</p>
      <p><b>Teléfono:</b> ${lead.phone}</p>
      <p><b>Email:</b> ${lead.email}</p>
      <p><b>Mensaje:</b> ${lead.message}</p>
      <p><b>Vehículo:</b> ${lead.brandModel} ${lead.year ? `(${lead.year})` : ""}</p>
      <p><b>Kilometraje:</b> ${lead.mileage}</p>
      <p><b>Idioma:</b> ${lead.locale}</p>
      <p><b>Fecha:</b> ${lead.createdAt}</p>
    `;
    targets.push(
      post(
        "https://api.resend.com/emails",
        {
          from: resendFrom,
          to: [resendTo],
          subject: `Nuevo lead (${lead.source}): ${lead.name}`,
          html,
        },
        { Authorization: `Bearer ${resendKey}` }
      )
    );
  }

  // Nothing configured yet (e.g. local without .env.local): don't break the form.
  if (targets.length === 0) {
    console.warn(
      "[lead] No destination configured (SHEETS_WEBAPP_URL / N8N_WEBHOOK_URL / RESEND_API_KEY):",
      lead
    );
    return NextResponse.json({ ok: true, forwarded: false });
  }

  const results = await Promise.allSettled(targets);
  const anyOk = results.some((r) => r.status === "fulfilled");
  if (!anyOk) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
