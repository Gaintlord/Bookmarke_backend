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
exports.addUserBookmarke = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const dbSchemas_1 = require("../models/dbSchemas");
const dataBaseUtil_1 = require("../utils/dataBaseUtil");
const addUserBookmarke = (image, link, hostName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield dataBaseUtil_1.db.insert(dbSchemas_1.bokmarkeTable).values({
            userId: 45,
            pageLink: link,
            imageLink: image,
            hostName: hostName,
        });
    }
    catch (err) {
        const timeNow = new Date();
        // @ts-ignore
        if (err.cause.code === "23505") {
            yield dataBaseUtil_1.db
                .update(dbSchemas_1.bokmarkeTable)
                .set({ reAddedAt: timeNow })
                .where((0, drizzle_orm_1.eq)(dbSchemas_1.bokmarkeTable.pageLink, link));
        }
        else {
            console.log(`error for user ${45} at ${new Date()} :\n\n`, err);
        }
    }
});
exports.addUserBookmarke = addUserBookmarke;
