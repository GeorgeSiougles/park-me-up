import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const parkedCarValidator = z.object({
  carPlates: z.string().max(8, "Plates should be 8 characters long maximum"),
  carModel: z.string().max(40, "Model should not be longer than 40 characters"),
  ownerPhone: z
    .string()
    .max(10, "Phone number should be 10 characters long")
    .regex(phoneRegex, "Invalid Number"),
});

export const parkedCars = z.array(parkedCarValidator);

export type ParkedCar = z.infer<typeof parkedCarValidator>;
