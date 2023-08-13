ALTER TABLE "cashflow" ADD COLUMN "author_id" bigint NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cashflow" ADD CONSTRAINT "cashflow_author_id_staff_id_fk" FOREIGN KEY ("author_id") REFERENCES "staff"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
