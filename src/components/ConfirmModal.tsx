"use client";
import React from "react";

export default function ConfirmModal({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-50">
      <div className="bg-white rounded shadow-lg w-full max-w-md p-6">
        <div className="text-lg font-semibold mb-4 text-green-700">
          Confirm Email Send
        </div>
        <p className="mb-4 text-sm text-gray-700">
          Email notifications will be sent and 1 credit(s) will be deducted from
          your online credit count.
        </p>
        <p className="text-sm font-medium text-gray-900 mb-6">
          Available Credits: 28
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
          >
            ✕ NO I’VE CHANGED MY MIND
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ YES, SUBMIT EMAILS
          </button>
        </div>
      </div>
    </div>
  );
}
