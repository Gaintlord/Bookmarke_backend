"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bokmarkeTable = exports.refreshTokenTable = exports.userTableDB = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
const pg_core_3 = require("drizzle-orm/pg-core");
exports.userTableDB = (0, pg_core_3.pgTable)("users", {
    userId: (0, pg_core_3.integer)().primaryKey().generatedAlwaysAsIdentity().primaryKey(),
    userName: (0, pg_core_3.varchar)({ length: 128 }),
    userEmail: (0, pg_core_3.varchar)({ length: 255 }).notNull().unique(),
    userPassword: (0, pg_core_3.varchar)({ length: 255 }).notNull(),
    otp: (0, pg_core_3.varchar)({ length: 255 }),
    createdAt: (0, pg_core_2.timestamp)().defaultNow(),
    updatedAt: (0, pg_core_2.timestamp)(),
});
exports.refreshTokenTable = (0, pg_core_3.pgTable)("refreshTokens", {
    Tokenid: (0, pg_core_3.integer)().generatedAlwaysAsIdentity().primaryKey(),
    userId: (0, pg_core_3.integer)()
        .references(() => exports.userTableDB.userId, { onDelete: "cascade" })
        .notNull(),
    tokenHash: (0, pg_core_3.varchar)({ length: 512 }).notNull(),
    userAgent: (0, pg_core_3.varchar)({ length: 255 }),
    ipAddress: (0, pg_core_3.varchar)({ length: 64 }),
    expiresAt: (0, pg_core_2.timestamp)().notNull(),
    revoked: (0, pg_core_3.boolean)().default(false).notNull(),
    createdAt: (0, pg_core_2.timestamp)().defaultNow().notNull(),
});
exports.bokmarkeTable = (0, pg_core_3.pgTable)("bokmarkeTable", {
    bokmarkeId: (0, pg_core_3.integer)().generatedAlwaysAsIdentity().primaryKey(),
    userId: (0, pg_core_3.integer)()
        .references(() => exports.userTableDB.userId, { onDelete: "cascade" })
        .notNull(),
    pageLink: (0, pg_core_3.varchar)({ length: 1024 }).notNull().unique(),
    imageLink: (0, pg_core_3.varchar)({ length: 1024 }).notNull(),
    hostName: (0, pg_core_3.varchar)({ length: 512 }).notNull(),
    createdAt: (0, pg_core_2.timestamp)().defaultNow().notNull(),
    reAddedAt: (0, pg_core_2.timestamp)().defaultNow(),
}, (table) => [(0, pg_core_1.index)("by_host_name").on(table.hostName)]);
