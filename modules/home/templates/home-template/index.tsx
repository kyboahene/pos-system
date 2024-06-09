import { Button } from "@/modules/shared/button";
import React from "react";
import ProductCard from "../../components/product-card";
import AddToCartDrawer from "../../components/add-to-cart-drawer";
import CreateProductDrawer from "../../components/create-product-drawer";

const HomeTemplate = () => {
  return (
    <section className="flex size-full flex-col gap-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[40px] font-bold">Products</h1>

        <div className="flex items-center gap-4">
          <CreateProductDrawer />
          <AddToCartDrawer />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((product, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </section>
  );
};

export default HomeTemplate;
