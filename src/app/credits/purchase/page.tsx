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
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.replace("/login");
    }
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
      // Get user from localStorage
      const userStr = localStorage.getItem("currentUser");
      if (!userStr) {
        alert("Authentication error. Please log in again.");
        router.push("/login");
        return;
      }

      const user = JSON.parse(userStr);

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
        },
        body: JSON.stringify({
          packageId: selectedOption.id,
          courseType: courseType,
          credits: totalCredits,
          price: totalPrice,
          userId: user.username,
          userEmail: user.email,
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
        <div className="bg-[#2583F5] text-white px-8 py-5 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Purchase Training Credits</h1>
              <p className="text-sm mt-1 text-white/90">
                Choose a package that fits your training needs
              </p>
            </div>
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-white text-[#5B7FFF] px-5 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
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
    if (name.includes("First Aid") && name.includes("CPR")) return "bg-cyan-50 border-cyan-200 text-cyan-700";
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
        <p className="text-2xl font-bold text-[#2583F5]">{option.credits}</p>
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
        className="w-full bg-[#2583F5] text-white py-2 rounded-lg font-bold hover:bg-[#1a6ad9] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
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
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[9999] p-4 pt-32 pb-8 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-lg max-w-2xl w-full animate-slideUp shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Review your order</h3>
              <p className="text-sm text-gray-600 mt-1">Adjust quantity and review details</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Cart Content */}
        <div className="px-8 py-6">
          {/* Product Details */}
          <div className="mb-6">
            <div className="pb-4 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-1">{option.name}</p>
              <p className="text-xs text-gray-600 mb-1">Course ID: {option.id}</p>
              <p className="text-xs text-gray-600">{option.courseType}</p>
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-[#5DCCDB]/10 text-[#5B7FFF] text-xs font-medium rounded-md">
                  {option.credits} credits per package
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className={`w-10 h-10 flex items-center justify-center rounded-md border transition-colors ${
                  quantity <= 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <FaMinus className="text-sm" />
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityInput}
                className="w-20 text-center border border-gray-300 rounded-md py-2 font-medium text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none"
              />
              <button
                onClick={handleIncrement}
                className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Order summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Price per package</span>
                <span className="text-gray-900 font-medium">${option.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Quantity</span>
                <span className="text-gray-900 font-medium">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Total credits</span>
                <span className="text-[#2583F5] font-medium">{totalCredits} credits</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="flex items-start gap-2 text-xs text-gray-600 mb-6">
            <FaCheckCircle className="mt-0.5 flex-shrink-0 text-[#2583F5]" />
            <p>Credits will be instantly available after purchase confirmation</p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-8 py-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 px-6 py-3 bg-[#2583F5] text-white rounded-md font-medium hover:bg-[#1a6ad9] transition-all text-sm"
          >
            Continue to agreement
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
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[9999] p-4 pt-32 pb-8 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full animate-slideUp shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Purchase agreement</h3>
              <p className="text-sm text-gray-600 mt-1">Review and accept the terms</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Order Details Header */}
          <div className="bg-gray-50 rounded-lg p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Order number</p>
                <p className="text-sm font-semibold text-gray-900">{orderNumber}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Purchaser</p>
                <p className="text-sm font-semibold text-gray-900">{purchaserName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1">Date</p>
                <p className="text-sm font-semibold text-gray-900">{currentDate}</p>
              </div>
            </div>
          </div>

          {/* Training Program Information */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Order details</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Program name</span>
                <span className="font-medium text-gray-900 text-right max-w-xs">{option.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Course ID</span>
                <span className="font-medium text-gray-900">{option.id}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Course type</span>
                <span className="font-medium text-gray-900">{option.courseType}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Quantity</span>
                <span className="font-medium text-gray-900">{quantity} {quantity === 1 ? 'package' : 'packages'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Total credits</span>
                <span className="font-medium text-[#2583F5]">{totalCredits} credits</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="font-semibold text-gray-900">Total price</span>
                <span className="text-2xl font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Purchase Agreement */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Terms & conditions</h4>
            <div className="text-xs text-gray-700 space-y-3 leading-relaxed">
              <p>
                By proceeding with this purchase, I, <strong>{purchaserName}</strong>, confirm my intent to purchase the training program listed above for <strong>${totalPrice.toFixed(2)}</strong>.
              </p>
              <p>
                I understand that this purchase grants me access to <strong>{totalCredits} digital training credits</strong> for the <strong>{option.name}</strong> program, which will be immediately available upon payment confirmation.
              </p>
              <p>
                I acknowledge that I have reviewed the program details, pricing, and quantity before proceeding.
              </p>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-gray-50 rounded-lg p-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Refund policy</h4>
            <div className="text-xs text-gray-700 space-y-2 leading-relaxed">
              <p className="font-medium text-gray-900">Digital products - No returns on used credits</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Training credits are <strong>non-refundable once accessed or used</strong></li>
                <li>Unused credits may be refunded within <strong>7 days</strong> of purchase</li>
                <li>Refund requests require written submission with your order number</li>
                <li>Assigned credits cannot be refunded or exchanged</li>
                <li>Refunds processed within 5-10 business days</li>
              </ul>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="border border-gray-300 rounded-lg p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#5B7FFF] border-gray-300 rounded focus:ring-[#5B7FFF] cursor-pointer"
              />
              <span className="text-xs text-gray-900 flex-1">
                I have read and agree to the purchase terms and refund policy. I understand that clicking "Continue to payment" creates a binding transaction.
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-8 py-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
          >
            Back
          </button>
          <button
            onClick={onAccept}
            disabled={!agreedToTerms}
            className={`flex-1 px-6 py-3 rounded-md font-medium text-sm transition-all ${
              agreedToTerms
                ? "bg-[#2583F5] text-white hover:bg-[#1a6ad9]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue to payment
          </button>
        </div>
      </div>
    </div>
  );
}

interface SavedCard {
  id: number;
  card_last_four: string;
  card_type: string;
  cardholder_name: string;
  expiry_month: string;
  expiry_year: string;
  is_default: boolean;
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
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedSavedCard, setSelectedSavedCard] = useState<SavedCard | null>(null);
  const [useNewCard, setUseNewCard] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Fetch saved cards on mount
  useEffect(() => {
    fetchSavedCards();
  }, []);

  const fetchSavedCards = async () => {
    setLoadingCards(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        setLoadingCards(false);
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch('/api/payment/cards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSavedCards(data.cards || []);
      }
    } catch (error) {
      console.error('Error fetching saved cards:', error);
    } finally {
      setLoadingCards(false);
    }
  };

  const handleSelectSavedCard = (card: SavedCard) => {
    setSelectedSavedCard(card);
    setUseNewCard(false);
    setCardName(card.cardholder_name);
    setExpiryDate(`${card.expiry_month}/${card.expiry_year}`);
  };

  const handleDeleteCard = async (cardId: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this card?')) {
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`/api/payment/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSavedCards(savedCards.filter(card => card.id !== cardId));
        if (selectedSavedCard?.id === cardId) {
          setSelectedSavedCard(null);
          setUseNewCard(true);
        }
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Failed to delete card');
    }
  };

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

  const handleSubmit = async () => {
    // If using a saved card, only validate CVV
    if (!useNewCard && selectedSavedCard) {
      if (!cvv || cvv.length < 3) {
        alert("Please enter your CVV");
        return;
      }
    } else {
      // Validate all fields for new card
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
    }

    setIsProcessing(true);

    try {
      // If saveCard is checked and using new card, save it
      if (saveCard && useNewCard && cardNumber && cardName && expiryDate) {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          const saveResponse = await fetch('/api/payment/cards', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              cardNumber: cardNumber,
              cardholderName: cardName,
              expiryDate: expiryDate,
              setAsDefault: savedCards.length === 0, // Set as default if it's the first card
            }),
          });

          if (saveResponse.ok) {
            console.log('Card saved successfully');
            // Refresh the saved cards list
            await fetchSavedCards();
            // Show success notification
            setShowSaveSuccess(true);
            setTimeout(() => setShowSaveSuccess(false), 3000);
          } else {
            console.error('Failed to save card');
            const errorData = await saveResponse.json();
            alert(`Failed to save card: ${errorData.error || 'Unknown error'}`);
          }
        }
      }

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onConfirm();
      }, 2000);
    } catch (error) {
      console.error('Error during payment:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] overflow-y-auto animate-fadeIn">
      <div className="min-h-screen flex items-center justify-center p-4 pt-20">
        <div className="bg-white rounded-lg max-w-5xl w-full my-8 animate-slideUp shadow-xl">
        {/* Minimal Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Payment</h3>
              <p className="text-sm text-gray-600 mt-1">Complete your purchase securely</p>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Success Toast Notification */}
        {showSaveSuccess && (
          <div className="mx-8 mt-4 mb-0 animate-fadeIn">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg shadow-md">
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 text-lg flex-shrink-0" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Card saved successfully!
                  </p>
                  <p className="text-xs text-green-700 mt-0.5">
                    Your payment method has been securely saved for future purchases.
                  </p>
                </div>
                <button
                  onClick={() => setShowSaveSuccess(false)}
                  className="ml-auto text-green-500 hover:text-green-700"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Payment Form - Left Side (2/3) */}
          <div className="lg:col-span-2 px-8 py-6 space-y-8">
            {/* Saved Cards Section */}
            {loadingCards ? (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Saved payment methods</h4>
                <div className="space-y-2 mb-4">
                  {/* Loading skeleton */}
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-md animate-pulse">
                      <div className="w-5 h-5 bg-gray-200 rounded"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-3 bg-gray-200 rounded w-48"></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
              </div>
            ) : savedCards.length > 0 ? (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Saved payment methods</h4>
                <div className="space-y-2 mb-4">
                  {savedCards.map((card) => (
                    <div
                      key={card.id}
                      onClick={() => handleSelectSavedCard(card)}
                      className={`flex items-center justify-between p-3 border rounded-md cursor-pointer transition-all ${
                        selectedSavedCard?.id === card.id
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <FaCreditCard className="text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {card.card_type} •••• {card.card_last_four}
                          </p>
                          <p className="text-xs text-gray-600">
                            {card.cardholder_name} • Expires {card.expiry_month}/{card.expiry_year}
                          </p>
                        </div>
                        {card.is_default && (
                          <span className="ml-2 px-2 py-0.5 bg-[#2583F5] text-white text-xs rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleDeleteCard(card.id, e)}
                        className="p-2 rounded-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Delete this card"
                      >
                        <FaTrashAlt className="text-base" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setUseNewCard(true);
                    setSelectedSavedCard(null);
                    setCardNumber('');
                    setCardName('');
                    setExpiryDate('');
                  }}
                  className="text-sm text-[#5B7FFF] hover:underline font-medium"
                >
                  + Use a new payment method
                </button>
              </div>
            ) : null}

            {/* Card Information */}
            {!loadingCards && (useNewCard || savedCards.length === 0) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  {savedCards.length > 0 ? 'New card details' : 'Card details'}
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Card number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                    />
                  </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Expiry
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={handleExpiryChange}
                      placeholder="MM / YY"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      CVC
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={handleCvvChange}
                      placeholder="123"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                    />
                  </div>
                </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Cardholder name
                    </label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Full name on card"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                    />
                  </div>

                  {/* Save Card Checkbox */}
                  <div className="border-t pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-[#5B7FFF] border-gray-300 rounded focus:ring-[#5B7FFF] cursor-pointer"
                      />
                      <span className="text-sm text-gray-900">
                        Save this card for future purchases
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      We securely store your card details for faster checkout
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CVV Field - Always shown */}
            {!useNewCard && selectedSavedCard && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Security verification</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1.5">
                    CVV / CVC
                  </label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={handleCvvChange}
                    placeholder="123"
                    className="w-24 px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the 3-digit security code for {selectedSavedCard.card_type} •••• {selectedSavedCard.card_last_four}
                  </p>
                </div>
              </div>
            )}

            {/* Billing Address - Only for new cards */}
            {!loadingCards && (useNewCard || savedCards.length === 0) && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Billing address</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1.5">
                      Address
                    </label>
                    <input
                      type="text"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      placeholder="Street address"
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1.5">
                        ZIP
                      </label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="ZIP"
                        className="w-full px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Promo Code */}
            {!loadingCards && <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">Promo code</h4>
              {!promoApplied ? (
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md focus:border-gray-900 focus:ring-1 focus:ring-gray-900 focus:outline-none transition-colors text-sm text-gray-900"
                  />
                  <button
                    onClick={applyPromoCode}
                    disabled={!promoCode.trim()}
                    className={`px-6 py-2.5 rounded-md font-medium text-sm transition-colors ${
                      promoCode.trim()
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-600 text-sm" />
                    <div>
                      <p className="text-sm font-medium text-green-900">{promoCode}</p>
                      <p className="text-xs text-green-700">-${discountAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              )}
            </div>}

            {/* Security Notice */}
            {!loadingCards && <div className="flex items-start gap-2 text-xs text-gray-600 pt-2">
              <FaLock className="mt-0.5 flex-shrink-0" />
              <p>Payments are secure and encrypted</p>
            </div>}
          </div>

          {/* Order Summary - Right Side (1/3) */}
          <div className="lg:col-span-1 bg-gray-50 px-8 py-6 border-l border-gray-200">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Order summary</h4>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">{option.name}</p>
                    <p className="text-xs text-gray-600">{option.id}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Quantity</span>
                      <span className="text-gray-900 font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Credits</span>
                      <span className="text-gray-900 font-medium">{totalCredits}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Subtotal</span>
                      <span className="text-gray-900 font-medium">${totalPrice.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span className="font-medium">Discount</span>
                        <span className="font-medium">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-semibold text-gray-900">${finalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={`w-full px-4 py-3 rounded-md font-medium text-sm transition-all ${
                    isProcessing
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${finalPrice.toFixed(2)}`
                  )}
                </button>
                <button
                  onClick={onCancel}
                  disabled={isProcessing}
                  className="w-full px-4 py-3 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors disabled:opacity-50"
                >
                  Back
                </button>
              </div>
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
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[9999] p-4 pt-32 pb-8 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-lg max-w-lg w-full animate-slideUp shadow-xl">
        {/* Header with Success Icon */}
        <div className="border-b border-gray-200 px-8 py-8 text-center">
          <div className="w-16 h-16 bg-[#2583F5]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-[#2583F5] text-4xl" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-1">Purchase complete</h3>
          <p className="text-sm text-gray-600">Your credits are now available</p>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          {/* Order Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 mb-1">Order number</p>
            <p className="text-sm font-semibold text-gray-900">{orderNumber}</p>
          </div>

          {/* Purchase Details */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Order details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Package</span>
                <span className="font-medium text-gray-900 text-right max-w-xs">{option.name}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Quantity</span>
                <span className="font-medium text-gray-900">{quantity} {quantity === 1 ? 'package' : 'packages'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="text-gray-700">Credits added</span>
                <span className="font-medium text-[#2583F5]">{credits} credits</span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="bg-[#5DCCDB]/5 border border-[#5DCCDB]/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <FaCheckCircle className="text-[#2583F5] text-sm mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-700">
                Your {credits} training credits have been added to your account and are ready to use. Visit your dashboard to view your updated balance.
              </p>
            </div>
          </div>

          {/* Receipt Info */}
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <span>📧</span>
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="border-t border-gray-200 px-8 py-6">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#2583F5] text-white rounded-md font-medium hover:bg-[#1a6ad9] transition-all text-sm"
          >
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
