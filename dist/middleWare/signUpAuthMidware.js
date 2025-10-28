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
exports.signUpauthMidWare = void 0;
const zodSignUpModel_1 = require("../models/zodSignUpModel");
const hashingUtil_1 = require("../utils/hashingUtil");
const SignUpController_1 = require("../controllers/SignUpController");
const signUpEmailVerify_1 = require("../controllers/signUpEmailVerify");
const signUpauthMidWare = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseData = zodSignUpModel_1.zoduserSignUp.safeParse(req.body);
    //     IF WRONG INPUT
    if (!parseData.success) {
        res.status(400).json({
            status: false,
        });
    }
    //    FOR RIGHT INPUT
    else {
        const hashedPassword = yield (0, hashingUtil_1.HashFunction)(parseData.data.userPassword);
        const validatedData = {
            userEmail: parseData.data.userEmail,
            userPassword: hashedPassword,
        };
        // add user to database email pass and time
        const response = yield (0, SignUpController_1.signUpUser)(validatedData);
        if (response.detail.status) {
            //@ts-ignore
            yield (0, signUpEmailVerify_1.signUpOtpGen)(response.detail.userEmail);
            res.status(response.statusCode).json(response.detail);
        }
        else {
            res.status(response.statusCode).json(response.detail);
        }
    }
});
exports.signUpauthMidWare = signUpauthMidWare;
