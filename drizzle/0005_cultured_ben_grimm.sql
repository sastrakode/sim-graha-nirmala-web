ALTER TABLE "occupant_member" RENAME TO "family";--> statement-breakpoint
ALTER TABLE "family" DROP CONSTRAINT "occupant_member_email_unique";--> statement-breakpoint
ALTER TABLE "family" DROP CONSTRAINT "occupant_member_phone_unique";--> statement-breakpoint
ALTER TABLE "family" DROP CONSTRAINT "occupant_member_identity_number_unique";--> statement-breakpoint
ALTER TABLE "family" DROP CONSTRAINT "occupant_member_occupant_id_occupant_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "family" ADD CONSTRAINT "family_occupant_id_occupant_id_fk" FOREIGN KEY ("occupant_id") REFERENCES "occupant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "family" ADD CONSTRAINT "family_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "family" ADD CONSTRAINT "family_phone_unique" UNIQUE("phone");--> statement-breakpoint
ALTER TABLE "family" ADD CONSTRAINT "family_identity_number_unique" UNIQUE("identity_number");