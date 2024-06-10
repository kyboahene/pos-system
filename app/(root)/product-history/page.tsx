"use client";

import React from "react";
import ProductHistoryTemplate from "@/modules/product-history/templates/product-history-template";
import withAuth from "@/modules/shared/with-auth";

const ProductHistory = () => {
  return <ProductHistoryTemplate />;
};

export default withAuth(ProductHistory);
