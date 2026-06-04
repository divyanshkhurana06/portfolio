import { prisma } from "@/lib/prisma";

export type EndorsementRecord = {
  id: string;
  name: string;
  relation: string;
  body: string;
  date: string;
};

export type WhiteboardStrokeRecord = {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
  createdAt: string;
};

export async function getEndorsements(limit?: number): Promise<EndorsementRecord[]> {
  const rows = await prisma.endorsement.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    relation: row.relation,
    body: row.body,
    date: row.createdAt.toISOString().slice(0, 10),
  }));
}

export async function createEndorsement(data: {
  name: string;
  relation: string;
  body: string;
}): Promise<EndorsementRecord> {
  const row = await prisma.endorsement.create({ data });
  return {
    id: row.id,
    name: row.name,
    relation: row.relation,
    body: row.body,
    date: row.createdAt.toISOString().slice(0, 10),
  };
}

export async function getWhiteboardStrokes(
  since?: string
): Promise<WhiteboardStrokeRecord[]> {
  const sinceDate = since ? new Date(since) : null;
  const validSince =
    sinceDate && !Number.isNaN(sinceDate.getTime()) ? sinceDate : null;

  const rows = await prisma.whiteboardStroke.findMany({
    where: validSince ? { createdAt: { gt: validSince } } : undefined,
    orderBy: { createdAt: "asc" },
    take: validSince ? 500 : 5000,
  });

  return rows.map((row) => ({
    id: row.id,
    x1: row.x1,
    y1: row.y1,
    x2: row.x2,
    y2: row.y2,
    color: row.color,
    width: row.width,
    createdAt: row.createdAt.toISOString(),
  }));
}

export async function createWhiteboardStroke(data: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
}): Promise<WhiteboardStrokeRecord> {
  const row = await prisma.whiteboardStroke.create({ data });
  return {
    id: row.id,
    x1: row.x1,
    y1: row.y1,
    x2: row.x2,
    y2: row.y2,
    color: row.color,
    width: row.width,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function clearWhiteboard(): Promise<void> {
  await prisma.whiteboardStroke.deleteMany();
}
