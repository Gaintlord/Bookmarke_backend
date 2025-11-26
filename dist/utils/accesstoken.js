"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.createAccessToken = createAccessToken;
exports.createRefreshToken = createRefreshToken;
exports.verifyAccesToken = verifyAccesToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const accessJwtSecret = process.env.JWT_SECRET_A || "SherhiKehde";
const refreshJwtSecret = process.env.JWT_SECRET_R || "cheetahhiKehde";
function createAccessToken(email, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({ email, userId }, accessJwtSecret, { expiresIn: "1h" });
    });
}
function createRefreshToken(email, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({ email, userId }, refreshJwtSecret, { expiresIn: "30d" });
    });
}
function verifyAccesToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let decoded = jsonwebtoken_1.default.verify(token, accessJwtSecret);
            return decoded;
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                return {
                    status: true,
                    err: "expiredToken",
                };
            }
            else {
                return {
                    status: true,
                    err: "invalidToken",
                };
            }
        }
    });
}
function verifyRefreshToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, refreshJwtSecret);
            return decoded;
        }
        catch (err) {
            if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                return {
                    status: true,
                    err: "expiredToken",
                };
            }
            else {
                return {
                    status: true,
                    err: "invalidToken",
                };
            }
        }
    });
}
