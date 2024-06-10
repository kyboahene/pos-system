"use client";

import React from "react";
import OrdersPageTemplate from "@/modules/orders/templates/orders-template";
import withAuth from "@/modules/shared/with-auth";

const Orders = () => {
  return <OrdersPageTemplate />;
};

export default withAuth(Orders);
