"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  Navbar,
  HeroSection,
  QuickActions,
  ImpactStory,
  WhyChooseUs
} from "@/components/landing";

// Import remaining sections that will be componentized later
import CoursesSection from "./sections/CoursesSection";
import HowItWorksSection from "./sections/HowItWorksSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import PricingSection from "./sections/PricingSection";
import FAQSection from "./sections/FAQSection";
import FooterSection from "./sections/FooterSection";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <QuickActions />
      <ImpactStory />
      <WhyChooseUs />
      <CoursesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <FooterSection />
    </div>
  );
}
