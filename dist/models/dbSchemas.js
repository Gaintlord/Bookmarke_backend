"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTableDB = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.userTableDB = (0, pg_core_2.pgTable)("users", {
    id: (0, pg_core_2.integer)().primaryKey().generatedAlwaysAsIdentity().primaryKey(),
    userEmail: (0, pg_core_2.varchar)({ length: 255 }).notNull().unique(),
    userName: (0, pg_core_2.varchar)({ length: 255 }),
    userPassword: (0, pg_core_2.varchar)({ length: 255 }).notNull(),
    otp: (0, pg_core_2.varchar)({ length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("cureated At"),
    updatedAt: (0, pg_core_1.timestamp)("Updated At"),
});
