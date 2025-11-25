# Digital Card System - Updated Requirements Specification

## Document Version
**Version:** 2.0
**Date:** 2025-11-25
**Status:** Final Specification

---

## 1. Overview

This document outlines the updated requirements for the Digital Card System within the CPI Training Platform's Create Class flow. The Digital Card System allows instructors to create certification cards for students who complete classroom training.

### 1.1 Key Changes Summary
- Simplified Step 3 (Review & Submit) to show only a Submit button
- Added Credit Confirmation popup before submission
- Lock Digital Cards after confirmation
- New Final Page with certificate display and sidebar navigation
- Removed inline editing after submission

---

## 2. Updated User Flow

### 2.1 High-Level Flow Diagram
```
┌─────────────────────────────────────────────────────────────┐
│ Step 1: Enter Details                                       │
│ - Program selection                                         │
│ - Site, Class Type, Dates                                   │
│ - Instructors, Open Enrollment                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 2: Build Roster                                        │
│ - Enter Student / Upload CSV / Select Student              │
│ - View roster table (read-only during this step)           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ Step 3: Review and Submit                                   │
│ ✓ Show class details (read-only)                           │
│ ✓ Show roster table (read-only, NO edit/delete)            │
│ ✓ Show ONLY "Submit" button                                │
│ ✗ Remove email notification toggles                        │
│ ✗ Remove "Send Class Notifications" button                 │
│ ✗ Remove edit/delete actions in roster                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼ (User clicks Submit)
┌─────────────────────────────────────────────────────────────┐
│ Credit Confirmation Popup                                   │
│ - Display Available Credits                                 │
│ - Display Credits to Use (1 per student)                    │
│ - Display Remaining Credits                                 │
│ - Confirm / Cancel buttons                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼ (User confirms)
┌─────────────────────────────────────────────────────────────┐
│ Digital Card LOCKED                                         │
│ - Card becomes immutable                                    │
│ - Credit deducted from account                              │
│ - Record saved to database                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│ Final Page (Success View)                                   │
│ ✓ Full sidebar navigation visible                          │
│ ✓ All submitted information displayed (read-only)          │
│ ✓ Individual certificate for each student                   │
│ ✓ "Edit" button (raises support ticket, doesn't unlock)    │
│ ✓ "Create New Class" button                                │
│ ✓ Download/Print certificate options                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Requirements by Component

### 3.1 Step 3: Review & Submit (UPDATED)

#### 3.1.1 What to Display
- **Class Details Card** (read-only)
  - Program name
  - Location/Site
  - Class Status
  - Class ID
  - Start Date
  - End Date
  - Accrediting Instructor
  - Assisting Instructor
  - Open Enrollment status
  - Class Notes

- **Student Roster Table** (read-only)
  - Columns: #, Name, Email, Status
  - Show total student count
  - NO edit button
  - NO delete button
  - NO actions column

- **Action Buttons**
  - Show ONLY: **"Submit"** button (primary CTA)
  - Button styling: `bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold`
  - Button position: Bottom-right

#### 3.1.2 What to Remove
- ❌ Email notification toggles (Online Student Course Email, Online Admin Training Email, Classroom Course Email)
- ❌ "SEND CLASS NOTIFICATIONS" button
- ❌ Edit icon (FaEdit) in roster Actions column
- ❌ Delete/Remove icon (FaTrash) in roster Actions column
- ❌ Actions column entirely

#### 3.1.3 User Interactions
- **BACK button**: Navigate back to Step 2
- **Submit button**: Trigger Credit Confirmation Popup

---

### 3.2 Credit Confirmation Popup (NEW)

#### 3.2.1 Modal Structure
```
┌──────────────────────────────────────────────┐
│  Confirm Digital Card Submission             │
│  Review credit usage before proceeding       │
├──────────────────────────────────────────────┤
│                                              │
│  Message Box (blue info):                    │
│  "You are about to create digital           │
│   certification cards for [X] student(s).   │
│   This will deduct [X] credit(s)."          │
│                                              │
│  ┌──────────────────────────────────────┐  │
│  │ Credit Summary                        │  │
│  │ ──────────────────────────────────── │  │
│  │ Current Balance:      28 credits     │  │
│  │ Credits to Use:       -3 credits     │  │
│  │ ──────────────────────────────────── │  │
│  │ Remaining Balance:    25 credits     │  │
│  └──────────────────────────────────────┘  │
│                                              │
│  [Insufficient credits warning if balance    │
│   would be negative]                         │
│                                              │
│  [ Cancel ]      [ Confirm & Submit ]        │
└──────────────────────────────────────────────┘
```

#### 3.2.2 Popup Behavior
- **Trigger**: Clicking "Submit" button on Step 3
- **Backdrop**: Dark overlay with blur (`bg-black/50 backdrop-blur-sm`)
- **Position**: Centered modal
- **Animation**: Fade-in and slide-up animation

#### 3.2.3 Credit Calculation
```typescript
const availableCredits = getUserCreditsFromDB(); // Fetch from database
const creditsToUse = students.length; // 1 credit per student
const remainingCredits = availableCredits - creditsToUse;
const hasInsufficientCredits = remainingCredits < 0;
```

#### 3.2.4 Popup Content
1. **Header**
   - Title: "Confirm Digital Card Submission"
   - Subtitle: "Review credit usage before proceeding"
   - Icon: Certificate or badge icon

2. **Info Message**
   - Text: "You are about to create digital certification cards for **[X] student(s)**. This will deduct **[X] credit(s)** from your account."
   - Style: Blue info box with left border

3. **Credit Summary Card**
   - **Current Balance**: Show available credits
   - **Credits to Use**: Show negative amount (e.g., "- 3 credits")
   - **Divider line**
   - **Remaining Balance**: Calculate and display
     - Green text if sufficient
     - Red text if insufficient

4. **Insufficient Credits Warning** (Conditional)
   - Only show if `hasInsufficientCredits === true`
   - Red alert box with warning icon
   - Message: "Insufficient Credits. You do not have enough credits to complete this action. Please purchase additional credits."
   - "Purchase Credits" link to `/credits/purchase`

5. **Success Indicator** (Conditional)
   - Only show if `hasInsufficientCredits === false`
   - Green info box with checkmark
   - Message: "Sufficient credits available to proceed"

#### 3.2.5 Action Buttons
- **Cancel Button**
  - Label: "Cancel"
  - Action: Close popup, return to Step 3
  - Style: Secondary button (white bg, gray border)

- **Confirm Button**
  - Label: "Confirm & Submit"
  - Action: Proceed with submission, deduct credits, lock card, navigate to Final Page
  - Style: Primary gradient button
  - Disabled state: If `hasInsufficientCredits === true`
    - Grayed out appearance
    - Cursor: not-allowed
    - Tooltip: "Insufficient credits"

---

### 3.3 Lock After Confirmation (NEW BEHAVIOR)

#### 3.3.1 What Gets Locked
Once the user confirms in the Credit Confirmation Popup:
1. **Digital Card Data** becomes immutable in the database
2. **Credits** are deducted from user's account
3. **Submission Timestamp** is recorded
4. **Status** changes to "Locked" or "Submitted"

#### 3.3.2 Database Changes Required
Add the following fields to the Digital Card model:
```prisma
model DigitalCard {
  id                    Int       @id @default(autoincrement())
  class_id              String    @unique
  program               String
  site                  String
  class_type            String
  start_date            DateTime
  end_date              DateTime
  accrediting_instructor String
  assisting_instructor   String?
  open_enrollment       Boolean   @default(false)

  // Locking fields
  is_locked             Boolean   @default(false)
  submitted_at          DateTime?
  submitted_by          String?   // User ID or email

  // Credit tracking
  credits_used          Int

  // Relationships
  students              DigitalCardStudent[]

  created_at            DateTime  @default(now())
  updated_at            DateTime  @updatedAt

  @@map("digital_cards")
}

