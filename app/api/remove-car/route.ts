import ParkedCar from "@/app/(models)/ParkedCar";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * Handles the HTTP DELETE request to remove a parked car from the database based on parkId.
 *
 * @param {NextRequest} request - The incoming HTTP request.
 * @returns {NextResponse} The HTTP response indicating the success of the operation.
 *
 * @throws {Response} If there's a validation error in parsing the request payload (status: 400).
 * @throws {NextResponse} If there's a server error while deleting the item (status: 500).
 */
export async function DELETE(
  request: NextRequest
): Promise<NextResponse | Response> {
  try {
    // Parse the JSON body to extract parkId
    const body = await request.json();
    const { parkId } = z.object({ parkId: z.string() }).parse(body);

    // Remove the parked car from the database based on parkId
    await ParkedCar.findByIdAndDelete(parkId);

    // Return success response with a 200 status
    return NextResponse.json("Car removed", { status: 200 });
  } catch (error) {
    // Handle validation errors or general server errors
    if (error instanceof z.ZodError) {
      // If there's a validation error, return a 400 response
      return new Response(error.message, { status: 400 });
    }

    // If there's a general server error, return a 500 response
    return NextResponse.json("Something went wrong deleting the item", {
      status: 500,
    });
  }
}
