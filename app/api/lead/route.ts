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

  const webhook = process.env.N8N_WEBHOOK_URL;

  // No webhook configured yet (e.g. local without .env.local): don't break the
  // form, just log so the developer knows the lead was not forwarded.
  if (!webhook) {
    console.warn("[lead] N8N_WEBHOOK_URL not set — lead not forwarded:", lead);
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      // Keep the form snappy; n8n webhook should "Respond Immediately".
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "webhook_failed" }, { status: 502 });
    }
  } catch {
    return NextResponse.json({ ok: false, error: "webhook_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, forwarded: true });
}