model DigitalCardStudent {
  id              Int       @id @default(autoincrement())
  digital_card_id Int
  digital_card    DigitalCard @relation(fields: [digital_card_id], references: [id])

  first_name      String
  last_name       String
  email           String
  certificate_url String?   // Generated certificate PDF path

  created_at      DateTime  @default(now())

  @@map("digital_card_students")
}
```

#### 3.3.3 Backend Logic (API Endpoint)
Create new API endpoint: `POST /api/digital-cards/submit`

```typescript
// src/app/api/digital-cards/submit/route.ts
import { verifyTokenFromRequest } from '@/lib/firebaseAdmin';
import { PrismaClient } from '@/generated/prisma';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const decoded = await verifyTokenFromRequest(req);
  if (!decoded) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prisma = new PrismaClient();
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

  try {
    // 1. Check available credits
    const userCredits = await prisma.credit.findFirst({
      where: {
        type: determineCreditType(program) // Helper function
      }
    });

    if (!userCredits || userCredits.credits < students.length) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      );
    }

    // 2. Create digital card with lock
    const digitalCard = await prisma.digitalCard.create({
      data: {
        class_id: generateClassId(), // Helper function
        program,
        site,
        class_type: classType,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        accrediting_instructor: accreditingInstructor,
        assisting_instructor: assistingInstructor,
        open_enrollment: openEnrollment,
        is_locked: true,
        submitted_at: new Date(),
        submitted_by: decoded.email,
        credits_used: students.length,
        students: {
          create: students.map((s: any) => ({
            first_name: s.firstName,
            last_name: s.lastName,
            email: s.email,
          })),
        },
      },
      include: {
        students: true,
      },
    });

    // 3. Deduct credits
    await prisma.credit.update({
      where: { id: userCredits.id },
      data: {
        credits: {
          decrement: students.length,
        },
      },
    });

    // 4. Generate certificates (async task)
    // This could be a background job
    // await generateCertificatesForStudents(digitalCard.id);

    return NextResponse.json({
      success: true,
      digitalCardId: digitalCard.id,
      classId: digitalCard.class_id,
      message: "Digital card created and locked successfully",
    });
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
```

---

### 3.4 Final Page (UPDATED - Replaces Step 4)

#### 3.4.1 Page Layout
```
┌────────────┬──────────────────────────────────────────────┐
│            │  Digital Card Created Successfully           │
│            │  ──────────────────────────────────────────── │
│  SIDEBAR   │                                              │
│  (Full     │  Class Information Card                      │
│   Menu)    │  ┌──────────────────────────────────────┐   │
│            │  │ Class ID: CPI-DC-123456              │   │
│            │  │ Program: CPI BLS 2020                │   │
│            │  │ Site: Arizona Provider Training      │   │
│            │  │ Instructor: John Smith               │   │
│            │  │ Dates: Jan 15 - Jan 16, 2025        │   │
│            │  │ Status: ✅ Locked                    │   │
│            │  └──────────────────────────────────────┘   │
│            │                                              │
│            │  Student Roster & Certificates               │
│            │  ┌──────────────────────────────────────┐   │
│            │  │  Student          Certificate         │   │
│            │  │  ────────────     ───────────        │   │
│            │  │  John Doe         [View] [Download]  │   │
│            │  │  Jane Smith       [View] [Download]  │   │
│            │  │  Mike Johnson     [View] [Download]  │   │
│            │  └──────────────────────────────────────┘   │
│            │                                              │
│            │  [ Edit via Support Ticket ]                │
│            │  [ Create New Class ]                        │
└────────────┴──────────────────────────────────────────────┘
```

#### 3.4.2 Components to Display

**1. Success Banner**
- Green banner at top
- Icon: Checkmark circle (FaCheckCircle)
- Title: "Digital Card Created Successfully"
- Message: "Digital certification cards have been created and locked. Credits have been deducted from your account."

**2. Class Information Card**
Display all submitted information (read-only):
- Class ID (auto-generated)
- Program
- Site/Location
- Class Type
- Start Date
- End Date
- Accrediting Instructor
- Assisting Instructor
- Open Enrollment status
- Status badge: **LOCKED** (with lock icon)
- Submitted timestamp
- Credits used

**3. Student Roster with Certificates**
Table with columns:
- **#** - Row number
- **Student Name** - First + Last
- **Email** - Contact email
- **Certificate** - View/Download actions

For each student:
- **View Certificate** button: Opens certificate in modal or new tab
- **Download Certificate** button: Downloads PDF
- Certificate displays student name, course, date, instructor signature

**4. Certificate Display Options**

Option A: **Individual Certificate Modals**
- Click "View" opens a modal showing the certificate
- Modal has download and print options

Option B: **Certificate Gallery View**
- Show thumbnail previews of all certificates
- Click to enlarge
- Bulk download option

**Recommended: Option A** (Individual modals for better UX)

**5. Action Buttons**

**Edit Button** (Support Ticket Flow)
- Label: "Request Changes via Support Ticket"
- Icon: FaEdit
- Action:
  - Opens a modal explaining that the card is locked
  - Provides a form to submit a support ticket
  - Pre-fills ticket with card details
  - User describes requested changes
  - Submits to support system
- Note: Does NOT unlock the card, only creates a ticket

**Create New Class Button**
- Label: "Create New Class"
- Icon: FaPlusCircle
- Action: Resets form and navigates to Step 1
- Style: Primary gradient button

**Back to Dashboard Button**
- Label: "Back to Dashboard"
- Icon: FaArrowLeft
- Action: Navigate to `/dashboard`
- Style: Secondary button

#### 3.4.3 Certificate Generation

**Certificate Template Requirements**:
- CPI Training Platform branding
- Student name (prominently displayed)
- Course name
- Completion date
- Instructor name(s) and signature
- Class ID
- Certificate ID (unique)
- QR code for verification (optional)
- Company logo

**Certificate Generation Approach**:

**Option 1: Server-Side PDF Generation (Recommended)**
- Use library: `@react-pdf/renderer` or `pdfkit`
- Generate on submission and store in `/public/certificates/`
- File naming: `{classId}_{studentLastName}_{firstName}_certificate.pdf`

**Option 2: Client-Side Generation**
- Use `html2canvas` + `jsPDF`
- Generate on demand when user clicks "View"

**Recommended: Option 1** for better performance and consistency

Example implementation:
```typescript
// src/lib/generateCertificate.ts
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateCertificate(data: {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  classId: string;
  certificateId: string;
}) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([792, 612]); // Letter landscape
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Add content
  page.drawText('Certificate of Completion', {
    x: width / 2 - 150,
    y: height - 100,
    size: 32,
    font: boldFont,
    color: rgb(0, 0.65, 0.66), // CPI Teal
  });

  // Add student name
  page.drawText(data.studentName, {
    x: width / 2 - 100,
    y: height - 200,
    size: 24,
    font: boldFont,
  });

  // Add more details...

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
```

#### 3.4.4 Full Sidebar Navigation
- The sidebar remains visible and functional
- User can navigate to other sections:
  - Dashboard
  - Video Player
  - Instructors
  - Training (can create new class)
  - Courses
  - Support
- Current page is highlighted in sidebar

---

## 4. User Interaction Flow

### 4.1 Happy Path (Success Flow)
```
1. User fills out Step 1 (Enter Details) ✓
2. User builds roster in Step 2 (Build Roster) ✓
3. User reviews in Step 3 (Review & Submit) ✓
4. User clicks "Submit" button
5. Credit Confirmation Popup appears
6. System shows: Available: 28, Use: 3, Remaining: 25 ✓
7. User clicks "Confirm & Submit"
8. System:
   - Deducts 3 credits ✓
   - Creates locked digital card ✓
   - Generates certificates for 3 students ✓
   - Records submission ✓
