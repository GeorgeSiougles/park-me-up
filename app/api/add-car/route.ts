import { ParkedCarSchema } from "@/app/types/ParkedCar";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import ParkedCar from "@/app/(models)/ParkedCar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = ParkedCarSchema.safeParse(body);

    if (result.success) {
      await ParkedCar.create(body);
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
