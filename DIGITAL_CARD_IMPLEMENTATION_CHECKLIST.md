# Digital Card System - Implementation Checklist

## Project Overview
**Feature:** Updated Digital Card System for CPI Training Platform
**Version:** 2.0
**Start Date:** 2025-11-25
**Target Completion:** [To be determined]

---

## Quick Reference
- 📋 [Full Specification](./DIGITAL_CARD_SYSTEM_SPEC.md)
- 🎨 [UI/UX Mockups](./DIGITAL_CARD_UI_MOCKUPS.md)
- 📚 [Project Documentation](./CLAUDE.md)

---

## Implementation Progress

### Phase 1: Database Setup ⏳
**Target:** Week 1

#### 1.1 Prisma Schema Updates
- [ ] Add `DigitalCard` model to `prisma/schema.prisma`
  - [ ] Add fields: id, class_id, program, site, class_type
  - [ ] Add fields: start_date, end_date, instructors
  - [ ] Add locking fields: is_locked, submitted_at, submitted_by
  - [ ] Add credit tracking: credits_used
  - [ ] Add timestamps: created_at, updated_at
- [ ] Add `DigitalCardStudent` model
  - [ ] Add fields: id, digital_card_id, first_name, last_name, email
  - [ ] Add field: certificate_url
  - [ ] Set up relation to DigitalCard
- [ ] Run `npx prisma generate` to update client
- [ ] Run `npx prisma db push` to update database

**Reference:** Section 3.3.2 in specification

#### 1.2 Database Testing
- [ ] Test DigitalCard creation
- [ ] Test student association
- [ ] Test locking mechanism (is_locked = true)
- [ ] Verify relations work correctly
- [ ] Test queries and updates

---

### Phase 2: Backend API Development ⏳
**Target:** Week 1-2

#### 2.1 Credits Balance Endpoint
**File:** `src/app/api/credits/balance/route.ts`

- [ ] Create new file
- [ ] Add Firebase authentication
- [ ] Fetch user's available credits from database
- [ ] Return credit balance JSON
- [ ] Add error handling
- [ ] Test with Postman/Insomnia

```typescript
Expected Response:
{
  "availableCredits": 28,
  "creditType": "CPI-BLS-2020"
}
```

#### 2.2 Digital Card Submission Endpoint
**File:** `src/app/api/digital-cards/submit/route.ts`

- [ ] Create new file
- [ ] Add Firebase authentication
- [ ] Parse request body (program, dates, instructors, students)
- [ ] Validate required fields
- [ ] Check available credits
- [ ] Return 400 if insufficient credits
- [ ] Create DigitalCard record with is_locked = true
- [ ] Create associated DigitalCardStudent records
- [ ] Deduct credits from user account
- [ ] Trigger certificate generation (async)
- [ ] Return success response with digital card ID
- [ ] Add comprehensive error handling
- [ ] Test all scenarios (success, insufficient credits, validation errors)

```typescript
Expected Response:
{
  "success": true,
  "digitalCardId": 123,
  "classId": "DC-33043289",
  "message": "Digital card created and locked successfully"
}
```

**Reference:** Section 3.3.3 in specification

#### 2.3 Get Digital Card Details Endpoint
**File:** `src/app/api/digital-cards/[id]/route.ts`

- [ ] Create new file
- [ ] Add Firebase authentication
- [ ] Fetch digital card by ID with students
- [ ] Return 404 if not found
- [ ] Return JSON with all card details
- [ ] Test retrieval

```typescript
Expected Response:
{
  "id": 123,
  "class_id": "DC-33043289",
  "program": "CPI BLS (2020)",
  "is_locked": true,
  "submitted_at": "2025-01-14T15:45:00Z",
  "students": [...]
}
```

#### 2.4 Certificate Generation Library
**File:** `src/lib/generateCertificate.ts`

- [ ] Create new file
- [ ] Install `pdf-lib` package: `npm install pdf-lib`
- [ ] Create certificate template function
- [ ] Add CPI logo to certificate
- [ ] Add student name (prominently)
- [ ] Add course name
- [ ] Add dates (completion, issue, expiration)
- [ ] Add instructor name and signature
- [ ] Add certificate ID and class ID
- [ ] Add QR code (optional - may need `qrcode` package)
- [ ] Test PDF generation locally
- [ ] Verify styling and layout