9. User lands on Final Page ✓
10. User can view/download certificates ✓
11. User can navigate via sidebar or create new class ✓
```

### 4.2 Insufficient Credits Flow
```
1-4. (Same as happy path)
5. Credit Confirmation Popup appears
6. System shows: Available: 2, Use: 3, Remaining: -1 ❌
7. System displays "Insufficient Credits" warning
8. "Confirm" button is disabled
9. User clicks "Purchase Credits" link
10. User is redirected to /credits/purchase
11. User purchases credits
12. User returns to class creation and tries again
```

### 4.3 Edit Request Flow (After Lock)
```
1. User is on Final Page with locked card
2. User realizes they made an error
3. User clicks "Request Changes via Support Ticket"
4. Modal appears with pre-filled ticket form
5. User describes the changes needed
6. User submits support ticket
7. System creates ticket and sends notification to admin
8. User receives confirmation with ticket number
9. Admin reviews and processes the change manually
```

---

## 5. Technical Implementation Details

### 5.1 State Management

```typescript
// In src/app/training/create-class/page.tsx

const [step, setStep] = useState(1);
const [programType, setProgramType] = useState("");

// Digital Card specific state
const [program, setProgram] = useState("");
const [classType, setClassType] = useState("Initial");
const [site, setSite] = useState("Arizona Provider Training, LLC");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [accreditingInstructor, setAccreditingInstructor] = useState("");
const [assistingInstructor, setAssistingInstructor] = useState("");
const [openEnrollment, setOpenEnrollment] = useState(false);
const [students, setStudents] = useState<Student[]>([]);

