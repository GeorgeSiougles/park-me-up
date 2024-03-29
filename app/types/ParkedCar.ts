import { FieldError, UseFormRegister } from "react-hook-form";
import { ZodType, z } from "zod";

/**
 * Represents a parked car with optional metadata (_id, createdAt, updatedAt).
 */
export type ParkedCar = {
  _id?: string;
  carPlateLetters: string;
  carPlateNumbers: string;
  carModel: string;
  ownerPhone: string;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Represents the props for a form input related to a ParkedCar.
 */
export type ParkedCarFormProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<ParkedCar>;
  error: FieldError | undefined;
  valueAsNumber?: boolean;
  className?: string;
  maxLength?: number;
};

/**
 * Represents valid field names for a ParkedCar.
 */
export type ValidFieldNames =
  | "carPlateLetters"
  | "carPlateNumbers"
  | "carModel"
  | "ownerPhone";

// Regular expressions for validation
const carPlatesRegex = new RegExp(/^\d{4}$/);
const phoneRegex = new RegExp(/^\d{10}$/);

/**
 * Zod schema for validating ParkedCar objects.
 */
export const ParkedCarSchema: ZodType<ParkedCar> = z.object({
  carPlateLetters: z.string().length(3, { message: "ABC" }),
  carPlateNumbers: z
    .string()
    .length(4, { message: "1234" })
    .regex(carPlatesRegex, { message: "No letters allowed" }),
  carModel: z
    .string()
    .max(40, "Model should not be longer than 40 characters")
    .min(1, "Car model cannot be blank"),
  ownerPhone: z
    .string()
    .length(10, { message: "6987654321" })
    .regex(phoneRegex, { message: "No letters allowed" }),
});
