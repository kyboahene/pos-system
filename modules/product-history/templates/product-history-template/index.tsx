import React from "react";
import ProductHistoryTable from "../../components/product-history-table";

const ProductHistoryTemplate = () => {
  return (
    <section className="flex size-full flex-col gap-10">
      <h1 className="text-[40px] font-bold">Product History</h1>

      <ProductHistoryTable />
    </section>
  );
};

export default ProductHistoryTemplate;
