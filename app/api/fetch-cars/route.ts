// This constant is used to force dynamic behavior in a specific module.
export const dynamic = "force-dynamic";

import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";

/**
 * Handles the HTTP GET request to retrieve a list of parked cars from the database.
 *
 * @returns {NextResponse} The HTTP response containing the list of parked cars.
 *
 * @throws {NextResponse} If there's a server error while fetching data (status: 500).
 */
export async function GET(): Promise<NextResponse> {
  try {
    // Retrieve the list of parked cars from the database
    const parkedCars = await ParkedCar.find();

    // Return the list of parked cars with a 200 response
    return NextResponse.json(parkedCars, { status: 200 });
  } catch (error) {
    // If there's a server error, return a 500 response
    return NextResponse.json("Something went wrong fetching data", {
      status: 500,
    });
  }
}
