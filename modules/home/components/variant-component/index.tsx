import { ProductVariant } from "@/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type VariantComponentProps = {
  variant: ProductVariant;
  updateQuantity: (name: string, size: string, quantity: number) => void;
};

export const VariantComponent = ({
  variant,
  updateQuantity,
}: VariantComponentProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(variant.name, variant.size, newQuantity);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(variant.name, variant.size, newQuantity);
    }
  };

  return (
    <div className="flex items-center">
      <p className="flex-1">{variant.name}</p>
      <p className="flex-1 text-center">GHS {variant.price}</p>
      <div className="flex-1 flex justify-end items-center gap-3">
        <button
          type="button"
          onClick={handleIncrease}
          className="rounded-2xl border bg-[#DFDFDF] py-1 px-2"
        >
          <Plus className="w-4 h-4 cursor-pointer" />
        </button>
        <span className="rounded-lg px-2 border">{quantity}</span>
        <button
          type="button"
          onClick={handleDecrease}
          className="rounded-2xl border bg-[#DFDFDF] py-1 px-2"
        >
          <Minus className="w-4 h-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};
