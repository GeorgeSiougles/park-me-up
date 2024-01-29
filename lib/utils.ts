import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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

export const calculateTimeDifference = (
  knownTimestamp: string
): {
  hh: number;
  mm: number;
  ss: number;
} => {
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

export const displayTime = ({ hh, mm }: { hh: number; mm: number }): string => {
  return `${hh} Hours ${mm} Minutes`;
};

export const calculateCost = (
  hoursParked: number,
  costPerHour: number
): number => {
  if (hoursParked < 0) throw new Error("Input error");
  if (hoursParked < 1) return costPerHour;

  return hoursParked * costPerHour;
};
