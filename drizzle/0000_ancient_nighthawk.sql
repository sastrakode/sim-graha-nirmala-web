DO $$ BEGIN
 CREATE TYPE "cashflow_movement" AS ENUM('income', 'outcome');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "occupant_role" AS ENUM('owner', 'renter');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "payment_mode" AS ENUM('transfer', 'cash');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "payment_status" AS ENUM('pending', 'capture', 'settlement', 'deny', 'cancel', 'expire', 'failure', 'refund', 'chargeback', 'partial_refund', 'partial_chargeback', 'authorize');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "staff_role" AS ENUM('admin', 'secretary', 'treasurer', 'security_guard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "announcement" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"author_id" bigint NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billing" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"house_id" bigint NOT NULL,
	"period" timestamp with time zone NOT NULL,
	"amount" bigint NOT NULL,
	"is_paid" boolean NOT NULL,
	"extra_charge" bigint,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cashflow" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"amount" bigint NOT NULL,
	"movement" "cashflow_movement" NOT NULL,
	"cashflow_type_id" bigint NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cashflow_type" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "cashflow_type_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "house" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"address" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "house_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "occupant" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"role" "occupant_role" NOT NULL,
	"house_id" bigint NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "occupant_email_unique" UNIQUE("email"),
	CONSTRAINT "occupant_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "occupant_member" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"occupant_id" bigint NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"identity_number" text NOT NULL,
	"birthday" timestamp NOT NULL,
	"gender" "gender" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "occupant_member_email_unique" UNIQUE("email"),
	CONSTRAINT "occupant_member_phone_unique" UNIQUE("phone"),
	CONSTRAINT "occupant_member_identity_number_unique" UNIQUE("identity_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"billing_id" bigint NOT NULL,
	"amount" bigint NOT NULL,
	"payer_id" bigint NOT NULL,
	"invoice" text,
	"token" text,
	"mode" "payment_mode" NOT NULL,
	"status" "payment_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"role" "staff_role" NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone,
	CONSTRAINT "staff_email_unique" UNIQUE("email"),
	CONSTRAINT "staff_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcement" ADD CONSTRAINT "announcement_author_id_staff_id_fk" FOREIGN KEY ("author_id") REFERENCES "staff"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "billing" ADD CONSTRAINT "billing_house_id_house_id_fk" FOREIGN KEY ("house_id") REFERENCES "house"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cashflow" ADD CONSTRAINT "cashflow_cashflow_type_id_cashflow_type_id_fk" FOREIGN KEY ("cashflow_type_id") REFERENCES "cashflow_type"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "occupant" ADD CONSTRAINT "occupant_house_id_house_id_fk" FOREIGN KEY ("house_id") REFERENCES "house"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "occupant_member" ADD CONSTRAINT "occupant_member_occupant_id_occupant_id_fk" FOREIGN KEY ("occupant_id") REFERENCES "occupant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_billing_id_billing_id_fk" FOREIGN KEY ("billing_id") REFERENCES "billing"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment" ADD CONSTRAINT "payment_payer_id_occupant_id_fk" FOREIGN KEY ("payer_id") REFERENCES "occupant"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
