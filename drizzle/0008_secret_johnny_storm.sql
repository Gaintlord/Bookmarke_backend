ALTER TABLE "bokmarkeTable" DROP CONSTRAINT "user_bokmarke_data";--> statement-breakpoint
ALTER TABLE "bokmarkeTable" ADD CONSTRAINT "bokmarkeTable_pageLink_unique" UNIQUE("pageLink");