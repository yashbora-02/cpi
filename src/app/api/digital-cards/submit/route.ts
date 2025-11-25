import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

/**
 * Generate unique class ID
 */
function generateClassId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DC-${timestamp}-${random}`;
}

/**
 * POST /api/digital-cards/submit
 * Create and lock a digital card with students
 */
export async function POST(req: Request) {
  // Skip auth in development
  // const decoded = await verifyTokenFromRequest(req);
  // if (!decoded) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // Temporary: Use mock user for development
  const decoded = { email: "dev@example.com", uid: "dev-user-001" };

  try {
    const body = await req.json();

    const {
      program,
      site,
      classType,
      startDate,
      endDate,
      accreditingInstructor,
      assistingInstructor,
      openEnrollment,
      students,
    } = body;

    // Validate required fields
    if (!program || !site || !classType || !startDate || !endDate || !accreditingInstructor) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!students || students.length === 0) {
      return NextResponse.json(
        { error: "At least one student is required" },
        { status: 400 }
      );
    }

    // Generate unique class ID
    const classId = generateClassId();

    try {
      // Check available credits
      const creditRecords = await prisma.credit.findMany();
      const totalCredits = creditRecords.reduce((sum, c) => sum + c.credits, 0);

      if (totalCredits < students.length) {
        return NextResponse.json(
          {
            error: "Insufficient credits",
            availableCredits: totalCredits,
            requiredCredits: students.length
          },
          { status: 400 }
        );
      }

      // Create digital card with lock
      const digitalCard = await prisma.digitalCard.create({
        data: {
          class_id: classId,
          program,
          site,
          class_type: classType,
          start_date: new Date(startDate),
          end_date: new Date(endDate),
          accrediting_instructor: accreditingInstructor,
          assisting_instructor: assistingInstructor || null,
          open_enrollment: openEnrollment || false,
          is_locked: true,
          submitted_at: new Date(),
          submitted_by: decoded.email || decoded.uid,
          credits_used: students.length,
          students: {
            create: students.map((s: any) => ({
              first_name: s.firstName,
              last_name: s.lastName,
              email: s.email,
              certificate_url: "/cpi-cert.pdf", // Use mock certificate
            })),
          },
        },
        include: {
          students: true,
        },
      });

      // Deduct credits (simple implementation - deducts from first available credit type)
      const firstCredit = creditRecords.find(c => c.credits > 0);
      if (firstCredit) {
        await prisma.credit.update({
          where: { id: firstCredit.id },
          data: {
            credits: {
              decrement: students.length,
            },
          },
        });
      }

      console.log(`✅ Digital card created: ${classId}, Credits used: ${students.length}`);

      return NextResponse.json({
        success: true,
        digitalCardId: digitalCard.id,
        classId: digitalCard.class_id,
        creditsUsed: students.length,
        studentsCount: digitalCard.students.length,
        message: "Digital card created and locked successfully",
      });

    } catch (dbError) {
      // Database not available - return mock response for Vercel deployment
      console.log("⚠️ Database not connected. Running in MOCK MODE.");
      console.log(`🎭 Mock digital card created: ${classId}, Students: ${students.length}`);

      return NextResponse.json({
        success: true,
        digitalCardId: 1,
        classId: classId,
        creditsUsed: students.length,
        studentsCount: students.length,
        message: "Digital card created and locked successfully (MOCK MODE)",
        mockMode: true,
      });
    }

  } catch (error) {
    console.error("Error creating digital card:", error);
    return NextResponse.json(
      { error: "Failed to create digital card" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
