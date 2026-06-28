"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface UserProfile {
  name: string;
  email: string;
  college?: string;
  currentYear?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, name?: string) => void;
  register: (name: string, email: string, college: string, currentYear: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check local storage for persistent user session
    const storedUser = localStorage.getItem("codezilaa_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("codezilaa_user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, name?: string) => {
    const defaultName = name || email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) || "Alex Sharma";
    const loggedInUser: UserProfile = {
      name: defaultName,
      email: email || "alex@codezilaa.com",
      college: "IIT Bombay",
      currentYear: "3rd Year",
    };
    setUser(loggedInUser);
    localStorage.setItem("codezilaa_user", JSON.stringify(loggedInUser));
  };

  const register = (name: string, email: string, college: string, currentYear: string) => {
    const registeredUser: UserProfile = {
      name: name || "Alex Sharma",
      email: email || "alex@codezilaa.com",
      college: college || "IIT Bombay",
      currentYear: currentYear || "3rd Year",
    };
    setUser(registeredUser);
    localStorage.setItem("codezilaa_user", JSON.stringify(registeredUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("codezilaa_user");
    router.push("/auth?mode=login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
