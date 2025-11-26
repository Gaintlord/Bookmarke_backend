"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSentBokmarke = exports.emailVerify = exports.zoduserSignUp = void 0;
const zod_1 = __importDefault(require("zod"));
exports.zoduserSignUp = zod_1.default.object({
    userEmail: zod_1.default.email(),
    userPassword: zod_1.default
        .string()
        .min(9, "Password must be greater than 9")
        .regex(/[a-z]/, "Password must contain a Capital Letter")
        .regex(/[A-Z]/, "Password must contain a Small Letter")
        .regex(/[0-9]/, "Password must contain a Number")
        .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, "Password must contain a Special Character"),
});
exports.emailVerify = zod_1.default.object({
    userEmail: zod_1.default.email(),
    otp: zod_1.default.string().length(6),
});
exports.userSentBokmarke = zod_1.default.object({
    userBokmarke: zod_1.default.object({
        image: zod_1.default.string().max(1024),
        link: zod_1.default.url(),
        hostName: zod_1.default.string().max(512),
    }),
});
