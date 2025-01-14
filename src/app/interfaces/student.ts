// 1. Create an interface representing a document in MongoDB.
export type Gurdian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type userName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type localGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  Address: string;
};

export type Student = {
  id: string;
  name: userName;
  gender: "male" | "female";
  dateOfBirth?: String;
  email: string;
  contactNo: string;
  emargencyNo: string;
  bloodGroup?: "A+" | "A-" | "B"; // ? mane optional
  presentAddress: string;
  permanentAddress: string;
  gurdian: Gurdian;
  localGurdian: localGurdian;
  profileImage?: string;
  isActive: "active" | "blocked";
};
