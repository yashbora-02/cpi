"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaHeart,
  FaShieldAlt,
  FaCertificate,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaLaptop,
  FaUserMd,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaVideo,
  FaClipboardList,
  FaDesktop,
  FaHandsHelping,
  FaBuilding,
  FaChalkboardTeacher,
  FaUserShield,
  FaBrain,
  FaEye,
  FaHandPaper,
  FaBook,
  FaComments,
  FaBalanceScale,
  FaPlayCircle,
  FaHeadset,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser
} from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";

export default function Home() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 md:h-20">
            {/* Logo - Left */}
            <div className="flex items-center">
              <button onClick={() => router.push("/")}>
                <Image
                  src="/cpi logo.png"
                  alt="CarePoint Institute"
                  width={140}
                  height={50}
                  className="object-contain md:w-[180px] md:h-[60px]"
                />
              </button>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <a href="#courses" className="flex items-center text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                {t.nav.cprCourses}
                <FaChevronDown className="ml-1 text-xs" />
              </a>
              <a href="#training-options" className="flex items-center text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                {t.nav.moreCourses}
                <FaChevronDown className="ml-1 text-xs" />
              </a>
              <button onClick={() => router.push("/acceptance")} className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                {t.nav.acceptance}
              </button>
              <button onClick={() => router.push("/login")} className="flex items-center text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                <FaUser className="mr-2 text-sm" />
                {t.nav.logIn}
              </button>
            </div>

            {/* Right Side - Phone & Language */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:1-800-555-0123" className="flex items-center text-[#00D4E0] hover:text-[#00D4E0] font-medium transition">
                <FaPhone className="mr-2 text-sm" />
                {t.nav.phone}
              </a>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 border border-gray-300 rounded-md text-[#2D2F33] hover:border-[#1E90FF] hover:text-[#1E90FF] font-medium transition"
              >
                {t.nav.language}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#2D2F33] hover:text-[#1E90FF] transition ml-auto"
            >
              {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4 px-4">
                <a
                  href="#courses"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2"
                >
                  {t.nav.cprCourses}
                </a>
                <a
                  href="#training-options"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2"
                >
                  {t.nav.moreCourses}
                </a>
                <button
                  onClick={() => { router.push("/acceptance"); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2 text-left"
                >
                  {t.nav.acceptance}
                </button>
                <button
                  onClick={() => { router.push("/login"); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2 text-left"
                >
                  {t.nav.logIn}
                </button>
                <a
                  href="tel:1-800-555-0123"
                  className="text-[#00D4E0] font-medium py-2"
                >
                  {t.nav.phone}
                </a>
                <button
                  onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2 text-left"
                >
                  {t.nav.language}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#2D2F33] text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/bg.webp')",
            opacity: 0.4
          }}
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D2F33]/65 via-[#2D2F33]/55 to-[#2D2F33]/70"></div>

        {/* Red Accent Gradient on Left */}
        <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#1E90FF]/30 via-[#1E90FF]/15 to-transparent"></div>

        {/* Teal Accent Gradient on Right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#00D4E0]/25 via-[#00D4E0]/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {t.hero.title}<br />
              <span className="text-[#00D4E0]">{t.hero.titleHighlight}</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed mb-6 max-w-3xl mx-auto">
              {t.hero.subtitle}
            </p>

            {/* Description */}
            <p className="text-lg text-white/85 leading-relaxed mb-10 max-w-3xl mx-auto">
              {t.hero.description}
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/login")}
                className="px-10 py-5 bg-[#00D4E0] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
              >
                {t.hero.getCertified}
              </button>
              <button
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-[#1E90FF] text-lg font-bold uppercase rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
              >
                {t.hero.exploreCourses}
              </button>
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

      {/* Training Built for the People You Support */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              {t.trainingBuilt.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.trainingBuilt.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Direct Support Professionals */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#1E90FF] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
                <FaHandHoldingHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">{t.trainingBuilt.directSupport}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.trainingBuilt.directSupportDesc}
              </p>
            </div>

            {/* Healthcare Professionals */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#00D4E0] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#00D4E0] rounded-xl flex items-center justify-center mb-6">
                <FaUserMd className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">{t.trainingBuilt.healthcare}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.trainingBuilt.healthcareDesc}
              </p>
            </div>

            {/* Educational & Community Roles */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#1E90FF] hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
                <FaChalkboardTeacher className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">{t.trainingBuilt.education}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.trainingBuilt.educationDesc}
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 font-medium">
              {t.trainingBuilt.courseNote}
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Preparedness for Everyone */}
      <section className="py-20 bg-gradient-to-br from-[#00D4E0] to-[#008a8d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.emergency.title}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {t.emergency.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <FaUserMd className="text-3xl mx-auto mb-3" />
              <p className="text-sm font-semibold">{t.emergency.healthcarePro}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <FaHeart className="text-3xl mx-auto mb-3" />
              <p className="text-sm font-semibold">{t.emergency.parents}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <FaChalkboardTeacher className="text-3xl mx-auto mb-3" />
              <p className="text-sm font-semibold">{t.emergency.teachers}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <FaUsers className="text-3xl mx-auto mb-3" />
              <p className="text-sm font-semibold">{t.emergency.coaches}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <FaShieldAlt className="text-3xl mx-auto mb-3" />
              <p className="text-sm font-semibold">{t.emergency.workplace}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center hover:bg-white/20 transition">
              <FaHandsHelping className="text-3xl mx-auto mb-3" />
              <p className="text-sm font-semibold">{t.emergency.community}</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-white text-[#1E90FF] text-lg font-bold uppercase rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.emergency.findClass}
            </button>
          </div>
        </div>
      </section>

      {/* Instructor Program Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
                {t.instructor.title}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t.instructor.subtitle}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#2D2F33] mb-4">{t.instructor.resourcesTitle}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaVideo className="text-[#00D4E0] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.videos}</span>
                  </li>
                  <li className="flex items-start">
                    <FaClipboardList className="text-[#00D4E0] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.guides}</span>
                  </li>
                  <li className="flex items-start">
                    <FaDesktop className="text-[#00D4E0] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.presentations}</span>
                  </li>
                  <li className="flex items-start">
                    <FaHandPaper className="text-[#00D4E0] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.tools}</span>
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#2D2F33] mb-4">{t.instructor.pathsTitle}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#1E90FF] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.online}</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#1E90FF] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.inPerson}</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-[#1E90FF] mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{t.instructor.support}</span>
                  </li>
                </ul>
              </div>

              <p className="text-[#00D4E0] font-semibold mb-6">
                {t.instructor.reciprocity}
              </p>

              <button
                onClick={() => router.push("/login")}
                className="px-8 py-4 bg-[#1E90FF] text-white font-bold uppercase rounded-lg hover:bg-[#1873CC] transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
              >
                {t.instructor.becomeInstructor}
              </button>
            </div>

            <div className="relative hidden md:block">
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-12 rounded-3xl shadow-xl">
                <div className="flex items-center justify-center w-full h-64 bg-gradient-to-br from-[#1E90FF]/10 to-[#00D4E0]/10 rounded-2xl">
                  <FaGraduationCap className="text-9xl text-[#1E90FF]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Teach - Instructional Methodology */}
      <section className="py-20 bg-gradient-to-br from-[#F5F6F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              {t.howWeTeach.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.howWeTeach.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaPlayCircle className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.howWeTeach.videoDriven}</h3>
              <p className="text-gray-600">
                {t.howWeTeach.videoDrivenDesc}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBrain className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.howWeTeach.scenario}</h3>
              <p className="text-gray-600">
                {t.howWeTeach.scenarioDesc}                                                     
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaEye className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.howWeTeach.learningStyles}</h3>
              <p className="text-gray-600">
                {t.howWeTeach.learningStylesDesc}
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCertificate className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.howWeTeach.compliance}</h3>
              <p className="text-gray-600">
                {t.howWeTeach.complianceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification That Builds Real Confidence */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              {t.certification.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.certification.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-[#00D4E0] rounded-xl flex items-center justify-center mb-6">
                <FaBook className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.certification.library}</h3>
              <p className="text-gray-600">
                {t.certification.libraryDesc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
                <FaUserShield className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.certification.realWorld}</h3>
              <p className="text-gray-600">
                {t.certification.realWorldDesc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-[#00D4E0] rounded-xl flex items-center justify-center mb-6">
                <FaBrain className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.certification.retention}</h3>
              <p className="text-gray-600">
                {t.certification.retentionDesc}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
                <FaCertificate className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-3">{t.certification.beyond}</h3>
              <p className="text-gray-600">
                {t.certification.beyondDesc}
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-[#1E90FF] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#1873CC] transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95"
            >
              {t.certification.startTraining}
            </button>
          </div>
        </div>
      </section>

      {/* Courses Section - Placeholder for navigation anchor */}
      <section id="courses" className="py-20 bg-gradient-to-br from-[#F5F6F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              {t.nav.cprCourses}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse our comprehensive CPR and First Aid training programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
                <FaHeart className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">CPR & AED Certification</h3>
              <p className="text-gray-600 mb-6">
                Learn life-saving CPR and AED techniques for adults, children, and infants. Get nationally recognized 2-year certification.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 bg-[#1E90FF] text-white font-bold uppercase rounded-lg hover:bg-[#1873CC] transition-all duration-300 transform hover:scale-105"
              >
                View Course
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-[#00D4E0] rounded-xl flex items-center justify-center mb-6">
                <FaShieldAlt className="text-3xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D2F33] mb-4">First Aid Training</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive first aid training covering emergency response, wound care, and medical emergencies. Build confidence to respond.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 bg-[#00D4E0] text-white font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105"
              >
                View Course
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-gradient-to-r from-[#1E90FF] to-[#00D4E0] text-white text-lg font-bold uppercase rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg active:scale-95"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </section>

      {/* Flexible Training Options */}
      <section id="training-options" className="py-20 bg-gradient-to-br from-[#2D2F33] to-[#1a1b1d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t.trainingOptions.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition">
              <div className="w-14 h-14 bg-[#00D4E0] rounded-xl flex items-center justify-center mb-6">
                <FaLaptop className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.trainingOptions.remote}</h3>
              <p className="text-white/80">
                {t.trainingOptions.remoteDesc}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition">
              <div className="w-14 h-14 bg-[#1E90FF] rounded-xl flex items-center justify-center mb-6">
                <FaBuilding className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.trainingOptions.inPerson}</h3>
              <p className="text-white/80">
                {t.trainingOptions.inPersonDesc}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition">
              <div className="w-14 h-14 bg-[#00D4E0] rounded-xl flex items-center justify-center mb-6">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{t.trainingOptions.group}</h3>
              <p className="text-white/80">
                {t.trainingOptions.groupDesc}
              </p>
            </div>
          </div>

          {/* What's Included */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">{t.trainingOptions.includedTitle}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00D4E0] mr-3 flex-shrink-0" />
                <span>{t.trainingOptions.materials}</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00D4E0] mr-3 flex-shrink-0" />
                <span>{t.trainingOptions.videoAccess}</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00D4E0] mr-3 flex-shrink-0" />
                <span>{t.trainingOptions.evaluation}</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00D4E0] mr-3 flex-shrink-0" />
                <span>{t.trainingOptions.certCard}</span>
              </div>
              <div className="flex items-center md:col-span-2 justify-center">
                <FaCheckCircle className="text-[#00D4E0] mr-3 flex-shrink-0" />
                <span>{t.trainingOptions.validity}</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-[#00D4E0] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.trainingOptions.schedule}
            </button>
            <div className="flex items-center space-x-2 text-white/90">
              <span>{t.trainingOptions.questions}</span>
              <FaPhone className="text-[#00D4E0]" />
              <span className="font-bold">1-800-555-0123</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="acceptance" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D2F33] mb-4">
              {t.leadership.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.leadership.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                BB
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-1">Brittany Buchanan</h3>
              <p className="text-[#00D4E0] font-semibold mb-2">{t.leadership.director}</p>
              <p className="text-gray-600 text-sm">{t.leadership.certifiedEMT}</p>
            </div>

            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                MB
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-1">Mr. Buchanan</h3>
              <p className="text-[#00D4E0] font-semibold mb-2">{t.leadership.board}</p>
              <p className="text-gray-600 text-sm">{t.leadership.certifiedEMT}</p>
            </div>

            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#1E90FF] to-[#00D4E0] rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                MD
              </div>
              <h3 className="text-xl font-bold text-[#2D2F33] mb-1">Medical Director</h3>
              <p className="text-[#00D4E0] font-semibold mb-2">{t.leadership.physician}</p>
              <p className="text-gray-600 text-sm">{t.leadership.md}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-[#1E90FF] to-[#1873CC] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-white text-[#1E90FF] text-lg font-bold uppercase rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.cta.findCourse}
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-[#00D4E0] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.cta.becomeInstructor}
            </button>
            <button
              onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold uppercase rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95"
            >
              {t.cta.contactUs}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-[#2D2F33] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <Image
                  src="/cpi logo.png"
                  alt="CarePoint Institute"
                  width={120}
                  height={50}
                  className="object-contain"
                />
              </div>
              <p className="text-white/80 leading-relaxed">
                {t.footer.about}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h3>
              <ul className="space-y-3">
                <li><a href="#courses" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.cprCourses}</a></li>
                <li><a href="#training-options" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.firstAid}</a></li>
                <li><button onClick={() => router.push("/acceptance")} className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.accreditation}</button></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.becomeInstructor}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.findClass}</a></li>
                <li>
                  <button
                    onClick={() => router.push("/login")}
                    className="text-white/80 hover:text-[#00D4E0] transition"
                  >
                    {t.footer.logIn}
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.contactUs}</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center">
                  <FaPhone className="mr-3 text-[#00D4E0]" />
                  1-800-555-0123
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-[#00D4E0]" />
                  info@carepointinstitute.com
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-[#00D4E0]" />
                  <span>3200 N Dobson Rd, Ste F7<br />Chandler, AZ 85224</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.privacy}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.dataProtection}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.security}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.refund}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.terms}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.cePrivacy}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00D4E0] transition">{t.footer.conflict}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="text-center text-white/60 text-sm space-y-2">
              <div>{t.footer.ein}</div>
              <div>{t.footer.businessAddress}</div>
              <div className="mt-4">{t.footer.copyright}</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
