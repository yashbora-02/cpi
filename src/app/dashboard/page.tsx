"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FaShoppingCart, FaExclamationTriangle, FaChevronRight, FaCheckCircle, FaFlag } from "react-icons/fa";

type Credit = {
  type: "cpr_only" | "first_aid_only" | "combo";
  credits: number;
};

type CourseCredit = {
  id: string;
  courseName: string;
  courseType: string;
  credits: number;
};

export default function Dashboard() {
  const router = useRouter();
  const [creditsData, setCreditsData] = useState<Credit[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      // User is authenticated, fetch credits
      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/credits", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setCreditsData(data);
        } else {
          console.error("Invalid credits data format:", data);
          setCreditsData([]);
        }
      } catch (error) {
        console.error("Error fetching credits:", error);
        setCreditsData([]);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const getCreditsByType = (type: string) =>
    creditsData.find((c) => c.type === type)?.credits ?? 0;

  const getTotalCredits = () => {
    return creditsData.reduce((sum, credit) => sum + credit.credits, 0);
  };

  const getCreditsColor = (credits: number) => {
    if (credits === 0) return "text-red-600";
    if (credits < 15) return "text-orange-600";
    return "text-green-600";
  };

  const getCreditsBackground = (credits: number) => {
    if (credits === 0) return "bg-red-50 border-red-200";
    if (credits < 15) return "bg-orange-50 border-orange-200";
    return "bg-green-50 border-green-200";
  };

  const totalCredits = getTotalCredits();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Header */}
        <div className="bg-[#00A5A8] text-white px-8 py-6 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-base mt-2 text-white/90">Training Credits Overview</p>
            </div>
            <button
              onClick={() => router.push("/credits/purchase")}
              className="bg-white text-[#00A5A8] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <FaShoppingCart />
              Purchase Credits
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Credits Card - List Format */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-[#00A5A8]/10 p-3 rounded-lg">
                  <FaShoppingCart className="text-[#00A5A8] text-2xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Credits</h2>
                  <p className="text-sm text-gray-600">Credit Availability and Usage</p>
                </div>
              </div>
            </div>

            {/* Total Credits Alert */}
            {totalCredits < 15 && (
              <div
                className={`mb-4 p-4 rounded-lg border-l-4 flex items-start gap-3 ${
                  totalCredits === 0
                    ? "bg-red-50 border-red-500"
                    : "bg-orange-50 border-orange-500"
                }`}
              >
                <FaExclamationTriangle
                  className={`text-lg mt-0.5 ${
                    totalCredits === 0 ? "text-red-600" : "text-orange-600"
                  }`}
                />
                <div className="flex-1">
                  <p
                    className={`font-semibold text-sm ${
                      totalCredits === 0 ? "text-red-800" : "text-orange-800"
                    }`}
                  >
                    {totalCredits === 0
                      ? "No Credits Available"
                      : "Low Credits Warning"}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      totalCredits === 0 ? "text-red-700" : "text-orange-700"
                    }`}
                  >
                    {totalCredits === 0
                      ? "You have no credits remaining. Purchase credits to continue creating classes."
                      : `You have ${totalCredits} credits remaining. Consider purchasing more credits.`}
                  </p>
                </div>
              </div>
            )}

            {/* Course Credits List */}
            <div className="space-y-2">
              <CreditListItem
                courseName="HSI Adult First Aid (2020)"
                courseType="Blended"
                credits={getCreditsByType("first_aid_only")}
              />
              <CreditListItem
                courseName="HSI Adult First Aid | Basic Life Support (2020)"
                courseType="Blended - DC Blended"
                credits={getCreditsByType("cpr_only")}
              />
              <CreditListItem
                courseName="HSI Adult First Aid | CPR AED Adult Child (2020)"
                courseType="Blended - DC Blended"
                credits={getCreditsByType("combo")}
              />
            </div>

            {/* Purchase Credits Button */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => router.push("/credits/purchase")}
                className="w-full bg-gradient-to-r from-[#00A5A8] to-[#008a8d] text-white py-3 rounded-lg font-bold hover:from-[#008a8d] hover:to-[#00A5A8] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
              >
                Purchase Credits
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function CreditListItem({
  courseName,
  courseType,
  credits,
}: {
  courseName: string;
  courseType: string;
  credits: number;
}) {
  const getCreditsColor = (credits: number) => {
    if (credits === 0) return "bg-red-500";
    if (credits < 15) return "bg-orange-500";
    return "bg-green-500";
  };

  const getCreditsIcon = (credits: number) => {
    if (credits === 0) return <FaFlag className="text-white" />;
    if (credits < 15) return <FaExclamationTriangle className="text-white" />;
    return <FaCheckCircle className="text-white" />;
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200 group cursor-pointer">
      <div className="flex items-center gap-3 flex-1">
        <FaChevronRight className="text-gray-400 group-hover:text-[#00A5A8] transition-colors" />
        <div className="flex-1">
          <p className="font-semibold text-gray-800 text-sm">{courseName}</p>
          <p className="text-xs text-gray-500">{courseType}</p>
        </div>
      </div>
      <div
        className={`${getCreditsColor(
          credits
        )} px-4 py-2 rounded-lg flex items-center gap-2 min-w-[70px] justify-center shadow-md`}
      >
        <span className="text-white font-bold text-lg">{credits}</span>
        {getCreditsIcon(credits)}
      </div>
    </div>
  );
}
