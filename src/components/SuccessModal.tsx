"use client";
import React from "react";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
  onCreateNew: () => void;
  studentCount: number;
  programType?: string;
}

export default function SuccessModal({
  show,
  onClose,
  onCreateNew,
  studentCount,
  programType = "blended",
}: SuccessModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transform transition-all animate-slideUp">
        {/* Success Icon */}
        <div className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] px-6 py-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4">
            <FaCheckCircle className="text-[#00A5A8] text-5xl" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Class Created Successfully!
          </h3>
          <p className="text-white/90 text-sm">
            Your class has been submitted and notifications have been sent
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Summary */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Class Summary
            </h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Program Type:</span>
                <span className="font-medium text-gray-900 capitalize">{programType}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Students:</span>
                <span className="font-medium text-gray-900">{studentCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border-l-4 border-[#00A5A8] p-4 rounded-r">
            <p className="text-sm text-gray-700">
              Students have been notified via email. You can track their progress in the class roster.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-2.5 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow"
          >
            Close
          </button>
          <button
            onClick={onCreateNew}
            className="flex-1 px-6 py-2.5 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white hover:from-[#008a8d] hover:to-[#00A5A8] transform hover:scale-105 active:scale-95"
          >
            <FaPlusCircle />
            <span>Create New Class</span>
          </button>
        </div>
      </div>
    </div>
  );
}
