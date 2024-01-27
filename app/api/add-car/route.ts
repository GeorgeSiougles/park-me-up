import ParkedCar from "@/app/(models)/ParkedCar";
import { NextResponse } from "next/server";

import { z } from "zod";
import { parkedCarValidator } from "@/lib/validators/ParkedCar";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requestData = { ...body };
    const result = parkedCarValidator.safeParse(requestData);
    if (result.success) {
      await ParkedCar.create(requestData);
      return NextResponse.json(
        { message: "Car added to database" },
        { status: 201 }
      );
    }
    const serverErrors = Object.fromEntries(
      result.error?.issues.map((issue) => [issue.path[0], issue.message])
    );
    return NextResponse.json({ errors: serverErrors });
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
