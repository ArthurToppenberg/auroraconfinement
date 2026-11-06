-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LoiCapacity" AS ENUM ('personal', 'team', 'institution');

-- CreateEnum
CREATE TYPE "LoiProcurementRole" AS ENUM ('potential-user', 'technical-evaluator', 'recommender', 'budget-holder', 'procurement', 'other');

-- CreateEnum
CREATE TYPE "LoiProduct" AS ENUM ('exhibition-model', 'research-platform', 'both');

-- CreateEnum
CREATE TYPE "LoiInterestType" AS ENUM ('demonstration', 'pilot-evaluation', 'rental-event-use', 'potential-purchase', 'research-collaboration', 'exploratory');

-- CreateEnum
CREATE TYPE "LoiTiming" AS ENUM ('when-available', 'within-12-months', 'one-to-three-years', 'longer-term', 'not-yet-known');

-- CreateEnum
CREATE TYPE "LoiBudgetStatus" AS ENUM ('available', 'requires-internal-approval', 'external-funding-needed', 'not-explored', 'prefer-not-to-say');

-- CreateEnum
CREATE TYPE "LoiStatus" AS ENUM ('confirmed', 'superseded', 'withdrawn');

-- CreateEnum
CREATE TYPE "LoiFollowUp" AS ENUM ('new', 'contacted', 'qualified', 'pilot-discussion', 'closed');

-- CreateEnum
CREATE TYPE "LoiEventKind" AS ENUM ('CREATED', 'SHARING_CHANGED', 'WITHDRAWN', 'SUPERSEDED', 'EXPORTED', 'FOLLOW_UP', 'NOTE');

-- CreateTable
CREATE TABLE "LetterOfInterest" (
    "id" TEXT NOT NULL,
    "reference" VARCHAR(24) NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "supersedesId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fullName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "role" VARCHAR(120) NOT NULL,
    "organisation" VARCHAR(160) NOT NULL,
    "organisationKey" VARCHAR(160) NOT NULL,
    "department" VARCHAR(160),
    "country" VARCHAR(80) NOT NULL,
    "capacity" "LoiCapacity" NOT NULL,
    "procurementRole" "LoiProcurementRole",
    "product" "LoiProduct" NOT NULL,
    "interestTypes" "LoiInterestType"[],
    "timing" "LoiTiming" NOT NULL,
    "budgetStatus" "LoiBudgetStatus",
    "sections" JSONB NOT NULL,
    "letterText" JSONB NOT NULL,
    "templateVersion" VARCHAR(32) NOT NULL,
    "confirmationWordingVersion" VARCHAR(32) NOT NULL,
    "confirmedAt" TIMESTAMP(3) NOT NULL,
    "status" "LoiStatus" NOT NULL DEFAULT 'confirmed',
    "sharingPermitted" BOOLEAN NOT NULL,
    "sharingWordingVersion" VARCHAR(32) NOT NULL,
    "sharingChangedAt" TIMESTAMP(3) NOT NULL,
    "source" VARCHAR(32),
    "followUp" "LoiFollowUp" NOT NULL DEFAULT 'new',
    "internalNotes" VARCHAR(4000),
    "authorityReview" VARCHAR(200),
    "authorityEvidence" VARCHAR(2000),
    "pdfRef" VARCHAR(200),
    "pdfChecksum" VARCHAR(128),

    CONSTRAINT "LetterOfInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LetterOfInterestEvent" (
    "id" TEXT NOT NULL,
    "loiId" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kind" "LoiEventKind" NOT NULL,
    "detail" JSONB,

    CONSTRAINT "LetterOfInterestEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LetterOfInterest_reference_key" ON "LetterOfInterest"("reference");

-- CreateIndex
CREATE INDEX "LetterOfInterest_createdAt_idx" ON "LetterOfInterest"("createdAt");

-- CreateIndex
CREATE INDEX "LetterOfInterest_email_idx" ON "LetterOfInterest"("email");

-- CreateIndex
CREATE INDEX "LetterOfInterest_status_idx" ON "LetterOfInterest"("status");

-- CreateIndex
CREATE INDEX "LetterOfInterest_product_idx" ON "LetterOfInterest"("product");

-- CreateIndex
CREATE INDEX "LetterOfInterest_organisationKey_idx" ON "LetterOfInterest"("organisationKey");

-- CreateIndex
CREATE INDEX "LetterOfInterestEvent_loiId_at_idx" ON "LetterOfInterestEvent"("loiId", "at");

-- AddForeignKey
ALTER TABLE "LetterOfInterestEvent" ADD CONSTRAINT "LetterOfInterestEvent_loiId_fkey" FOREIGN KEY ("loiId") REFERENCES "LetterOfInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

