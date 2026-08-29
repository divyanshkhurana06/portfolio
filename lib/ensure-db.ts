import { prisma } from "@/lib/prisma";

const globalForDb = globalThis as unknown as {
  dbReady: Promise<void> | undefined;
};

const INIT_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS "Endorsement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "WhiteboardStroke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "x1" REAL NOT NULL,
    "y1" REAL NOT NULL,
    "x2" REAL NOT NULL,
    "y2" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "width" REAL NOT NULL DEFAULT 2,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS "FlappyScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE INDEX IF NOT EXISTS "Endorsement_createdAt_idx" ON "Endorsement"("createdAt" DESC)`,
  `CREATE INDEX IF NOT EXISTS "FlappyScore_score_idx" ON "FlappyScore"("score" DESC)`,
  `CREATE INDEX IF NOT EXISTS "WhiteboardStroke_createdAt_idx" ON "WhiteboardStroke"("createdAt")`,
];

export async function ensureDb(): Promise<void> {
  if (!globalForDb.dbReady) {
    globalForDb.dbReady = (async () => {
      for (const sql of INIT_STATEMENTS) {
        await prisma.$executeRawUnsafe(sql);
      }
    })();
  }
  await globalForDb.dbReady;
}
