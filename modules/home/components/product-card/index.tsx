import { Product } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";

type ProductCardProps = {
  product?: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="relative h-[217px] w-full rounded-lg overflow-hidden">
        <Image
          alt="product"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPsXLK8HgAF5wJVnJv1MQAAAABJRU5ErkJggg=="
          src="/images/pizza.jpg"
          objectFit="cover"
          fill
        />
      </div>

      <div className="flex flex-col gap-1 px-3">
        <div className="flex justify-between items-center ">
          <p className="text-xl">4 Meat Pizza</p>
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
