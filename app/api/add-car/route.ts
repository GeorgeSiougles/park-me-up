import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestData = { ...body };
    await ParkedCar.create(requestData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    console.log("Error sending request to mongodb :", error);
  }
}
