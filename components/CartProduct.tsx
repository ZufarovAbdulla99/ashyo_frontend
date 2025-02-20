import { IMAGE_API } from "@/hooks/getEnv";
import { RemoveIcon } from "@/icons";
import { CartProductType } from "@/types/ProductsType";
import Image from "next/image";
import React, { FC, useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Context } from "@/context/Context";
import { CartContext } from "@/context/CartContext";
import { instance } from "@/hooks/instance";

type Props = {
  item: CartProductType;
};

const CartProduct: FC<Props> = ({ item }) => {
  const queryClient = useQueryClient();
  const { token } = useContext(Context);
  const { updateItemPrice } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(item.quantity || 1);
  const [price, setPrice] = useState(item.product.price * quantity);

  const deleteMutation = useMutation({
    mutationFn: () =>
      instance().delete(`/cart-item/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts_list"] });
      updateItemPrice(price, 0);
    },
    onError: (error) => {
      console.error("Error deleting item:", error);
    },
  });

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      const oldPrice = price;
      const newPrice = item.product.price * newQuantity;

      setQuantity(newQuantity);
      setPrice(newPrice);
      updateItemPrice(oldPrice, newPrice);
    }
  };

  return (
    <div className="flex justify-between items-center w-full gap-[20px]">
      {/* Rasm va Trash tugmasi qismi */}
      <div className="flex items-start gap-[15px]">
        <div className="w-[150px] h-[150px] bg-[#EBEFF3] rounded-[8px] flex items-center justify-center">
          <Image
            src={`${IMAGE_API}/${item.product.image}`}
            alt="Cart img"
            width={115}
            height={115}
          />
        </div>
        <button
          onClick={handleDelete}
          disabled={deleteMutation.isPending}
          className="bg-[#EBEFF3] p-[10px] rounded-[7px] flex items-center justify-center mt-[105px]"
        >
          <RemoveIcon />
        </button>
      </div>

      {/* Mahsulot haqida ma'lumot */}
      <div className="flex flex-col flex-1">
        <h2 className="text-[18px] text-[#545D6A] mb-[10px]">
          {item.product.name}
        </h2>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <strong className="font-bold text-[24px]">{price.toLocaleString()}</strong>
            <span className="text-[14px]">USZ</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={deleteMutation.isPending || quantity <= 1}
              className="w-[40px] h-[40px] bg-[#EBEFF3] flex items-center justify-center rounded-[7px]"
            >
              -
            </button>
            <span className="w-[40px] h-[40px] bg-[#EBEFF3] flex items-center justify-center rounded-[7px]">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={deleteMutation.isPending}
              className="w-[40px] h-[40px] bg-[#EBEFF3] flex items-center justify-center rounded-[7px]"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;