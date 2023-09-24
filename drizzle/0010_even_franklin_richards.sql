ALTER TABLE "bucket" RENAME TO "storage";--> statement-breakpoint
ALTER TABLE "storage" DROP CONSTRAINT "bucket_token_unique";--> statement-breakpoint
ALTER TABLE "storage" ADD CONSTRAINT "storage_token_unique" UNIQUE("token");