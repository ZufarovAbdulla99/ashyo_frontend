"use client"
import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { instance } from "@/hooks/instance";
import CartProduct from "@/components/CartProduct";
import Button from "@/components/Button";

const CartPage = () => {
    const { totalPrices } = useContext(CartContext);

    const { data: cartItems, isLoading, isError } = useQuery({
        queryKey: ["carts_list"],
        queryFn: async () => {
            const response = await instance().get("/cart-items");
            return response.data;
        },
    });

    if (isLoading) return <p>Loading cart...</p>;
    if (isError) return <p>Error loading cart</p>;

    return (
        <div className='containers'>
            <h2 className='font-bold text-[22px] mb-[36px]'>Savat</h2>
            <div className='flex justify-between'>
                <div className='w-[70%] space-y-[30px]'>
                    {cartItems.length > 0 ? (
                        cartItems.map((item: any) => <CartProduct key={item.id} item={item} />)
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>
                <div className='w-[25%]'>
                    <div className='w-full bg-[#EBEFF3] p-[40px] rounded-[7px]'>
                        <h2 className='font-bold text-[25px] text-center mb-[42px]'>Sizni haridingiz</h2>
                        <ul className='flex mb-[41px] items-center justify-between'>
                            <li className='text-[12px] font-normal'>Yetkazib berish:</li>
                            <li className='text-[18px] font-semibold'>Bepul</li>
                        </ul>
                        <ul className='flex items-center mb-[39px] justify-between'>
                            <li className='text-[12px] font-normal'>Jami summa:</li>
                            <li className='text-[18px] font-semibold'>{totalPrices ? totalPrices: "0 USZ"}</li>
                        </ul>
                        <Button extrClass='!py-[17px] w-[90%] mx-auto' title='Hoziroq sotib olish' type='button'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;