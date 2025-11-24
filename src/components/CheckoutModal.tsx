'use client';

import { useState } from 'react';
import AgreementModal from './AgreementModal';

export default function CheckoutModal({ onClose }: { onClose: () => void }) {
  const [showAgreement, setShowAgreement] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClose}></div>
      <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-white z-50 p-6 rounded shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Shopping Cart Details
        </h2>

        <table className="w-full text-sm mb-4 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Product Description</th>
              <th className="p-2 text-right">Quantity</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">OL-IRF - Online Instructor Reauthorization Fee (1yr)</td>
              <td className="p-2 text-right">1</td>
              <td className="p-2 text-right">$15.00</td>
              <td className="p-2 text-right">$15.00</td>
            </tr>
          </tbody>
          <tfoot className="bg-gray-50 font-semibold">
            <tr>
              <td className="p-2 text-right" colSpan={3}>Subtotal:</td>
              <td className="p-2 text-right">$15.00</td>
            </tr>
          </tfoot>
        </table>

        <div className="text-right">
          <button
            onClick={() => setShowAgreement(true)}
            className="bg-gradient-to-r from-[#00A5A8] to-[#008f91] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
          >
            Continue Checkout
          </button>
        </div>
      </div>

      {showAgreement && <AgreementModal onClose={() => setShowAgreement(false)} />}
    </>
  );
}
