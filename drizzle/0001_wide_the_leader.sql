CREATE TABLE IF NOT EXISTS "role" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "code" text NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone,
    CONSTRAINT "role_code_unique" UNIQUE ("code"),
    CONSTRAINT "role_name_unique" UNIQUE ("name")
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staff" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "role_id" bigint NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "phone" text NOT NULL,
    "password" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone,
    CONSTRAINT "staff_email_unique" UNIQUE ("email"),
    CONSTRAINT "staff_phone_unique" UNIQUE ("phone")
);

--> statement-breakpoint
DO $$
BEGIN
    ALTER TABLE "staff"
        ADD CONSTRAINT "staff_role_id_role_id_fk" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE NO action ON UPDATE NO action;
EXCEPTION
    WHEN duplicate_object THEN
        NULL;
END
$$;

