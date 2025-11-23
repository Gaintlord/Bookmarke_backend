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
exports.userReqAuth = void 0;
const accesstoken_1 = require("../utils/accesstoken");
// import cookieParser from "cookie-parser";
const userReqAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("reached here");
    const headerPayload = req.headers["authorization"];
    if (!headerPayload) {
        return res.status(401).json({ err: "Missing Header" });
    }
    if (!(headerPayload === null || headerPayload === void 0 ? void 0 : headerPayload.startsWith("Bearer"))) {
        return res.status(401).json({ err: "Missing Header" });
    }
    const accessToken = headerPayload === null || headerPayload === void 0 ? void 0 : headerPayload.split(" ")[1];
    if (!accessToken) {
        return res.status(401).json({ err: "Missing Token" });
    }
    const verifiedToken = yield (0, accesstoken_1.verifyAccesToken)(accessToken);
    console.log(verifiedToken);
    if (!verifiedToken.status) {
        if (verifiedToken.err == "jwt expired") {
            return res.status(200).json({ err: "YL203" });
        }
        else {
            return res.status(401).json({ err: "Invalid Token" });
        }
    }
    next();
});
exports.userReqAuth = userReqAuth;
