
import React, { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const data = await getMe();

        if (mounted) {
          setUser(data?.user ?? null);
        }
      } catch (error) {
        // 401 simply means the user is not logged in.
        if (mounted) {
          setUser(null);
        }

        if (error.response?.status !== 401) {
          console.error("Auth initialization failed:", error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
