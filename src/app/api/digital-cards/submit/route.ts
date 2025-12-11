import { NextResponse } from "next/server";
import { getFirestoreAdmin, serverTimestamp, increment } from "@/lib/firestoreAdmin";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

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
 * Supports both Firebase Auth and custom auth (userId in body)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId: bodyUserId,
      userEmail: bodyUserEmail,
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

    let userId: string;
    let userEmail: string;

    // Support custom auth (userId in body for admin/instructor)
    if (bodyUserId) {
      userId = bodyUserId;
      userEmail = bodyUserEmail || `${userId}@cpi-training.com`;
    } else {
      // Fallback to Firebase Auth
      const decoded = await verifyTokenFromRequest(req);
      if (!decoded) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      userId = decoded.uid;
      userEmail = decoded.email || userId;
    }

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

    const db = getFirestoreAdmin();

    // Check available credits
    const creditsSnapshot = await db.collection('credits')
      .where('userId', '==', userId)
      .get();

    let totalCredits = 0;
    creditsSnapshot.docs.forEach(doc => {
      totalCredits += doc.data().credits || 0;
    });

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

    // Generate unique class ID
    const classId = generateClassId();

    // Create digital card document
    const digitalCardData = {
      classId,
      program,
      site,
      classType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      accreditingInstructor,
      assistingInstructor: assistingInstructor || null,
      openEnrollment: openEnrollment || false,
      isLocked: true,
      submittedAt: serverTimestamp(),
      submittedBy: userEmail,
      creditsUsed: students.length,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const digitalCardRef = await db.collection('digitalCards').add(digitalCardData);

    // Create student documents as subcollection
    const batch = db.batch();
    students.forEach((student: any) => {
      const studentRef = digitalCardRef.collection('students').doc();
      batch.set(studentRef, {
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        certificateUrl: "/cpi-cert.pdf", // Mock certificate
        createdAt: serverTimestamp(),
      });
    });

    // Commit student batch
    await batch.commit();

    // Deduct credits (from first available credit type)
    if (creditsSnapshot.docs.length > 0) {
      const firstCreditDoc = creditsSnapshot.docs[0];
      await firstCreditDoc.ref.update({
        credits: increment(-students.length),
        updatedAt: serverTimestamp(),
      });
    }

    console.log(`✅ Digital card created: ${classId}, Credits used: ${students.length}`);

    return NextResponse.json({
      success: true,
      digitalCardId: digitalCardRef.id,
      classId,
      creditsUsed: students.length,
      studentsCount: students.length,
      message: "Digital card created and locked successfully",
    });

  } catch (error) {
    console.error("Error creating digital card:", error);
    return NextResponse.json(
      { error: "Failed to create digital card" },
      { status: 500 }
    );
  }
}
