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
        <div className="mt-6 flex flex-wrap justify-between gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            🖨 Print
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            ❌ Decline
          </button>
          <button
            onClick={() => {
              alert('✅ Purchase Accepted');
              onClose();
            }}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ✅ Accept
          </button>
        </div>
      </div>
    </>
  );
}
