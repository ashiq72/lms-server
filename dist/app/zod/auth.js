"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Id is required" }),
        password: zod_1.z.string({ required_error: "password is required" }),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
};
