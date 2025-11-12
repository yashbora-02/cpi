import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const decoded = await verifyTokenFromRequest(req);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const videos = await prisma.video.findMany();
    return NextResponse.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to fetch video playlist" },
      { status: 500 }
    );
  }
}
