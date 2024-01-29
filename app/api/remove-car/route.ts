import ParkedCar from "@/app/(models)/ParkedCar";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { parkId } = z.object({ parkId: z.string() }).parse(body);
    await ParkedCar.findByIdAndDelete(parkId);
    return NextResponse.json("Car removed", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return NextResponse.json("Something went wrong deleting the item", {
      status: 500,
    });
  }
}
