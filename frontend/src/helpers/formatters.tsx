import dayjs from "dayjs";

/**
 *  This function takes a timestamp a returns it back in a readable formate of
 *  Aug 20 2021
 * @param date in a timestamp format
 * @returns return the data in this format > Aug 29 2021
 */
export const dataFormatter = (date: string) => {
    return dayjs(date).format("MMM D YYYY");
};
