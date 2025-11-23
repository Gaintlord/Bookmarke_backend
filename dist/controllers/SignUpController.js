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
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const oneTimePassGen_1 = require("../utils/oneTimePassGen");
const EmailSender_1 = require("../utils/EmailSender");
const signUpUser = (validatedData) => __awaiter(void 0, void 0, void 0, function* () {
    let otp = (0, oneTimePassGen_1.otpFormater)();
    try {
        yield dataBaseUtil_1.db.insert(dbSchemas_1.userTableDB).values({
            userEmail: validatedData.userEmail,
            userPassword: validatedData.userPassword,
            createdAt: new Date(Date.now()),
            otp: otp,
        });
        (0, EmailSender_1.emailSender)(otp, validatedData.userEmail);
        return {
            statusCode: 200,
            detail: {
                userEmail: validatedData.userEmail,
                status: true,
                message: "User Signed Up",
            },
        };
    }
    catch (err) {
        // @ts-ignore
        if (err.cause.code === "23505") {
            return {
                statusCode: 400,
                detail: { status: false, message: "Bad request" },
            };
        }
        else {
            return {
                statusCode: 500,
                detail: {
                    status: false,
                    message: "Server unable to process the request",
                },
            };
        }
    }
});
exports.signUpUser = signUpUser;
