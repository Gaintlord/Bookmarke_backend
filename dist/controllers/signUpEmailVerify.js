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
const EmailSender_1 = require("../utils/EmailSender");
const userTablePatch_1 = require("./userTablePatch");
// create and add add otp to data base
const signUpOtpGen = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const otpString = (0, oneTimePassGen_1.otpFormater)();
    yield dataBaseUtil_1.db
        .update(dbSchemas_1.userTableDB)
        .set({ otp: otpString.dbString })
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
    // console.log("OTP generated");
    // sending email to client
    (0, EmailSender_1.emailSender)(otpString.otp, userEmail);
});
exports.signUpOtpGen = signUpOtpGen;
const redirectEmailVerify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { userEmail, otp } = req.query;
    //  selecting the email and getting the otp
    const data = yield dataBaseUtil_1.db
        .select({ otp: dbSchemas_1.userTableDB.otp })
        .from(dbSchemas_1.userTableDB)
        //@ts-ignore
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
    // console.log(data);
    // if OTP exist move forward
    if (data.length != 0) {
        const otpCheck = (_a = data[0].otp) === null || _a === void 0 ? void 0 : _a.split("+");
        // console.log(`### ${otpCheck} ###`);
        // otp matching
        //@ts-ignore
        if (otpCheck === undefined) {
            res.status(400).json({
                status: false,
                message: "user already verified",
            });
        }
        else if (otpCheck[0] != otp) {
            res.status(400).json({
                status: false,
                message: "Invalid Otp",
            });
        }
        else {
            // verifying expiry
            //@ts-ignore
            const expTime = Number(otpCheck[1]) + 21 * 60 * 1000;
            console.log(expTime);
            const now = new Date();
            console.log(now);
            // console.log(new Date(expTime));
            // console.log(now);
            if (Number(now) < expTime) {
                // console.log("otp verified");
                //@ts-ignore
                yield (0, userTablePatch_1.deleteOtpFromTable)(userEmail);
                res.status(200).json({
                    status: true,
                    message: "otp has been verified",
                });
            }
            else {
                // console.log("otp expired");
                res.status(400).json({
                    status: false,
                    message: "otp has expired",
                });
            }
        }
    }
    else {
        res.status(500).json({
            status: false,
            message: "user Does not exist",
        });
    }
});
exports.redirectEmailVerify = redirectEmailVerify;
