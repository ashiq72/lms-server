"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterValidations = void 0;
const zod_1 = require("zod");
const createAcademicSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum(["Autumn", "Summar", "Fall"]),
        year: zod_1.z.string(),
        code: zod_1.z.enum(["01", "02", "03"]),
        startMonth: zod_1.z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]),
        endMonth: zod_1.z.enum([
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]),
    }),
});
exports.AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
};
