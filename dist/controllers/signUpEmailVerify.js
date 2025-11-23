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
exports.redirectEmailVerify = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const userTablePatch_1 = require("./userTablePatch");
const tokenController_1 = require("./tokenController");
const redirectEmailVerify = (userEmail, sentOtp, userIp, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield dataBaseUtil_1.db
        .select({
        otp: dbSchemas_1.userTableDB.otp,
        createdAt: dbSchemas_1.userTableDB.createdAt,
        userId: dbSchemas_1.userTableDB.userId,
    })
        .from(dbSchemas_1.userTableDB)
        //@ts-ignore
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
    console.log(data);
    if (data.length == 0) {
        return {
            status: false,
            message: "Invalid Otp",
        };
    }
    else {
        const { otp, createdAt, userId } = data[0];
        if (otp === undefined) {
            return {
                status: false,
                message: "unverified",
            };
        }
        if (otp != sentOtp) {
            return {
                status: false,
                message: "Invalid Otp",
            };
        }
        else {
            const nowTime = new Date(Date.now());
            //@ts-ignore
            const expiredTime = createdAt.getTime() + 30 * 60 * 1000;
            if (nowTime.getTime() < expiredTime) {
                yield (0, userTablePatch_1.deleteOtpFromTable)(userEmail);
                const { refreshToken, accessToken, expiration } = yield (0, tokenController_1.createAndStoreTokens)(userEmail, userId, userIp, userAgent);
                return {
                    refreshToken,
                    accessToken,
                    expiration,
                    status: true,
                    message: "verified",
                };
            }
            else {
                return {
                    status: false,
                    message: "expired",
                };
            }
        }
    }
});
exports.redirectEmailVerify = redirectEmailVerify;
