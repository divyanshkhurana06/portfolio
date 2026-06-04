import { NextResponse } from "next/server";
import {
  createEndorsement,
  getEndorsements,
} from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeEndorsementInput } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET() {
  try {
    const endorsements = await getEndorsements();
    return NextResponse.json({ endorsements });
  } catch (error) {
    console.error("GET /api/endorsements", error);
    return NextResponse.json(
      { error: "Could not load endorsements." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`endorse:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many submissions. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = sanitizeEndorsementInput(
    body as Record<string, unknown>
  );
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const endorsement = await createEndorsement(parsed.data);
    return NextResponse.json({ endorsement }, { status: 201 });
  } catch (error) {
    console.error("POST /api/endorsements", error);
    return NextResponse.json(
      { error: "Could not save your endorsement." },
      { status: 500 }
    );
  }
}
