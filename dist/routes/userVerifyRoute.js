"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userVerifyRoute = void 0;
const express_1 = __importDefault(require("express"));
const signUpEmailVerify_1 = require("../controllers/signUpEmailVerify");
const redirectValidation_1 = require("../middleWare/redirectValidation");
exports.userVerifyRoute = express_1.default.Router();
exports.userVerifyRoute.get("/email-verify", redirectValidation_1.redirectValidation, signUpEmailVerify_1.redirectEmailVerify);