// New state for credit confirmation
const [showCreditConfirmModal, setShowCreditConfirmModal] = useState(false);
const [availableCredits, setAvailableCredits] = useState(0);

// New state for final page
const [digitalCardId, setDigitalCardId] = useState<number | null>(null);
const [isLocked, setIsLocked] = useState(false);
```

### 5.2 Component Structure

**New Components Needed**:
1. `CreditConfirmationModal.tsx` - Replaces existing ConfirmModal for digital cards
2. `DigitalCardFinalPage.tsx` - New final page component
3. `CertificateViewer.tsx` - Modal to view certificate
4. `EditRequestModal.tsx` - Support ticket creation modal

**Updated Components**:
1. `create-class/page.tsx` - Main page with updated Step 3 logic
2. `enter-details.tsx` (digital) - No changes needed

### 5.3 API Endpoints Required

**New Endpoints**:
1. `POST /api/digital-cards/submit` - Create and lock digital card
2. `GET /api/digital-cards/[id]` - Fetch digital card details
3. `GET /api/credits/balance` - Get user's current credit balance
4. `POST /api/certificates/generate` - Generate certificate PDF
5. `GET /api/certificates/[digitalCardId]/[studentId]` - Download certificate

**Updated Endpoints**:
1. `GET /api/credits` - Already exists, may need updates
2. `POST /api/tickets` - Already exists, add digital card support ticket type

### 5.4 File Structure

```
src/
├── app/
│   ├── api/
│   │   ├── digital-cards/
│   │   │   ├── submit/
│   │   │   │   └── route.ts          # NEW: Submit digital card
│   │   │   └── [id]/
│   │   │       └── route.ts          # NEW: Get digital card details
│   │   ├── certificates/
│   │   │   ├── generate/
│   │   │   │   └── route.ts          # NEW: Generate certificates
│   │   │   └── [digitalCardId]/
│   │   │       └── [studentId]/
│   │   │           └── route.ts      # NEW: Download certificate
│   │   └── credits/
│   │       ├── balance/
│   │       │   └── route.ts          # NEW: Get credit balance
│   │       └── route.ts              # Existing
│   └── training/
│       └── create-class/
│           └── page.tsx               # UPDATED: New Step 3 logic
├── components/
│   ├── CreditConfirmationModal.tsx    # NEW: Credit popup
│   ├── DigitalCardFinalPage.tsx       # NEW: Final page
│   ├── CertificateViewer.tsx          # NEW: Certificate modal
│   └── EditRequestModal.tsx           # NEW: Support ticket modal
└── lib/
    └── generateCertificate.ts         # NEW: Certificate generation logic
