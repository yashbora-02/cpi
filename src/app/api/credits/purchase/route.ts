import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Use global shared in-memory storage for mock mode (shared with credits GET API)
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

type PurchaseRequest = {
  packageId: string;
  courseType: string; // Now accepts any course ID as the type
  credits: number;
  price: number;
};

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const decoded = await verifyTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: PurchaseRequest = await req.json();
    const { packageId, courseType, credits, price } = body;

    // Validate required fields
    if (!packageId || !courseType || !credits || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate course type is not empty
    if (typeof courseType !== 'string' || courseType.trim() === '') {
      return NextResponse.json(
        { error: "Invalid course type" },
        { status: 400 }
      );
    }

    try {
      // Find existing credit record for this type
      const existingCredit = await prisma.credit.findFirst({
        where: { type: courseType },
      });

      let updatedCredit;

      if (existingCredit) {
        // Update existing credit record
        updatedCredit = await prisma.credit.update({
          where: { id: existingCredit.id },
          data: {
            credits: existingCredit.credits + credits,
          },
        });
      } else {
        // Create new credit record
        updatedCredit = await prisma.credit.create({
          data: {
            type: courseType,
            credits: credits,
          },
        });
      }

      // TODO: In production, integrate with payment gateway here
      // - Process payment via Stripe, PayPal, etc.
      // - Verify payment confirmation
      // - Create transaction record
      // - Send confirmation email

      return NextResponse.json({
        success: true,
        message: "Credits purchased successfully",
        credit: updatedCredit,
        packageId,
        price,
      });
    } catch (dbError) {
      // Database not available - use mock mode with in-memory storage
      console.log("⚠️  Database not connected. Running in MOCK MODE.");
      console.log("💳 Purchase Details:");
      console.log("   - Package ID:", packageId);
      console.log("   - Course Type:", courseType);
      console.log("   - Credits:", credits);
      console.log("   - Price:", `$${price}`);
      console.log("   - User:", decoded.uid);

      // Update global in-memory mock storage
      if (!global.mockCreditsStore) {
        global.mockCreditsStore = {};
      }

      if (global.mockCreditsStore[courseType] !== undefined) {
        global.mockCreditsStore[courseType] += credits;
        console.log(`   ✅ Updated mock credits for ${courseType}: ${global.mockCreditsStore[courseType]} total`);
      } else {
        global.mockCreditsStore[courseType] = credits;
        console.log(`   ✅ Created new mock credit entry for ${courseType}: ${credits}`);
      }

      return NextResponse.json({
        success: true,
        message: "Credits purchased successfully (Mock Mode - No database connected)",
        packageId,
        courseType,
        credits,
        totalCredits: global.mockCreditsStore[courseType],
        price,
        mock: true,
      });
    }
  } catch (error) {
    console.error("Error processing purchase:", error);
    return NextResponse.json(
      { error: "Failed to process purchase" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve purchase history
export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      // TODO: In production, fetch from a purchases/transactions table
      // For now, return mock data
      return NextResponse.json([
        {
          id: 1,
          packageId: "COMBO-001",
          courseType: "combo",
          credits: 15,
          price: 349.99,
          purchaseDate: new Date().toISOString(),
        },
      ]);
    } catch (dbError) {
      console.log("⚠️  Database not connected. Returning mock purchase history.");
      return NextResponse.json([
        {
          id: 1,
          packageId: "MOCK-001",
          courseType: "combo",
          credits: 15,
          price: 349.99,
          purchaseDate: new Date().toISOString(),
          mock: true,
        },
      ]);
    }
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    return NextResponse.json(
      { error: "Failed to fetch purchase history" },
      { status: 500 }
    );
  }
}
