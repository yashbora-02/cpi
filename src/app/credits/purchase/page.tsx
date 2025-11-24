"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/Sidebar";
import { FaShoppingCart, FaCheckCircle, FaTimes, FaPlus, FaMinus, FaTrash, FaFileContract, FaCreditCard, FaLock, FaTag, FaTrashAlt } from "react-icons/fa";

type PurchaseOption = {
  id: string;
  name: string;
  courseType: string;
  credits: number;
  price: number;
  description: string;
};

const purchaseOptions: PurchaseOption[] = [
  {
    id: "CPI-FA-2020",
    name: "CPI Adult First Aid (2020)",
    courseType: "Blended - DC",
    credits: 10,
    price: 199.99,
    description: "Adult First Aid certification program with digital credentials",
  },
  {
    id: "CPI-FA-CPR-AI-2020",
    name: "CPI Adult First Aid | CPR AED Adult Infant (2020)",
    courseType: "Blended - DC",
    credits: 10,
    price: 249.99,
    description: "Comprehensive First Aid and CPR AED training for adult and infant",
  },
  {
    id: "CPI-FA-CPR-AA-2020",
    name: "CPI Adult First Aid | CPR AED All Ages (2020)",
    courseType: "Blended - DC",
    credits: 15,
    price: 299.99,
    description: "Complete First Aid and CPR AED training for all age groups",
  },
  {
    id: "CPI-BLS-2020",
    name: "CPI Basic Life Support (2020)",
    courseType: "Blended - DC",
    credits: 25,
    price: 449.99,
    description: "Professional-level Basic Life Support certification",
  },
  {
    id: "CPI-CPR-AA-2020",
    name: "CPI CPR AED All Ages (2020)",
    courseType: "Blended - DC",
    credits: 8,
    price: 179.99,
    description: "CPR and AED training for all age groups",
  },
  {
    id: "CPI-ES-FA-CPR-2020",
    name: "CPI Spanish Adult First Aid | CPR AED All Ages (2020)",
    courseType: "Blended - DC",
    credits: 15,
    price: 299.99,
    description: "Complete training in Spanish - First Aid and CPR AED for all ages",
  },
];

