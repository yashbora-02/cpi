"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Credit = {
  type: "cpr_only" | "first_aid_only" | "combo";
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CreditCard title="CPR Only" credits={getCreditsByType("cpr_only")} />
          <CreditCard
            title="First Aid Only"
            credits={getCreditsByType("first_aid_only")}
          />
          <CreditCard
            title="Combo (CPR & First Aid)"
            credits={getCreditsByType("combo")}
          />
        </div>
      </div>
    </div>
  );
}

function CreditCard({ title, credits }: { title: string; credits: number }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-5xl font-bold text-blue-600">{credits}</p>
      <p className="text-sm text-gray-500 mt-1">Credits Remaining</p>
    </div>
  );
}
