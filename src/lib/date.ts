import { format as formatDateFns } from "date-fns";

export const formatDate = (date: string, format: string = "MMM d, yyyy") => {
  return formatDateFns(new Date(date), format);
};
