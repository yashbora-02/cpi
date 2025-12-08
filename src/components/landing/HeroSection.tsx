"use client";

import { useRouter } from "next/navigation";
import { FaAward } from "react-icons/fa";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative bg-[#2D2F33] text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.webp')",
          opacity: 0.4
        }}
      />

      {/* Dark Gradient Overlay to Fade the Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D2F33]/65 via-[#2D2F33]/55 to-[#2D2F33]/70"></div>

      {/* Red Accent Gradient on Left */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#1E90FF]/30 via-[#1E90FF]/15 to-transparent"></div>

      {/* Teal Accent Gradient on Right */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#00D4E0]/25 via-[#00D4E0]/10 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
            <FaAward className="text-[#00D4E0]" />
            <span className="text-sm font-bold">America's Trusted First Aid & CPR Training Provider</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Learn to Save a Life with<br />
            <span className="text-[#00D4E0]">the Nation's Experts</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-10 max-w-3xl mx-auto">
            Join over 5 million people who choose our award-winning CPR, First Aid & AED certification courses. Professional training that empowers you to respond with confidence when it matters most.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-[#00D4E0] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all transform hover:scale-105 shadow-2xl"
            >
              Find a Class Near You
            </button>
            <button
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white text-[#1E90FF] text-lg font-bold uppercase rounded-lg hover:bg-gray-100 transition-all shadow-2xl"
            >
              Explore Courses
            </button>
          </div>

          {/* Trust Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-bold text-[#00D4E0] mb-2">5M+</div>
              <div className="text-sm text-white/90 font-semibold">Students Trained Annually</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-bold text-[#00D4E0] mb-2">100+</div>
              <div className="text-sm text-white/90 font-semibold">Years of Excellence</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-bold text-[#00D4E0] mb-2">98%</div>
              <div className="text-sm text-white/90 font-semibold">Student Pass Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
              <div className="text-4xl font-bold text-[#00D4E0] mb-2">OSHA</div>
              <div className="text-sm text-white/90 font-semibold">Compliant Certified</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
