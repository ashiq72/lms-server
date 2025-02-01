import Joi, { Schema } from "joi";

const studentValidationSchema: Schema = Joi.object({
  id: Joi.string().required(),
  name: Joi.object({
    firstName: Joi.string().max(20).trim().required(),
    middleName: Joi.string().allow(""),
    lastName: Joi.string().required(),
  }).required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emargencyNo: Joi.string().required(),
  bloodGroup: Joi.string().valid("A+", "A-", "B"),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  gurdian: Joi.object({
    fatherName: Joi.string().required(),
    fatherOccupation: Joi.string().required(),
    fatherContactNo: Joi.string().required(),
    motherName: Joi.string().required(),
    motherOccupation: Joi.string().required(),
    motherContactNo: Joi.string().required(),
  }).required(),
  localGurdian: Joi.object({
    name: Joi.string().required(),
    occupation: Joi.string().required(),
    contactNo: Joi.string().required(),
    Address: Joi.string().required(),
  }).required(),
  profileImage: Joi.string().uri(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
