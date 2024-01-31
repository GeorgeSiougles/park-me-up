import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values using clsx and tailwind-merge.
 * @param {...ClassValue} inputs - Class values to be merged.
 * @returns {string} - Merged class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a timestamp into a localized date and time string.
 * @param {string} timestamp - The timestamp to format.
 * @returns {string} - The formatted date and time string.
 */
export const formatTimestamp = (timestamp: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(timestamp);
  const formattedDate: string = date.toLocaleString("en-us", options);

  return formattedDate;
};

/**
 * Calculates the time difference between a known timestamp and the current time.
 * @param {string} knownTimestamp - The known timestamp to compare against.
 * @returns {{ hh: number, mm: number, ss: number }} - Object representing the time difference in hours, minutes, and seconds.
 */
export const calculateTimeDifference = (
  knownTimestamp: string
): { hh: number; mm: number; ss: number } => {
  const knownDate = new Date(knownTimestamp);
  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - knownDate.getTime();

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return {
    hh: hours,
    mm: minutes,
    ss: seconds,
  };
};

/**
 * Displays the time in hours and minutes format.
 * @param {{ hh: number, mm: number }} - Object representing hours and minutes.
 * @returns {string} - Formatted time string.
 */
export const displayTime = ({ hh, mm }: { hh: number; mm: number }): string => {
  return `${hh} Hours ${mm} Minutes`;
};

/**
 * Calculates the parking cost based on hours parked and cost per hour.
 * @param {number} hoursParked - The number of hours parked.
 * @param {number} costPerHour - The cost per hour of parking.
 * @returns {number} - The calculated parking cost.
 * @throws {Error} - Throws an error for negative input hoursParked.
 */
export const calculateCost = (
  hoursParked: number,
  costPerHour: number
): number => {
  if (hoursParked < 0) throw new Error("Input error");
  if (hoursParked < 1) return costPerHour;

  return hoursParked * costPerHour;
};
