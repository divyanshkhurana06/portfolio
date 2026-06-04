const LIMITS = {
  name: 80,
  relation: 120,
  body: 1000,
} as const;

export function sanitizeEndorsementInput(raw: {
  name?: unknown;
  relation?: unknown;
  body?: unknown;
  website?: unknown;
}) {
  // Honeypot — bots fill hidden fields; humans leave them empty.
  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return { ok: false as const, error: "Invalid submission." };
  }

  const name = trimString(raw.name, LIMITS.name);
  const relation = trimString(raw.relation, LIMITS.relation);
  const body = trimString(raw.body, LIMITS.body);

  if (!name || name.length < 2) {
    return { ok: false as const, error: "Please enter your name." };
  }
  if (!relation || relation.length < 2) {
    return {
      ok: false as const,
      error: "Please say how we worked together.",
    };
  }
  if (!body || body.length < 10) {
    return {
      ok: false as const,
      error: "Your endorsement needs at least a sentence or two.",
    };
  }

  return { ok: true as const, data: { name, relation, body } };
}

export function sanitizeStrokeInput(raw: {
  x1?: unknown;
  y1?: unknown;
  x2?: unknown;
  y2?: unknown;
  color?: unknown;
  width?: unknown;
}) {
  const x1 = num(raw.x1);
  const y1 = num(raw.y1);
  const x2 = num(raw.x2);
  const y2 = num(raw.y2);
  const width = num(raw.width) ?? 2;

  if (
    x1 === null ||
    y1 === null ||
    x2 === null ||
    y2 === null ||
    !inUnit(x1) ||
    !inUnit(y1) ||
    !inUnit(x2) ||
    !inUnit(y2)
  ) {
    return { ok: false as const, error: "Invalid stroke." };
  }

  const color = typeof raw.color === "string" ? raw.color.trim() : "";
  if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
    return { ok: false as const, error: "Invalid stroke color." };
  }

  if (width < 0.5 || width > 8) {
    return { ok: false as const, error: "Invalid stroke width." };
  }

  return {
    ok: true as const,
    data: { x1, y1, x2, y2, color, width },
  };
}

function trimString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function num(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return value;
}

function inUnit(n: number) {
  return n >= 0 && n <= 1;
}
