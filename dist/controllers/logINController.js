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
exports.logInUser = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const hashingUtil_1 = require("../utils/hashingUtil");
const logInUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, userPassword } = data;
    //getiing hashed pass from DB
    const userHashedPass = yield dataBaseUtil_1.db
        .select({ userPassword: dbSchemas_1.userTableDB.userPassword })
        .from(dbSchemas_1.userTableDB)
        .where((0, drizzle_orm_1.eq)(dbSchemas_1.userTableDB.userEmail, userEmail));
    console.log(userHashedPass);
    if (userHashedPass.length == 0) {
        return false;
    }
    else {
        const comapareStatus = yield (0, hashingUtil_1.hashVerify)(userPassword, userHashedPass[0].userPassword);
        if (comapareStatus) {
            return true;
        }
        else {
            return false;
        }
    }
});
exports.logInUser = logInUser;
