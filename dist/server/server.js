"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("../app/app");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
dotenv_1.default.config();
dataBaseUtil_1.db;
const PORT = process.env.PORT || 8080;
app_1.app.listen(PORT, () => {
    console.log(`### Server Up and Running @ port #${PORT}# ###`);
});
