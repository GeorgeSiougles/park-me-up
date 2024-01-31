import { ParkedCarSchema } from "@/app/types/ParkedCar";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import ParkedCar from "@/app/(models)/ParkedCar";
/**
 * Handles the HTTP POST request to add a parked car to the database.
 *
 * @param {NextRequest} request - The incoming HTTP request.
 * @returns {NextResponse} The HTTP response containing the result of the operation.
 *
 * @throws {NextResponse} If the request payload is invalid (status: 422) or if there's a general invalid request (status: 400).
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the JSON body using the ParkedCarSchema
    const body = await request.json();
    const result = ParkedCarSchema.safeParse(body);

    // Check if a car with the same plate letters and numbers already exists
    const existingCar = await ParkedCar.findOne({
      carPlateLetters: body.carPlateLetters,
      carPlateNumbers: body.carPlateNumbers,
    });

    if (existingCar) {
      return NextResponse.json(
        { message: "Car with the same plate already exists" },
        { status: 400 }
      );
    }

    if (result.success) {
      // Add the car to the database
      await ParkedCar.create(body);
      return NextResponse.json(
        { message: "Car added to the database" },
        { status: 201 }
      );
    }

    // If there are validation errors, return them in the response
    const serverErrors = Object.fromEntries(
      result.error?.issues.map((issue) => [issue.path[0], issue.message])
    );
    return NextResponse.json({ errors: serverErrors });
  } catch (error) {
    // Handle invalid request payloads or general errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload" },
        { status: 422 }
      );
    }
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
