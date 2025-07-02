"use client";
import { createContext, useContext, useEffect } from "react";
import { getToken, isTokenValid, logout } from "../utils/auth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const token = getToken();
    if (!token || !isTokenValid()) {
      logout();
    }
  }, []);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