```

---

## 6. Acceptance Criteria

### 6.1 Step 3: Review & Submit
- [ ] GIVEN user is on Step 3 with programType = "digital"
- [ ] WHEN page loads
- [ ] THEN only "Submit" button is visible (no "Send Class Notifications")
- [ ] AND email notification toggles are NOT displayed
- [ ] AND roster table shows students WITHOUT edit/delete actions
- [ ] AND "BACK" button navigates to Step 2

### 6.2 Credit Confirmation Popup
- [ ] GIVEN user clicks "Submit" on Step 3
- [ ] WHEN Credit Confirmation Modal opens
- [ ] THEN available credits are displayed correctly
- [ ] AND credits to use equals student count
- [ ] AND remaining credits = available - to use
- [ ] AND if remaining < 0, show "Insufficient Credits" warning
- [ ] AND if remaining < 0, disable "Confirm" button
- [ ] AND "Cancel" button closes modal and returns to Step 3

### 6.3 Successful Submission
- [ ] GIVEN user has sufficient credits
- [ ] WHEN user clicks "Confirm & Submit" in popup
- [ ] THEN digital card is created in database with is_locked = true
- [ ] AND credits are deducted from user account
- [ ] AND students are associated with digital card
- [ ] AND submission timestamp is recorded
- [ ] AND user is navigated to Final Page

### 6.4 Final Page Display
- [ ] GIVEN digital card submission is successful
- [ ] WHEN Final Page loads
- [ ] THEN success banner is displayed at top
- [ ] AND full sidebar navigation is visible and functional
- [ ] AND class information card shows all details with "LOCKED" status
- [ ] AND student roster table lists all students
- [ ] AND each student has "View" and "Download" certificate buttons
- [ ] AND "Request Changes via Support Ticket" button is visible
- [ ] AND "Create New Class" button is visible

### 6.5 Certificate Viewing
- [ ] GIVEN user is on Final Page
- [ ] WHEN user clicks "View Certificate" for a student
- [ ] THEN certificate opens in modal OR new tab
- [ ] AND certificate contains: student name, course, date, instructor, class ID, certificate ID
- [ ] AND certificate has CPI branding and logo
- [ ] AND modal has "Download" and "Print" options

### 6.6 Certificate Download
- [ ] GIVEN user is on Final Page
- [ ] WHEN user clicks "Download Certificate" for a student
- [ ] THEN PDF file downloads immediately
- [ ] AND filename format: `{classId}_{studentLastName}_{firstName}_certificate.pdf`
- [ ] AND PDF is properly formatted and readable

### 6.7 Locked Card Behavior
- [ ] GIVEN digital card is locked
- [ ] WHEN user tries to access it again
- [ ] THEN all data is read-only
- [ ] AND no inline editing is possible
- [ ] AND status shows "LOCKED" with lock icon

### 6.8 Edit Request (Support Ticket)
- [ ] GIVEN user is on Final Page with locked card
- [ ] WHEN user clicks "Request Changes via Support Ticket"
- [ ] THEN Edit Request Modal opens
- [ ] AND modal explains card is locked
- [ ] AND form is pre-filled with card details (Class ID, Program, etc.)
- [ ] AND user can describe requested changes
- [ ] AND user can submit support ticket
- [ ] THEN system creates ticket and sends notification
- [ ] AND user receives confirmation with ticket number
- [ ] AND modal closes after submission

### 6.9 Navigation from Final Page
- [ ] GIVEN user is on Final Page
- [ ] WHEN user clicks "Create New Class"
- [ ] THEN form resets and navigates to Step 1
- [ ] WHEN user clicks sidebar menu item
- [ ] THEN navigates to corresponding page
- [ ] WHEN user clicks "Back to Dashboard"
- [ ] THEN navigates to /dashboard

### 6.10 Error Handling
- [ ] GIVEN submission fails due to server error
- [ ] WHEN error occurs
- [ ] THEN user sees error message
- [ ] AND no credits are deducted
- [ ] AND user remains on Step 3
- [ ] GIVEN certificate generation fails
- [ ] WHEN user tries to view certificate
- [ ] THEN show "Certificate not available" message with support contact

---

## 7. UI/UX Specifications

### 7.1 Color Palette
- **Primary Teal**: `#00A5A8` - Buttons, headings, accents
- **Primary Red**: `#C10E21` - Alerts, warnings
- **Dark Gray**: `#2D2F33` - Text, sidebar
- **Success Green**: `#10B981` - Success messages, badges
- **Warning Red**: `#EF4444` - Error messages, warnings
- **Background Gray**: `#F3F4F6` - Page background
- **Card White**: `#FFFFFF` - Card backgrounds

