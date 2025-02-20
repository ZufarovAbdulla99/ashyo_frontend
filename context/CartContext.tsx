"use client"
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { getCarts } from "@/service/getCarts";
import { CartContextType } from "@/types/CartContextType";

export const CartContext = createContext<CartContextType>({
    totalPrices: 0,
    setTotalPrices: () => null,
    updateItemPrice: () => null,
})

export const GlobalCartContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [totalPrices, setTotalPrices] = useState<number>(0);
    const { cartList } = getCarts();

    // Initialize total price when component mounts
    useEffect(() => {
        const initialTotal = cartList.reduce((sum: number, item: any) => {
            return sum + (item.product.price * (item.quantity || 1));
        }, 0);
        setTotalPrices(initialTotal);
    }, [cartList]);

    const updateItemPrice = (oldPrice: number, newPrice: number) => {
        setTotalPrices(prev => prev - oldPrice + newPrice);
    };

    return (
        <CartContext.Provider value={{ 
            totalPrices, 
            setTotalPrices,
            updateItemPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
}