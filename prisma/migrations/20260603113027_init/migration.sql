-- CreateTable
CREATE TABLE "Endorsement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WhiteboardStroke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "x1" REAL NOT NULL,
    "y1" REAL NOT NULL,
    "x2" REAL NOT NULL,
    "y2" REAL NOT NULL,
    "color" TEXT NOT NULL,
    "width" REAL NOT NULL DEFAULT 2,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Endorsement_createdAt_idx" ON "Endorsement"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "WhiteboardStroke_createdAt_idx" ON "WhiteboardStroke"("createdAt");
