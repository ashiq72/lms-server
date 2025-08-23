import { z } from "zod";

const academicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: "Academic faculty must be string",
  }),
});

export const AcademicSemesterValidation = {
  academicFacultyValidationSchema,
};