export default function PurchaseCredits() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<PurchaseOption | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [purchasedCredits, setPurchasedCredits] = useState(0);

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
    setQuantity(1);
    setShowCart(true);
  };

  const handleContinueToCheckout = () => {
    // Generate order number
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const newOrderNumber = `ORD-${timestamp}-${random}`;
    setOrderNumber(newOrderNumber);

    setShowCart(false);
    setShowAgreement(true);
  };

  const handleAgreementAccept = () => {
    setShowAgreement(false);
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

      // Map course ID to credit type - using course IDs for unique identification
      let courseType = selectedOption.id;

      // Calculate total credits and price based on quantity
      const totalCredits = selectedOption.credits * quantity;
      const totalPrice = selectedOption.price * quantity;

      // Call purchase API
      const response = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId: selectedOption.id,
          courseType: courseType,
          credits: totalCredits,
          price: totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setPurchasedCredits(totalCredits);
        setShowCheckout(false);
        setShowSuccess(true);
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
        <div className="bg-[#00A5A8] text-white px-8 py-5 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Purchase Training Credits</h1>
              <p className="text-sm mt-1 text-white/90">
                Choose a package that fits your training needs
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-[#00A5A8] px-5 py-2.5 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        {/* Purchase Options Grid */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Shopping Cart Modal */}
      {showCart && selectedOption && (
        <ShoppingCartModal
          option={selectedOption}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onContinue={handleContinueToCheckout}
          onCancel={() => setShowCart(false)}
        />
      )}

      {/* Purchase Agreement Modal */}
      {showAgreement && selectedOption && (
        <PurchaseAgreementModal
          option={selectedOption}
          quantity={quantity}
          orderNumber={orderNumber}
          onAccept={handleAgreementAccept}
          onCancel={() => {
            setShowAgreement(false);
            setShowCart(true);
          }}
        />
      )}

      {/* Checkout Modal */}
      {showCheckout && selectedOption && (
        <CheckoutModal
          option={selectedOption}
          quantity={quantity}
          onConfirm={confirmPurchase}
          onCancel={() => {
            setShowCheckout(false);
            setShowAgreement(true);
          }}
        />
      )}

      {/* Success Modal */}
      {showSuccess && selectedOption && (
        <SuccessModal
          option={selectedOption}
          quantity={quantity}
          credits={purchasedCredits}
          orderNumber={orderNumber}
          onClose={() => {
            setShowSuccess(false);
            // Add timestamp to force dashboard refresh
            router.push(`/dashboard?refresh=${Date.now()}`);
          }}
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
  const getCourseTypeColor = (name: string) => {
    if (name.includes("Spanish")) return "bg-purple-50 border-purple-200 text-purple-700";
    if (name.includes("Basic Life Support")) return "bg-red-50 border-red-200 text-red-700";
    if (name.includes("First Aid") && name.includes("CPR")) return "bg-teal-50 border-teal-200 text-teal-700";
    if (name.includes("First Aid")) return "bg-green-50 border-green-200 text-green-700";
    if (name.includes("CPR")) return "bg-blue-50 border-blue-200 text-blue-700";
    return "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col">
      {/* Course Type Badge */}
      <div className="mb-2">
        <span
          className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${getCourseTypeColor(
            option.name
          )}`}
        >
          {option.courseType}
        </span>
      </div>

      {/* Package Name */}
      <h3 className="text-base font-bold text-gray-800 mb-1">{option.name}</h3>

      {/* Course ID */}
      <p className="text-xs text-gray-500 mb-2">Course ID: {option.id}</p>

      {/* Credits */}
      <div className="mb-2">
        <p className="text-2xl font-bold text-[#00A5A8]">{option.credits}</p>
        <p className="text-xs text-gray-600">Training Credits</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-xs mb-3 flex-1">{option.description}</p>

      {/* Price */}
      <div className="mb-3">
        <p className="text-xl font-bold text-gray-800">${option.price}</p>
        <p className="text-xs text-gray-500">One-time payment</p>
      </div>

      {/* Purchase Button */}
      <button
        onClick={() => onPurchase(option)}
        className="w-full bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white py-2 rounded-lg font-bold hover:from-[#008a8d] hover:to-[#00A5A8] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
      >
        <FaShoppingCart className="text-xs" />
        Purchase Now
      </button>
    </div>
  );
}

function ShoppingCartModal({
  option,
  quantity,
  onQuantityChange,
  onContinue,
  onCancel,
}: {
  option: PurchaseOption;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onContinue: () => void;
  onCancel: () => void;
}) {
  const subtotal = option.price * quantity;
  const totalCredits = option.credits * quantity;

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full animate-slideUp max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A5A8] to-[#008a8d] px-6 py-5 rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaShoppingCart className="text-white text-2xl" />
              <h3 className="text-2xl font-bold text-white">Shopping Cart</h3>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="p-6">
          {/* Product Details Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-700">Product Description</th>
                  <th className="text-center p-4 text-sm font-semibold text-gray-700">Quantity</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-700">Price</th>
                  <th className="text-right p-4 text-sm font-semibold text-gray-700">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="p-4">
                    <div>
                      <p className="font-bold text-gray-900 mb-1">{option.name}</p>
                      <p className="text-sm text-gray-600">ID: {option.id}</p>
                      <p className="text-sm text-gray-600">{option.courseType}</p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-[#00A5A8]/10 text-[#00A5A8] text-xs font-semibold rounded-full">
                          {option.credits} credits per package
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={handleDecrement}
                        disabled={quantity <= 1}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 ${
                          quantity <= 1
                            ? "border-gray-200 text-gray-300 cursor-not-allowed"
                            : "border-[#00A5A8] text-[#00A5A8] hover:bg-[#00A5A8] hover:text-white"
                        } transition-all`}
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityInput}
                        className="w-16 text-center border-2 border-gray-200 rounded-lg py-2 font-semibold text-gray-900 focus:border-[#00A5A8] focus:outline-none"
                      />
                      <button
                        onClick={handleIncrement}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border-2 border-[#00A5A8] text-[#00A5A8] hover:bg-[#00A5A8] hover:text-white transition-all"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-right font-semibold text-gray-900">
                    ${option.price.toFixed(2)}
                  </td>
                  <td className="p-4 text-right font-bold text-gray-900 text-lg">
                    ${subtotal.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-600">Total Credits</span>
                <span className="font-bold text-[#00A5A8]">{totalCredits} credits</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-[#00A5A8]">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <FaCheckCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              <strong>Free Digital Delivery:</strong> Your training credits will be instantly available after purchase confirmation.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0 sticky bottom-0 bg-white">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaTimes />
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white rounded-lg font-bold hover:from-[#008a8d] hover:to-[#00A5A8] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Continue to Checkout
            <FaCheckCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

function PurchaseAgreementModal({
  option,
  quantity,
  orderNumber,
  onAccept,
  onCancel,
}: {
  option: PurchaseOption;
  quantity: number;
  orderNumber: string;
  onAccept: () => void;
  onCancel: () => void;
}) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const totalPrice = option.price * quantity;
  const totalCredits = option.credits * quantity;
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const user = auth.currentUser;
  const purchaserName = user?.displayName || user?.email || "Valued Customer";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full animate-slideUp max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#C10E21] to-[#00A5A8] px-6 py-5 rounded-t-lg sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFileContract className="text-white text-2xl" />
              <h3 className="text-2xl font-bold text-white">Purchase Agreement</h3>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Order Details Header */}
          <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Order Number</p>
                <p className="text-sm font-bold text-gray-900">{orderNumber}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Purchaser</p>
                <p className="text-sm font-bold text-gray-900">{purchaserName}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Date</p>
                <p className="text-sm font-bold text-gray-900">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* Training Program Information */}
          <div className="border-2 border-[#00A5A8]/30 rounded-lg p-5 bg-[#00A5A8]/5">
            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-[#00A5A8]" />
              Training Program Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Program Name</span>
                <span className="text-sm font-bold text-gray-900 text-right max-w-xs">{option.name}</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Course ID</span>
                <span className="text-sm font-semibold text-gray-900">{option.id}</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Course Type</span>
                <span className="text-sm font-semibold text-gray-900">{option.courseType}</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Quantity</span>
                <span className="text-sm font-semibold text-gray-900">{quantity} {quantity === 1 ? 'package' : 'packages'}</span>
              </div>
              <div className="flex justify-between items-start pb-3 border-b border-gray-200">
                <span className="text-sm text-gray-600 font-medium">Total Credits</span>
                <span className="text-sm font-bold text-[#00A5A8]">{totalCredits} Training Credits</span>
              </div>
              <div className="flex justify-between items-start pt-2">
                <span className="text-base text-gray-700 font-semibold">Total Price</span>
                <span className="text-2xl font-bold text-[#00A5A8]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Purchase Agreement */}
          <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50">
            <h4 className="text-lg font-bold text-gray-900 mb-3">Purchase Intent Confirmation</h4>
            <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
              <p>
                By proceeding with this purchase, I, <strong>{purchaserName}</strong>, hereby confirm my intent to purchase the training program(s) listed above for the total amount of <strong>${totalPrice.toFixed(2)}</strong>.
              </p>
              <p>
                I understand that this purchase grants me access to <strong>{totalCredits} digital training credits</strong> for the <strong>{option.name}</strong> program, which will be immediately available upon successful payment confirmation.
              </p>
              <p>
                I acknowledge that I have reviewed the program details, pricing, and quantity before proceeding with this transaction.
              </p>
            </div>
          </div>

          {/* Return Policy */}
          <div className="border-2 border-orange-200 rounded-lg p-5 bg-orange-50">
            <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaFileContract className="text-orange-600" />
              Return & Refund Policy
            </h4>
            <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
              <p className="font-semibold text-gray-900">Digital Products - No Returns on Used Credits:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Training credits are digital products and are <strong>non-refundable once accessed or used</strong>.</li>
                <li>If you have not yet accessed or assigned any credits from your purchase, you may request a refund within <strong>7 days</strong> of purchase.</li>
                <li>Refund requests must be submitted in writing to our support team with your order number.</li>
                <li>Once credits are assigned to students or instructors, they cannot be refunded or exchanged.</li>
                <li>All refunds will be processed within 5-10 business days to the original payment method.</li>
              </ul>
              <p className="mt-3 text-xs text-gray-600 italic">
                For questions about our return policy, please contact customer support before completing your purchase.
              </p>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="border-2 border-[#C10E21] rounded-lg p-4 bg-red-50">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-5 h-5 text-[#C10E21] border-gray-300 rounded focus:ring-[#C10E21] cursor-pointer"
              />
              <span className="text-sm text-gray-900 flex-1">
                <strong>I have read and agree to the purchase terms and return policy stated above.</strong> I confirm my intent to proceed with this purchase and understand that by clicking "Accept & Continue," I am entering into a binding transaction.
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-0 sticky bottom-0 bg-white border-t border-gray-200">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <FaTimes />
            Cancel
          </button>
          <button
            onClick={onAccept}
            disabled={!agreedToTerms}
            className={`flex-1 px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
              agreedToTerms
                ? "bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white hover:from-[#008a8d] hover:to-[#00A5A8] hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaCheckCircle />
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({
  option,
  quantity,
  onConfirm,
  onCancel,
}: {
  option: PurchaseOption;
  quantity: number;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [billingAddress, setBillingAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = option.price * quantity;
  const totalCredits = option.credits * quantity;
  const discountAmount = (totalPrice * discount) / 100;
  const finalPrice = totalPrice - discountAmount;

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.substring(0, 19);
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryDate(formatExpiryDate(e.target.value));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCvv(value.substring(0, 4));
  };

  const applyPromoCode = () => {
    // Demo promo codes
    const promoCodes: { [key: string]: number } = {
      "SAVE10": 10,
      "SAVE20": 20,
      "WELCOME": 15,
      "TRAINING25": 25,
    };

    const upperCode = promoCode.toUpperCase();
    if (promoCodes[upperCode]) {
      setDiscount(promoCodes[upperCode]);
      setPromoApplied(true);
    } else {
      alert("Invalid promo code. Try: SAVE10, SAVE20, WELCOME, or TRAINING25");
    }
  };

  const removePromoCode = () => {
    setPromoCode("");
    setDiscount(0);
    setPromoApplied(false);
  };

  const handleSubmit = () => {
    // Validate fields
    if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
      alert("Please enter a valid card number");
      return;
    }
    if (!cardName.trim()) {
      alert("Please enter the cardholder name");
      return;
    }
    if (!expiryDate || expiryDate.length < 5) {
      alert("Please enter a valid expiry date (MM/YY)");
      return;
    }
    if (!cvv || cvv.length < 3) {
      alert("Please enter a valid CVV");
      return;
    }
    if (!billingAddress.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      alert("Please complete the billing address");
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 p-4 animate-fadeIn overflow-y-auto pt-8 pb-8">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00A5A8] to-[#008a8d] px-8 py-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <FaCreditCard className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">Payment Information</h3>
                <p className="text-sm text-white/90 mt-1">Secure checkout powered by SSL encryption</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white hover:bg-white/20 rounded-full p-2.5 transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Payment Form - Left Side (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card Information */}
            <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2 pb-3 border-b-2 border-gray-200">
                <div className="bg-[#00A5A8]/10 p-2 rounded-lg">
                  <FaCreditCard className="text-[#00A5A8] text-xl" />
                </div>
                Card Information
              </h4>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-2 bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCard}
                    onChange={(e) => setSaveCard(e.target.checked)}
                    className="w-5 h-5 text-[#00A5A8] border-gray-300 rounded focus:ring-[#00A5A8] cursor-pointer"
                  />
                  <label htmlFor="saveCard" className="text-sm font-semibold text-gray-800 cursor-pointer">
                    Save this card for future purchases
                  </label>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2 pb-3 border-b-2 border-gray-200">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <FaCreditCard className="text-purple-600 text-xl" />
                </div>
                Billing Address
              </h4>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Phoenix"
                      className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="AZ"
                      className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="85001"
                    className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-[#00A5A8] focus:ring-2 focus:ring-[#00A5A8]/20 focus:outline-none transition-all text-base font-semibold text-gray-900 bg-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2 pb-3 border-b-2 border-orange-200">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <FaTag className="text-orange-600 text-xl" />
                </div>
                Promo Code
              </h4>
              {!promoApplied ? (
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3.5 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-base font-bold text-gray-900 bg-white placeholder:text-gray-400"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={!promoCode.trim()}
                      className={`px-8 py-3.5 rounded-lg font-bold transition-all ${
                        promoCode.trim()
                          ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Apply
                    </button>
                  </div>
                  <div className="bg-white/70 border border-orange-300 rounded-lg p-3">
                    <p className="text-sm font-semibold text-orange-800">
                      💡 Try these codes: <span className="font-mono">SAVE10</span>, <span className="font-mono">SAVE20</span>, <span className="font-mono">WELCOME</span>, or <span className="font-mono">TRAINING25</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border-2 border-green-500 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FaCheckCircle className="text-green-600 text-2xl" />
                    </div>
                    <div>
                      <p className="font-bold text-green-900 text-lg">Code Applied: {promoCode}</p>
                      <p className="text-sm text-green-700 mt-1">You saved {discount}% (${discountAmount.toFixed(2)})</p>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-red-600 hover:text-red-800 p-2 hover:bg-red-100 rounded-lg transition-colors"
                    title="Remove promo code"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary - Right Side (1/3) */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-[#00A5A8]/5 to-teal-50 border-2 border-[#00A5A8] rounded-xl p-6 shadow-lg">
                <h4 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2 pb-3 border-b-2 border-[#00A5A8]/30">
                  <FaShoppingCart className="text-[#00A5A8]" />
                  Order Summary
                </h4>
                <div className="space-y-4">
                  <div className="pb-4 border-b-2 border-gray-200 bg-white/50 rounded-lg p-4">
                    <p className="text-base font-bold text-gray-900 mb-2">{option.name}</p>
                    <p className="text-xs text-gray-600 mb-1">ID: <span className="font-semibold">{option.id}</span></p>
                    <p className="text-xs text-gray-600">{option.courseType}</p>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="text-sm font-semibold text-gray-700">Quantity</span>
                    <span className="text-base font-bold text-gray-900">{quantity}x</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="text-sm font-semibold text-gray-700">Credits</span>
                    <span className="text-base font-bold text-[#00A5A8]">{totalCredits}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="text-sm font-semibold text-gray-700">Subtotal</span>
                    <span className="text-base font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-300 bg-green-50 -mx-6 px-6 rounded-lg">
                      <span className="text-sm font-bold text-green-700">Discount ({discount}%)</span>
                      <span className="text-base font-bold text-green-600">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4 bg-gradient-to-r from-[#00A5A8]/10 to-teal-100/50 -mx-6 px-6 py-4 rounded-lg mt-4">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-[#00A5A8]">${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FaLock className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-blue-900 mb-1">Secure Payment</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Your payment information is encrypted with SSL and processed securely. We never store your full card details.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full px-6 py-5 rounded-xl font-bold text-lg transition-all duration-200 shadow-lg flex items-center justify-center gap-3 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#00A5A8] via-teal-500 to-[#008a8d] text-white hover:from-[#008a8d] hover:via-teal-600 hover:to-[#00A5A8] hover:shadow-2xl hover:scale-105 transform"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <>
                      <FaLock className="text-xl" />
                      <span>Complete Purchase ${finalPrice.toFixed(2)}</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onCancel}
                  disabled={isProcessing}
                  className="w-full px-6 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Back to Agreement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({
  option,
  quantity,
  credits,
  orderNumber,
  onClose,
}: {
  option: PurchaseOption;
  quantity: number;
  credits: number;
  orderNumber: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full animate-slideUp">
        {/* Success Icon */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-8 rounded-t-lg text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">Purchase Successful!</h3>
          <p className="text-white/90">Your training credits are now available</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Order Info */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Order Number</p>
            <p className="text-lg font-bold text-gray-900">{orderNumber}</p>
          </div>

          {/* Purchase Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Package</span>
              <span className="text-sm font-semibold text-gray-900 text-right max-w-xs">{option.name}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Quantity</span>
              <span className="text-sm font-semibold text-gray-900">{quantity} {quantity === 1 ? 'package' : 'packages'}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <span className="text-sm text-gray-600">Credits Added</span>
              <span className="text-lg font-bold text-green-600">{credits} Credits</span>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 flex items-start gap-3">
            <FaCheckCircle className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-green-900 mb-1">Credits Added to Your Account</p>
              <p className="text-xs text-green-700">
                Your {credits} training credits have been added to your account and are ready to use immediately. Check your dashboard to see the updated balance.
              </p>
            </div>
          </div>

          {/* Receipt Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              📧 A confirmation email with your receipt and order details has been sent to your registered email address.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <FaCheckCircle />
          </button>
        </div>
      </div>
    </div>
  );
}
