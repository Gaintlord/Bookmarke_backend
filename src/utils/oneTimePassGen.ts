export const generateOTP = (): string => {
  const randomnum = Math.floor(100000 + Math.random() * 900000);
  return String(randomnum);
};

export const otpFormater = (): { otp: string; dbString: string } => {
  const otp = generateOTP();
  let date = new Date();
  const expire = Number(date) + 25 * 60 * 1000;
  let dbString = `${String(otp)}+${expire}`;

  return {
    otp,
    dbString,
  };
};
