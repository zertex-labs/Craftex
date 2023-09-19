import z from "zod";

export const usernameSchema = z.string().min(4).max(64);
export const passwordSchema = z.string().min(8).max(255);
export const usernameWithPasswordSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

