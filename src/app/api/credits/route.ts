import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { verifyTokenFromRequest } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const decoded = verifyTokenFromRequest(req);

  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const credits = await prisma.credit.findMany({
      orderBy: { id: "asc" }, // optional: order by id
    });

    return NextResponse.json(credits);
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit types" },
      { status: 500 }
    );
  }
}
