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

export type TNames = "Autumn" | "Summar" | "Fall";
export type TCodes = "01" | "02" | "03";

export type TAcademicSemester = {
  name: TNames;
  code: TCodes;
  year: Date;
  startMonth: TMonths;
  endMonth: TMonths;
};
