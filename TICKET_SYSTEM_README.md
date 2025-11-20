# CPI Training Platform - Ticket System Documentation

## Overview

A comprehensive support ticket system integrated into the CPI Training Platform with modern UI, file upload capabilities, and automated email confirmations.

## Features

### 3.1 Support Options

The Support Center (`/support`) includes:

1. **Create Support Ticket** - Opens a comprehensive ticket submission form
2. **Phone Support** - Direct link to call support: 1-800-555-0123 (Mon-Fri, 9AM-5PM EST)
3. **AI Chatbot** - Entry point for 24/7 automated assistance (placeholder for future integration)
4. **Privacy Policy** - Link to privacy policy page

### 3.2 Ticket Types

Users can select from two ticket types:

- **General Request** (Default) - For general inquiries, questions, or requests
- **Application Issue / Bug** - For technical issues or bugs

### 3.3 Ticket Form Fields

All fields are validated client-side and server-side:

**Required Fields:**
- **Title** - Brief summary of the issue
- **Description** - Detailed explanation (multi-line textarea)
- **Reported By** - Full name of the person submitting
- **Email** - Valid email address (validated with regex)
- **Phone Number** - Contact phone number (validated format)

**Optional Fields:**
- **File Attachment** - Upload screenshots, documents, etc.
  - Supported formats: Images (PNG, JPG, etc.), PDF, DOC, DOCX, TXT
  - Maximum file size: 10MB
  - Files are securely stored in `/public/uploads/tickets/`

### 3.4 Confirmation Email

After successful ticket submission, users receive:

1. **On-screen confirmation** with:
   - Unique ticket number (format: `TICKET-[TIMESTAMP]-[RANDOM]`)
   - Success message
   - Response time estimate (48 hours)

2. **Email confirmation** (currently logged to console, ready for email service integration):
   - Subject: `Support Ticket Created: [TICKET-NUMBER]`
   - Message: "Hey [NAME], we got your ticket! We are working on it and will answer within 48 hours."
   - Includes ticket number for reference

## Database Schema

### Ticket Model

```prisma
model Ticket {
  id           Int      @id @default(autoincrement())
  ticket_number String  @unique
  type         String   // "General Request" or "Application Issue / Bug"
  title        String
  description  String   @db.Text
  reported_by  String
  email        String
  phone        String
  file_url     String?  // Optional file attachment URL
  file_name    String?  // Original filename
  status       String   @default("open") // open, in_progress, resolved, closed
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt

  @@map("tickets")
}
```

## API Endpoints

### POST /api/tickets

Creates a new support ticket.

**Authentication:** Required (Firebase ID token)

**Request:** `multipart/form-data`
```json
{
  "type": "General Request",
  "title": "Issue title",
  "description": "Detailed description",
  "reportedBy": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "file": File (optional)
}
```

**Response:**
```json
{
  "success": true,
  "ticketNumber": "TICKET-ABC123-XYZ",
  "message": "Ticket created successfully"
}
```

### GET /api/tickets

Retrieves all tickets (limited to last 50).

**Authentication:** Required (Firebase ID token)

**Response:**
```json
[
  {
    "id": 1,
    "ticket_number": "TICKET-ABC123-XYZ",
    "type": "General Request",
    "title": "Sample ticket",
    "description": "Detailed description",
    "reported_by": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "file_url": "/uploads/tickets/screenshot_1234567890.png",
    "file_name": "screenshot_1234567890.png",
    "status": "open",
    "created_at": "2025-11-20T10:00:00.000Z",
    "updated_at": "2025-11-20T10:00:00.000Z"
  }
]
```

## File Upload Security

1. **File Size Limit:** 10MB maximum
2. **Type Validation:** Only allowed file types (images, PDFs, documents)
3. **Secure Storage:** Files stored in `/public/uploads/tickets/` with sanitized filenames
4. **Unique Naming:** Timestamp-based naming prevents overwrites
5. **Directory Creation:** Automated directory creation with proper permissions

## Email Integration (To-Do)

The email confirmation system is ready for integration. To enable:

1. Choose an email service (SendGrid, AWS SES, Mailgun, etc.)
2. Install the email service SDK
3. Update the `sendConfirmationEmail` function in `/src/app/api/tickets/route.ts`
4. Add email service credentials to `.env.local`

**Example with SendGrid:**

```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendConfirmationEmail(email: string, ticketNumber: string, name: string) {
  const msg = {
    to: email,
    from: 'support@cpitraining.com',
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
  };

  await sgMail.send(msg);
}
```

## Navigation

The Support Center is accessible via:

1. **Sidebar Navigation:** Support → Support Center
2. **Direct URL:** `/support`
3. **Requires Authentication:** Users must be logged in

## UI/UX Features

- ✅ Modern, clean design matching CPI brand colors
- ✅ Responsive layout (mobile-friendly)
- ✅ Real-time form validation
- ✅ Loading states during submission
- ✅ Success confirmation with ticket number
- ✅ Error handling with user-friendly messages
- ✅ Smooth animations and transitions
- ✅ Professional icons (React Icons)
- ✅ Accessible forms with proper labels

## Setup Instructions

1. **Update Database Schema:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Create Uploads Directory** (already created):
   ```bash
   mkdir -p public/uploads/tickets
   ```

3. **Access Support Page:**
   - Navigate to http://localhost:3002/support
   - Or click "Support Center" in the sidebar

## Future Enhancements

- [ ] Integrate email service (SendGrid, AWS SES, etc.)
- [ ] Add ticket management dashboard for admins
- [ ] Implement real AI chatbot integration
- [ ] Add ticket status tracking for users
- [ ] Email notifications for ticket updates
- [ ] Ticket priority levels
- [ ] Attachment preview functionality
- [ ] Search and filter tickets
- [ ] Ticket assignment to support agents
- [ ] SLA (Service Level Agreement) tracking

## Testing

To test the ticket system:

1. Log in to the platform
2. Navigate to Support Center
3. Click "Create Support Ticket"
4. Fill out the form with test data
5. Optionally upload a test file
6. Submit the ticket
7. Verify success message and ticket number
8. Check console logs for email confirmation details

## Support

For questions about the ticket system implementation, contact the development team.

---

**Built with:** Next.js 15, TypeScript, Prisma, Firebase Auth, React Icons
**Last Updated:** November 2025
