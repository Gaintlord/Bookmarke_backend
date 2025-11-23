ALTER TABLE "users" RENAME COLUMN "id" TO "userId";--> statement-breakpoint
ALTER TABLE "bokmarkeTable" DROP CONSTRAINT "bokmarkeTable_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP CONSTRAINT "refreshTokens_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "bokmarkeTable" ADD CONSTRAINT "bokmarkeTable_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("userId") ON DELETE cascade ON UPDATE no action;