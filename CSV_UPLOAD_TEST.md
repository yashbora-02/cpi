# 🧪 CSV Upload Test Guide

## Quick Test Steps

### 1. Restart Your Server
```bash
npm run dev
```

### 2. Navigate to Create Class
Go to: http://localhost:3000/training/create-class

### 3. Fill Step 1 (Program Details)
- Select any program type (Blended or Digital)
- Fill in required fields
- Click **"CONTINUE"**

### 4. Test CSV Upload (Step 2)

#### Option A: Use Sample File
1. Download the sample file I created:
   - Go to: http://localhost:3000/sample_students.csv
   - Or find it at `public/sample_students.csv`

2. In Step 2, select **"Upload Students (CSV)"** from dropdown

3. **Either:**
   - Click "Choose File" and select the sample CSV
   - OR drag & drop the CSV into the upload area

4. You should see:
   - ✅ Success message: "Successfully uploaded 10 students!"
   - Preview table showing all 10 students

5. Click **"Save Students"** button

6. **Check Main Page:**
   - You should now see a table with **10 students**
   - Table header should show "10 Students"
   - All names and emails should be visible

#### Option B: Create Your Own CSV
1. Create a file called `test.csv` with this content:
```csv
First Name,Last Name,Email
Alice,Anderson,alice@test.com
Bob,Brown,bob@test.com
Charlie,Clark,charlie@test.com
```

2. Save it

3. Select **"Upload Students (CSV)"** from dropdown

4. Upload your `test.csv` file

5. Click **"Save Students"**

6. **Check:** Should show 3 students in the roster table

---

## 🔍 What to Look For

### ✅ Success Indicators:
- Green success message appears after upload
- Preview table shows all students
- Student count badge shows correct number
- Main roster table displays all students after save
- Console shows: `📝 Saving students: X students`

### ❌ Error Indicators:
- Red error message appears
- No students in preview
- Empty roster table
- Console shows errors

---

## 🐛 If Students Don't Appear:

### 1. Check Browser Console
- Press **F12** → **Console** tab
- Look for:
  - `📝 Saving students: X students` (should show correct count)
  - `Students data: Array(X)` (should show student objects)
  - Any red error messages

### 2. Verify CSV Format
Make sure your CSV looks like:
```csv
First Name,Last Name,Email
John,Doe,john@test.com
```

### 3. Check Upload Success
- Does the green success message appear?
- Does the preview table show students?
- Are you clicking "Save Students" button?

### 4. Try Different Methods
- If drag & drop doesn't work, try "Choose File"
- If CSV doesn't work, try "Enter Student" manually
- Use the sample file to test

---

## 📝 Console Messages You Should See

When uploading works correctly:

```
✅ User confirmation email sent successfully via Web3Forms
📝 Saving students: 10 students
Students data: Array(10) [
  {firstName: "John", lastName: "Doe", email: "john.doe@example.com"},
  {firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com"},
  ...
]
```

---

## 🎯 Expected Behavior

### After Uploading CSV:
1. Green success box appears
2. Preview table shows all students
3. "Save Students" button is enabled

### After Clicking "Save Students":
1. Drawer closes
2. Main page shows student roster table
3. Badge shows correct student count
4. Table lists all students with numbers

### After Clicking "Continue":
1. Goes to Step 3 (Review)
2. Students are visible in review section

---

## 🚨 Common Issues & Fixes

### Issue: "No students added yet" message
**Cause:** CSV upload worked, but "Save Students" wasn't clicked
**Fix:** After uploading, click the green "Save Students" button

### Issue: Students disappear after closing drawer
**Cause:** Didn't click "Save Students" before closing
**Fix:** Upload again and click "Save Students"

### Issue: Preview shows students but main table doesn't
**Cause:** Not clicking "Save Students"
**Fix:** Always click "Save Students" after upload

### Issue: Upload button does nothing
**Cause:** File type or size issue
**Fix:**
- Make sure file ends with .csv or .txt
- Make sure file is under 5MB
- Check console for error messages

---

## ✅ Complete Test Checklist

- [ ] Server is running
- [ ] Navigated to `/training/create-class`
- [ ] Completed Step 1
- [ ] Selected "Upload Students (CSV)" from dropdown
- [ ] Uploaded CSV file (drag or click)
- [ ] Green success message appeared
- [ ] Preview table shows students
- [ ] Clicked "Save Students" button
- [ ] Drawer closed
- [ ] Main roster table shows all students
- [ ] Student count is correct
- [ ] Can proceed to Step 3

---

**If all checkboxes pass, CSV upload is working! 🎉**

If any fail, check the console and share the error messages.
