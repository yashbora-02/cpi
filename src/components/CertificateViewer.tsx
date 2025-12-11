"use client";
import React from "react";
import { FaArrowLeft, FaDownload, FaPrint, FaTimes } from "react-icons/fa";

interface CertificateViewerProps {
  show: boolean;
  certificateUrl: string;
  studentName: string;
  onClose: () => void;
}

export default function CertificateViewer({
  show,
  certificateUrl,
  studentName,
  onClose,
}: CertificateViewerProps) {
  if (!show) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificateUrl;
    link.download = `${studentName.replace(/\s+/g, "_")}_certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-[98vw] h-[98vh] mx-2 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#2583F5] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Certificate for {studentName}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-3 flex gap-3 border-b border-gray-200 flex-shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-[#2583F5] text-white rounded-lg hover:bg-[#1a6ad9] transition-colors font-medium text-sm"
          >
            <FaDownload /> Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm"
          >
            <FaPrint /> Print
          </button>
        </div>

        {/* Certificate Display */}
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
            {certificateUrl ? (
              <iframe
                src={certificateUrl}
                className="w-full h-full border-0"
                title="Certificate Preview"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-50">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Certificate not yet generated</p>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-[#2583F5] text-white rounded-lg hover:bg-[#1a6ad9] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
