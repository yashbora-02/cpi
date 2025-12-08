"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  FaHeadset,
  FaPhone,
  FaRobot,
  FaShieldAlt,
  FaTicketAlt,
  FaPaperclip,
  FaCheckCircle
} from "react-icons/fa";

export default function SupportPage() {
  const router = useRouter();
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    type: "General Request",
    title: "",
    description: "",
    reportedBy: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: "File size must be less than 10MB" }));
        return;
      }
      setFile(selectedFile);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.reportedBy.trim()) newErrors.reportedBy = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        router.replace("/login");
        return;
      }

      const token = await user.getIdToken();

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("type", formData.type);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("reportedBy", formData.reportedBy);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);

      if (file) {
        formDataToSend.append("file", file);
      }

      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setTicketNumber(data.ticketNumber);
        setShowSuccess(true);
        setShowTicketForm(false);

        // Reset form
        setFormData({
          type: "General Request",
          title: "",
          description: "",
          reportedBy: "",
          email: "",
          phone: "",
        });
        setFile(null);
      } else {
        setErrors({ submit: data.error || "Failed to submit ticket" });
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setErrors({ submit: "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#00D4E0] text-white px-8 py-6 shadow-lg">
          <h1 className="text-3xl font-bold">Support Center</h1>
          <p className="text-base mt-2 text-white/90">We're here to help you</p>
        </div>

        <div className="p-8 max-w-6xl mx-auto">
          {!showTicketForm && !showSuccess && (
            <>
              {/* Support Options Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Create Ticket */}
                <button
                  onClick={() => setShowTicketForm(true)}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#00D4E0] to-[#008a8d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaTicketAlt className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Create Support Ticket</h3>
                  <p className="text-gray-600 text-sm">Submit a ticket and we'll get back to you</p>
                </button>

                {/* Phone Support */}
                <a
                  href="tel:1-800-555-0123"
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#1E90FF] to-[#1873CC] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaPhone className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Call Support</h3>
                  <p className="text-gray-600 text-sm">1-800-555-0123</p>
                  <p className="text-[#00D4E0] text-xs mt-1 font-medium">Mon-Fri, 9AM-5PM EST</p>
                </a>

                {/* Chatbot */}
                <button
                  onClick={() => alert("Chatbot feature coming soon!")}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#00D4E0] to-[#008a8d] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaRobot className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Chat with AI</h3>
                  <p className="text-gray-600 text-sm">Get instant answers 24/7</p>
                </button>

                {/* Privacy Policy */}
                <a
                  href="/privacy-policy"
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-r from-[#1E90FF] to-[#1873CC] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaShieldAlt className="text-2xl text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2F33] mb-2">Privacy Policy</h3>
                  <p className="text-gray-600 text-sm">Learn how we protect your data</p>
                </a>
              </div>

              {/* FAQ or Help Section */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FaHeadset className="text-[#00D4E0] text-2xl" />
                  <h2 className="text-2xl font-bold text-[#2D2F33]">How Can We Help?</h2>
                </div>
                <p className="text-gray-600 mb-4">
                  Our support team is available to assist you with any questions or issues you may encounter.
                  Whether you need technical support, have billing questions, or need help with your courses,
                  we're here to help.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-[#2D2F33] mb-2">Response Time</h4>
                    <p className="text-sm text-gray-600">We typically respond to tickets within 48 hours</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-[#2D2F33] mb-2">Support Hours</h4>
                    <p className="text-sm text-gray-600">Monday - Friday, 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Ticket Form */}
          {showTicketForm && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#2D2F33]">Create Support Ticket</h2>
                <button
                  onClick={() => setShowTicketForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ticket Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ticket Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent text-gray-900"
                  >
                    <option value="General Request">General Request</option>
                    <option value="Application Issue / Bug">Application Issue / Bug</option>
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent text-gray-900 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Brief summary of your issue"
                  />
                  {errors.title && (
                    <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent text-gray-900 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Please provide detailed information about your request or issue"
                  />
                  {errors.description && (
                    <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                  )}
                </div>

                {/* Reported By & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Reported By <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="reportedBy"
                      value={formData.reportedBy}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent text-gray-900 ${
                        errors.reportedBy ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.reportedBy && (
                      <p className="text-red-600 text-sm mt-1">{errors.reportedBy}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent text-gray-900 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#00D4E0] focus:border-transparent text-gray-900 ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* File Attachment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    File Attachment (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#00D4E0] transition-colors"
                    >
                      <FaPaperclip className="text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        {file ? file.name : "Click to upload file (Max 10MB)"}
                      </span>
                    </label>
                  </div>
                  {errors.file && (
                    <p className="text-red-600 text-sm mt-1">{errors.file}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Supported formats: Images, PDF, DOC, DOCX, TXT
                  </p>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                    <p className="text-sm text-red-800">{errors.submit}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTicketForm(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#00D4E0] to-[#008a8d] text-white rounded-lg hover:from-[#008a8d] hover:to-[#00D4E0] font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Success Message */}
          {showSuccess && (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <FaCheckCircle className="text-green-600 text-5xl" />
                </div>
                <h2 className="text-3xl font-bold text-[#2D2F33] mb-4">
                  Ticket Submitted Successfully!
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <p className="text-sm text-gray-600 mb-2">Your Ticket Number</p>
                  <p className="text-2xl font-bold text-[#00D4E0]">{ticketNumber}</p>
                </div>
                <div className="bg-blue-50 border-l-4 border-[#00D4E0] p-4 rounded-r mb-6">
                  <p className="text-gray-700">
                    Hey, we got your ticket! We are working on it and will answer within <strong>48 hours</strong>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    setShowTicketForm(false);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-[#00D4E0] to-[#008a8d] text-white rounded-lg hover:from-[#008a8d] hover:to-[#00D4E0] font-medium shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  Back to Support
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
