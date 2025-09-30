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
exports.redirectEmailVerify = exports.signUpOtpGen = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const oneTimePassGen_1 = require("../utils/oneTimePassGen");
const signUpOtpGen = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("######control reach here#####");
    const otpString = (0, oneTimePassGen_1.otpFormater)();
    yield dataBaseUtil_1.db
        .update(dbSchemas_1.userTableDB)
        .set({ otp: otpString })
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
    console.log("OTP generated");
});
exports.signUpOtpGen = signUpOtpGen;
const redirectEmailVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userEmail, otp } = req.query;
    const data = yield dataBaseUtil_1.db
        .select({ otp: dbSchemas_1.userTableDB.otp })
        .from(dbSchemas_1.userTableDB)
        //@ts-ignore
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
    if (data.length != 0) {
        const otpCheck = (_a = data[0].otp) === null || _a === void 0 ? void 0 : _a.split("+");
        console.log(otpCheck);
        //@ts-ignore
        if (otpCheck[0] != otp) {
            res.status(400).json({
                message: "Invalid Otp",
            });
        }
        else {
            //@ts-ignore
            const expTime = Number(otpCheck[1]) + 21 * 60 * 1000;
            const now = new Date();
            console.log(new Date(expTime));
            console.log(now);
            if (expTime > Number(now)) {
                console.log("otp verified");
                res.status(200).json({
                    message: "otp has been verified",
                });
            }
            else {
                console.log("otp expired");
                res.status(400).json({
                    message: "otp has expired",
                });
            }
        }
    }
    else {
        res.status(500).json({
            message: "user Does not exist",
        });
    }
});
exports.redirectEmailVerify = redirectEmailVerify;
