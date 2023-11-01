import dateFormat from "dateformat";

export function getFormattedTime(date) {
  return dateFormat(date, "h:MM:ss TT");
}
