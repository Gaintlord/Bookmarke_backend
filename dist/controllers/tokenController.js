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
exports.createAndStoreTokens = void 0;
const dbSchemas_1 = require("../models/dbSchemas");
const accesstoken_1 = require("../utils/accesstoken");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const hashingUtil_1 = require("../utils/hashingUtil");
const createAndStoreTokens = (email, id, userIp, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = yield (0, accesstoken_1.createRefreshToken)(email, id.toString());
    const accessToken = yield (0, accesstoken_1.createAccessToken)(email, id.toString());
    const hashedToken = yield (0, hashingUtil_1.HashFunction)(refreshToken);
    const expiration = 15 * 24 * 60 * 60 * 1000;
    yield dataBaseUtil_1.db.insert(dbSchemas_1.refreshTokenTable).values({
        userId: id,
        tokenHash: hashedToken,
        userAgent: userAgent,
        ipAddress: userIp,
        expiresAt: new Date(Date.now() + expiration),
    });
    return { refreshToken, accessToken, expiration };
});
exports.createAndStoreTokens = createAndStoreTokens;
