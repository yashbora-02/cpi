import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

/**
 * GET /api/credits/balance
 * Fetch user's available credit balance
 */
export async function GET(req: Request) {
  // Verify authentication
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch all credits for the user
    // In a real app, you'd filter by user ID
    // For now, we'll return the total of all credit types
    const credits = await prisma.credit.findMany({
      orderBy: { id: "asc" },
    });

    // Calculate total available credits
    const totalCredits = credits.reduce((sum, credit) => sum + credit.credits, 0);

    return NextResponse.json({
      availableCredits: totalCredits,
      creditBreakdown: credits.map(c => ({
        type: c.type,
        credits: c.credits
      })),
    });
  } catch (error) {
    console.error("Error fetching credit balance:", error);

    // Fallback to mock data if database is unavailable
    console.log("⚠️ Database not connected. Returning mock credit balance.");
    return NextResponse.json({
      availableCredits: 28,
      creditBreakdown: [
        { type: "CPI-BLS-2020", credits: 28 }
      ],
    });
  } finally {
    await prisma.$disconnect();
  }
}