**Reference:** Section 3.4.3 in specification

#### 2.5 Generate Certificate Endpoint
**File:** `src/app/api/certificates/generate/route.ts`

- [ ] Create new file
- [ ] Add Firebase authentication
- [ ] Parse request (digitalCardId, studentId)
- [ ] Fetch digital card and student details
- [ ] Call generateCertificate function
- [ ] Save PDF to `/public/certificates/`
- [ ] Update student record with certificate_url
- [ ] Return success response with file path
- [ ] Handle errors gracefully

#### 2.6 Download Certificate Endpoint
**File:** `src/app/api/certificates/[digitalCardId]/[studentId]/route.ts`

- [ ] Create new file (may not need auth for public download)
- [ ] Fetch student and certificate URL
- [ ] Read PDF file from filesystem
- [ ] Set appropriate headers (Content-Type: application/pdf)
- [ ] Stream file to response
- [ ] Test download in browser

---

### Phase 3: Frontend Components ⏳
**Target:** Week 2-3

#### 3.1 Update Step 3: Review & Submit
**File:** `src/app/training/create-class/page.tsx`

**Changes to make:**
- [ ] In Step 3 conditional, check if `programType === "digital"`
- [ ] Remove email notification toggles for digital cards
- [ ] Remove Actions column from roster table
- [ ] Remove edit/delete buttons from roster
- [ ] Change button text from "SEND CLASS NOTIFICATIONS" to "Submit"
- [ ] Update button onClick to show Credit Confirmation Modal
- [ ] Add info message: "Review all information carefully..."
- [ ] Test rendering with mock data

**Reference:** Section 3.1 in specification

#### 3.2 Credit Confirmation Modal Component
**File:** `src/components/CreditConfirmationModal.tsx`

- [ ] Create new file
- [ ] Add TypeScript interface for props
  - onConfirm: () => void
  - onCancel: () => void
  - availableCredits: number
  - creditsToUse: number
  - studentCount: number
- [ ] Implement modal backdrop with blur
- [ ] Add modal header with icon and title
- [ ] Add info message box (blue)
- [ ] Create credit summary card
  - Current balance
  - Credits to use
  - Remaining balance (with color coding)
- [ ] Add insufficient credits warning (conditional)
- [ ] Add success indicator (conditional)
- [ ] Implement Cancel button
- [ ] Implement Confirm button (with disabled state)
- [ ] Add entrance/exit animations
- [ ] Style according to mockups
- [ ] Test with sufficient and insufficient credits

**Reference:** Section 3.2 in specification, UI mockups

#### 3.3 Digital Card Final Page Component
**File:** `src/components/DigitalCardFinalPage.tsx`

- [ ] Create new file
- [ ] Add TypeScript interface for props (digitalCard data)
- [ ] Implement success banner at top
- [ ] Create class information card
  - Display all submitted details
  - Show "LOCKED" status badge
  - Show submitted timestamp
  - Show credits used
- [ ] Create student roster table
  - Display student name and email
  - Add "View Certificate" button per student
  - Add "Download Certificate" button per student
- [ ] Add "Need Changes?" section
  - Info message about locked status
  - "Request Changes via Support Ticket" button
- [ ] Add action buttons
  - "Back to Dashboard"
  - "Create New Class"
- [ ] Ensure full sidebar is visible
- [ ] Style according to mockups
- [ ] Make responsive for mobile

**Reference:** Section 3.4 in specification, UI mockups

#### 3.4 Certificate Viewer Modal Component
**File:** `src/components/CertificateViewer.tsx`

- [ ] Create new file
- [ ] Add props: certificateUrl, studentName, onClose
- [ ] Implement modal with PDF viewer
  - Option A: Use `<iframe>` or `<embed>` to display PDF
  - Option B: Use react-pdf library
- [ ] Add header with Back, Download, Print buttons
- [ ] Implement download functionality
- [ ] Implement print functionality (window.print())
- [ ] Add Close button
- [ ] Style according to mockups
- [ ] Test with actual PDF files

**Reference:** Section 3.4 and UI mockups

