import bcrypt from "bcrypt";

export const HashFunction = async (data: string) => {
  const salt = process.env.BCRYPTSALT || 7;
  return await bcrypt.hash(data, salt);
};

export const hashVerify = async (data: string, hashedData: string) => {
  const status = await bcrypt.compare(data, hashedData);
  return status;
};
