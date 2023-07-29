CREATE TABLE IF NOT EXISTS "house" (
    "id" bigserial PRIMARY KEY NOT NULL,
    "code" text NOT NULL,
    "created_at" timestamp with time zone DEFAULT now() NOT NULL,
    "updated_at" timestamp with time zone,
    CONSTRAINT "house_code_unique" UNIQUE ("code")
);
