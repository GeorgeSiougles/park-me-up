import { Regex } from "lucide-react";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const carPlatesRegex = new RegExp(/^[A-Z]{3}-\d{4}$/);

export const parkedCarValidator = z.object({
  carPlates: z
    .string()
    .length(8, "Car plates should be 8 characters long")
    .includes("-", { message: "- missing from Car plates [ABC-1234]" })
    .regex(carPlatesRegex, "Invalid format [ABC-1234]"),
  carModel: z
    .string()
    .max(40, "Model should not be longer than 40 characters")
    .min(1, "Car model cannot be blank"),
  ownerPhone: z
    .string()
    .regex(phoneRegex, "Phone should be a number")
    .length(10, "Phone number should be 10 characters long"),
});

export const parkedCars = z.array(parkedCarValidator);

export type ParkedCarSchema = z.infer<typeof parkedCarValidator>;
