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
exports.userSentBookmarkeAuth = void 0;
const zodDataModel_1 = require("../models/zodDataModel");
const userBokmarkeController_1 = require("../controllers/userBokmarkeController");
const userSentBookmarkeAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    // @ts-ignore
    // @ts-ignore
    const userId = parseInt(req.userid);
    console.log(userId);
    const validatedBokmarke = zodDataModel_1.userSentBokmarke.safeParse(req.body);
    if (!validatedBokmarke.success) {
        res.status(401).json({ status: "unsanitized data" });
    }
    else {
        const { image, link, hostName } = (_a = validatedBokmarke.data) === null || _a === void 0 ? void 0 : _a.userBokmarke;
        yield (0, userBokmarkeController_1.addUserBookmarke)(image, link, hostName, userId);
        res.status(201).json({ status: "Bokmarke stored" });
    }
});
exports.userSentBookmarkeAuth = userSentBookmarkeAuth;
