"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple form validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      setLoading(true);

      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      if (data.success && data.user) {
        // Store user info in localStorage
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error('Login error:', err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2D2F33] relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.webp')",
          opacity: 0.15
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D2F33]/90 via-[#2D2F33]/85 to-[#2D2F33]/90"></div>
      <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-[#C10E21]/20 to-transparent"></div>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#00A5A8]/15 to-transparent"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/logo.png"
              alt="CarePoint Institute"
              width={120}
              height={60}
              className="object-contain"
            />
          </div>
          <p className="text-white/80 text-lg">Training Portal Login</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-white/50" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition"
                  placeholder="Enter your username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-white/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00A5A8] focus:border-transparent transition"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#C10E21]/20 border border-[#C10E21]/50 rounded-lg p-4">
                <p className="text-white text-sm text-center font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#C10E21] to-[#a00d1c] hover:from-[#a00d1c] hover:to-[#C10E21] text-white py-4 rounded-lg font-bold uppercase tracking-wide transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login to Portal"
              )}
            </button>

            {/* Demo Credentials Helper */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <p className="text-white/60 text-xs text-center mb-2">Demo Credentials:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/5 rounded p-2">
                  <p className="text-[#00A5A8] font-semibold mb-1">Admin</p>
                  <p className="text-white/70">admin / admin123</p>
                </div>
                <div className="bg-white/5 rounded p-2">
                  <p className="text-[#00A5A8] font-semibold mb-1">Instructor</p>
                  <p className="text-white/70">instructor / instructor123</p>
                </div>
              </div>
            </div>

            {/* Additional Links */}
            <div className="flex items-center justify-center text-sm">
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-[#00A5A8] hover:text-white font-semibold transition-all duration-300 hover:scale-110 hover:underline active:scale-95"
              >
                ← Back to Home
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>© 2025 CarePoint Institute. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
