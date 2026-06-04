import { NextResponse } from "next/server";
import {
  clearWhiteboard,
  createWhiteboardStroke,
  getWhiteboardStrokes,
} from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeStrokeInput } from "@/lib/validation";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const since = new URL(request.url).searchParams.get("since") ?? undefined;

  try {
    const strokes = await getWhiteboardStrokes(since);
    return NextResponse.json({ strokes });
  } catch (error) {
    console.error("GET /api/whiteboard/strokes", error);
    return NextResponse.json(
      { error: "Could not load the whiteboard." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`stroke:${ip}`, 120, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Drawing too fast. Slow down a moment." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = sanitizeStrokeInput(body as Record<string, unknown>);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    const stroke = await createWhiteboardStroke(parsed.data);
    return NextResponse.json({ stroke }, { status: 201 });
  } catch (error) {
    console.error("POST /api/whiteboard/strokes", error);
    return NextResponse.json(
      { error: "Could not save your mark." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Clear is not configured." },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    await clearWhiteboard();
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/whiteboard/strokes", error);
    return NextResponse.json(
      { error: "Could not clear the whiteboard." },
      { status: 500 }
    );
  }
}