#### 3.5 Edit Request Modal Component
**File:** `src/components/EditRequestModal.tsx`

- [ ] Create new file
- [ ] Add props: digitalCard data, onClose
- [ ] Implement modal with form
- [ ] Add info message about locked status
- [ ] Display pre-filled card information (read-only)
- [ ] Add "What changes do you need?" dropdown
  - Options: Update student info, Change instructor, Correct dates, Add/remove student, Other
- [ ] Add "Describe changes" text area (required)
- [ ] Add "Contact Email" field (pre-filled from user)
- [ ] Add "Phone" field (optional)
- [ ] Implement Cancel button
- [ ] Implement Submit button
  - Validate form
  - Call existing support ticket API
  - Show success confirmation after submission
- [ ] Style according to mockups

**Reference:** Section 3.4 and UI mockups

---

### Phase 4: Integration & Flow ⏳
**Target:** Week 3

#### 4.1 Connect Step 3 to Credit Modal
**File:** `src/app/training/create-class/page.tsx`

- [ ] Add state: `showCreditConfirmModal`, `availableCredits`
- [ ] Fetch available credits when component mounts (for digital cards)
- [ ] Update Submit button onClick to:
  - Open CreditConfirmationModal
  - Pass availableCredits, creditsToUse (students.length)
- [ ] Implement onCancel: close modal, stay on Step 3
- [ ] Implement onConfirm: proceed with submission
- [ ] Test flow

#### 4.2 Implement Submission Flow
**File:** `src/app/training/create-class/page.tsx`

- [ ] Create async function `handleDigitalCardSubmit`
- [ ] Get Firebase auth token
- [ ] Call `POST /api/digital-cards/submit` with data
- [ ] Handle response:
  - Success: Store digitalCardId, navigate to Final Page
  - Error: Show error message, stay on Step 3
- [ ] Add loading state during submission
- [ ] Show loading spinner
- [ ] Test end-to-end

#### 4.3 Integrate Final Page
**File:** `src/app/training/create-class/page.tsx`

- [ ] Add new step (step 5) for Final Page (or replace step 4)
- [ ] Conditionally render DigitalCardFinalPage component
- [ ] Pass digitalCard data from submission response
- [ ] Test navigation to Final Page after successful submit

#### 4.4 Connect Certificate Actions
**File:** `src/components/DigitalCardFinalPage.tsx`

- [ ] Implement "View Certificate" onClick
  - Check if certificate exists for student
  - If not, call generate certificate API
  - Open CertificateViewer modal with certificate URL
- [ ] Implement "Download Certificate" onClick
  - Trigger download of PDF file
  - Use download link: `/api/certificates/[digitalCardId]/[studentId]`
- [ ] Test both actions

#### 4.5 Connect Edit Request
**File:** `src/components/DigitalCardFinalPage.tsx`

- [ ] Implement "Request Changes" button onClick
- [ ] Open EditRequestModal
- [ ] Pass digital card data to modal
- [ ] Handle modal submission
  - Create support ticket with pre-filled info
  - Show success confirmation
- [ ] Test ticket creation flow

---

### Phase 5: Error Handling & Edge Cases ⏳
**Target:** Week 3-4

#### 5.1 Credit Insufficient Scenario
- [ ] Test submission with 0 credits
- [ ] Verify modal shows warning
- [ ] Verify Confirm button is disabled
- [ ] Test "Purchase Credits" link
- [ ] Ensure no partial submission occurs

#### 5.2 Network Error Handling
- [ ] Test submission API failure
  - Show error message to user
  - Keep user on Step 3
  - Do NOT deduct credits
- [ ] Test certificate generation failure
  - Show "Certificate not available" message
  - Provide support contact info
- [ ] Test download failure
  - Show error message
  - Retry option

#### 5.3 Validation
- [ ] Validate all required fields in Step 1
- [ ] Validate at least 1 student in roster
- [ ] Validate date ranges (end after start)
- [ ] Show validation errors clearly
- [ ] Prevent submission if validation fails

#### 5.4 Edge Cases
- [ ] Test with exactly 0 available credits
- [ ] Test with 100+ students (performance)
- [ ] Test with very long names (certificate layout)
- [ ] Test with special characters in names (unicode)
- [ ] Test certificate download with slow connection
- [ ] Test browser back button behavior

