import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const parkedCars = await ParkedCar.find();
    return NextResponse.json(parkedCars, { status: 201 });
  } catch (error) {
    console.log("Something went wrong :", error);
  }
}
