"use client";
import React from "react";
import { FaCheckCircle, FaExclamationTriangle, FaCertificate } from "react-icons/fa";

interface CreditConfirmationModalProps {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  availableCredits: number;
  creditsToUse: number;
  studentCount: number;
}

export default function CreditConfirmationModal({
  show,
  onConfirm,
  onCancel,
  availableCredits,
  creditsToUse,
  studentCount,
}: CreditConfirmationModalProps) {
  if (!show) return null;

  const remainingCredits = availableCredits - creditsToUse;
  const hasInsufficientCredits = remainingCredits < 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00D4E0] to-[#008a8d] px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <FaCertificate className="text-white text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Confirm Digital Card Submission
              </h3>
              <p className="text-white/90 text-sm">
                Review credit usage before proceeding
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Message */}
          <div className="bg-blue-50 border-l-4 border-[#00D4E0] p-4 rounded-r">
            <p className="text-gray-800 text-sm leading-relaxed">
              You are about to create digital certification cards for{" "}
              <span className="font-semibold">{studentCount} student{studentCount !== 1 ? 's' : ''}</span>.
              This will deduct <span className="font-semibold">{creditsToUse} credit{creditsToUse !== 1 ? 's' : ''}</span> from your account.
            </p>
          </div>

          {/* Credit Summary Card */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h4 className="text-xs uppercase tracking-wide text-gray-600 font-semibold mb-3">
              Credit Summary
            </h4>
            <div className="space-y-3">
              {/* Available Credits */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">Current Balance:</span>
                <span className="text-lg font-bold text-gray-900">
                  {availableCredits} credits
                </span>
              </div>

              {/* Credits to Use */}
              <div className="flex justify-between items-center pb-3 border-b border-gray-300">
                <span className="text-sm text-gray-700">Credits to Use:</span>
                <span className="text-lg font-semibold text-gray-900">
                  - {creditsToUse} credits
                </span>
              </div>

              {/* Remaining Credits */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-800">
                  Remaining Balance:
                </span>
                <span className={`text-xl font-bold ${
                  hasInsufficientCredits ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {remainingCredits} credits
                </span>
              </div>
            </div>
          </div>

          {/* Warning for Insufficient Credits */}
          {hasInsufficientCredits && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r flex items-start gap-3">
              <FaExclamationTriangle className="text-red-500 text-lg mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-red-800">Insufficient Credits</p>
                <p className="text-xs text-red-700 mt-1">
                  You do not have enough credits to complete this action. Please purchase additional credits.
                </p>
                <a
                  href="/credits/purchase"
                  className="text-xs text-red-800 font-semibold underline hover:text-red-900 mt-2 inline-block"
                >
                  Purchase Credits →
                </a>
              </div>
            </div>
          )}

          {/* Success Indicator */}
          {!hasInsufficientCredits && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
              <p className="text-xs text-green-800">
                Sufficient credits available to proceed
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-end border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm flex items-center justify-center gap-2"
          >
            <span>✕</span>
            <span>Cancel</span>
          </button>
          <button
            onClick={onConfirm}
            disabled={hasInsufficientCredits}
            className={`px-5 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
              hasInsufficientCredits
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-[#00D4E0] to-[#008f91] text-white'
            }`}
          >
            <span>✓</span>
            <span>Confirm & Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
