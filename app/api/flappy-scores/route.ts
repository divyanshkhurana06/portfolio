import { NextResponse } from "next/server";
import { createFlappyScore, getFlappyScores } from "@/lib/data";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeFlappyScoreInput } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Only the top five ever leave the server — the rest is nobody's business. */
const BOARD_SIZE = 5;

export async function GET() {
  try {
    const scores = await getFlappyScores(BOARD_SIZE);
    return NextResponse.json({ scores });
  } catch (error) {
    console.error("GET /api/flappy-scores", error);
    return NextResponse.json(
      { error: "Could not load the leaderboard." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  // A run takes a while to lose, so ten a minute is generous for a person
  // and still caps how fast a script can stuff the board.
  const limited = rateLimit(`flappy:${ip}`, 10, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Too many scores. Try again in ${limited.retryAfterSec}s.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = sanitizeFlappyScoreInput(body as Record<string, unknown>);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await createFlappyScore(parsed.data);
    // Hand back the new board so the client doesn't need a second round trip
    // to find out whether the score actually landed.
    const scores = await getFlappyScores(BOARD_SIZE);
    return NextResponse.json({ scores }, { status: 201 });
  } catch (error) {
    console.error("POST /api/flappy-scores", error);
    return NextResponse.json(
      { error: "Could not save your score." },
      { status: 500 }
    );
  }
}