### 7.2 Typography
- **Headings**: Font size 24-32px, font-weight: bold
- **Body Text**: Font size 14-16px, font-weight: normal
- **Small Text**: Font size 12px, font-weight: normal
- **Font Family**: System default (sans-serif)

### 7.3 Button Styles

**Primary Button (Submit, Confirm)**
```css
background: linear-gradient(to right, #00A5A8, #008f91);
color: white;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
transition: all 0.3s;

hover:
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
```

**Secondary Button (Cancel, Back)**
```css
background: white;
color: #4B5563;
padding: 12px 24px;
border: 2px solid #D1D5DB;
border-radius: 8px;
font-weight: 600;
transition: all 0.3s;

hover:
  background: #F9FAFB;
  border-color: #9CA3AF;
```

**Disabled Button**
```css
background: #D1D5DB;
color: #9CA3AF;
cursor: not-allowed;
opacity: 0.6;
```

### 7.4 Modal Animations
- **Backdrop**: Fade-in 300ms
- **Modal**: Slide-up 300ms with ease-out
- **Close**: Fade-out 200ms

### 7.5 Responsive Design
- **Desktop**: Max width 1200px, centered
- **Tablet**: Full width with padding
- **Mobile**: Stack elements vertically, reduce padding

---

## 8. Testing Scenarios

