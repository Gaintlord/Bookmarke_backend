"use strict";
// express call routes , controller and middleweres
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = require("../routes/userRoutes");
const userVerifyRoute_1 = require("../routes/userVerifyRoute");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/v1", userRoutes_1.userRoutes);
exports.app.use("/api/v1", userVerifyRoute_1.userVerifyRoute);
