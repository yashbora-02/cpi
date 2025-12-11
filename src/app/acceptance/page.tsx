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
  FaUser,
  FaUserMd
} from "react-icons/fa";
import { useLanguage } from "@/lib/LanguageContext";

export default function Acceptance() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

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
                  width={120}
                  height={60}
                  className="object-contain"
                />
              </button>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 space-x-8">
              <a href="/#courses" className="flex items-center text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                {t.nav.cprCourses}
                <FaChevronDown className="ml-1 text-xs" />
              </a>
              <a href="/#training-options" className="flex items-center text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                {t.nav.moreCourses}
                <FaChevronDown className="ml-1 text-xs" />
              </a>
              <button onClick={() => router.push("/acceptance")} className="text-[#1E90FF] font-medium transition">
                {t.nav.acceptance}
              </button>
              <button onClick={() => router.push("/login")} className="flex items-center text-[#2D2F33] hover:text-[#1E90FF] font-medium transition">
                <FaUser className="mr-2" />
                {t.nav.logIn}
              </button>
            </div>

            {/* Right Side - Phone & Language */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="tel:1-800-555-0123" className="flex items-center text-[#5DCCDB] hover:text-[#5DCCDB] font-medium transition">
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
              className="md:hidden ml-auto p-2 text-[#2D2F33] hover:text-[#1E90FF] transition"
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
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2 text-left"
                >
                  {t.nav.cprCourses}
                </button>
                <button
                  onClick={() => { router.push("/#training-options"); setMobileMenuOpen(false); }}
                  className="text-[#2D2F33] hover:text-[#1E90FF] font-medium transition py-2 text-left"
                >
                  {t.nav.moreCourses}
                </button>
                <button
                  onClick={() => { router.push("/acceptance"); setMobileMenuOpen(false); }}
                  className="text-[#1E90FF] font-medium transition py-2 text-left"
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
                  className="text-[#5DCCDB] font-medium py-2"
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
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#5DCCDB]/25 via-[#5DCCDB]/10 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {t.acceptance.heroTitle}<br />
            <span className="text-[#5DCCDB]">{t.acceptance.heroHighlight}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto">
            {t.acceptance.heroSubtitle}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2F33] mb-4 md:mb-6 px-2">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto px-2">
              {t.acceptance.introText}
            </p>
          </div>

          {/* Q&A Items */}
          <div className="space-y-4 md:space-y-6">
            {/* Question 1 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1E90FF]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question1}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer1}
              </p>
            </div>

            {/* Question 2 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#5DCCDB]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question2}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer2}
              </p>
            </div>

            {/* Question 3 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1E90FF]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question3}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer3}
              </p>
            </div>

            {/* Question 4 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#5DCCDB]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question4}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer4}
              </p>
            </div>

            {/* Question 5 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1E90FF]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question5}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer5}
              </p>
            </div>

            {/* Question 6 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#5DCCDB]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question6}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer6}
              </p>
            </div>

            {/* Question 7 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1E90FF]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question7}
              </h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.acceptance.answer7}
              </p>
            </div>

            {/* Question 8 */}
            <div className="bg-white p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#5DCCDB]">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#2D2F33] mb-3 md:mb-4 leading-snug">
                {t.acceptance.question8}
              </h3>
              <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-3 md:space-y-4">
                <p>{t.acceptance.answer8Part1}</p>
                <p>{t.acceptance.answer8Part2}</p>
                <p>{t.acceptance.answer8Part3}</p>
                <p>{t.acceptance.answer8Part4}</p>
                <p>{t.acceptance.answer8Part5}</p>
                <p>{t.acceptance.answer8Part6}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Review Board */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2D2F33] mb-4 md:mb-6 px-2">
              {t.acceptance.educationBoardTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-600 italic max-w-3xl mx-auto px-2">
              {t.acceptance.educationBoardNote}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
            {/* Director of Medical Education */}
            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#1E90FF] to-[#1873CC] rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center shadow-lg">
                <FaUserMd className="text-5xl md:text-6xl text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#2D2F33] mb-2 text-center">
                {t.acceptance.directorTitle}
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">Certified EMT & Medical Educator</p>
            </div>

            {/* Physician Medical Director */}
            <div className="bg-gradient-to-br from-[#F5F6F7] to-white p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-[#2583F5] rounded-full mx-auto mb-4 md:mb-6 flex items-center justify-center shadow-lg">
                <FaUserMd className="text-5xl md:text-6xl text-white" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#2D2F33] mb-2 text-center">
                {t.acceptance.physicianTitle}
              </h3>
              <p className="text-sm md:text-base text-gray-600 text-center">Board-Certified Physician</p>
            </div>
          </div>
        </div>
      </section>

      {/* Important Clarification */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#2D2F33] to-[#1a1b1d] p-8 md:p-10 lg:p-14 rounded-2xl md:rounded-3xl text-white shadow-2xl">
            <div className="flex items-center justify-center mb-6 md:mb-8">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#5DCCDB] rounded-full flex items-center justify-center">
                <FaShieldAlt className="text-2xl md:text-3xl text-white" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-center px-2">
              {t.acceptance.clarificationTitle}
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/95 mb-4 md:mb-6 leading-relaxed">
              {t.acceptance.clarificationDesc1}
            </p>
            <p className="text-base md:text-lg lg:text-xl text-white/95 mb-8 md:mb-10 leading-relaxed">
              {t.acceptance.clarificationDesc2}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 pt-6 border-t border-white/20">
              <div className="flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full">
                <FaCheckCircle className="text-[#5DCCDB] mr-2 md:mr-3 text-lg md:text-xl flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base lg:text-lg">{t.acceptance.meetsAHA}</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full">
                <FaCheckCircle className="text-[#5DCCDB] mr-2 md:mr-3 text-lg md:text-xl flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base lg:text-lg">{t.acceptance.ilcorCompliant}</span>
              </div>
              <div className="flex items-center bg-white/10 px-4 md:px-6 py-2 md:py-3 rounded-full">
                <FaCheckCircle className="text-[#5DCCDB] mr-2 md:mr-3 text-lg md:text-xl flex-shrink-0" />
                <span className="font-semibold text-sm md:text-base lg:text-lg">{t.acceptance.employerAccepted}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-[#1E90FF] to-[#1873CC] text-white overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 leading-tight px-2">
            {t.acceptance.ctaTitle}
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            {t.acceptance.ctaSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center px-4">
            <button
              onClick={() => router.push("/login")}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-[#1E90FF] text-base md:text-lg font-bold rounded-lg md:rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95"
            >
              {t.acceptance.findCourse}
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-[#5DCCDB] text-white text-base md:text-lg font-bold rounded-lg md:rounded-xl hover:bg-[#5DCCDB] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-xl active:scale-95 border-2 border-white/20"
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
                <li><button onClick={() => router.push("/#courses")} className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.cprCourses}</button></li>
                <li><button onClick={() => router.push("/#training-options")} className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.firstAid}</button></li>
                <li><button onClick={() => router.push("/acceptance")} className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.accreditation}</button></li>
                <li><button onClick={() => router.push("/")} className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.becomeInstructor}</button></li>
                <li><button onClick={() => router.push("/")} className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.findClass}</button></li>
                <li><button onClick={() => router.push("/login")} className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.logIn}</button></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.contactUs}</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center">
                  <FaPhone className="mr-3 text-[#5DCCDB]" />
                  {t.nav.phone}
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-3 text-[#5DCCDB]" />
                  {t.acceptance.email}
                </li>
                <li className="flex items-start">
                  <FaMapMarkerAlt className="mr-3 mt-1 text-[#5DCCDB]" />
                  <span>{t.acceptance.address}<br />{t.acceptance.suite}<br />{t.acceptance.city}</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t.footer.legal}</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.privacy}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.dataProtection}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.security}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.refund}</a></li>
                <li><a href="#" className="text-white/80 hover:text-[#5DCCDB] transition">{t.footer.terms}</a></li>
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
