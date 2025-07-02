import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number;
  login_id: string;
}

export function setToken(token: string) {
  const decoded = jwtDecode<TokenPayload>(token);
  const expiry = decoded.exp * 1000; // to ms

  localStorage.setItem("token", token);

  const timeout = expiry - Date.now();
  if (timeout > 0) {
    setTimeout(() => logout(), timeout);
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function isTokenValid(): boolean {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return Date.now() < decoded.exp * 1000;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
