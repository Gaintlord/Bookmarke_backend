ALTER TABLE "users" ALTER COLUMN "userName" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "bokmarkeTable" ADD COLUMN "reAddedAt" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "bokmarkeTable" ADD CONSTRAINT "user_bokmarke_data" UNIQUE("pageLink","imageLink");