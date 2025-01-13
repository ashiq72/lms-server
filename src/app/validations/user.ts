import { z } from "zod";

const userValidationSchema = z.object({
  password: z
    .string()
    .max(20, { message: "password can not be more than 20 characters" })
    .optional(),
  needsPasswordChange: z.boolean().optional().default(true),
  role: z.enum(["admin", "student", "faculty"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().optional().default(false),
});

export const userValidation = {
  userValidationSchema,
};
