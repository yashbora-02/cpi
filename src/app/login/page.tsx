"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setToken } from "../utils/auth";

export default function Login() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple form validation
    if (!loginId || !password) {
      setError("Login ID and password are required.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_id: loginId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
      } else {
        localStorage.setItem("token", data.token);
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-800 to-gray-100">
      <div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md text-center">
        <form onSubmit={handleLogin} className="text-left text-gray-700">
          <label className="block text-sm font-medium mb-1">Login ID *</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full mb-2 px-3 py-2 border border-gray-300 rounded"
          />

          <label className="block text-sm font-medium mb-1">Password *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          />

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <span>🔒</span> LOG IN
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6">© 2025 CPI</p>
      </div>
    </div>
  );
}
