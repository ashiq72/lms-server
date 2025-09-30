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

export type TFaculty = {
  name: TNames;
  code: TCodes;
  year: String;
  startMonth: TMonths;
  endMonth: TMonths;
};
