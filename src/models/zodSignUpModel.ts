import z, { email } from "zod";

export const zoduserSignUp = z.object({
  userEmail: z.email(),
  userPassword: z
    .string()
    .min(9, "Password must be greater than 9")
    .regex(/[a-z]/, "Password must contain a Capital Letter")
    .regex(/[A-Z]/, "Password must contain a Small Letter")
    .regex(/[0-9]/, "Password must contain a Number")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "Password must contain a Special Character"
    ),
});

export const emailVerify = z.object({
  userEmail: z.email(),
  otp: z.string().length(6),
});
