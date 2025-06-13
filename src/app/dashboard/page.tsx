'use client';

import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CreditCard title="CPR Only" credits={12} />
          <CreditCard title="First Aid Only" credits={8} />
          <CreditCard title="Combo (CPR & First Aid)" credits={28} />
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
