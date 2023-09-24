CREATE TABLE IF NOT EXISTS "bucket" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ext" text NOT NULL,
	"token" uuid DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "bucket_token_unique" UNIQUE("token")
);
