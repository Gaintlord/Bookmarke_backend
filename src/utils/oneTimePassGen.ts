export const generateOTP = (): string => {
  const randomnum = Math.floor(100000 + Math.random() * 900000);
  return String(randomnum);
};

export const otpFormater = (): string => {
  const otp = generateOTP();

  const otpstring = otp.toString();
  return otpstring;
};
