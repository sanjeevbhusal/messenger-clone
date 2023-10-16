import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from "bcrypt";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string(),
});

export async function POST(request: NextRequest) {
  const dto = await request.json();

  const parsedDto = formSchema.safeParse(dto);

  if (!parsedDto.success) {
    return NextResponse.json(
      { error: "Validation Error", errorDetail: parsedDto.error },
      { status: 400 }
    );
  }

  const { email, password } = parsedDto.data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User doesnot exist" }, { status: 404 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json({ error: "Password is invalid" }, { status: 401 });
  }

  // create a cookie and also return it in the header.

  return NextResponse.json({ success: true }, { status: 200 });
}
