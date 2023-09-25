DO $$ BEGIN
 CREATE TYPE "occupant_document_type" AS ENUM('family_card');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "occupant_document" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"type" "occupant_document_type" NOT NULL,
	"occupant_id" bigint NOT NULL,
	"storage_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "occupant_document" ADD CONSTRAINT "occupant_document_occupant_id_occupant_id_fk" FOREIGN KEY ("occupant_id") REFERENCES "occupant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "occupant_document" ADD CONSTRAINT "occupant_document_storage_id_storage_id_fk" FOREIGN KEY ("storage_id") REFERENCES "storage"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
