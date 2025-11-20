"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaCheckCircle,
  FaHospital,
  FaSchool,
  FaHome,
  FaUserNurse,
  FaBuilding,
  FaRunning,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaGlobe,
  FaCertificate,
  FaCalendarAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser
} from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";

export default function Acceptance() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { language, setLanguage, t } = useLanguage();

  // Check for purchase verification on mount
  useEffect(() => {
    // Check URL parameters for purchase success
    const params = new URLSearchParams(window.location.search);
    const purchaseSuccess = params.get('purchase') === 'success';

    // Also check localStorage for previous purchase
    const previousPurchase = localStorage.getItem('cpi_purchase_complete');

    if (purchaseSuccess) {
      localStorage.setItem('cpi_purchase_complete', 'true');
      setHasPurchased(true);
    } else if (previousPurchase === 'true') {
      setHasPurchased(true);
    }

    setIsLoading(false);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en");
  };

  // Show loading or redirect if not purchased
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00A5A8] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hasPurchased) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#C10E21] to-[#a00d1c] px-6 py-8 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#C10E21]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Access Restricted
              </h2>
              <p className="text-white/90 text-sm">
                This page is only available after completing a purchase
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border-l-4 border-[#00A5A8] p-4 rounded-r">
                <p className="text-sm text-gray-700">
                  To view acceptance information and guidelines, please complete your course purchase first.
                </p>
              </div>

              <button
                onClick={() => router.push('/courses')}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white font-medium rounded-lg hover:from-[#008a8d] hover:to-[#00A5A8] transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
              >
                Browse Courses
              </button>

              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                  src="/logo.png"
                  alt="CarePoint Institute"
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </button>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <a href="/#courses" className="flex items-center text-[#2D2F33] hover:text-[#C10E21] font-medium transition">
                {t.nav.cprCourses}
                <FaChevronDown className="ml-1 text-xs" />
              </a>
              <a href="/#training-options" className="flex items-center text-[#2D2F33] hover:text-[#C10E21] font-medium transition">
                {t.nav.moreCourses}
                <FaChevronDown className="ml-1 text-xs" />
              </a>
              <button onClick={() => router.push("/acceptance")} className="text-[#C10E21] font-medium transition">
                {t.nav.acceptance}
              </button>
              <button onClick={() => router.push("/login")} className="flex items-center text-[#2D2F33] hover:text-[#C10E21] font-medium transition">
                <FaUser className="mr-2" />
                {t.nav.logIn}
              </button>
            </div>

            {/* Right Side - Phone & Language */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:1-800-555-0123" className="flex items-center text-[#00A5A8] hover:text-[#008a8d] font-medium transition">
                <FaPhone className="mr-2" />
                {t.nav.phone}
              </a>
              <button
                onClick={toggleLanguage}
                className="px-4 py-2 border border-[#2D2F33] text-[#2D2F33] rounded hover:bg-gray-100 font-medium transition"
              >
                {t.nav.language}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden ml-auto p-2 text-[#2D2F33] hover:text-[#C10E21] transition"
            >
              {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4 px-4">
                <button
                  onClick={() => { router.push("/#courses"); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#C10E21] font-medium transition py-2 text-left"
                >
                  {t.nav.cprCourses}
                </button>
                <button
                  onClick={() => { router.push("/#training-options"); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#C10E21] font-medium transition py-2 text-left"
                >
                  {t.nav.moreCourses}
                </button>
                <button
                  onClick={() => { router.push("/acceptance"); setMobileMenuOpen(false); }}
                  className="text-[#C10E21] font-medium transition py-2 text-left"
                >
                  {t.nav.acceptance}
                </button>
                <button
                  onClick={() => { router.push("/login"); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#C10E21] font-medium transition py-2 text-left"
                >
                  {t.nav.logIn}
                </button>
                <a
                  href="tel:1-800-555-0123"
                  className="text-[#00A5A8] font-medium py-2"
                >
                  {t.nav.phone}
                </a>
                <button
                  onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#C10E21] font-medium transition py-2 text-left"
                >
                  {t.nav.language}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[#2D2F33] text-white overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C10E21]/20 to-[#00A5A8]/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t.acceptance.heroTitle}<br />
            <span className="text-[#00A5A8]">{t.acceptance.heroHighlight}</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t.acceptance.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Standards Compliance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2F33] mb-6">
                {t.acceptance.guidelinesTitle}
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {t.acceptance.guidelinesDesc1}
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t.acceptance.guidelinesDesc2}
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#00A5A8] rounded-full flex items-center justify-center">
                  <FaCalendarAlt className="text-xl text-white" />
                </div>
                <div>
                  <p className="font-bold text-[#2D2F33]">{t.acceptance.certValidity}</p>
                  <p className="text-gray-600">{t.acceptance.certValidityDesc}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-14 h-14 bg-[#C10E21] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaShieldAlt className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-[#2D2F33] mb-2">{t.acceptance.ilcorProtocols}</h3>
                <p className="text-sm text-gray-600">{t.acceptance.ilcorDesc}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-14 h-14 bg-[#00A5A8] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaGlobe className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-[#2D2F33] mb-2">{t.acceptance.ahaGuidelines}</h3>
                <p className="text-sm text-gray-600">{t.acceptance.ahaDesc}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-14 h-14 bg-[#00A5A8] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaCertificate className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-[#2D2F33] mb-2">{t.acceptance.nationallyRecognized}</h3>
                <p className="text-sm text-gray-600">{t.acceptance.nationallyDesc}</p>
              </div>
              <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-14 h-14 bg-[#C10E21] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FaCalendarAlt className="text-2xl text-white" />
                </div>
                <h3 className="font-bold text-[#2D2F33] mb-2">{t.acceptance.updatedEvery}</h3>
                <p className="text-sm text-gray-600">{t.acceptance.updatedDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizations That Accept */}
      <section className="py-20 bg-gradient-to-br from-[#F5F6F7] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2F33] mb-4">
              {t.acceptance.orgsTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.acceptance.orgsSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#C10E21] rounded-xl flex items-center justify-center mb-4">
                <FaHospital className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.medicaid}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.medicaidDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-4">
                <FaUserNurse className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.healthcare}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.healthcareDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#C10E21] rounded-xl flex items-center justify-center mb-4">
                <FaSchool className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.schools}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.schoolsDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-4">
                <FaHome className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.groupHomes}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.groupHomesDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-4">
                <FaUserNurse className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.homeHealth}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.homeHealthDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#C10E21] rounded-xl flex items-center justify-center mb-4">
                <FaBuilding className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.workplace}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.workplaceDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#00A5A8] rounded-xl flex items-center justify-center mb-4">
                <FaRunning className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.coaching}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.coachingDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <div className="w-14 h-14 bg-[#C10E21] rounded-xl flex items-center justify-center mb-4">
                <FaUsers className="text-2xl text-white" />
              </div>
              <h3 className="text-lg font-bold text-[#2D2F33] mb-2">{t.acceptance.community}</h3>
              <p className="text-gray-600 text-sm">{t.acceptance.communityDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Clarification */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#2D2F33] to-[#1a1b1d] p-8 md:p-12 rounded-3xl text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              {t.acceptance.clarificationTitle}
            </h2>
            <p className="text-lg text-white/90 mb-6 leading-relaxed">
              {t.acceptance.clarificationDesc1}
            </p>
            <p className="text-lg text-white/90 leading-relaxed">
              {t.acceptance.clarificationDesc2}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00A5A8] mr-2" />
                <span>{t.acceptance.meetsAHA}</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00A5A8] mr-2" />
                <span>{t.acceptance.ilcorCompliant}</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-[#00A5A8] mr-2" />
                <span>{t.acceptance.employerAccepted}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#C10E21] to-[#a00d1c] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t.acceptance.ctaTitle}
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            {t.acceptance.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/login")}
              className="px-10 py-5 bg-white text-[#C10E21] text-lg font-bold uppercase rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.acceptance.findCourse}
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-10 py-5 bg-[#00A5A8] text-white text-lg font-bold uppercase rounded-lg hover:bg-[#008a8d] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.acceptance.learnMore}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2F33] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <Image
                  src="/logo.png"
                  alt="CarePoint Institute"
                  width={80}
                  height={80}
                  className="rounded-lg"
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
                <li><button onClick={() => router.push("/#courses")} className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.cprCourses}</button></li>
                <li><button onClick={() => router.push("/#training-options")} className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.firstAid}</button></li>
                <li><button onClick={() => router.push("/acceptance")} className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.accreditation}</button></li>
                <li><button onClick={() => router.push("/")} className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.becomeInstructor}</button></li>
                <li><button onClick={() => router.push("/")} className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.findClass}</button></li>
                <li><button onClick={() => router.push("/login")} className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.logIn}</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.contactUs}</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center">
                  <FaPhone className="mr-3 text-[#00A5A8]" />
                  {t.nav.phone}
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-[#00A5A8]" />
                  {t.acceptance.email}
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-[#00A5A8]" />
                  <span>{t.acceptance.address}<br />{t.acceptance.suite}<br />{t.acceptance.city}</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.privacy}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.dataProtection}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.security}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.refund}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#00A5A8] transition">{t.footer.terms}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="text-center text-white/60 text-sm">
              {t.footer.copyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
