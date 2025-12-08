import { NextRequest, NextResponse } from "next/server";
import { getFirestoreAdmin, serverTimestamp } from "@/lib/firestoreAdmin";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { sendTicketNotificationToAdmin, sendTicketConfirmationToUser } from "@/lib/email";

export const dynamic = "force-dynamic";

// Generate unique ticket number
function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TICKET-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const decoded = await verifyTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse form data
    const formData = await req.formData();

    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const reportedBy = formData.get("reportedBy") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("file") as File | null;

    // Validate required fields
    if (!title || !description || !reportedBy || !email || !phone) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    let fileUrl: string | null = null;
    let fileName: string | null = null;

    // Handle file upload if present
    if (file) {
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadsDir = path.join(process.cwd(), "public", "uploads", "tickets");
        await mkdir(uploadsDir, { recursive: true });

        // Generate unique filename
        const timestamp = Date.now();
        const ext = path.extname(file.name);
        const baseFileName = path.basename(file.name, ext).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        fileName = `${baseFileName}_${timestamp}${ext}`;
        const filePath = path.join(uploadsDir, fileName);

        // Write file
        await writeFile(filePath, buffer);
        fileUrl = `/uploads/tickets/${fileName}`;
      } catch (fileError) {
        console.error("File upload error:", fileError);
        return NextResponse.json(
          { error: "Failed to upload file" },
          { status: 500 }
        );
      }
    }

    // Generate ticket number
    const ticketNumber = generateTicketNumber();

    // Create ticket in Firestore
    const db = getFirestoreAdmin();
    const ticketData = {
      ticketNumber,
      type: type || "General Request",
      title,
      description,
      reportedBy,
      email,
      phone,
      fileUrl: fileUrl || null,
      fileName: fileName || null,
      status: "open",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const ticketRef = await db.collection('tickets').add(ticketData);

    console.log(`✅ Ticket created: ${ticketNumber} (ID: ${ticketRef.id})`);

    // Send email notifications
    console.log("📧 Sending email notifications...");

    // Send notification to admin
    const adminEmailResult = await sendTicketNotificationToAdmin({
      ticketNumber,
      type: type || "General Request",
      title,
      description,
      reportedBy,
      email,
      phone,
      fileName,
    });

    if (adminEmailResult.success) {
      console.log("✅ Admin notification sent successfully");
    } else {
      console.error("❌ Failed to send admin notification:", adminEmailResult.error);
    }

    // Send confirmation to user
    const userEmailResult = await sendTicketConfirmationToUser(email, ticketNumber, reportedBy);

    if (userEmailResult.success) {
      console.log("✅ User confirmation sent successfully");
    } else {
      console.error("❌ Failed to send user confirmation:", userEmailResult.error);
    }

    return NextResponse.json({
      success: true,
      ticketNumber,
      ticketId: ticketRef.id,
      message: "Ticket created successfully",
      emailsSent: {
        admin: adminEmailResult.success,
        user: userEmailResult.success,
      },
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json(
      { error: "Failed to create ticket" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve tickets
export async function GET(req: NextRequest) {
  try {
    const decoded = await verifyTokenFromRequest(req);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getFirestoreAdmin();
    const ticketsSnapshot = await db.collection('tickets')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const tickets = ticketsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
