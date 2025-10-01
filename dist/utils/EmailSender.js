"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.emailSender = void 0;
const nodemailer = __importStar(require("nodemailer"));
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: "brenda.howe@ethereal.email",
        pass: "qXXruTregYvyRJQR2B",
    },
});
const emailSender = (otp, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailDetail = yield transporter.sendMail({
            from: "brenda.howe@ethereal.email",
            to: email,
            subject: "Your Freezebee Verification otp",
            text: `your One Time Password Is ${otp}\n\n\n\n
      http://localhost:8081/api/v1/email-verify?userEmail=${email}&otp=${otp}`,
            html: emailHTML(otp, email),
        });
        console.log("mail delivered");
    }
    catch (err) {
        console.log("following error had occured", err);
    }
});
exports.emailSender = emailSender;
const emailHTML = (otp, email) => {
    return `<div style="font-family: Arial, sans-serif; line-height: 1.5; width: 100%; text-align: center; padding: 15px 0;">
  <h2 style="margin-bottom: 50px; font-size: 32px; color: #333;">
    Your Freezebee Verification Code :
  </h2>
  
  
  <div style="
    display: inline-block;
    background: #caf0f8;
    padding: 8px 20px;
    border-radius: 16px;
    font-size: 55px;
    font-weight: bold;
    color: #1b263b;
    box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
    letter-spacing: 12px;
  ">
    ${otp}
  </div>

  
  <div style="margin-top: 90px; font-size: 22px; color: #444;font-style:italic">
    Or click on this link to verify
  </div>

  
  <div style="margin-top: 20px;">
    <a href="http://localhost:8081/api/v1/email-verify?userEmail=${email}&otp=${otp}"
      
      style="display:inline-block; padding:12px 20px; background:#00b4d8; color:#fff;
              text-decoration:none; font-size:22px; border-radius:6px;box-shadow: 0px 4px 12px rgba(0,0,0,0.2);">
      Verify My Account
    </a>
  </div>
</div>`;
};
