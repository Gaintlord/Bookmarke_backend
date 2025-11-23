CREATE TABLE "bokmarkeTable" (
	"bokmarkeId" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bokmarkeTable_bokmarkeId_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" integer NOT NULL,
	"pageLink" varchar(1024) NOT NULL,
	"imageLink" varchar(1024) NOT NULL,
	"hostName" varchar(512) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "refreshTokens" RENAME COLUMN "id" TO "Tokenid";--> statement-breakpoint
ALTER TABLE "refreshTokens" DROP CONSTRAINT "refreshTokens_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshTokens" ALTER COLUMN "userId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bokmarkeTable" ADD CONSTRAINT "bokmarkeTable_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "by_host_name" ON "bokmarkeTable" USING btree ("hostName");--> statement-breakpoint
ALTER TABLE "refreshTokens" ADD CONSTRAINT "refreshTokens_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;