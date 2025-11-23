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
exports.redirectValidation = void 0;
const zodDataModel_1 = require("../models/zodDataModel");
const signUpEmailVerify_1 = require("../controllers/signUpEmailVerify");
const redirectValidation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedData = zodDataModel_1.emailVerify.safeParse(req.query);
    if (!parsedData.success) {
        res.status(401).json({
            message: "Unsanitized Data query",
        });
    }
    else {
        const response = yield (0, signUpEmailVerify_1.redirectEmailVerify)(parsedData.data.userEmail, parsedData.data.otp, req.ip, req.get("User-Agent"));
        if (response.status) {
            res.cookie("refreshToken", response.refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false,
                maxAge: response.expiration,
            });
            res.status(201).json({
                status: true,
                message: response.message,
                accessToken: response.accessToken,
                dr_Tag: response.refreshToken,
            });
        }
        else {
            res.status(400).json(response.message);
        }
    }
});
exports.redirectValidation = redirectValidation;
