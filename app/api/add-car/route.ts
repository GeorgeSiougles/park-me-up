import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";
// import { ParkedCar } from "@/app/types/ParkedCar";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestData = { ...body };
    console.log("Request Data: ", requestData);
    console.log(requestData);
    await ParkedCar.create(requestData);
    return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
  } catch (error) {
    console.log("Error sending request to mongodb :", error);
  }
}
