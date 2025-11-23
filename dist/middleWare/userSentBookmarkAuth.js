"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSentBookmarkeAuth = void 0;
const zodDataModel_1 = require("../models/zodDataModel");
const userBokmarkeController_1 = require("../controllers/userBokmarkeController");
const userSentBookmarkeAuth = (req, res) => {
    var _a;
    console.log(req.body);
    const validatedBokmarke = zodDataModel_1.userSentBokmarke.safeParse(req.body);
    if (!validatedBokmarke.success) {
        console.log("## currupt data ##");
        res.status(401).json({ status: "unsanitized data" });
    }
    else {
        const { image, link, hostName } = (_a = validatedBokmarke.data) === null || _a === void 0 ? void 0 : _a.userBokmarke;
        (0, userBokmarkeController_1.addUserBookmarke)(image, link, hostName);
        res.status(201).json({ status: "stored" });
    }
};
exports.userSentBookmarkeAuth = userSentBookmarkeAuth;
