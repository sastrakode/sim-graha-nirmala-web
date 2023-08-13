ALTER TABLE "cashflow" DROP CONSTRAINT "cashflow_cashflow_type_id_cashflow_type_id_fk";
--> statement-breakpoint
DROP TABLE "cashflow_type";--> statement-breakpoint
ALTER TABLE "cashflow" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "cashflow" DROP COLUMN IF EXISTS "cashflow_type_id";