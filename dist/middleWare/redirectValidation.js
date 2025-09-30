"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectValidation = void 0;
const zodSignUpModel_1 = require("../models/zodSignUpModel");
const redirectValidation = (req, res, next) => {
    const data = zodSignUpModel_1.emailVerify.safeParse(req.query);
    if (!data.success) {
        res.status(401).json({
            message: "Unsanitized Data query",
        });
    }
    else {
        next();
    }
};
exports.redirectValidation = redirectValidation;
