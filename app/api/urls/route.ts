import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = await prisma.url.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return NextResponse.json({ urls });
  } catch (err) {
    console.error("error getting urls", err);
    return NextResponse.json({ error: "error serve urls" }, { status: 500 });
  }
}
