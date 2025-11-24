"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  FaShoppingCart,
  FaChevronRight,
  FaCheckCircle,
  FaFlag,
  FaGraduationCap,
  FaUsers,
  FaClipboardList,
  FaExclamationCircle,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaFileInvoice,
  FaSpinner,
  FaTrophy,
  FaChartLine
} from "react-icons/fa";

type Credit = {
  type: "cpr_only" | "first_aid_only" | "combo";
  credits: number;
};

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [creditsData, setCreditsData] = useState<Credit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Check for refresh parameter on mount
  useEffect(() => {
    const refreshParam = searchParams.get('refresh');
    if (refreshParam) {
      setRefreshTrigger(Date.now());
      // Clean up URL without refresh param
      router.replace('/dashboard', { scroll: false });
    }
  }, [searchParams, router]);

  // Fetch credits on auth change or refresh trigger
  useEffect(() => {
    const fetchCredits = async (user: any) => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }

      // Fetch credits when authenticated
      await fetchCredits(user);
    });

    return () => unsubscribe();
  }, [router, refreshTrigger]);

  const getCreditsByType = (type: string) =>
    creditsData.find((c) => c.type === type)?.credits ?? 0;

  const getTotalCredits = () => {
    return creditsData.reduce((sum, credit) => sum + credit.credits, 0);
  };

  const totalCredits = getTotalCredits();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Sidebar />
      <main className="flex-1">
        {/* Modern Header with Stats */}
        <div className="relative bg-gradient-to-br from-[#C10E21] via-[#8B0E19] to-[#00A5A8] text-white px-8 py-10 shadow-2xl overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
              <p className="text-base text-white/90">Here's your training overview at a glance</p>
            </div>

            {/* Quick Stats in Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickStat icon={<FaGraduationCap />} value="1,911" label="Total Classes" />
              <QuickStat icon={<FaUsers />} value="15" label="Active Students" />
              <QuickStat icon={<FaShoppingCart />} value={isLoading ? "..." : totalCredits.toString()} label="Total Credits" />
              <QuickStat icon={<FaTrophy />} value="98%" label="Success Rate" />
            </div>
          </div>
        </div>

        <div className="p-8 -mt-6 relative z-20">
          {/* Credits Overview - Featured Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Training Credits</h2>
                <p className="text-sm text-gray-500 mt-0.5">Manage your course credits and availability</p>
              </div>
              {isLoading && (
                <FaSpinner className="animate-spin text-xl text-gray-400" />
              )}
            </div>

            {/* Credits Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 items-stretch">
              <CreditCard
                title="CPI Adult First Aid (2020)"
                subtitle="Blended - DC"
                credits={getCreditsByType("CPI-FA-2020")}
                isLoading={isLoading}
              />
              <CreditCard
                title="CPI Adult First Aid | CPR AED Adult Infant"
                subtitle="Blended - DC"
                credits={getCreditsByType("CPI-FA-CPR-AI-2020")}
                isLoading={isLoading}
              />
              <CreditCard
                title="CPI Adult First Aid | CPR AED All Ages"
                subtitle="Blended - DC"
                credits={getCreditsByType("CPI-FA-CPR-AA-2020")}
                isLoading={isLoading}
              />
              <CreditCard
                title="CPI Basic Life Support (2020)"
                subtitle="Blended - DC"
                credits={getCreditsByType("CPI-BLS-2020")}
                isLoading={isLoading}
              />
              <CreditCard
                title="CPI CPR AED All Ages (2020)"
                subtitle="Blended - DC"
                credits={getCreditsByType("CPI-CPR-AA-2020")}
                isLoading={isLoading}
              />
              <CreditCard
                title="CPI Spanish Adult First Aid | CPR AED All Ages"
                subtitle="Blended - DC"
                credits={getCreditsByType("CPI-ES-FA-CPR-2020")}
                isLoading={isLoading}
              />
            </div>

            {/* Purchase Credits CTA */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => router.push("/credits/purchase")}
                className="bg-[#00A5A8] text-white px-8 py-2.5 rounded-md font-medium hover:bg-[#008a8d] transition-colors duration-200 flex items-center gap-2"
              >
                <FaShoppingCart className="text-sm" />
                Purchase Credits
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FaChartLine className="text-[#00A5A8]" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ActionCard
                icon={<FaGraduationCap />}
                title="Create Class"
                description="Start new training"
                onClick={() => router.push("/training/create-class")}
              />
              <ActionCard
                icon={<FaUsers />}
                title="Find Students"
                description="Search roster"
                onClick={() => router.push("/students/search")}
              />
              <ActionCard
                icon={<FaChalkboardTeacher />}
                title="Manage Instructors"
                description="View all instructors"
                onClick={() => router.push("/instructors/manage")}
              />
              <ActionCard
                icon={<FaExclamationCircle />}
                title="Reauthorize"
                description="3 pending"
                onClick={() => router.push("/instructors/reauthorize")}
              />
            </div>
          </div>

          {/* Provider Info & Discount Level */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Provider Training Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <FaCalendarAlt className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Arizona Provider Training</h3>
                  <p className="text-sm text-gray-600">Training Center Information</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Current Status</span>
                  <span className="font-semibold text-gray-800">Active</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-semibold text-gray-800">11/18/2025</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Total Instructors</span>
                  <span className="font-semibold text-gray-800">15</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Authorized</span>
                  <span className="font-semibold text-green-600">ASHI Compliance Auto-Approval, HSI 2.0</span>
                </div>
              </div>
            </div>

            {/* Discount Level */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <FaTrophy className="text-purple-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Discount Level</h3>
                  <p className="text-sm text-gray-600">Current tier and progress</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-green-700 mb-2">Current Level</p>
                  <p className="text-2xl font-bold text-green-800">0%</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-blue-700 mb-2">Total Sales 2025</p>
                  <p className="text-2xl font-bold text-blue-800">$20,441</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-orange-700 mb-2">Next Level</p>
                  <p className="text-2xl font-bold text-orange-800">$55,558</p>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00A5A8] to-[#C10E21] h-full" style={{width: '27%'}}></div>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">27% to next discount level (10-2026)</p>
            </div>
          </div>

          {/* Purchase History */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <FaFileInvoice className="text-green-600 text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Purchase History</h3>
                  <p className="text-sm text-gray-600">View My Recent Purchases (Last 6 Months)</p>
                </div>
              </div>
              <button className="text-sm font-semibold text-[#00A5A8] hover:text-[#008a8d] transition-colors flex items-center gap-1">
                VIEW HISTORY
                <FaChevronRight className="text-xs" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr className="text-gray-700 text-left">
                    <th className="p-3 font-semibold">INVOICE</th>
                    <th className="p-3 font-semibold">ORDER DATE</th>
                    <th className="p-3 font-semibold">SHIP TO</th>
                    <th className="p-3 font-semibold">TYPE</th>
                    <th className="p-3 font-semibold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  <PurchaseHistoryRow
                    invoice="2364144"
                    date="11/14/2020"
                    shipTo="Arizona P..."
                    type="Digital"
                    status="Completed"
                  />
                  <PurchaseHistoryRow
                    invoice="2361301"
                    date="11/10/2020"
                    shipTo="Arizona P..."
                    type="Digital"
                    status="Completed"
                  />
                  <PurchaseHistoryRow
                    invoice="2359168"
                    date="11/06/2020"
                    shipTo="Arizona P..."
                    type="Digital"
                    status="Completed"
                  />
                  <PurchaseHistoryRow
                    invoice="2358379"
                    date="11/05/2020"
                    shipTo="Arizona P..."
                    type="Digital"
                    status="Completed"
                  />
                  <PurchaseHistoryRow
                    invoice="2358755"
                    date="11/05/2020"
                    shipTo="Arizona P..."
                    type="Digital"
                    status="Completed"
                  />
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200">
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">‹</button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-green-600 text-white font-semibold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">4</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">5</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600">›</button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Displaying 1 to 5 of 78</p>
          </div>

          {/* Notices Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <FaExclamationCircle className="text-orange-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Notices</h3>
                <p className="text-sm text-gray-600">Important updates and alerts</p>
              </div>
            </div>
            <div className="space-y-3">
              <NoticeItem
                date="18"
                month="Nov"
                title="Email bounced for Class ID: 33781323"
                description="Sent: 3 days ago"
                priority="high"
              />
              <NoticeItem
                date="17"
                month="Nov"
                title="Notice: Your instructor certificate is expiring. Please re-certify."
                description="Expiration: 2 weeks"
                priority="medium"
              />
              <NoticeItem
                date="17"
                month="Nov"
                title="Email bounced for Class ID: 33754442"
                description="Sent: 5 days ago"
                priority="high"
              />
            </div>
            <p className="text-right text-xs text-gray-500 mt-4">Displaying 1 to 3 of 236</p>
          </div>
        </div>
      </main>
    </div>
  );
}

function QuickStat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs text-white/80">{label}</div>
        </div>
      </div>
    </div>
  );
}

function CreditCard({
  title,
  subtitle,
  credits,
  isLoading,
}: {
  title: string;
  subtitle: string;
  credits: number;
  isLoading: boolean;
}) {
  const getStatusColor = (credits: number) => {
    if (credits === 0) return "text-red-600";
    if (credits < 15) return "text-orange-500";
    return "text-green-600";
  };

  const getStatusText = (credits: number) => {
    if (credits === 0) return "Out of Stock";
    if (credits < 15) return "Low Stock";
    return "In Stock";
  };

  const getStatusIcon = (credits: number) => {
    if (credits === 0) return <FaFlag className="text-red-500 text-lg" />;
    if (credits < 15) return <FaExclamationCircle className="text-orange-500 text-lg" />;
    return <FaCheckCircle className="text-green-500 text-lg" />;
  };

  const getBadgeColor = (credits: number) => {
    if (credits === 0) return "bg-red-500";
    if (credits < 15) return "bg-orange-400";
    return "bg-green-500";
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
      <div className="flex items-start justify-between mb-3 min-h-[60px]">
        <div className="flex-1">
          <h3 className="font-bold text-gray-800 text-base mb-0.5 leading-tight">{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        {!isLoading && (
          <div className="transition-all duration-300">
            {getStatusIcon(credits)}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <FaSpinner className="animate-spin text-gray-400 text-sm" />
            <span className="text-gray-400 text-xs">Loading...</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center">
              <div className="text-3xl font-bold text-gray-800 leading-none transition-all duration-300">
                {credits}
              </div>
              <div className={`text-xs font-semibold mt-2 transition-all duration-300 ${getStatusColor(credits)}`}>
                {getStatusText(credits)}
              </div>
            </div>
            <div className={`${getBadgeColor(credits)} w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0 transition-all duration-300`}>
              {credits > 99 ? "99+" : credits}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-[#00A5A8] hover:shadow-lg transition-all duration-200 cursor-pointer group"
    >
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gray-50 border-2 border-gray-200 text-gray-600 text-2xl mb-4 group-hover:border-[#00A5A8] group-hover:text-[#00A5A8] group-hover:bg-teal-50 transition-all">
        {icon}
      </div>
      <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

function PurchaseHistoryRow({
  invoice,
  date,
  shipTo,
  type,
  status,
}: {
  invoice: string;
  date: string;
  shipTo: string;
  type: string;
  status: string;
}) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="p-3 text-blue-600 font-semibold">{invoice}</td>
      <td className="p-3 text-gray-700">{date}</td>
      <td className="p-3 text-gray-700">{shipTo}</td>
      <td className="p-3 text-gray-700 flex items-center gap-2">
        <FaClipboardList className="text-blue-500" />
        {type}
      </td>
      <td className="p-3 text-gray-600">{status}</td>
    </tr>
  );
}

function NoticeItem({
  date,
  month,
  title,
  description,
  priority,
}: {
  date: string;
  month: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}) {
  const priorityColor = priority === "high" ? "bg-red-100 border-red-300" : priority === "medium" ? "bg-orange-100 border-orange-300" : "bg-blue-100 border-blue-300";
  const priorityIcon = priority === "high" ? "🔴" : priority === "medium" ? "🟠" : "🔵";

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100">
      <div className={`${priorityColor} rounded-lg p-3 border text-center min-w-[60px]`}>
        <div className="text-2xl font-bold text-gray-800">{date}</div>
        <div className="text-xs text-gray-600 uppercase">{month}</div>
      </div>
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <span className="text-sm">{priorityIcon}</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">{title}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  time,
  color,
  bgColor,
}: {
  icon: React.ReactNode;
  title: string;
  time: string;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200">
      <div className={`${bgColor} ${color} w-10 h-10 rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}
