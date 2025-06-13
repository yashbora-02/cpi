'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('2335082');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard'); // mock login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-gray-100">
      <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md text-center">
        {/* Logo Section */}
        <div className="mb-6">
          <h1 className="text-5xl font-bold text-blue-700 tracking-wide">CPI</h1>
          <div className="flex justify-center gap-2 mt-2 text-xs text-gray-700 font-medium">
            <span>AMERICAN SAFETY&</span>
            <span>MEDIC First Aid</span>
            <span>EMS SAFETY</span>
            <span>AVERT</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-between bg-blue-600 text-white rounded mb-4 text-sm font-semibold">
          <button className="w-1/2 py-2 border-b-2 border-white">START</button>
          <button className="w-1/2 py-2 opacity-70 hover:opacity-100">SUPPORT</button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="text-left text-gray-700">
          <label className="block text-sm font-medium mb-1">Login ID *</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
          />

          <div className="text-sm mb-3 text-blue-600 hover:underline cursor-pointer">
            Forgot Login ID
          </div>

          <label className="block text-sm font-medium mb-1">Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
          />

          <div className="flex justify-between text-sm text-blue-600 mt-1 mb-4">
            <span className="hover:underline cursor-pointer">Reset Password</span>
            <span className="hover:underline cursor-pointer">Set Language</span>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-2"
          >
            <span>🔒</span> LOG IN
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">© 2025 CPI</p>
      </div>
    </div>
  );
}
