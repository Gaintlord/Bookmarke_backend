"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const signUpAuthMidware_1 = require("../middleWare/signUpAuthMidware");
const logInAuthMidware_1 = require("../middleWare/logInAuthMidware");
exports.userRoutes = express_1.default.Router();
exports.userRoutes.post("/signup", signUpAuthMidware_1.signUpauthMidWare);
exports.userRoutes.get("/login", logInAuthMidware_1.LogInAuthMidware);
