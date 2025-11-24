import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
// import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Shared in-memory storage for mock mode - must be imported from the same module
// This will be shared across the API routes during runtime
declare global {
  var mockCreditsStore: { [key: string]: number } | undefined;
}

// Initialize global mock storage if it doesn't exist
if (!global.mockCreditsStore) {
  global.mockCreditsStore = {
    "CPI-FA-2020": 10,
    "CPI-FA-CPR-AI-2020": 8,
    "CPI-FA-CPR-AA-2020": 0,
    "CPI-BLS-2020": 25,
    "CPI-CPR-AA-2020": 8,
    "CPI-ES-FA-CPR-2020": 0,
  };
}

// Function to get mock credits array from the store
function getMockCreditsArray() {
  const store = global.mockCreditsStore || {};
  return Object.entries(store).map(([type, credits], index) => ({
    id: index + 1,
    type,
    credits,
  }));
}

export async function GET() {
  // Skip auth verification in development for now
  // TODO: Set up proper Firebase Admin credentials for production
  // const decoded = await verifyTokenFromRequest(req);
  // if (!decoded) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    // Try to fetch from database
    const credits = await prisma.credit.findMany({
      orderBy: { id: "asc" },
    });

    console.log("✅ Fetched credits from database:", credits.length, "records");
    return NextResponse.json(credits);
  } catch (error) {
    // Database not available - use mock mode with shared global storage
    const mockCredits = getMockCreditsArray();
    console.log("⚠️  Database not connected. Returning MOCK credits data.");
    console.log("   Mock credits:", mockCredits.length, "courses");
    console.log("   Current mock store:", global.mockCreditsStore);
    return NextResponse.json(mockCredits);
  }
}
