export const generateOTP = (): number => {
  const randomnum = Math.floor(100000 + Math.random() * 900000);
  return randomnum;
};

export const otpFormater = (): string => {
  const otp = generateOTP();
  let date = new Date();
  const expire = Number(date) + 25 * 60 * 1000;
  let dbString = `${String(otp)}+${expire}`;

  return dbString;
};