### 8.1 Functional Testing
1. **Test Credit Calculation**
   - Add 1 student → expect 1 credit deduction
   - Add 10 students → expect 10 credit deduction
   - Test with 0 available credits → expect error

2. **Test Lock Mechanism**
   - Submit card → verify is_locked = true in DB
   - Try to edit locked card → verify edit blocked
   - Request changes → verify ticket created

3. **Test Certificate Generation**
   - Generate for 1 student → verify PDF created
   - Generate for 50 students → verify all PDFs created
   - Test download → verify file downloads correctly

4. **Test Navigation**
   - Test sidebar links from Final Page
   - Test "Create New Class" → verify form resets
   - Test browser back button behavior

### 8.2 Edge Cases
1. **Exactly 0 credits available** → Show warning immediately
2. **Credit balance changes during submission** → Handle race condition
3. **Network error during submission** → Show error, don't deduct credits
4. **Very long student names** → Verify certificate layout doesn't break
5. **Special characters in names** → Test PDF generation with unicode

### 8.3 Performance Testing
1. **Certificate generation for 100 students** → Should complete in <30s
2. **Modal open/close** → Should be smooth, no lag
3. **Page load time** → Final Page should load in <2s

---

## 9. Migration & Rollout Plan

### 9.1 Phase 1: Backend Setup (Week 1)
- Create database schema for digital_cards table
- Implement API endpoints
- Set up certificate generation service
- Test credit deduction logic

### 9.2 Phase 2: Frontend Development (Week 2)
- Update Step 3 UI (remove toggles, edit buttons)
- Create CreditConfirmationModal component
- Create DigitalCardFinalPage component
- Create CertificateViewer component
- Create EditRequestModal component

### 9.3 Phase 3: Integration (Week 3)
- Connect frontend to backend APIs
- Implement certificate generation flow
- Test end-to-end submission process
- Handle error scenarios

### 9.4 Phase 4: Testing & QA (Week 4)
- Functional testing
- Edge case testing
- Performance testing
- User acceptance testing (UAT)

### 9.5 Phase 5: Deployment (Week 5)
- Deploy to staging environment
- Final QA checks
- Deploy to production
- Monitor for issues
- Gather user feedback

---

## 10. Open Questions & Decisions Needed

### 10.1 Questions
1. **Credit Type**: Which credit type should be used for digital cards?
   - Option: Create new credit type "Digital Card Credits"
   - Option: Use existing "CPR Only" or "Combo" credits

2. **Certificate Expiration**: Should certificates have an expiration date?
   - If yes, what duration? (1 year, 2 years, etc.)

3. **Bulk Download**: Should there be a "Download All Certificates" button?
   - Useful for instructors with many students

4. **Email Notifications**: Should students receive email with their certificate?
   - Even though Step 3 removes toggles, consider auto-sending cert via email

5. **Admin Override**: Should admins have ability to unlock cards?
   - For special cases or errors

### 10.2 Future Enhancements (Out of Scope for v2.0)
- Certificate verification portal (QR code scan)
- Batch certificate printing
- Student portal to view their own certificates
- Certificate templates (multiple designs)
- Multi-language certificate support
- Integration with national certification registries

---

## 11. Appendix

### 11.1 Glossary
- **Digital Card**: Electronic certification card issued upon course completion
- **Lock**: Making a record immutable and read-only
- **Credit**: Unit of currency in the system, 1 credit = 1 student certification
- **Final Page**: Success view shown after digital card submission

### 11.2 References
- Firebase Authentication Documentation
- Prisma ORM Documentation
- pdf-lib Documentation for certificate generation
- Next.js App Router Documentation

### 11.3 Related Documents
- CLAUDE.md - Project architecture and setup
- README.md - Project overview
- Database Schema (prisma/schema.prisma)

---

**END OF SPECIFICATION**
