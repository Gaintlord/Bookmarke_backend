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
exports.deleteOtpFromTable = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const deleteOtpFromTable = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    yield dataBaseUtil_1.db
        .update(dbSchemas_1.userTableDB)
        .set({ otp: null })
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
});
exports.deleteOtpFromTable = deleteOtpFromTable;
