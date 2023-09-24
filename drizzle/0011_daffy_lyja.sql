ALTER TABLE "family" DROP CONSTRAINT "family_email_unique";--> statement-breakpoint
ALTER TABLE "family" DROP CONSTRAINT "family_phone_unique";--> statement-breakpoint
ALTER TABLE "family" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "family" DROP COLUMN IF EXISTS "phone";