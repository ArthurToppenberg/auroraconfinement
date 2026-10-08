-- CreateEnum
CREATE TYPE "ContactProductArea" AS ENUM ('exhibition-model', 'research-platform', 'both-product-directions');

-- CreateEnum
CREATE TYPE "NffInterestArea" AS ENUM ('exhibition-model', 'research-platform', 'pilot-demonstration', 'research-collaboration', 'investment-partnership');

-- CreateEnum
CREATE TYPE "InterestTimeframe" AS ENUM ('as-soon-as-available', 'within-12-months', 'within-1-to-3-years', 'exploring-future');

-- CreateTable
CREATE TABLE "ContactProductInterest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "organisation" VARCHAR(160) NOT NULL,
    "role" VARCHAR(120) NOT NULL,
    "interest" "ContactProductArea" NOT NULL,
    "intendedApplication" VARCHAR(600) NOT NULL,
    "timeframe" "InterestTimeframe" NOT NULL,
    "message" VARCHAR(1500),

    CONSTRAINT "ContactProductInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactCollaboration" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "organisation" VARCHAR(160) NOT NULL,
    "role" VARCHAR(120) NOT NULL,
    "interest" "ContactProductArea" NOT NULL,
    "intendedApplication" VARCHAR(600) NOT NULL,
    "timeframe" "InterestTimeframe" NOT NULL,
    "message" VARCHAR(1500),

    CONSTRAINT "ContactCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactGeneralEnquiry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "organisation" VARCHAR(160) NOT NULL,
    "role" VARCHAR(120) NOT NULL,
    "interest" "ContactProductArea" NOT NULL,
    "intendedApplication" VARCHAR(600) NOT NULL,
    "timeframe" "InterestTimeframe" NOT NULL,
    "message" VARCHAR(1500),

    CONSTRAINT "ContactGeneralEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NffInterest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "organisation" VARCHAR(160) NOT NULL,
    "role" VARCHAR(120) NOT NULL,
    "interest" "NffInterestArea" NOT NULL,
    "intendedApplication" VARCHAR(600) NOT NULL,
    "timeframe" "InterestTimeframe" NOT NULL,
    "message" VARCHAR(1500),

    CONSTRAINT "NffInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactProductInterest_createdAt_idx" ON "ContactProductInterest"("createdAt");

-- CreateIndex
CREATE INDEX "ContactProductInterest_email_idx" ON "ContactProductInterest"("email");

-- CreateIndex
CREATE INDEX "ContactCollaboration_createdAt_idx" ON "ContactCollaboration"("createdAt");

-- CreateIndex
CREATE INDEX "ContactCollaboration_email_idx" ON "ContactCollaboration"("email");

-- CreateIndex
CREATE INDEX "ContactGeneralEnquiry_createdAt_idx" ON "ContactGeneralEnquiry"("createdAt");

-- CreateIndex
CREATE INDEX "ContactGeneralEnquiry_email_idx" ON "ContactGeneralEnquiry"("email");

-- CreateIndex
CREATE INDEX "NffInterest_createdAt_idx" ON "NffInterest"("createdAt");

-- CreateIndex
CREATE INDEX "NffInterest_email_idx" ON "NffInterest"("email");
