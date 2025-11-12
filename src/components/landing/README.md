# Landing Page Components

This directory contains modular, reusable components for the CPI Training landing page.

## Component Structure

```
src/
├── components/
│   └── landing/           # Landing page components
│       ├── Navbar.tsx            # Top navigation bar
│       ├── HeroSection.tsx       # Hero section with background
│       ├── QuickActions.tsx      # Quick action icon buttons
│       ├── ImpactStory.tsx       # Real-life impact testimonial
│       ├── WhyChooseUs.tsx       # Benefits/features section
│       └── index.tsx             # Export all components
│
├── app/
│   ├── page.tsx                  # Main landing page (uses components)
│   ├── login/                    # Login page (separate)
│   ├── dashboard/                # Dashboard (separate)
│   └── sections/                 # Larger sections (to be created)
│       ├── CoursesSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── PricingSection.tsx
│       ├── FAQSection.tsx
│       └── FooterSection.tsx
```

## Usage

### In page.tsx:
```typescript
import {
  Navbar,
  HeroSection,
  QuickActions,
  ImpactStory,
  WhyChooseUs
} from "@/components/landing";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <QuickActions />
      <ImpactStory />
      <WhyChooseUs />
      {/* Other sections... */}
    </div>
  );
}
```

## Component Responsibilities

### Navbar
- Sticky top navigation
- Logo and brand name
- Navigation links (Courses, About, Pricing)
- Login button

### HeroSection
- Background image with overlay
- Main headline and tagline
- CTA buttons (Find a Class, Explore Courses)
- Trust statistics (5M+ students, 100+ years, etc.)
- Wave divider at bottom

### QuickActions
- 4 action cards (Book Training, Online Courses, Corporate, Recertification)
- Hover effects and animations
- Direct CTAs for main user journeys

### ImpactStory
- Real-life testimonial with emotional appeal
- Teal background gradient
- "Be Ready Like Sarah" CTA
- Visual icon illustration

### WhyChooseUs
- 6 benefit cards in grid layout
- Mix of red and teal accents
- Professional credibility markers (ILCOR, OSHA)
- Icons for each benefit

## Sections (To Be Created)

The following larger sections should be extracted to `src/app/sections/`:

1. **CoursesSection** - All course cards (CPR, First Aid, Combo, etc.)
2. **HowItWorksSection** - 3-step process
3. **TestimonialsSection** - Customer reviews with star ratings
4. **PricingSection** - 3 pricing tiers
5. **FAQSection** - Interactive accordion
6. **FooterSection** - Links, contact info, badges

## Benefits of This Structure

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused across different pages
3. **Maintainability** - Easy to find and update specific sections
4. **Testing** - Components can be tested independently
5. **Performance** - Smaller components = easier code splitting

## File Organization

- **Landing Page** → `src/app/page.tsx` (main entry point)
- **Login Page** → `src/app/login/page.tsx` (separate flow)
- **Dashboard** → `src/app/dashboard/page.tsx` (protected area)
- **Components** → `src/components/landing/` (reusable UI)
- **Sections** → `src/app/sections/` (page-specific large sections)

This keeps the codebase clean and easy to navigate!
