import { format } from "date-fns";

/**
 * @param {string} dateString
 * @returns {string}
 */
export const getFormattedDateText = (dateString) => {
  const date = getDateObjectFromString(dateString);
  return format(date, "do MMMM yyyy");
};

/**
 * @param {string} dateString
 * @returns {Date}
 */
export const getDateObjectFromString = (dateString) => {
  const [year, month, day] = dateString.split("-").map((i) => parseInt(i));
  return new Date(year, month, day);
};
