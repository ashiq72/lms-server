import { Model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  Address: string;
};

export type TStudent = {
  id: string;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth?: String;
  email: string;
  contactNo: string;
  emargencyNo: string;
  bloodGroup?: "A+" | "A-" | "B"; // ? mane optional
  presentAddress: string;
  permanentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImage?: string;
  isActive: "active" | "blocked";
};

// For creating Staic

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// For creating instance

// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
