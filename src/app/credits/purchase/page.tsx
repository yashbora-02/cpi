"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/Sidebar";
import { FaShoppingCart, FaCheckCircle, FaTimes } from "react-icons/fa";

type PurchaseOption = {
  id: string;
  name: string;
  courseType: "CPR Only" | "First Aid Only" | "Combo (CPR & First Aid)";
  credits: number;
  price: number;
  description: string;
};

const purchaseOptions: PurchaseOption[] = [
  {
    id: "CPR-001",
    name: "CPR Basic Package",
    courseType: "CPR Only",
    credits: 10,
    price: 199.99,
    description: "Perfect for small teams - includes 10 CPR training credits",
  },
  {
    id: "FA-001",
    name: "First Aid Starter",
    courseType: "First Aid Only",
    credits: 10,
    price: 199.99,
    description: "Essential first aid training for up to 10 students",
  },
  {
    id: "COMBO-001",
    name: "Combo Starter Package",
    courseType: "Combo (CPR & First Aid)",
    credits: 15,
    price: 349.99,
    description: "Complete training solution - CPR and First Aid combined",
  },
  {
    id: "CPR-002",
    name: "CPR Professional Package",
    courseType: "CPR Only",
    credits: 25,
    price: 449.99,
    description: "Ideal for medium-sized organizations - 25 CPR credits",
  },
  {
    id: "FA-002",
    name: "First Aid Professional",
    courseType: "First Aid Only",
    credits: 25,
    price: 449.99,
    description: "Comprehensive first aid training for 25 students",
  },
  {
    id: "COMBO-002",
    name: "Combo Enterprise Package",
    courseType: "Combo (CPR & First Aid)",
    credits: 50,
    price: 799.99,
    description: "Enterprise solution - 50 complete training credits",
  },
];

export default function PurchaseCredits() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<PurchaseOption | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handlePurchase = (option: PurchaseOption) => {
    setSelectedOption(option);
    setShowCheckout(true);
  };

  const confirmPurchase = async () => {
    if (!selectedOption) return;

    try {
      // Get Firebase ID token
      const user = auth.currentUser;
      if (!user) {
        alert("Authentication error. Please log in again.");
        router.push("/login");
        return;
      }

      const token = await user.getIdToken();

      // Convert course type to API format
      const courseTypeMap: Record<string, string> = {
        "CPR Only": "cpr_only",
        "First Aid Only": "first_aid_only",
        "Combo (CPR & First Aid)": "combo",
      };

      // Call purchase API
      const response = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId: selectedOption.id,
          courseType: courseTypeMap[selectedOption.courseType],
          credits: selectedOption.credits,
          price: selectedOption.price,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(`Successfully purchased ${selectedOption.credits} ${selectedOption.courseType} credits!`);
        setShowCheckout(false);
        router.push("/dashboard");
      } else {
        alert(`Purchase failed: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("An error occurred during purchase. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#00A5A8] text-white px-8 py-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Purchase Training Credits</h1>
              <p className="text-base mt-2 text-white/90">
                Choose a package that fits your training needs
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-[#00A5A8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Purchase Options Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {purchaseOptions.map((option) => (
              <PurchaseCard
                key={option.id}
                option={option}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && selectedOption && (
        <CheckoutModal
          option={selectedOption}
          onConfirm={confirmPurchase}
          onCancel={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}

function PurchaseCard({
  option,
  onPurchase,
}: {
  option: PurchaseOption;
  onPurchase: (option: PurchaseOption) => void;
}) {
  const getCourseTypeColor = (type: string) => {
    if (type.includes("CPR Only")) return "bg-blue-50 border-blue-200 text-blue-700";
    if (type.includes("First Aid")) return "bg-green-50 border-green-200 text-green-700";
    return "bg-purple-50 border-purple-200 text-purple-700";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col">
      {/* Course Type Badge */}
      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getCourseTypeColor(
            option.courseType
          )}`}
        >
          {option.courseType}
        </span>
      </div>

      {/* Package Name */}
      <h3 className="text-xl font-bold text-gray-800 mb-2">{option.name}</h3>

      {/* Course ID */}
      <p className="text-sm text-gray-500 mb-3">Course ID: {option.id}</p>

      {/* Credits */}
      <div className="mb-4">
        <p className="text-4xl font-bold text-[#00A5A8]">{option.credits}</p>
        <p className="text-sm text-gray-600">Training Credits</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-6 flex-1">{option.description}</p>

      {/* Price */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-gray-800">${option.price}</p>
        <p className="text-xs text-gray-500">One-time payment</p>
      </div>

      {/* Purchase Button */}
      <button
        onClick={() => onPurchase(option)}
        className="w-full bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white py-3 rounded-lg font-bold hover:from-[#008a8d] hover:to-[#00A5A8] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        <FaShoppingCart />
        Purchase Now
      </button>
    </div>
  );
}

function CheckoutModal({
  option,
  onConfirm,
  onCancel,
}: {
  option: PurchaseOption;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A5A8] to-[#008a8d] px-6 py-5 rounded-t-lg">
          <div className="flex items-center gap-3">
            <FaShoppingCart className="text-white text-xl" />
            <h3 className="text-xl font-bold text-white">Confirm Purchase</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Package Details */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Package</p>
            <p className="text-lg font-bold text-gray-900">{option.name}</p>
            <p className="text-sm text-gray-500">ID: {option.id}</p>
          </div>

          {/* Course Type */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Course Type</p>
            <p className="text-lg font-bold text-gray-900">{option.courseType}</p>
          </div>

          {/* Credits */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Credits</p>
            <p className="text-lg font-bold text-[#00A5A8]">{option.credits} Training Credits</p>
          </div>

          {/* Total Price */}
          <div className="bg-[#00A5A8]/10 rounded-lg p-4 border-2 border-[#00A5A8]">
            <p className="text-sm text-gray-600 mb-2">Total Price</p>
            <p className="text-3xl font-bold text-[#00A5A8]">${option.price}</p>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Credits will be added to your account immediately after purchase confirmation.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaTimes />
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white rounded-lg font-bold hover:from-[#008a8d] hover:to-[#00A5A8] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FaCheckCircle />
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
