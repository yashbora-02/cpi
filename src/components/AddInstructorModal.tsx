// AddInstructorModal.tsx
"use client";

import React, { useState } from "react";

export default function AddInstructorModal({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (val: boolean) => void;
}) {
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState("new");
  const [quantity, setQuantity] = useState(1);
  const [orderNumber] = useState(() => Math.floor(Math.random() * 10000000));
  const date = new Date().toLocaleDateString();

  const close = () => {
    setShow(false);
    setStep(1);
    setSelection("new");
    setQuantity(1);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
      <div className="bg-white text-black rounded-lg shadow-xl p-6 max-w-xl w-full mt-20 border border-gray-300">
        {step === 1 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-green-700">
                Add Instructor
              </h2>
              <button onClick={close} className="text-gray-500 text-2xl">
                ×
              </button>
            </div>
            <p className="mb-4 text-sm text-gray-800">
              Select to add a New instructor, Shared instructor or Change of
              Affiliation.
            </p>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked
                  readOnly
                  className="mr-2 text-green-600"
                />
                Purchase or Complete New Instructor Application
              </label>
              <label className="flex items-center text-gray-400">
                <input type="radio" disabled className="mr-2 text-gray-300" />{" "}
                Shared Instructor
              </label>
              <label className="flex items-center text-gray-400">
                <input type="radio" disabled className="mr-2 text-gray-300" />{" "}
                Instructor Change of Affiliation
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
              >
                CONTINUE WITH SELECTION
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-4">Instructor Application</h2>
            <label className="block text-sm mb-1">Quantity</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded mb-4"
            />
            <button
              onClick={() => setStep(3)}
              className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              PURCHASE NOW
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold mb-4">Shopping Cart Details</h2>
            <p className="text-sm mb-2">
              OL-NIMF - Online New Instructor Member Fee
            </p>
            <p>Quantity: {quantity}</p>
            <p>Price: $35.00</p>
            <p className="mb-4">Subtotal: ${(quantity * 35).toFixed(2)}</p>
            <button
              onClick={() => setStep(4)}
              className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              Continue Checkout
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="text-xl font-bold mb-4">Purchase Agreement</h2>
            <p className="mb-1">Order Number: {orderNumber}</p>
            <p className="mb-1">Purchaser's Name: Alison B Pattison</p>
            <p className="mb-4">Date: {date}</p>
            <p className="mb-4 text-sm text-gray-700">
              The following items are on your order and are ready for purchase.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={close}
                className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
              >
                Decline
              </button>
              <button
                onClick={() => setStep(5)}
                className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
              >
                Accept
              </button>
            </div>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="text-xl font-bold mb-4">Payment Checkout</h2>
            <p className="mb-2">Saved Cards:</p>
            <div className="space-y-2 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="card"
                  defaultChecked
                  className="mr-2"
                />
                XXXX-1016 (American Express)
              </label>
              <label className="flex items-center">
                <input type="radio" name="card" className="mr-2" />
                XXXX-1821 (Visa)
              </label>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <button
                onClick={() => setStep(6)}
                className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
              >
                Pay
              </button>
              <button
                onClick={() => setStep(6)}
                className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
              >
                Pay and Save Card
              </button>
              <button
                onClick={() => setStep(6)}
                className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
              >
                Pay with Saved Card
              </button>
            </div>
          </>
        )}

        {step === 6 && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Your order has been processed
            </h2>
            <p className="mb-4 text-sm text-gray-800">
              You will receive an email shortly including the order and invoice
              details of your purchase. You can log in at any time to review the
              status of your order. If you have any questions, please call
              1.800.246.5101 or{" "}
              <span className="underline cursor-pointer">Click here</span> to
              email our client service department.
            </p>
            <button
              onClick={() => setStep(7)}
              className="bg-[#2583F5] text-white px-5 py-2 rounded-lg hover:shadow-lg transition-all font-medium text-sm"
            >
              Okay
            </button>
          </>
        )}

        {step === 7 && (
          <>
            <h2 className="text-xl font-bold mb-4">Purchased Authorizations</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="py-1">ID</th>
                  <th className="py-1">NAME</th>
                  <th className="py-1">START/CONTINUE APPLICATION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">{orderNumber}</td>
                  <td className="py-2">New Instructor</td>
                  <td className="py-2">
                    <button
                      onClick={close}
                      className="bg-[#2583F5] text-white px-4 py-1.5 rounded-lg hover:shadow-lg transition-all font-medium text-xs"
                    >
                      CONTINUE WITH APPLICATION
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
