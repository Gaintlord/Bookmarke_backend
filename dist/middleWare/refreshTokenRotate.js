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
exports.refreshTokRotate = void 0;
const accesstoken_1 = require("../utils/accesstoken");
const refreshTokenController_1 = require("../controllers/refreshTokenController");
const refreshTokRotate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.cookies;
    console.log(cookies);
    const verifiedRefToken = yield (0, accesstoken_1.verifyRefreshToken)(cookies.refreshToken);
    //@ts-ignore
    if (verifiedRefToken.status) {
        //@ts-ignore
        if (verifiedToken.err == "expiredToken") {
            yield (0, refreshTokenController_1.refreshTokenRotation)();
            return;
        }
        else {
            return res.status(401).json({ err: "Invalid Token" });
        }
    }
    else {
        console.log(verifiedRefToken);
        const newAccessToken = yield (0, accesstoken_1.createAccessToken)(
        //@ts-ignore
        verifiedRefToken.email, 
        //@ts-ignore
        verifiedRefToken.userId);
        console.log(newAccessToken);
        res
            .status(201)
            .header("N_AT", newAccessToken)
            .json({ accessToken: newAccessToken });
        return;
    }
});
exports.refreshTokRotate = refreshTokRotate;
