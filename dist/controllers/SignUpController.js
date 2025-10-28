"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const signUpUser = (validatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dataBaseUtil_1.db
        .select({ email: dbSchemas_1.userTableDB.userEmail })
        .from(dbSchemas_1.userTableDB)
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, validatedData.userEmail));
    if (data.length == 0) {
        try {
            yield dataBaseUtil_1.db.insert(dbSchemas_1.userTableDB).values({
                userEmail: validatedData.userEmail,
                userPassword: validatedData.userPassword,
                createdAt: new Date(),
            });
            return {
                statusCode: 200,
                detail: {
                    userEmail: validatedData.userEmail,
                    status: true,
                    message: "User Signed Up & Email sent",
                },
            };
        }
        catch (e) {
            return {
                statusCode: 500,
                detail: {
                    status: false,
                    message: "Server umable to process the request",
                },
            };
        }
    }
    else {
        return {
            statusCode: 400,
            detail: { status: false, message: "Bad request || User already exist" },
        };
    }
});
exports.signUpUser = signUpUser;
