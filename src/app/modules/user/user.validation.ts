import { z } from "zod";
import { UserStatus } from "./user.constant";
import { string } from "joi";

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
});
const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  userValidationSchema,
  changeStatusValidationSchema,
};
