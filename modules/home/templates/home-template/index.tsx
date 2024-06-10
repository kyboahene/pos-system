"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";

// types
import { Product } from "@/types";

// stores
import { getProducts } from "@/lib/store/selectors/product";

// components
import ProductCard from "../../components/product-card";
import AddToCartDrawer from "../../components/add-to-cart-drawer";
import CreateProductDrawer from "../../components/create-product-drawer";

const HomeTemplate = () => {
  const products = useSelector(getProducts);

  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState(false);
  const [isAddToCartDrawerOpen, setIsAddToCartDrawerOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="flex size-full flex-col gap-10">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <h1 className="text-3xl md:text-[40px] font-bold">Products</h1>

        <div className="flex max-sm:justify-end items-center gap-2 md:gap-4">
          <CreateProductDrawer
            isOpen={isProductDrawerOpen}
            setIsOpen={setIsProductDrawerOpen}
          />
          <AddToCartDrawer
            isOpen={isAddToCartDrawerOpen}
            setIsOpen={setIsAddToCartDrawerOpen}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product, index) => {
            const isSelected = product.id === selectedProduct?.id;

            return (
              <ProductCard
                key={index}
                product={product}
                isSelected={isSelected}
                setSelectedProduct={setSelectedProduct}
              />
            );
          })
        ) : (
          <h1 className="text-2xl">No Product uploaded yet</h1>
        )}
      </div>
    </div>
  );
};

export default HomeTemplate;
