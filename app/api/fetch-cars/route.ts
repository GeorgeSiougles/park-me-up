export const dynamic = "force-dynamic";

import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const parkedCars = await ParkedCar.find();
    return NextResponse.json(parkedCars, { status: 201 });
  } catch (error) {
    return NextResponse.json("Something went wrong looking fetching data", {
      status: 500,
    });
  }
}
