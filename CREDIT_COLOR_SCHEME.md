# Credit Color Scheme Guide

## 🎨 Automatic Color Updates Based on Credit Levels

The dashboard automatically updates credit card colors based on the number of available credits. This happens in real-time after any purchase.

---

## 📊 Color Thresholds

### 🔴 **RED - Out of Stock**
**Condition:** `credits === 0`
- **Status Text:** "Out of Stock"
- **Icon:** 🚩 Red Flag
- **Badge Color:** Red (`bg-red-500`)
- **Text Color:** Red (`text-red-600`)

### 🟠 **ORANGE - Low Stock**
**Condition:** `credits > 0 AND credits < 15`
- **Status Text:** "Low Stock"
- **Icon:** ⚠️ Orange Exclamation Circle
- **Badge Color:** Orange (`bg-orange-400`)
- **Text Color:** Orange (`text-orange-500`)

### 🟢 **GREEN - In Stock**
**Condition:** `credits >= 15`
- **Status Text:** "In Stock"
- **Icon:** ✅ Green Check Circle
- **Badge Color:** Green (`bg-green-500`)
- **Text Color:** Green (`text-green-600`)

---

## 🔄 How It Works

### **After Purchase Flow:**

1. **Purchase Complete** → Success modal shows purchased credits
2. **Click "Go to Dashboard"** → Redirects with refresh parameter
3. **Dashboard Detects Refresh** → Forces re-fetch of credits from API
4. **API Returns Updated Data** → Database reflects new credit amounts
5. **UI Updates Automatically** → Colors, icons, and status text change based on new amounts

### **Example Scenarios:**

#### Scenario 1: Out of Stock → Low Stock
- **Before Purchase:** 0 credits → 🔴 Red "Out of Stock"
- **Purchase:** 10 credits
- **After Purchase:** 10 credits → 🟠 Orange "Low Stock"

#### Scenario 2: Low Stock → In Stock
- **Before Purchase:** 8 credits → 🟠 Orange "Low Stock"
- **Purchase:** 10 credits (total: 18)
- **After Purchase:** 18 credits → 🟢 Green "In Stock"

#### Scenario 3: In Stock → More In Stock
- **Before Purchase:** 15 credits → 🟢 Green "In Stock"
- **Purchase:** 25 credits (total: 40)
- **After Purchase:** 40 credits → 🟢 Green "In Stock" (stays green)

---

## 🎯 Visual Indicators

Each credit card displays **4 dynamic elements** that update based on credit count:

1. **Status Icon** (top-right corner)
   - Red Flag 🚩
   - Orange Warning ⚠️
   - Green Check ✅

2. **Credit Number** (large display)
   - Shows exact count
   - Up to 99, then shows "99+"

3. **Status Text** (below number)
   - "Out of Stock"
   - "Low Stock"
   - "In Stock"

4. **Badge** (right side)
   - Colored square with credit count
   - Matches status color

---

## 💫 Smooth Transitions

All color changes include smooth CSS transitions (300ms duration) for a professional feel:
- Badge color transitions smoothly
- Text colors fade between states
- Icons smoothly change
- No jarring updates

---

## 🔧 Technical Implementation

### Dashboard (`src/app/dashboard/page.tsx`)

```typescript
// Color logic functions
const getStatusColor = (credits: number) => {
  if (credits === 0) return "text-red-600";
  if (credits < 15) return "text-orange-500";
  return "text-green-600";
};

const getStatusText = (credits: number) => {
  if (credits === 0) return "Out of Stock";
  if (credits < 15) return "Low Stock";
  return "In Stock";
};

const getStatusIcon = (credits: number) => {
  if (credits === 0) return <FaFlag className="text-red-500" />;
  if (credits < 15) return <FaExclamationCircle className="text-orange-500" />;
  return <FaCheckCircle className="text-green-500" />;
};

const getBadgeColor = (credits: number) => {
  if (credits === 0) return "bg-red-500";
  if (credits < 15) return "bg-orange-400";
  return "bg-green-500";
};
```

### Refresh Mechanism

```typescript
// After purchase, redirect with timestamp
router.push(`/dashboard?refresh=${Date.now()}`);

// Dashboard detects refresh parameter
const refreshParam = searchParams.get('refresh');
if (refreshParam) {
  setRefreshTrigger(Date.now());
  router.replace('/dashboard', { scroll: false });
}

// Triggers re-fetch of credits with updated data
```

---

## ✅ Testing the Color Scheme

1. **Start with low/zero credits**
2. **Go to Purchase Credits** page
3. **Buy a package** (e.g., 10 credits)
4. **Complete the purchase flow**
5. **Return to dashboard**
6. **Observe:**
   - Loading spinner appears briefly
   - Credits update with new amount
   - Colors transition smoothly to match new threshold
   - All indicators (icon, text, badge) update together

---

## 📝 Notes

- Colors are determined **solely by credit count**, not by credit type
- Updates happen **automatically** when returning from purchase
- If database is unavailable, falls back to mock data (development mode)
- All transitions are smooth (300ms) for professional UX
- The refresh mechanism ensures data is always current after purchase

---

**Last Updated:** November 24, 2025
