ALTER TABLE "payment" ALTER COLUMN "expired_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "payment" ALTER COLUMN "redirect_url" DROP NOT NULL;