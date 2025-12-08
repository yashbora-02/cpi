import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { getFirestoreAdmin } from '@/lib/firestoreAdmin';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ classId: string }> }
) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { classId } = await params;
    const db = getFirestoreAdmin();

    // Find digital card by classId
    const digitalCardsSnapshot = await db.collection('digitalCards')
      .where('classId', '==', classId)
      .limit(1)
      .get();

    if (digitalCardsSnapshot.empty) {
      return NextResponse.json(
        { error: "Class not found" },
        { status: 404 }
      );
    }

    const digitalCardDoc = digitalCardsSnapshot.docs[0];
    const digitalCardData = {
      id: digitalCardDoc.id,
      ...digitalCardDoc.data(),
    };

    // Fetch students from subcollection
    const studentsSnapshot = await digitalCardDoc.ref.collection('students').get();
    const students = studentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Add students to response
    const response = {
      ...digitalCardData,
      students,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching digital card:", error);
    return NextResponse.json(
      { error: "Failed to fetch digital card" },
      { status: 500 }
    );
  }
}
