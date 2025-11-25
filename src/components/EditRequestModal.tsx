"use client";
import React, { useState } from "react";
import { FaLock, FaCheckCircle } from "react-icons/fa";

interface EditRequestModalProps {
  show: boolean;
  digitalCardData: {
    class_id: string;
    program: string;
    submitted_at: string;
  };
  userEmail: string;
  onClose: () => void;
}

export default function EditRequestModal({
  show,
  digitalCardData,
  userEmail,
  onClose,
}: EditRequestModalProps) {
  const [changeType, setChangeType] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  if (!show) return null;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!changeType || !description.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create support ticket
      const formData = new FormData();
      formData.append("type", "Digital Card Change Request");
      formData.append("title", `Digital Card Change Request - ${digitalCardData.class_id}`);
      formData.append(
        "description",
        `Change Type: ${changeType}\n\nClass ID: ${digitalCardData.class_id}\nProgram: ${digitalCardData.program}\nSubmitted: ${formatDateTime(digitalCardData.submitted_at)}\n\nRequested Changes:\n${description}`
      );
      formData.append("reportedBy", userEmail.split("@")[0]);
      formData.append("email", userEmail);
      formData.append("phone", phone || "N/A");

      const token = localStorage.getItem("firebaseToken");
      const response = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setTicketNumber(data.ticketNumber || "TICKET-" + Date.now());
        setShowSuccess(true);
      } else {
        alert("Failed to create support ticket. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setChangeType("");
    setDescription("");
    setPhone("");
    setShowSuccess(false);
    setTicketNumber("");
    onClose();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
              <FaCheckCircle className="text-green-600 text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Support Ticket Created
            </h3>
            <p className="text-white/90 text-sm">
              Your request has been submitted successfully
            </p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Ticket Details
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Ticket Number:</span>
                  <span className="font-medium text-gray-900">{ticketNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium text-gray-900">Digital Card Change Request</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium text-green-600">Open</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-[#00A5A8] p-4 rounded-r">
              <p className="text-sm text-gray-700">
                Our support team will review your request and respond within 48 hours.
                You will receive an email confirmation at: <strong>{userEmail}</strong>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A5A8] to-[#008a8d] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FaLock className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Digital Card Locked
              </h3>
              <p className="text-white/90 text-sm">
                Request changes through support ticket
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Info Message */}
          <div className="bg-blue-50 border-l-4 border-[#00A5A8] p-4 rounded-r">
            <p className="text-sm text-gray-800">
              This digital card has been submitted and locked. You cannot edit it directly.
              To request changes, please fill out the form below to create a support ticket.
            </p>
          </div>

          {/* Pre-filled Information */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Pre-filled Information (Read-only)
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Class ID:</span>
                <span className="font-medium text-gray-900">{digitalCardData.class_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Program:</span>
                <span className="font-medium text-gray-900">{digitalCardData.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-medium text-gray-900">{formatDateTime(digitalCardData.submitted_at)}</span>
              </div>
            </div>
          </div>

          {/* Change Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What changes do you need? <span className="text-red-500">*</span>
            </label>
            <select
              value={changeType}
              onChange={(e) => setChangeType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00A5A8]"
              required
            >
              <option value="">-- Select --</option>
              <option value="Update student information">Update student information</option>
              <option value="Change instructor">Change instructor</option>
              <option value="Correct dates">Correct dates</option>
              <option value="Add/remove student">Add/remove student</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the changes needed: <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00A5A8]"
              placeholder="Please provide detailed information about the changes you need..."
              required
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Email:
            </label>
            <input
              type="email"
              value={userEmail}
              disabled
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone (Optional):
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00A5A8]"
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-5 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-5 py-2 bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white rounded-lg hover:shadow-lg transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Support Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
