-- Collaboration and general-enquiry tables only keep the fields their forms collect.
-- Written by hand so `interest` is converted in place rather than dropped and re-added:
-- an existing collaboration row whose interest is not a collaboration area makes the
-- cast fail and the migration roll back, instead of silently losing data.
-- Remove old test rows first, e.g. DELETE FROM "ContactCollaboration" WHERE email LIKE '%@example.invalid'.

-- CreateEnum
CREATE TYPE "CollaborationArea" AS ENUM ('research-collaboration', 'investment-partnership');

-- ContactCollaboration
ALTER TABLE "ContactCollaboration"
  ALTER COLUMN "interest" TYPE "CollaborationArea" USING ("interest"::text::"CollaborationArea"),
  ALTER COLUMN "organisation" DROP NOT NULL,
  ALTER COLUMN "role" DROP NOT NULL,
  ALTER COLUMN "message" SET NOT NULL,
  DROP COLUMN "intendedApplication",
  DROP COLUMN "timeframe";

-- ContactGeneralEnquiry
ALTER TABLE "ContactGeneralEnquiry"
  ALTER COLUMN "message" SET NOT NULL,
  DROP COLUMN "organisation",
  DROP COLUMN "role",
  DROP COLUMN "interest",
  DROP COLUMN "intendedApplication",
  DROP COLUMN "timeframe";
