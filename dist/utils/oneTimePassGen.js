"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpFormater = exports.generateOTP = void 0;
const generateOTP = () => {
    const randomnum = Math.floor(100000 + Math.random() * 900000);
    return String(randomnum);
};
exports.generateOTP = generateOTP;
const otpFormater = () => {
    const otp = (0, exports.generateOTP)();
    let date = new Date();
    const expire = Number(date) + 25 * 60 * 1000;
    let dbString = `${String(otp)}+${expire}`;
    return {
        otp,
        dbString,
    };
};
exports.otpFormater = otpFormater;
