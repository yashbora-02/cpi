import { NextResponse } from "next/server";
// import { PrismaClient } from "@/generated/prisma";
// import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

// const prisma = new PrismaClient();

export async function GET() {
  // Skip auth verification in development for now
  // TODO: Set up proper Firebase Admin credentials for production
  // const decoded = await verifyTokenFromRequest(req);
  // if (!decoded) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // Temporary mock data - replace with real database query when DB is set up
    const credits = [
      { id: 1, type: "cpr_only", credits: 25 },
      { id: 2, type: "first_aid_only", credits: 15 },
      { id: 3, type: "combo", credits: 10 },
    ];

    return NextResponse.json(credits);

    // Uncomment this when database is running:
    // const credits = await prisma.credit.findMany({
    //   orderBy: { id: "asc" },
    // });
    // return NextResponse.json(credits);
  } catch (error) {
    console.error("Error fetching credits:", error);
    return NextResponse.json(
      { error: "Failed to fetch credit types" },
      { status: 500 }
    );
  }
}
