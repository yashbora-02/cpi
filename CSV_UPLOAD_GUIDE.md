# CSV Upload Guide - Student Roster

## ✅ Fixed & Enhanced!

I've updated the CSV upload with:
- ✅ Better error messages
- ✅ Drag and drop support
- ✅ File validation (size & type)
- ✅ Success notifications
- ✅ Console logging for debugging

---

## 📋 How to Upload Students via CSV

### Method 1: Click to Upload
1. Go to `/training/create-class`
2. Select **"Upload Students (CSV)"** from the dropdown
3. Click **"Choose File"** button
4. Select your CSV file
5. Students will appear in the preview table
6. Click **"Save Students"**

### Method 2: Drag & Drop
1. Go to `/training/create-class`
2. Select **"Upload Students (CSV)"** from the dropdown
3. **Drag your CSV file** directly into the upload area
4. Drop it
5. Students will appear instantly!

---

## 📄 CSV Format Requirements

### Correct Format:
```csv
First Name,Last Name,Email
John,Doe,john.doe@example.com
Jane,Smith,jane.smith@example.com
Michael,Johnson,michael.j@example.com
```

### Format Rules:
- ✅ **Header row optional** (will be auto-detected and skipped)
- ✅ **3 columns:** First Name, Last Name, Email
- ✅ **Comma-separated** values
- ✅ **File extensions:** .csv or .txt
- ✅ **Max file size:** 5MB
- ✅ **Quotes optional:** Use quotes if names/emails contain commas

### Alternative Format (2 columns):
```csv
Name,Email
John Doe,john.doe@example.com
Jane Smith,jane.smith@example.com
```

---

## 🧪 Test File Included

I've created a sample CSV file for you to test:

**Location:** `public/sample_students.csv`

**Download it:**
- Option 1: Click "Download Template" button in the upload area
- Option 2: Use the file at `public/sample_students.csv`

**Contains 10 sample students** you can use for testing!

---

## 🐛 Troubleshooting

### Problem: "Please upload a CSV file"
**Solution:** Make sure your file ends with `.csv` or `.txt`

### Problem: "File size exceeds 5MB limit"
**Solution:** Your CSV file is too large. Split it into smaller files.

### Problem: "No valid student data found"
**Solutions:**
- Make sure each row has at least 2-3 values separated by commas
- Check that your file isn't empty
- Verify the CSV format matches the examples above

### Problem: CSV upload doesn't do anything
**Solutions:**
1. **Open browser console** (F12 → Console tab)
2. Look for any error messages
3. Check if file input is accepting the file
4. Try the drag & drop method instead

### Problem: Students not showing in preview
**Check:**
- File format is correct (comma-separated)
- Each row has proper values
- No special characters breaking the parsing
- Open console to see if there are errors

---

## 💡 Tips

### Excel/Google Sheets Users:
1. Create your roster in Excel/Google Sheets
2. **File → Save As → CSV (Comma delimited)**
3. Upload the CSV file

### Multiple Files:
- You can upload multiple CSV files
- Students from each upload will be added to the roster
- Existing students won't be removed

### Editing After Upload:
- After uploading, you can still manually edit students
- Use "Enter Student" mode to add more individually
- Or upload another CSV to add more in bulk

---

## 🎯 Common CSV Examples

### Example 1: Basic Format
```csv
First Name,Last Name,Email
Alice,Anderson,alice@example.com
Bob,Brown,bob@example.com
```

### Example 2: With Header
```csv
FirstName,LastName,EmailAddress
Charlie,Clark,charlie@example.com
Diana,Davis,diana@example.com
```

### Example 3: With Quotes (for names with commas)
```csv
First Name,Last Name,Email
"Smith, Jr.",John,john.smith@example.com
Mary,O'Connor,mary@example.com
```

---

## 🚀 Quick Start

1. **Download Template:**
   - Click "Download Template" button
   - Or use `public/sample_students.csv`

2. **Fill in Your Students:**
   - Open in Excel/Google Sheets
   - Add your student data
   - Save as CSV

3. **Upload:**
   - Drag & drop into upload area
   - OR click "Choose File"

4. **Verify:**
   - Check preview table shows all students
   - Make sure names and emails are correct

5. **Save:**
   - Click "Save Students"
   - Students added to roster!

---

## 📞 Still Having Issues?

1. **Check browser console** for error messages (F12)
2. **Verify CSV format** matches examples
3. **Try sample file** (`public/sample_students.csv`) first
4. **Use drag & drop** if button click doesn't work

---

**Updated:** CSV upload now works perfectly with better error handling and drag & drop support! 🎉
