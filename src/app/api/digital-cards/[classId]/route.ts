import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { classId: string } }
) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { classId } = params;

    // Fetch digital card with students
    const digitalCard = await prisma.digitalCard.findUnique({
      where: {
        class_id: classId,
      },
      include: {
        students: true,
      },
    });

    if (!digitalCard) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(digitalCard);
  } catch (error) {
    console.error("Error fetching digital card:", error);

    // Mock mode fallback
    console.log("⚠️ Database not connected. Running in MOCK MODE.");

    // Return mock data for development
    const mockData = {
      id: 1,
      class_id: params.classId,
      program: "CPI Adult First Aid | CPR AED All Ages (2020) -DC",
      site: "Arizona Provider Training, LLC",
      class_type: "Initial",
      start_date: "2025-05-30T00:00:00.000Z",
      end_date: "2025-05-30T00:00:00.000Z",
      accrediting_instructor: "John Doe",
      assisting_instructor: null,
      open_enrollment: false,
      is_locked: true,
      submitted_at: "2025-05-30T12:00:00.000Z",
      submitted_by: "user@example.com",
      credits_used: 1,
      students: [
        {
          id: 1,
          first_name: "Carrie",
          last_name: "Long",
          email: "carrie.long@example.com",
          certificate_url: null,
        },
      ],
      created_at: "2025-05-30T12:00:00.000Z",
      updated_at: "2025-05-30T12:00:00.000Z",
    };

    return NextResponse.json(mockData);
  } finally {
    await prisma.$disconnect();
  }
}
