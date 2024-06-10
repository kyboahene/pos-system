import { addSelectedProduct } from "@/lib/store/slices/cart";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { Check, Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

type ProductCardProps = {
  product: Product;
  isSelected: boolean;
  setSelectedProduct: (value: Product) => void;
};

const ProductCard = ({
  product,
  setSelectedProduct,
  isSelected,
}: ProductCardProps) => {
  const dispatch = useDispatch();

  function handleSelect(product: Product) {
    setSelectedProduct(product);
    dispatch(addSelectedProduct(product));
  }

  return (
    <section
      className="relative flex flex-col gap-3 group cursor-pointer"
      onClick={() => handleSelect(product)}
    >
      <button
        className={cn(
          "hidden group-hover:block absolute bg-white p-4 rounded-lg top-2 left-2 z-30",
          {
            "p-2 block": isSelected,
          }
        )}
      >
        {isSelected ? <Check className="h-4 w-4" /> : ""}
      </button>
      <div className="relative h-[217px] w-full rounded-lg overflow-hidden">
        <Image
          alt="product"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsXLK8HgAF5wJVnJv1MQAAAABJRU5ErkJggg=="
          src={product?.image ? product.image : ""}
          objectFit="cover"
          fill
          sizes=""
        />
      </div>

      <div className="flex flex-col gap-1 px-3">
        <div className="flex justify-between items-center ">
          <p className="text-xl">{product?.name}</p>
          <span className="flex items-center gap-2">
            <Star className="text-[#FFA800]" />
            <span className="text-xl">3.5</span>
          </span>
        </div>
        <p className="font-bold text-md">GHS 50</p>
      </div>
    </section>
  );
};

export default ProductCard;
