import { z } from "zod";
const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string().optional().or(z.literal("")), // Allow empty string
  lastName: z.string().min(1).max(20),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1),
  fatherOccupation: z.string().min(1),
  fatherContactNo: z.string().min(1),
  motherName: z.string().min(1),
  motherOccupation: z.string().min(1),
  motherContactNo: z.string().min(1),
});

const localGuardianSchema = z.object({
  name: z.string().min(1),
  occupation: z.string().min(1),
  contactNo: z.string().min(1),
  address: z.string().min(1),
});

export const studentValidationSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1).max(20),
  name: userNameSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().optional(), // Make optional
  email: z.string().email(),
  contactNo: z.string().min(1),
  emergencyContactNo: z.string().min(1),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(), // Optional
  presentAddress: z.string().min(1),
  permanentAddress: z.string().min(1),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(), // Make optional
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().optional().default(false),
});

export default studentValidationSchema;