---

### Phase 6: Testing ⏳
**Target:** Week 4

#### 6.1 Unit Testing
- [ ] Test credit calculation logic
- [ ] Test certificate generation function
- [ ] Test database queries
- [ ] Test API endpoints with various inputs

#### 6.2 Integration Testing
- [ ] Test complete submission flow (happy path)
- [ ] Test insufficient credits flow
- [ ] Test edit request flow
- [ ] Test certificate viewing and downloading
- [ ] Test navigation from Final Page

#### 6.3 UI Testing
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test all button states (normal, hover, disabled)
- [ ] Test modal animations
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

#### 6.4 Performance Testing
- [ ] Test certificate generation for 50 students
- [ ] Measure page load times
- [ ] Test with slow network (throttling)
- [ ] Optimize if necessary

#### 6.5 Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome)

---

### Phase 7: Documentation & Deployment ⏳
**Target:** Week 4-5

#### 7.1 Code Documentation
- [ ] Add JSDoc comments to all components
- [ ] Document API endpoints
- [ ] Add inline code comments for complex logic
- [ ] Update README if needed

#### 7.2 User Documentation
- [ ] Create user guide for digital card creation
- [ ] Document locked card behavior
- [ ] Explain edit request process
- [ ] Add screenshots to documentation

#### 7.3 Update CLAUDE.md
- [ ] Add Digital Card System section
- [ ] Document new database models
- [ ] Document new API endpoints
- [ ] Add workflow examples
- [ ] Update common development tasks

#### 7.4 Staging Deployment
- [ ] Deploy to staging environment
- [ ] Run smoke tests
- [ ] Perform UAT (User Acceptance Testing)
- [ ] Gather feedback
- [ ] Fix any issues

#### 7.5 Production Deployment
- [ ] Run database migrations on production
- [ ] Deploy frontend and backend code
- [ ] Monitor for errors
- [ ] Check logs for issues
- [ ] Verify certificate generation works
- [ ] Test with real users

#### 7.6 Post-Deployment
- [ ] Monitor credit deductions
- [ ] Track support ticket creation
- [ ] Monitor certificate downloads
- [ ] Gather user feedback
- [ ] Create issues for improvements

---

## Acceptance Criteria Checklist

Refer to Section 6 in the specification for detailed acceptance criteria.

### Step 3: Review & Submit
- [ ] ✅ Only "Submit" button is visible
- [ ] ✅ Email toggles are NOT displayed for digital cards
- [ ] ✅ Roster table shows NO edit/delete actions
- [ ] ✅ "BACK" button works correctly

### Credit Confirmation Popup
- [ ] ✅ Available credits displayed correctly
- [ ] ✅ Credits to use = student count
- [ ] ✅ Remaining credits calculated correctly
- [ ] ✅ Warning shown if insufficient credits
- [ ] ✅ Confirm button disabled if insufficient
- [ ] ✅ Cancel button closes modal

### Successful Submission
- [ ] ✅ Digital card created with is_locked = true
- [ ] ✅ Credits deducted from account
- [ ] ✅ Students associated with card
- [ ] ✅ Timestamp recorded
- [ ] ✅ User navigated to Final Page

### Final Page Display
- [ ] ✅ Success banner displayed
- [ ] ✅ Sidebar visible and functional
- [ ] ✅ Class info shows "LOCKED" status
- [ ] ✅ Student roster lists all students
- [ ] ✅ View and Download buttons work
- [ ] ✅ "Request Changes" button visible
- [ ] ✅ "Create New Class" button visible

### Certificate Viewing
- [ ] ✅ Certificate opens correctly
- [ ] ✅ Contains all required information
- [ ] ✅ Has CPI branding
- [ ] ✅ Download and Print options work

### Certificate Download
- [ ] ✅ PDF downloads immediately
- [ ] ✅ Filename format correct
- [ ] ✅ PDF properly formatted

### Locked Card Behavior
- [ ] ✅ All data is read-only
- [ ] ✅ No inline editing possible
- [ ] ✅ Status shows "LOCKED"

