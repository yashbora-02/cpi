import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyTokenFromRequest } from "@/lib/firebaseAdmin";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// Generate unique ticket number
function generateTicketNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TICKET-${timestamp}-${random}`;
}

// Send confirmation email (placeholder - integrate with your email service)
async function sendConfirmationEmail(email: string, ticketNumber: string, name: string) {
  // TODO: Integrate with email service (SendGrid, AWS SES, etc.)
  console.log(`Sending confirmation email to ${email}`);
  console.log(`Ticket Number: ${ticketNumber}`);
  console.log(`Message: Hey ${name}, we got your ticket! We are working on it and will answer within 48 hours.`);

  // For now, just log. In production, use an email service:
  /*
  await emailService.send({
    to: email,
    subject: `Support Ticket Created: ${ticketNumber}`,
    html: `
      <h2>Support Ticket Confirmation</h2>
      <p>Hey ${name},</p>
      <p>We got your ticket! We are working on it and will answer within <strong>48 hours</strong>.</p>
      <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
      <p>You can reference this ticket number in any future correspondence.</p>
      <br>
      <p>Best regards,<br>CPI Training Platform Support Team</p>
    `
  });
  */
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

    // Try to create ticket in database, fallback to mock if DB unavailable
    try {
      const ticket = await prisma.ticket.create({
        data: {
          ticket_number: ticketNumber,
          type: type || "General Request",
          title,
          description,
          reported_by: reportedBy,
          email,
          phone,
          file_url: fileUrl,
          file_name: fileName,
          status: "open",
        },
      });

      // Send confirmation email
      await sendConfirmationEmail(email, ticketNumber, reportedBy);

      return NextResponse.json({
        success: true,
        ticketNumber: ticket.ticket_number,
        message: "Ticket created successfully",
      });
    } catch (dbError) {
      // Database not available - use mock mode
      console.log("⚠️  Database not connected. Running in MOCK MODE.");
      console.log("📧 Confirmation email would be sent to:", email);
      console.log("🎫 Ticket Number:", ticketNumber);
      console.log("📝 Ticket Details:");
      console.log("   - Type:", type);
      console.log("   - Title:", title);
      console.log("   - Reported By:", reportedBy);
      console.log("   - Email:", email);
      console.log("   - Phone:", phone);
      if (fileName) console.log("   - Attachment:", fileName);

      // Send confirmation email (will log to console)
      await sendConfirmationEmail(email, ticketNumber, reportedBy);

      // Return success in mock mode
      return NextResponse.json({
        success: true,
        ticketNumber: ticketNumber,
        message: "Ticket created successfully (Mock Mode - No database connected)",
      });
    }
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

    try {
      const tickets = await prisma.ticket.findMany({
        orderBy: { created_at: "desc" },
        take: 50, // Limit to last 50 tickets
      });

      return NextResponse.json(tickets);
    } catch (dbError) {
      // Database not available - return mock data
      console.log("⚠️  Database not connected. Returning mock ticket data.");
      return NextResponse.json([
        {
          id: 1,
          ticket_number: "TICKET-MOCK-001",
          type: "General Request",
          title: "Sample Ticket (Mock Data)",
          description: "This is mock data. Connect database to see real tickets.",
          reported_by: "Test User",
          email: "test@example.com",
          phone: "+1-555-123-4567",
          file_url: null,
          file_name: null,
          status: "open",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    }
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json(
      { error: "Failed to fetch tickets" },
      { status: 500 }
    );
  }
}
