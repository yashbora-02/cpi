"use client";
import React, { useState } from "react";
import { FaCheckCircle, FaLock, FaEye, FaDownload, FaEdit, FaPlusCircle, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  certificate_url?: string;
}

interface DigitalCardData {
  id: number;
  class_id: string;
  program: string;
  site: string;
  class_type: string;
  start_date: string;
  end_date: string;
  accrediting_instructor: string;
  assisting_instructor?: string;
  open_enrollment: boolean;
  credits_used: number;
  submitted_at: string;
  submitted_by: string;
  students: Student[];
}

interface DigitalCardFinalPageProps {
  digitalCard: DigitalCardData;
  onCreateNew: () => void;
  onViewCertificate: (student: Student) => void;
  onRequestEdit: () => void;
}

export default function DigitalCardFinalPage({
  digitalCard,
  onCreateNew,
  onViewCertificate,
  onRequestEdit,
}: DigitalCardFinalPageProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDownloadCertificate = (student: Student) => {
    // Trigger certificate download
    const link = document.createElement("a");
    // Use mock certificate if student doesn't have a certificate_url
    link.href = student.certificate_url || "/cpi-cert.pdf";
    link.download = `${digitalCard.class_id}_${student.lastName}_${student.firstName}_certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-white rounded-full p-4">
            <FaCheckCircle className="text-green-600 text-4xl" />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Digital Card Created Successfully!
            </h2>
            <p className="text-white/90 text-sm">
              Your digital certification cards have been created and locked. Credits have been deducted from your account.
              You can now view and download certificates.
            </p>
          </div>
        </div>
      </div>

      {/* Class Information Card */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            📋 Class Information
          </h3>
          <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
            <FaLock /> LOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Class ID</p>
            <p className="font-semibold text-gray-900">{digitalCard.class_id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="font-semibold text-red-600 flex items-center gap-1">
              <FaLock className="text-xs" /> Locked
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600">Program</p>
            <p className="font-semibold text-gray-900">{digitalCard.program}</p>
          </div>
          <div>
            <p className="text-gray-600">Site/Location</p>
            <p className="font-semibold text-gray-900">{digitalCard.site}</p>
          </div>
          <div>
            <p className="text-gray-600">Class Type</p>
            <p className="font-semibold text-gray-900">{digitalCard.class_type}</p>
          </div>
          <div>
            <p className="text-gray-600">Start Date</p>
            <p className="font-semibold text-gray-900">{formatDate(digitalCard.start_date)}</p>
          </div>
          <div>
            <p className="text-gray-600">End Date</p>
            <p className="font-semibold text-gray-900">{formatDate(digitalCard.end_date)}</p>
          </div>
          <div>
            <p className="text-gray-600">Accrediting Instructor</p>
            <p className="font-semibold text-gray-900">{digitalCard.accrediting_instructor}</p>
          </div>
          <div>
            <p className="text-gray-600">Assisting Instructor</p>
            <p className="font-semibold text-gray-900">{digitalCard.assisting_instructor || "—"}</p>
          </div>
          <div>
            <p className="text-gray-600">Open Enrollment</p>
            <p className="font-semibold text-gray-900">{digitalCard.open_enrollment ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-gray-600">Credits Used</p>
            <p className="font-semibold text-gray-900">{digitalCard.credits_used}</p>
          </div>
          <div>
            <p className="text-gray-600">Submitted</p>
            <p className="font-semibold text-gray-900">{formatDateTime(digitalCard.submitted_at)}</p>
          </div>
          <div>
            <p className="text-gray-600">Submitted By</p>
            <p className="font-semibold text-gray-900">{digitalCard.submitted_by}</p>
          </div>
        </div>
      </div>

      {/* Student Certificates Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          🎓 Student Certificates ({digitalCard.students.length})
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="border px-4 py-3 text-left font-semibold">#</th>
                <th className="border px-4 py-3 text-left font-semibold">Student Name</th>
                <th className="border px-4 py-3 text-left font-semibold">Email</th>
                <th className="border px-4 py-3 text-left font-semibold">Certificate</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {digitalCard.students.map((student, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-3 text-gray-500 font-medium">{idx + 1}</td>
                  <td className="border px-4 py-3 font-medium text-gray-900">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="border px-4 py-3 text-gray-600">{student.email}</td>
                  <td className="border px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewCertificate(student)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#00D4E0] text-white rounded hover:bg-[#008a8d] transition-colors text-xs font-medium"
                      >
                        <FaEye /> View
                      </button>
                      <button
                        onClick={() => handleDownloadCertificate(student)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors text-xs font-medium"
                      >
                        <FaDownload /> Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-gray-600 mt-3">
          Displaying {digitalCard.students.length} of {digitalCard.students.length} students
        </p>
      </div>

      {/* Edit Request Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
          📝 Need to Make Changes?
        </h3>
        <p className="text-sm text-gray-700 mb-4">
          This digital card is locked and cannot be edited directly. If you need to make changes,
          please submit a support ticket with your request. Our support team will review and assist
          you within 48 hours.
        </p>
        <button
          onClick={onRequestEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <FaEdit /> Request Changes via Support Ticket
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
        <button
          onClick={onCreateNew}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00D4E0] to-[#008a8d] text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
        >
          <FaPlusCircle /> Create New Class
        </button>
      </div>
    </div>
  );
}
