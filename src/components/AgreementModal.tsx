'use client';

export default function AgreementModal({ onClose }: { onClose: () => void }) {
  const orderNumber = '3887817';
  const purchaser = 'Alison B Pattison';
  const date = '06/04/2025';

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose}></div>
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Purchase Agreement</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Order Number:</strong> {orderNumber}
          </p>
          <p>
            <strong>Purchaser Name:</strong> {purchaser}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
          <p className="mt-4 text-gray-600">
            The following items are on your order and are ready for purchase. The name,
            authorization level, and expiration will be updated accordingly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm">
            🖨 Print
          </button>
          <button
            onClick={onClose}
            className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
          >
            ❌ Decline
          </button>
          <button
            onClick={() => {
              alert('✅ Purchase Accepted');
              onClose();
            }}
            className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            ✅ Accept
          </button>
        </div>
      </div>
    </>
  );
}
