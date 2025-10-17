export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TNames = "Autumn" | "Summer" | "Fall";
export type TCodes = "01" | "02" | "03";

export type TAcademicSemester = {
  name: TNames;
  code: TCodes;
  year: String;
  startMonth: TMonths;
  endMonth: TMonths;
};
