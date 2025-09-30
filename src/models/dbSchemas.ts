import { timestamp } from "drizzle-orm/pg-core";
import { pgTable, integer, varchar } from "drizzle-orm/pg-core";

export const userTableDB = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity().primaryKey(),
  userEmail: varchar({ length: 255 }).notNull().unique(),
  userName: varchar({ length: 255 }),
  userPassword: varchar({ length: 255 }).notNull(),
  otp: varchar({ length: 255 }),
  createdAt: timestamp("cureated At"),
  updatedAt: timestamp("Updated At"),
});
