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
exports.LogInAuthMidware = void 0;
const zodSignUpModel_1 = require("../models/zodSignUpModel");
const logINController_1 = require("../controllers/logINController");
const accesstoken_1 = require("../utils/accesstoken");
const LogInAuthMidware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = zodSignUpModel_1.zoduserSignUp.safeParse(req.body);
    if (!parseData.success) {
        res.status(401).json({
            status: false,
        });
    }
    else {
        const response = yield (0, logINController_1.logInUser)(parseData.data);
        if (!response) {
            res.status(401).json({
                status: false,
            });
        }
        else {
            // Access token and Refresh token
            const acessToken = yield (0, accesstoken_1.createAccessToken)(parseData.data.userEmail);
            const refreshToken = yield (0, accesstoken_1.createRefreshToken)(parseData.data.userEmail);
            sessionStorage.setItem("accessToken", acessToken);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false,
                maxAge: 14 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ status: false });
        }
    }
});
exports.LogInAuthMidware = LogInAuthMidware;
