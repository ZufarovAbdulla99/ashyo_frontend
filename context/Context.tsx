"use client";
import { ContextType } from "@/types/ContextType";
import React, { createContext, ReactNode, useState, useEffect } from "react";

export const Context = createContext<ContextType>({
  showCategory: false,
  setShowCategory: () => null,
  token: "",
  setToken: () => null,
});

export const GlobalContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

//   localStorage'dan tokenni faqat brauzerda o‘qish
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(JSON.parse(storedToken));
      }
    }
  }, []);

  // Token o‘zgarganda localStorage'ga saqlash
  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      localStorage.setItem("token", JSON.stringify(token));
    }
  }, [token]);

  return (
    <Context.Provider value={{ showCategory, setShowCategory, setToken, token }}>
      {children}
    </Context.Provider>
  );
};