import { NextRequest, NextResponse } from "next/server";
import { getFirestoreAdmin, serverTimestamp } from "@/lib/firestoreAdmin";

export const dynamic = "force-dynamic";

/**
 * PATCH /api/tickets/[ticketId]
 * Update ticket status
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { ticketId } = params;
    const body = await req.json();
    const { status } = body;

    // Validate status
    const validStatuses = ["open", "in_progress", "resolved", "closed"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be one of: open, in_progress, resolved, closed" },
        { status: 400 }
      );
    }

    const db = getFirestoreAdmin();
    const ticketRef = db.collection("tickets").doc(ticketId);

    // Check if ticket exists
    const ticketDoc = await ticketRef.get();
    if (!ticketDoc.exists) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    // Update ticket status
    await ticketRef.update({
      status,
      updatedAt: serverTimestamp(),
    });

    console.log(`✅ Ticket ${ticketId} status updated to: ${status}`);

    return NextResponse.json({
      success: true,
      ticketId,
      status,
      message: "Ticket status updated successfully",
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/tickets/[ticketId]
 * Get single ticket by ID
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { ticketId } = params;
    const db = getFirestoreAdmin();

    const ticketDoc = await db.collection("tickets").doc(ticketId).get();

    if (!ticketDoc.exists) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: ticketDoc.id,
      ...ticketDoc.data(),
    });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}
