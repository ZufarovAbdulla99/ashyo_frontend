"use client";
import { ContextType } from "@/types/ContextType";
import React, { createContext, ReactNode, useState } from "react";

export const Context = createContext<ContextType>({
  showCategory: false,
  setShowCategory: () => null,
  token: null,
  setToken: () => null,
});

export const GlobalContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Token ni o'rnatish uchun yangi funksiya 
  const handleSetToken = (newToken: string | null) => {
    setToken(newToken);
    
    // Faqat client-side da localStorage ga saqlash
    if (typeof window !== 'undefined' && newToken) {
      try {
        localStorage.setItem('token', JSON.stringify(newToken));
      } catch (error) {
        console.error('Token saqlashda xato:', error);
      }
    }
  };

  return (
    <Context.Provider value={{ 
      showCategory, 
      setShowCategory, 
      token, 
      setToken: handleSetToken 
    }}>
      {children}
    </Context.Provider>
  );
};