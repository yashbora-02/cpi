"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaShieldAlt,
  FaCertificate,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaGraduationCap,
  FaChartLine,
  FaQuoteLeft,
  FaChevronDown,
  FaAward,
  FaHandHoldingHeart,
  FaLaptop,
  FaUserMd,
  FaStar
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold text-[#2D2F33]">CPI Training</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-[#2D2F33] hover:text-[#C10E21] font-semibold transition">Courses</a>
              <a href="#about" className="text-[#2D2F33] hover:text-[#C10E21] font-semibold transition">About</a>
              <a href="#pricing" className="text-[#2D2F33] hover:text-[#C10E21] font-semibold transition">Pricing</a>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-2.5 bg-[#C10E21] text-white font-bold uppercase rounded-lg hover:bg-[#a00d1c] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Inspired by Red Cross & St John Ambulance */}
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
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#C10E21]/30 via-[#C10E21]/15 to-transparent"></div>

        {/* Teal Accent Gradient on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#00A5A8]/25 via-[#00A5A8]/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 mb-8">
              <FaAward className="text-[#00A5A8]" />
              <span className="text-sm font-bold">America's Trusted First Aid & CPR Training Provider</span>
            </div>

            {/* Main Headline - Larger, Bolder */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Learn to Save a Life with<br />
              <span className="text-[#00A5A8]">the Nation's Experts</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-10 max-w-3xl mx-auto">
              Join over 5 million people who choose our award-winning CPR, First Aid & AED certification courses. Professional training that empowers you to respond with confidence when it matters most.
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => router.push("/login")}
                className="px-10 py-5 bg-[#00A5A8] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
              >
                Find a Class Near You
              </button>
              <button
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-[#C10E21] text-lg font-bold uppercase rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
              >
                Explore Courses
              </button>
            </div>

            {/* Trust Statistics - Prominent Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-[#00A5A8] mb-2">5M+</div>
                <div className="text-sm text-white/90 font-semibold">Students Trained Annually</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-[#00A5A8] mb-2">100+</div>
                <div className="text-sm text-white/90 font-semibold">Years of Excellence</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-[#00A5A8] mb-2">98%</div>
                <div className="text-sm text-white/90 font-semibold">Student Pass Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <div className="text-4xl font-bold text-[#00A5A8] mb-2">OSHA</div>
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

      {/* Quick Action Icons - Inspired by St John Ambulance */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() => router.push("/login")}
              className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00A5A8] active:scale-95"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FaGraduationCap className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Book Training Now</h3>
              <p className="text-sm text-gray-600">Find classes in your area</p>
            </button>

            <button
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00A5A8] active:scale-95"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FaLaptop className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Online Courses</h3>
              <p className="text-sm text-gray-600">Learn at your own pace</p>
            </button>

            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00A5A8] active:scale-95"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FaUsers className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Corporate Training</h3>
              <p className="text-sm text-gray-600">For teams & organizations</p>
            </button>

            <button
              onClick={() => router.push("/login")}
              className="group bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-[#00A5A8] active:scale-95"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                <FaCertificate className="text-3xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Recertification</h3>
              <p className="text-sm text-gray-600">Renew your certification</p>
            </button>
          </div>
        </div>
      </section>

      {/* Real-Life Impact Story - Inspired by St John Ambulance */}
      <section className="py-20 bg-gradient-to-br from-[#00A5A8] to-[#008a8d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-bold">Real Life. Real Impact.</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                "My CPR training saved my colleague's life"
              </h2>
              <p className="text-xl text-white/95 leading-relaxed mb-6">
                When David collapsed at work, Sarah's quick thinking and CPR skills made all the difference. Within minutes of cardiac arrest, she started chest compressions while a coworker called 911. David survived thanks to her training.
              </p>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#C10E21]">SM</span>
                </div>
                <div>
                  <div className="font-bold text-lg">Sarah Martinez</div>
                  <div className="text-white/80">Office Manager, Chicago</div>
                </div>
              </div>
              <button
                onClick={() => router.push("/login")}
                className="px-8 py-4 bg-white text-[#C10E21] font-bold uppercase rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
              >
                Be Ready Like Sarah
              </button>
            </div>
            <div className="relative hidden md:block">
              <div className="bg-white/10 backdrop-blur-lg p-12 rounded-3xl border border-white/20">
                <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl">
                  <FaHandHoldingHeart className="text-9xl text-white/50" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - HSI Inspired Features */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              Why Professionals Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Award-winning training trusted by individuals, healthcare providers, and Fortune 500 companies
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#C10E21] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#C10E21] rounded-xl flex items-center justify-center mb-6">
                <FaUserMd className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Certified Expert Instructors</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from nationally certified professionals with real-world emergency response experience. Our instructors bring decades of expertise to every training session.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#C10E21] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#C10E21] rounded-xl flex items-center justify-center mb-6">
                <FaClock className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Flexible Learning Options</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from in-person, blended online, or fully remote training. Video-driven, scenario-based programs designed to engage all learning styles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#C10E21] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#C10E21] rounded-xl flex items-center justify-center mb-6">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Latest Standards & Science</h3>
              <p className="text-gray-600 leading-relaxed">
                Our programs reflect the latest resuscitation science from the International Liaison Committee on Resuscitation (ILCOR). Stay current with evidence-based training.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#00A5A8] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-6">
                <FaCertificate className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Nationally Recognized Certification</h3>
              <p className="text-gray-600 leading-relaxed">
                Earn 2-year certifications accepted by employers, regulatory bodies, and organizations nationwide. OSHA-compliant and industry-standard.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#00A5A8] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-6">
                <FaLaptop className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Interactive & Practical</h3>
              <p className="text-gray-600 leading-relaxed">
                Engage in hands-on practice with immediate feedback. Our scenario-based approach ensures you're ready to act confidently in real emergencies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#00A5A8] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-6">
                <FaAward className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Award-Winning Programs</h3>
              <p className="text-gray-600 leading-relaxed">
                Join over 5 million students who choose our trusted courses each year. Developed and refined over 40 years of excellence in safety training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section - Red Cross Inspired Layout */}
      <section id="courses" className="py-20 bg-gradient-to-br from-[#F5F6F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              CPR, First Aid & AED Certification Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From individuals to healthcare providers to workplace safety officers — we have the right training program for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CPR Only */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="bg-gradient-to-br from-[#C10E21] to-[#a00d1c] p-6">
                <FaHeart className="text-4xl text-white mb-3" />
                <h3 className="text-2xl font-bold text-white">CPR Certification</h3>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FaStar className="text-[#00A5A8]" />
                  <span className="text-sm font-semibold text-gray-600">Most Popular</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Learn life-saving CPR techniques for adults, children, and infants. Includes choking relief and barrier device usage.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">2-year certification</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">In-person or blended online</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Same-day certification card</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-[#C10E21] text-white font-bold uppercase rounded-lg hover:bg-[#a00d1c] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Find a Class
                </button>
              </div>
            </div>

            {/* First Aid */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="bg-gradient-to-br from-[#C10E21] to-[#a00d1c] p-6">
                <FaShieldAlt className="text-4xl text-white mb-3" />
                <h3 className="text-2xl font-bold text-white">First Aid Certification</h3>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FaCertificate className="text-[#00A5A8]" />
                  <span className="text-sm font-semibold text-gray-600">OSHA Compliant</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Respond to common workplace and home emergencies with proper care techniques and injury management.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Bleeding, burns, fractures</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Medical emergencies</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Environmental emergencies</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-[#C10E21] text-white font-bold uppercase rounded-lg hover:bg-[#a00d1c] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Find a Class
                </button>
              </div>
            </div>

            {/* CPR + First Aid + AED Combo */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group border-2 border-[#00A5A8] relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#00A5A8] text-white px-4 py-1 rounded-full text-sm font-bold">
                BEST VALUE
              </div>
              <div className="bg-gradient-to-br from-[#C10E21] to-[#a00d1c] p-6">
                <FaCheckCircle className="text-4xl text-white mb-3" />
                <h3 className="text-2xl font-bold text-white">Complete Certification</h3>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FaAward className="text-[#00A5A8]" />
                  <span className="text-sm font-semibold text-gray-600">Comprehensive Package</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Full CPR, First Aid, and AED training in one comprehensive course. The complete package for workplace safety.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">All-in-one certification</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">AED training included</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Save 30% vs. separate</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-[#00A5A8] text-white font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Find a Class
                </button>
              </div>
            </div>

            {/* Instructor Training */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="bg-gradient-to-br from-[#00A5A8] to-[#008a8d] p-6">
                <FaGraduationCap className="text-4xl text-white mb-3" />
                <h3 className="text-2xl font-bold text-white">Instructor Certification</h3>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FaUserMd className="text-[#C10E21]" />
                  <span className="text-sm font-semibold text-gray-600">Professional Path</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Become a certified instructor and teach life-saving skills to your community or organization.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Nationally recognized credential</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Teaching materials included</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Ongoing support</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-white border-2 border-[#00A5A8] text-[#00A5A8] font-bold uppercase rounded-lg hover:bg-[#00A5A8] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Learn More
                </button>
              </div>
            </div>

            {/* Corporate Training */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="bg-gradient-to-br from-[#00A5A8] to-[#008a8d] p-6">
                <FaUsers className="text-4xl text-white mb-3" />
                <h3 className="text-2xl font-bold text-white">Corporate Solutions</h3>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FaUsers className="text-[#C10E21]" />
                  <span className="text-sm font-semibold text-gray-600">For Organizations</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Customized workplace safety programs for teams of any size, delivered on-site or remotely.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">On-site training available</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Volume discounts</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Compliance tracking</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-white border-2 border-[#00A5A8] text-[#00A5A8] font-bold uppercase rounded-lg hover:bg-[#00A5A8] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Recertification */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all group">
              <div className="bg-gradient-to-br from-[#00A5A8] to-[#008a8d] p-6">
                <FaChartLine className="text-4xl text-white mb-3" />
                <h3 className="text-2xl font-bold text-white">Recertification</h3>
              </div>
              <div className="p-8">
                <div className="flex items-center space-x-2 mb-4">
                  <FaClock className="text-[#C10E21]" />
                  <span className="text-sm font-semibold text-gray-600">Quick Renewal</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Keep your skills sharp and certification current with our streamlined renewal courses.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Shorter time commitment</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Skills review & updates</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">Same-day renewal</span>
                  </li>
                </ul>
                <button className="w-full px-6 py-3 bg-white border-2 border-[#00A5A8] text-[#00A5A8] font-bold uppercase rounded-lg hover:bg-[#00A5A8] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                  Renew Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              Getting Certified is Simple
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three easy steps to earning your life-saving certification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="relative">
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-10 rounded-2xl text-center hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-[#C10E21] to-[#a00d1c] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold shadow-lg">
                  1
                </div>
                <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Choose Your Course</h3>
                <p className="text-gray-600 leading-relaxed">
                  Select from in-person, blended online, or fully remote training options. Find a class that fits your schedule.
                </p>
              </div>
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-[#00A5A8]"></div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-10 rounded-2xl text-center hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-[#C10E21] to-[#a00d1c] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold shadow-lg">
                  2
                </div>
                <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Complete Training</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn through interactive modules and hands-on practice with certified instructors. Master life-saving techniques.
                </p>
              </div>
              <div className="hidden md:block absolute top-12 -right-4 w-8 h-1 bg-[#00A5A8]"></div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-10 rounded-2xl text-center hover:shadow-xl transition-all">
                <div className="w-24 h-24 bg-gradient-to-br from-[#C10E21] to-[#a00d1c] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold shadow-lg">
                  3
                </div>
                <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">Get Certified</h3>
                <p className="text-gray-600 leading-relaxed">
                  Pass your skills assessment and receive your official 2-year certification card the same day.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-[#C10E21] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#a00d1c] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95"
            >
              Start Your Training Today
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-[#2D2F33] to-[#1a1b1d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Millions
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Real stories from people who gained life-saving confidence through our training
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition">
              <div className="flex items-center mb-4">
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
              </div>
              <FaQuoteLeft className="text-3xl text-[#00A5A8] mb-4" />
              <p className="text-lg mb-6 leading-relaxed">
                "The training was professional, practical, and gave me real confidence. I feel prepared to act in an emergency now. Best decision I made this year."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  SM
                </div>
                <div>
                  <div className="font-bold">Sarah Martinez</div>
                  <div className="text-sm text-white/70">Office Manager</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition">
              <div className="flex items-center mb-4">
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
              </div>
              <FaQuoteLeft className="text-3xl text-[#00A5A8] mb-4" />
              <p className="text-lg mb-6 leading-relaxed">
                "We certified our entire 50-person team. The corporate package was seamless, instructors were outstanding, and the certification process was efficient."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  JC
                </div>
                <div>
                  <div className="font-bold">James Chen</div>
                  <div className="text-sm text-white/70">HR Director, Tech Corp</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition">
              <div className="flex items-center mb-4">
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
                <FaStar className="text-[#00A5A8]" />
              </div>
              <FaQuoteLeft className="text-3xl text-[#00A5A8] mb-4" />
              <p className="text-lg mb-6 leading-relaxed">
                "The blended learning format was perfect for my busy teaching schedule. Online theory plus hands-on practice made learning efficient and thorough."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  RP
                </div>
                <div>
                  <div className="font-bold">Rachel Patel</div>
                  <div className="text-sm text-white/70">High School Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the certification package that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic */}
            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-2">Individual</h3>
              <p className="text-gray-600 mb-6">Perfect for personal certification</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-[#C10E21]">$45</span>
                <span className="text-gray-600 text-lg">/person</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">CPR or First Aid certification</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">2-year validity</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Digital certification card</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Online or in-person options</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white border-2 border-[#C10E21] text-[#C10E21] font-bold uppercase rounded-lg hover:bg-[#C10E21] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                Get Started
              </button>
            </div>

            {/* Standard - Featured */}
            <div className="bg-gradient-to-br from-[#C10E21] to-[#a00d1c] p-8 rounded-2xl shadow-2xl transform md:scale-105 relative border-2 border-[#00A5A8]">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#00A5A8] text-white px-6 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Complete Package</h3>
              <p className="text-white/90 mb-6">Best value for full certification</p>
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">$75</span>
                <span className="text-white/80 text-lg">/person</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white">CPR + First Aid + AED combo</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white">2-year validity</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white">Physical + digital cards</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white">Blended learning option</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-white">Free renewal reminder</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-[#00A5A8] text-white font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95">
                Get Started
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For teams & organizations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#C10E21]">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Unlimited team members</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">On-site training available</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Compliance tracking dashboard</span>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#00A5A8] mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Volume discounts</span>
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-white border-2 border-[#C10E21] text-[#C10E21] font-bold uppercase rounded-lg hover:bg-[#C10E21] hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F5F6F7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our training programs
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How long does the certification last?",
                answer: "All certifications are valid for 2 years from the date of completion. We'll send you a reminder email before your certification expires so you can schedule your recertification course."
              },
              {
                question: "Is the certification recognized nationally?",
                answer: "Yes, our certifications are OSHA-compliant and recognized by employers, regulatory bodies, and organizations nationwide. Our training meets or exceeds all national standards set by ILCOR for CPR and First Aid certification."
              },
              {
                question: "What's the difference between online and blended courses?",
                answer: "Online courses include digital learning modules with virtual skills assessment. Blended courses combine online theory portions with in-person hands-on practice and skills testing with a certified instructor, providing the most comprehensive learning experience."
              },
              {
                question: "Can I get a refund if I can't complete the course?",
                answer: "We offer a full refund if you cancel at least 48 hours before your scheduled training session. For blended courses, online portions must be incomplete to qualify for a full refund."
              },
              {
                question: "Do you offer corporate group training?",
                answer: "Absolutely! We provide customized corporate training programs for teams of any size. We can deliver training on-site at your location or arrange group sessions at our training centers. Contact our sales team for volume pricing and custom scheduling."
              },
              {
                question: "What happens if I don't pass the skills assessment?",
                answer: "You can retake the skills assessment at no additional cost within 30 days of your original course date. Our instructors will provide additional coaching to ensure you're confident and prepared for your reassessment."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-all"
                >
                  <span className="text-lg font-bold text-[#2D2F33] pr-4">{faq.question}</span>
                  <FaChevronDown
                    className={`text-[#C10E21] transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2F33] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#C10E21] to-[#00A5A8] rounded-lg flex items-center justify-center">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <span className="text-2xl font-bold">CPI Training</span>
              </div>
              <p className="text-white/80 mb-6 leading-relaxed max-w-md">
                Empowering individuals and organizations with life-saving skills through professional CPR and First Aid training for over 100 years.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/10 px-4 py-3 rounded-lg">
                  <div className="font-bold text-[#00A5A8] text-lg">5M+</div>
                  <div className="text-xs text-white/70">Trained Annually</div>
                </div>
                <div className="bg-white/10 px-4 py-3 rounded-lg">
                  <div className="font-bold text-[#00A5A8] text-lg">OSHA</div>
                  <div className="text-xs text-white/70">Compliant</div>
                </div>
                <div className="bg-white/10 px-4 py-3 rounded-lg">
                  <div className="font-bold text-[#00A5A8] text-lg">2-Year</div>
                  <div className="text-xs text-white/70">Certification</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#courses" className="text-white/80 hover:text-[#00A5A8] transition">Courses</a></li>
                <li><a href="#pricing" className="text-white/80 hover:text-[#00A5A8] transition">Pricing</a></li>
                <li><a href="#about" className="text-white/80 hover:text-[#00A5A8] transition">About Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">Find a Class</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">Become an Instructor</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact & Support</h3>
              <ul className="space-y-3 text-white/80">
                <li>Email: info@cpitraining.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Hours: Mon-Fri 9AM - 6PM</li>
                <li className="pt-3">
                  <button
                    onClick={() => router.push("/login")}
                    className="px-6 py-2.5 bg-[#00A5A8] text-white font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm active:scale-95"
                  >
                    Student Login
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © 2025 CPI Training. All rights reserved. Charity Registration #1077265/1
              </div>
              <div className="flex space-x-6 text-sm text-white/60">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
                <a href="#" className="hover:text-white transition">Accessibility</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
