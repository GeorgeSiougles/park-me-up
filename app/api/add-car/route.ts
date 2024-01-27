import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestData = { ...body };
    if (
      requestData.carPlates.trim().length === 0 ||
      requestData.carPlates.trim().length < 8
    )
      return NextResponse.json(
        { message: "Car plates invalid" },
        { status: 422 }
      );
    if (!requestData.carPlates.includes("-"))
      return NextResponse.json(
        { message: "Car plates does not contain -" },
        { status: 422 }
      );
    if (
      requestData.carModel.trim().length === 0 ||
      requestData.carModel.trim().length > 40
    )
      return NextResponse.json(
        { message: "Car Model invalid" },
        { status: 422 }
      );
    if (
      requestData.ownerPhone.trim().length === 0 ||
      requestData.ownerPhone.trim().length !== 10
    )
      return NextResponse.json(
        { message: "Owner Phone invalid" },
        { status: 422 }
      );
    if (
      requestData.ownerPhone.trim().length === 0 ||
      requestData.ownerPhone.trim().length !== 10
    )
      return NextResponse.json(
        { message: "Owner Phone invalid" },
        { status: 422 }
      );
    await ParkedCar.create(requestData);
    return NextResponse.json(
      { message: "Car added to database" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid request payload" },
        { status: 422 }
      );
    }
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}
