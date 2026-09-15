-- CreateTable
CREATE TABLE "Endorsement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Endorsement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhiteboardStroke" (
    "id" TEXT NOT NULL,
    "x1" DOUBLE PRECISION NOT NULL,
    "y1" DOUBLE PRECISION NOT NULL,
    "x2" DOUBLE PRECISION NOT NULL,
    "y2" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "width" DOUBLE PRECISION NOT NULL DEFAULT 2,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhiteboardStroke_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlappyScore" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FlappyScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Endorsement_createdAt_idx" ON "Endorsement"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "WhiteboardStroke_createdAt_idx" ON "WhiteboardStroke"("createdAt");

-- CreateIndex
CREATE INDEX "FlappyScore_score_idx" ON "FlappyScore"("score" DESC);

