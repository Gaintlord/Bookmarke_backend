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
const zodDataModel_1 = require("../models/zodDataModel");
const logINController_1 = require("../controllers/logINController");
const tokenController_1 = require("../controllers/tokenController");
const LogInAuthMidware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.get("User-Agent"));
    const userIp = req.ip;
    const parseData = zodDataModel_1.zoduserSignUp.safeParse(req.body);
    if (!parseData.success) {
        res.status(401).json({
            status: false,
        });
    }
    else {
        const response = yield (0, logINController_1.logInUser)(parseData.data);
        if (!response.status) {
            res.status(401).json({
                status: false,
                err: "unsanitized credentials",
            });
        }
        else {
            // Access token and Refresh token
            const { refreshToken, accessToken, expiration } = yield (0, tokenController_1.createAndStoreTokens)(parseData.data.userEmail, 
            //@ts-ignore
            response.userId, userIp, req.get("User-Agent"));
            res.cookie("DR_TAG_TOKEN", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: false,
                maxAge: expiration,
            });
            res
                .status(200)
                .json({ status: true, accessToken: accessToken, dr_tag: refreshToken });
        }
    }
});
exports.LogInAuthMidware = LogInAuthMidware;
