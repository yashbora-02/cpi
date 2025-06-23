"use client";

import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";

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
    <div className="fixed inset-0 bg-black/40 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg px-6 py-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-2xl font-bold text-green-700">Access Link</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-lg font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-400 mb-1">
            Access Link
          </label>
          <div className="flex items-start gap-2 flex-wrap w-full">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-words whitespace-normal text-base w-full"
            >
              {link}
            </a>
            <button
              onClick={handleCopy}
              className="text-gray-600 hover:text-black mt-1"
              title="Copy Link"
            >
              <FaRegCopy className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded"
          >
            ✕ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
