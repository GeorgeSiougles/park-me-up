import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request: Response) {
  try {
    const body = await request.json();
    const parkedCarId = body.parkId;
    const parkedCar = await ParkedCar.findOne({
      _id: new ObjectId(parkedCarId),
    });
    if (!parkedCar) {
      return NextResponse.json("No data found", { status: 404 });
    }
    return NextResponse.json(parkedCar, { status: 200 });
  } catch (error) {
    console.log("Something went wrong :", error);
  }
}
