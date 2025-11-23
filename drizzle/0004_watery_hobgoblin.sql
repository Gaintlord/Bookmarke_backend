ALTER TABLE "refreshTokens" DROP CONSTRAINT "refreshTokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD COLUMN "userId" integer;--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD COLUMN "tokenHash" varchar(512) NOT NULL;--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD COLUMN "userAgent" varchar(255);--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD COLUMN "ipAddress" varchar(64);--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD COLUMN "expiresAt" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "createdAt" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN "user_id";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN "token_hash";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN "user_agent";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN "ip_address";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN "expires_at";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP COLUMN "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "cureated At";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "Updated At";