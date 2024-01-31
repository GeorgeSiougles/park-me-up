import ParkedCar from "@/app/(models)/ParkedCar";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the HTTP POST request to retrieve a parked car from the database based on parkId.
 *
 * @param {NextRequest} request - The incoming HTTP request.
 * @returns {NextResponse} The HTTP response containing the result of the operation.
 *
 * @throws {Response} If there's a validation error in parsing the request payload (status: 400).
 * @throws {NextResponse} If the requested parked car is not found in the database (status: 404) or if there's a general server error (status: 500).
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse | Response> {
  try {
    // Parse the JSON body to extract parkId
    const body = await request.json();
    const { parkId } = z.object({ parkId: z.string() }).parse(body);

    // Find the parked car in the database based on parkId
    const parkedCar = await ParkedCar.findOne({
      _id: new ObjectId(parkId),
    });

    // If the parked car is not found, return a 404 response
    if (!parkedCar) {
      return NextResponse.json("No data found", { status: 404 });
    }

    // Return the parked car details with a 200 response
    return NextResponse.json(parkedCar, { status: 200 });
  } catch (error) {
    // Handle validation errors or general server errors
    if (error instanceof z.ZodError) {
      // If there's a validation error, return a 400 response
      return new Response(error.message, { status: 400 });
    }

    // If there's a general server error, return a 500 response
    return NextResponse.json(
      "Something went wrong looking for the item in the database",
      { status: 500 }
    );
  }
}