### Edit Request
- [ ] ✅ Modal opens correctly
- [ ] ✅ Form pre-filled with card details
- [ ] ✅ User can describe changes
- [ ] ✅ Ticket created successfully
- [ ] ✅ Confirmation shown to user

### Navigation
- [ ] ✅ "Create New Class" resets form
- [ ] ✅ Sidebar navigation works
- [ ] ✅ "Back to Dashboard" works

### Error Handling
- [ ] ✅ Server errors handled gracefully
- [ ] ✅ No credits deducted on failure
- [ ] ✅ Certificate errors show message

---

## Development Notes

### Setup Instructions
1. **Install Dependencies**
   ```bash
   npm install pdf-lib
   npm install @types/pdf-lib --save-dev
   ```

2. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

### Testing Tips
- Use Postman/Insomnia for API testing
- Test with mock data before real submissions
- Keep staging and production databases separate
- Always test credit deduction carefully
- Verify PDF generation works before deployment

### Common Issues & Solutions
1. **PDF Generation Fails**
   - Check file permissions on /public/certificates/
   - Verify pdf-lib is installed correctly
   - Check for special characters in student names

2. **Credits Not Deducting**
   - Verify API endpoint is called correctly
   - Check database transaction logic
   - Ensure no race conditions

3. **Modal Not Showing**
   - Check z-index values
   - Verify state is updating correctly
   - Check for console errors

---

## Dependencies

### Required NPM Packages
- [x] `@prisma/client` (already installed)
- [x] `prisma` (already installed)
- [ ] `pdf-lib` - For certificate PDF generation
- [ ] `@types/pdf-lib` - TypeScript types (optional)
- [ ] `qrcode` - For QR code generation (optional)

### Installation Commands
```bash
npm install pdf-lib
npm install --save-dev @types/pdf-lib
npm install qrcode  # Optional
```

---

## Team Communication

### Daily Standup Questions
1. What did I complete yesterday?
2. What am I working on today?
3. Are there any blockers?

### Weekly Review
- Review completed checklist items
- Discuss any challenges or roadblocks
- Adjust timeline if necessary
- Demo progress to stakeholders

---

## Risk Management

### Identified Risks
1. **Certificate generation performance** with large number of students
   - Mitigation: Implement background job queue

2. **Credit deduction race conditions** if multiple submissions
   - Mitigation: Use database transactions

3. **PDF storage** may consume significant disk space
   - Mitigation: Monitor storage, implement cleanup policy

4. **Browser compatibility** for PDF viewing
   - Mitigation: Test across all major browsers early

---

## Success Metrics

### Key Performance Indicators (KPIs)
- [ ] Digital card submission success rate > 95%
- [ ] Certificate generation time < 5 seconds per student
- [ ] Zero credit deduction errors
- [ ] Support ticket creation from edit requests < 10% of submissions
- [ ] User satisfaction rating > 4.5/5

### Tracking
- Monitor API response times
- Track error rates in logs
- Collect user feedback
- Measure page load times

---

## Post-Launch Improvements (Future Enhancements)

### Phase 2 Features (Out of Scope for v2.0)
- [ ] Certificate expiration notifications
- [ ] Bulk certificate download (ZIP file)
- [ ] Email certificates to students automatically
- [ ] Certificate verification portal (QR code scan)
- [ ] Multiple certificate templates
- [ ] Multi-language certificate support
- [ ] Student portal to view own certificates
- [ ] Integration with national certification registries
- [ ] Admin override to unlock cards
- [ ] Certificate revocation feature

---

## Contact & Support

**Developer:** [Your Name]
**Email:** [your.email@example.com]
**Slack Channel:** #cpi-digital-cards
**GitHub Issues:** [Repository Link]

---

**Last Updated:** 2025-11-25
**Document Version:** 1.0

---

## Quick Commands Reference

```bash
# Database
npx prisma generate              # Generate Prisma Client
npx prisma db push               # Push schema to database
npx prisma studio                # Open Prisma Studio

# Development
npm run dev                      # Start dev server
npm run build                    # Build for production
npm run lint                     # Run ESLint

# Testing
npm test                         # Run tests (if configured)
```

---

**END OF IMPLEMENTATION CHECKLIST**
