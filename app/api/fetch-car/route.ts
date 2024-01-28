import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { z } from "zod";

export async function POST(request: Response) {
  try {
    const body = await request.json();
    const { parkId } = z.object({ parkId: z.string() }).parse(body);
    const parkedCar = await ParkedCar.findOne({
      _id: new ObjectId(parkId),
    });
    if (!parkedCar) {
      return NextResponse.json("No data found", { status: 404 });
    }
    return NextResponse.json(parkedCar, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return NextResponse.json(
      "Something went wrong looking for the item in the database",
      { status: 500 }
    );
  }
}
