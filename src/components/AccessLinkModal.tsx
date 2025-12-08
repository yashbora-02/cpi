"use client";

import React, { useState } from "react";
import { FaLink, FaCheck, FaCopy, FaExternalLinkAlt } from "react-icons/fa";

export default function AccessLinkModal({
  show,
  onClose,
  link,
}: {
  show: boolean;
  onClose: () => void;
  link: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00D4E0] to-[#008a8d] px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <FaLink className="text-white text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Student Access Link
                </h3>
                <p className="text-white/90 text-sm">
                  Share this link with the student
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Link Display */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-gray-600 font-semibold mb-2">
              Course Access URL
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-[#00D4E0] hover:text-[#008a8d] break-all text-sm font-mono transition-colors"
                >
                  {link}
                </a>
                <button
                  onClick={handleCopy}
                  className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 ${
                    copied
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  title={copied ? "Copied!" : "Copy to clipboard"}
                >
                  {copied ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Copy Status */}
          {copied && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-r flex items-center gap-2">
              <FaCheck className="text-green-500 text-sm flex-shrink-0" />
              <p className="text-sm text-green-800 font-medium">
                Link copied to clipboard!
              </p>
            </div>
          )}

          {/* Info Message */}
          <div className="bg-blue-50 border-l-4 border-[#00D4E0] p-4 rounded-r">
            <p className="text-sm text-gray-700">
              This link provides access to the online course materials. Students should use this link to begin their training.
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
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-6 py-2.5 rounded-lg font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D4E0] to-[#008a8d] text-white hover:from-[#008a8d] hover:to-[#00D4E0] transform hover:scale-105 active:scale-95"
          >
            <FaExternalLinkAlt />
            <span>Open Link</span>
          </a>
        </div>
      </div>
    </div>
  );
}
