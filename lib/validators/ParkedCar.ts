import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const parkedCarValidator = z.object({
  carPlates: z.string(),
  carModel: z.string(),
  ownerPhone: z
    .string()
    .max(10, "Phone number should be 10 characters long")
    .regex(phoneRegex, "Invalid Number"),
});

export const parkedCars = z.array(parkedCarValidator);

export type ParkedCar = z.infer<typeof parkedCarValidator>;
